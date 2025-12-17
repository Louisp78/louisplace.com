package com.louisplace.backend.features.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.louisplace.backend.features.auth.auth_service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/{provider}")
    public String auth(@PathVariable String provider, @RequestParam String code) {
        OAuthProvider oAuthProvider = OAuthProvider.fromString(provider);
        authService.authenticate(oAuthProvider, code);
        return "Authenticated with " + provider;
    }
}
