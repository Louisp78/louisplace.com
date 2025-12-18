package com.louisplace.backend.features.auth.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import com.louisplace.backend.features.auth.OAuthProviderEnum;

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

    public String getClientId(OAuthProviderEnum provider) {
        return switch (provider) {
            case GOOGLE -> googleClientId;
            case GITHUB -> githubClientId;
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider.getName());
        };
    }

    public String getClientSecret(OAuthProviderEnum provider) {
        return switch (provider) {
            case GOOGLE -> googleClientSecret;
            case GITHUB -> githubClientSecret;
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider.getName());
        };
    }

    public String getRedirectUri(OAuthProviderEnum provider) {
        return switch (provider) {
            case GOOGLE -> googleRedirectUri;
            case GITHUB -> githubRedirectUri;
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider.getName());
        };
    }
}
