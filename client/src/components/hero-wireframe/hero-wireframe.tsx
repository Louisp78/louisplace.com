'use client'

import { useEffect, useRef, useState } from 'react'
import { type Wireframe, loadWireframe } from './wireframe'

/**
 * The ROV's line drawing, turning slowly.
 *
 * Drawn in two passes. The first rasterises a coarse stand-in for the solid body
 * into the depth buffer without writing any colour; the second draws the real
 * feature lines, letting the depth test throw away the ones behind the hull.
 * Without that first pass every line on the far side shows through and the whole
 * thing reads as a transparent tangle rather than a machine.
 */
const MODEL_URL = '/model/rov-wireframe.bin'
const TURN_SECONDS = 44 // one full revolution
const TILT = 0.55 // radians, looking down on the vehicle
const FOCAL = 5 // distance to the eye; larger is flatter
const MARGIN = 0.86
const DEPTH_RANGE = 3 // model depth mapped into clip space, with room to spare
const LINE_WIDTH = 1.15 // CSS pixels
// The occluder is lumpy, so it is pushed away from the eye before the depth test.
// Too little and it eats the lines lying on it; too much and it stops hiding the
// far side. This covers half the decimation grid, in normalised model units.
const OCCLUDER_BIAS = 0.03

/** Shared by both passes: yaw about the vehicle's vertical axis, then a tilt. */
const TRANSFORM = `
	uniform vec2 uYaw;   // cos, sin
	uniform vec2 uTilt;  // cos, sin
	uniform vec2 uScale;
	uniform float uBias;

	vec4 project(vec3 p) {
		float across = p.x * uYaw.x - p.y * uYaw.y;
		float into = p.x * uYaw.y + p.y * uYaw.x;
		float depth = into * uTilt.x + p.z * uTilt.y;
		float up = p.z * uTilt.x - into * uTilt.y;
		float w = (FOCAL + depth) / FOCAL;
		return vec4(across * uScale.x, up * uScale.y, ((depth + uBias) / DEPTH_RANGE) * w, w);
	}
`

const OCCLUDER_VERTEX = `
	attribute vec3 aPosition;
	${TRANSFORM}
	void main() {
		gl_Position = project(aPosition * 2.0 - 1.0);
	}
`

const LINE_VERTEX = `
	attribute vec3 aPosition;
	attribute vec3 aOther;
	attribute float aSide;
	uniform vec2 uHalfResolution;
	uniform float uHalfWidth;
	varying float vDepth;
	${TRANSFORM}
	void main() {
		vec4 here = project(aPosition * 2.0 - 1.0);
		vec4 there = project(aOther * 2.0 - 1.0);
		// Widen the segment in screen space, so a line keeps its weight whatever
		// its distance and however the page is scaled.
		vec2 pixelsHere = (here.xy / here.w) * uHalfResolution;
		vec2 pixelsThere = (there.xy / there.w) * uHalfResolution;
		vec2 along = pixelsThere - pixelsHere;
		float length2 = dot(along, along);
		vec2 across = length2 > 0.0 ? normalize(vec2(-along.y, along.x)) : vec2(0.0);
		vec2 shifted = pixelsHere + across * aSide * uHalfWidth;
		vDepth = here.z / here.w;
		gl_Position = vec4((shifted / uHalfResolution) * here.w, here.z, here.w);
	}
`

const FRAGMENT = `
	precision mediump float;
	uniform vec3 uColor;
	uniform float uFade;
	varying float vDepth;
	void main() {
		// The far side is gone already; this only settles what remains back a little.
		gl_FragColor = vec4(uColor, 1.0 - uFade * clamp(vDepth * 0.5 + 0.5, 0.0, 1.0));
	}
`

const OCCLUDER_FRAGMENT = `
	precision mediump float;
	void main() { gl_FragColor = vec4(0.0); }
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
	const shader = gl.createShader(type)
	if (!shader) return null
	gl.shaderSource(
		shader,
		`#define FOCAL ${FOCAL.toFixed(1)}\n#define DEPTH_RANGE ${DEPTH_RANGE.toFixed(1)}\n${source}`
	)
	gl.compileShader(shader)
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		gl.deleteShader(shader)
		return null
	}
	return shader
}

function link(gl: WebGLRenderingContext, vertex: string, fragment: string) {
	const vs = compile(gl, gl.VERTEX_SHADER, vertex)
	const fs = compile(gl, gl.FRAGMENT_SHADER, fragment)
	if (!vs || !fs) return null
	const program = gl.createProgram()
	if (!program) return null
	gl.attachShader(program, vs)
	gl.attachShader(program, fs)
	gl.linkProgram(program)
	gl.deleteShader(vs)
	gl.deleteShader(fs)
	return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null
}

