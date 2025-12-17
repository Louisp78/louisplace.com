package com.louisplace.backend.features.auth.auth_service;

import com.louisplace.backend.features.auth.OAuthProvider;
import com.louisplace.backend.features.auth.UserEntity;

public interface OAuthStrategy {
    UserEntity authenticate(OAuthProvider provider, String token);
}
