package com.louisplace.backend.features.auth.auth_service;

import com.louisplace.backend.features.auth.OAuthProvider;

public interface OAuthStrategy {
    UserModel authenticate(OAuthProvider provider, String token);
}
