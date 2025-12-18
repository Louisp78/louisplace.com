package com.louisplace.backend.features.auth.session_service;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.louisplace.backend.features.auth.Roles;

@Service
public class SessionService implements ISessionProvider {

    @Override
    public SecurityContext getSession(String email) {
        List<SimpleGrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(Roles.ROLE_USER));
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                email,
                null,
                authorities);

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);
        return securityContext;
    }

}
