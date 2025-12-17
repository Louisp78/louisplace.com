package com.louisplace.backend.features.auth.auth_service;

import com.louisplace.backend.features.auth.UserEntity;

public interface IAuthProvider {
    UserEntity authenticate(String strategyType, String identifier, String credential);
}
