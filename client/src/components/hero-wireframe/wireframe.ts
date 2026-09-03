/**
 * Reader for the geometry produced by `client/scripts/stl-to-wireframe.mjs`.
 *
 * Positions are unsigned 16-bit fractions of the model's bounding box, which the
 * GPU reads as normalised attributes without any unpacking on the main thread.
 */
const MAGIC = 0x57564f52 // 'ROVW'
const FORMAT = 1
const HEADER_BYTES = 24

export interface Wireframe {
	occluderPositions: Uint16Array
	occluderIndices: Uint16Array
	linePositions: Uint16Array
	lineIndices: Uint16Array
}

export function loadWireframe(buffer: ArrayBuffer): Wireframe {
	const header = new DataView(buffer)
	if (header.getUint32(0, true) !== MAGIC) throw new Error('not a wireframe file')
	if (header.getUint16(4, true) !== FORMAT) throw new Error('unsupported wireframe version')

	const occluderVertices = header.getUint32(8, true)
	const occluderIndexCount = header.getUint32(12, true)
	const lineVertices = header.getUint32(16, true)
	const lineIndexCount = header.getUint32(20, true)

	let offset = HEADER_BYTES
	const take = (length: number) => {
		const array = new Uint16Array(buffer, offset, length)
		offset += length * 2
		return array
	}
	return {
		occluderPositions: take(occluderVertices * 3),
		occluderIndices: take(occluderIndexCount),
		linePositions: take(lineVertices * 3),
		lineIndices: take(lineIndexCount),
	}
}
