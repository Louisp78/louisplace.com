package com.louisplace.backend.features.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.louisplace.backend.features.auth.auth_service.AuthService;
import com.louisplace.backend.features.auth.session_service.SessionService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class AuthController {

        @Autowired
        private AuthService authService;

        @Autowired
        private SessionService sessionService;

        @PostMapping("/oauth/{provider}")
        public ResponseEntity<UserDTO> auth(@PathVariable String provider, @RequestParam String code,
                        HttpServletRequest request) {
                UserEntity user = authService.authenticate("OAUTH", provider, code);

                SecurityContext securityContext = sessionService.getSession(user.getEmail());

                HttpSession session = request.getSession(true);
                session.setAttribute(
                                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                                securityContext);

                UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail());
                return ResponseEntity.ok(userDTO);
        }
}
