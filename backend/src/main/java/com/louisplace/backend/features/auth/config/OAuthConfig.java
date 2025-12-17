package com.louisplace.backend.features.auth.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class OAuthConfig {

    @Value("${oauth.google.client-id}")
    private String googleClientId;

    @Value("${oauth.google.client-secret}")
    private String googleClientSecret;

    @Value("${oauth.google.redirect-uri}")
    private String googleRedirectUri;

    @Value("${oauth.github.client-id}")
    private String githubClientId;

    @Value("${oauth.github.client-secret}")
    private String githubClientSecret;

    @Value("${oauth.github.redirect-uri}")
    private String githubRedirectUri;

    public String getClientId(String provider) {
        return switch (provider.toLowerCase()) {
            case "google" -> googleClientId;
            case "github" -> githubClientId;
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }

    public String getClientSecret(String provider) {
        return switch (provider.toLowerCase()) {
            case "google" -> googleClientSecret;
            case "github" -> githubClientSecret;
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }

    public String getRedirectUri(String provider) {
        return switch (provider.toLowerCase()) {
            case "google" -> googleRedirectUri;
            case "github" -> githubRedirectUri;
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }
}
