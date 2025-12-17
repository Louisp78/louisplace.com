package com.louisplace.backend.features.auth.auth_strategy;

import java.util.Map;

public interface IAuthStragegy {
    Map<String, Object> authenticate(String identifier, String credential);

    boolean supports(String strategyType);
}