/** Expands each segment into a quad, since WebGL only ever draws hairline GL_LINES. */
function buildRibbons(model: Wireframe) {
	const segments = model.lineIndices.length / 2
	const position = new Float32Array(segments * 4 * 3)
	const other = new Float32Array(segments * 4 * 3)
	const side = new Float32Array(segments * 4)
	const indices = new Uint16Array(segments * 6)
	const at = (i: number, c: number) => model.linePositions[i * 3 + c] / 65535

	for (let s = 0; s < segments; s++) {
		const a = model.lineIndices[s * 2]
		const b = model.lineIndices[s * 2 + 1]
		// Both ends carry the other end, so each can work out the same perpendicular.
		const ends = [
			[a, b, 1],
			[a, b, -1],
			[b, a, -1],
			[b, a, 1],
		]
		ends.forEach(([self, mate, s2], k) => {
			const v = s * 4 + k
			for (let c = 0; c < 3; c++) {
				position[v * 3 + c] = at(self, c)
				other[v * 3 + c] = at(mate, c)
			}
			side[v] = s2
		})
		const base = s * 4
		indices.set([base, base + 1, base + 2, base + 2, base + 1, base + 3], s * 6)
	}
	return { position, other, side, indices, count: segments * 6 }
}

export default function HeroWireframe({ label }: { label: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [model, setModel] = useState<Wireframe | null>(null)
	const [failed, setFailed] = useState(false)

	useEffect(() => {
		const controller = new AbortController()
		fetch(MODEL_URL, { signal: controller.signal })
			.then((response) => response.arrayBuffer())
			.then((buffer) => setModel(loadWireframe(buffer)))
			.catch(() => {
				if (!controller.signal.aborted) setFailed(true)
			})
		return () => controller.abort()
	}, [])

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas || !model) return

		const gl = canvas.getContext('webgl', {
			alpha: true,
			antialias: true,
			depth: true,
			premultipliedAlpha: false,
		})
		if (!gl) {
			setFailed(true)
			return
		}

		const occluderProgram = link(gl, OCCLUDER_VERTEX, OCCLUDER_FRAGMENT)
		const lineProgram = link(gl, LINE_VERTEX, FRAGMENT)
		if (!occluderProgram || !lineProgram) {
			setFailed(true)
			return
		}

		const ribbons = buildRibbons(model)
		const buffer = (target: number, data: ArrayBufferView) => {
			const handle = gl.createBuffer()
			gl.bindBuffer(target, handle)
			gl.bufferData(target, data, gl.STATIC_DRAW)
			return handle
		}
		const occluderPositions = buffer(gl.ARRAY_BUFFER, model.occluderPositions)
		const occluderIndices = buffer(gl.ELEMENT_ARRAY_BUFFER, model.occluderIndices)
		const ribbonPositions = buffer(gl.ARRAY_BUFFER, ribbons.position)
		const ribbonOthers = buffer(gl.ARRAY_BUFFER, ribbons.other)
		const ribbonSides = buffer(gl.ARRAY_BUFFER, ribbons.side)
		const ribbonIndices = buffer(gl.ELEMENT_ARRAY_BUFFER, ribbons.indices)

		// How far the drawing reaches, so it can be fitted without hard-coded numbers.
		let radius = 0
		let vertical = 0
		for (let i = 0; i < model.linePositions.length; i += 3) {
			const x = (model.linePositions[i] / 65535) * 2 - 1
			const y = (model.linePositions[i + 1] / 65535) * 2 - 1
			const z = (model.linePositions[i + 2] / 65535) * 2 - 1
			const r = Math.hypot(x, y)
			radius = Math.max(radius, r)
			vertical = Math.max(vertical, Math.abs(z) * Math.cos(TILT) + r * Math.sin(TILT))
		}

		let colour: [number, number, number] = [1, 1, 1]
		const readColour = () => {
			const parsed = getComputedStyle(canvas).color.match(/[\d.]+/g)
			if (parsed && parsed.length >= 3) {
				colour = [Number(parsed[0]) / 255, Number(parsed[1]) / 255, Number(parsed[2]) / 255]
			}
		}
		readColour()
		const scheme = window.matchMedia('(prefers-color-scheme: dark)')
		const stillness = window.matchMedia('(prefers-reduced-motion: reduce)')

		let width = 0
		let height = 0
		let ratio = 1
		const resize = () => {
			ratio = Math.min(window.devicePixelRatio || 1, 2)
			const box = canvas.getBoundingClientRect()
			width = Math.max(1, Math.round(box.width * ratio))
			height = Math.max(1, Math.round(box.height * ratio))
			canvas.width = width
			canvas.height = height
			gl.viewport(0, 0, width, height)
		}

		const bindAttribute = (
			program: WebGLProgram,
			name: string,
			handle: WebGLBuffer | null,
			size: number,
			type: number,
			normalized: boolean
		) => {
			const location = gl.getAttribLocation(program, name)
			if (location < 0) return
			gl.bindBuffer(gl.ARRAY_BUFFER, handle)
			gl.enableVertexAttribArray(location)
			gl.vertexAttribPointer(location, size, type, normalized, 0, 0)
		}

		const setCommon = (program: WebGLProgram, yaw: number, bias: number) => {
			const scale = Math.min(width / 2 / radius, height / 2 / vertical) * MARGIN
			gl.uniform2f(gl.getUniformLocation(program, 'uYaw'), Math.cos(yaw), Math.sin(yaw))
			gl.uniform2f(gl.getUniformLocation(program, 'uTilt'), Math.cos(TILT), Math.sin(TILT))
			gl.uniform2f(
				gl.getUniformLocation(program, 'uScale'),
				scale / (width / 2),
				scale / (height / 2)
			)
			gl.uniform1f(gl.getUniformLocation(program, 'uBias'), bias)
		}

		const draw = (yaw: number) => {
			gl.clearColor(0, 0, 0, 0)
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
			gl.enable(gl.DEPTH_TEST)

			// Pass one: the solid, into the depth buffer only.
			gl.useProgram(occluderProgram)
			gl.colorMask(false, false, false, false)
			gl.depthMask(true)
			gl.depthFunc(gl.LESS)
			setCommon(occluderProgram, yaw, OCCLUDER_BIAS)
			bindAttribute(occluderProgram, 'aPosition', occluderPositions, 3, gl.UNSIGNED_SHORT, true)
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, occluderIndices)
			gl.drawElements(gl.TRIANGLES, model.occluderIndices.length, gl.UNSIGNED_SHORT, 0)

			// Pass two: the lines, keeping only what that solid does not hide.
			gl.useProgram(lineProgram)
			gl.colorMask(true, true, true, true)
			gl.depthMask(false)
			gl.depthFunc(gl.LEQUAL)
			gl.enable(gl.BLEND)
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
			setCommon(lineProgram, yaw, 0)
			gl.uniform2f(gl.getUniformLocation(lineProgram, 'uHalfResolution'), width / 2, height / 2)
			gl.uniform1f(gl.getUniformLocation(lineProgram, 'uHalfWidth'), (LINE_WIDTH * ratio) / 2)
			gl.uniform3fv(gl.getUniformLocation(lineProgram, 'uColor'), colour)
			gl.uniform1f(gl.getUniformLocation(lineProgram, 'uFade'), 0.45)
			bindAttribute(lineProgram, 'aPosition', ribbonPositions, 3, gl.FLOAT, false)
			bindAttribute(lineProgram, 'aOther', ribbonOthers, 3, gl.FLOAT, false)
			bindAttribute(lineProgram, 'aSide', ribbonSides, 1, gl.FLOAT, false)
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ribbonIndices)
			gl.drawElements(gl.TRIANGLES, ribbons.count, gl.UNSIGNED_SHORT, 0)
		}

		let frame = 0
		let start = 0
		const tick = (now: number) => {
			if (!start) start = now
			draw((((now - start) / 1000) * (Math.PI * 2)) / TURN_SECONDS)
			frame = requestAnimationFrame(tick)
		}
		const render = () => {
			cancelAnimationFrame(frame)
			resize()
			if (stillness.matches) draw(0.7)
			else {
				start = 0
				frame = requestAnimationFrame(tick)
			}
		}

		render()
		const observer = new ResizeObserver(render)
		observer.observe(canvas)
		stillness.addEventListener('change', render)
		const repaint = () => {
			readColour()
			if (stillness.matches) draw(0.7)
		}
		scheme.addEventListener('change', repaint)

		return () => {
			cancelAnimationFrame(frame)
			observer.disconnect()
			stillness.removeEventListener('change', render)
			scheme.removeEventListener('change', repaint)
			for (const handle of [
				occluderPositions,
				occluderIndices,
				ribbonPositions,
				ribbonOthers,
				ribbonSides,
				ribbonIndices,
			]) {
				gl.deleteBuffer(handle)
			}
			gl.deleteProgram(occluderProgram)
			gl.deleteProgram(lineProgram)
		}
	}, [model])

	// Purely decorative, so if it cannot be drawn the section simply goes without it.
	if (failed) return null

	return (
		<canvas
			ref={canvasRef}
			role="img"
			aria-label={label}
			className="h-56 w-full max-w-3xl text-[var(--foreground)] sm:h-72 md:h-96"
		/>
	)
}
