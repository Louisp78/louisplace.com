package com.louisplace.backend.features.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OAuthProviderEnum {
    GOOGLE("google", "https://oauth2.googleapis.com/token", "https://www.googleapis.com/oauth2/v2/userinfo"),
    GITHUB("github", "https://github.com/login/oauth/access_token", "https://api.github.com/user");

    private final String name;
    private final String tokenUrl;
    private final String userInfoUrl;

    public static OAuthProviderEnum fromString(String provider) {
        for (OAuthProviderEnum p : OAuthProviderEnum.values()) {
            if (p.name.equalsIgnoreCase(provider)) {
                return p;
            }
        }
        throw new IllegalArgumentException("Unsupported provider: " + provider);
    }
}
