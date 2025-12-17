package com.louisplace.backend.features.auth.session_service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SessionService implements ISessionProvider {

    @Override
    public SecurityContext getSession(String email) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                email, // Principal (user identifier)
                null, // Credentials (not needed after auth)
                null // Authorities (roles/permissions)
        );

        // Set authentication in SecurityContext
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);
        return securityContext;
    }

}
