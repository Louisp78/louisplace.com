package com.louisplace.backend.features.auth.auth_service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.louisplace.backend.features.auth.UserEntity;
import com.louisplace.backend.features.auth.auth_strategy.IAuthStragegy;
import com.louisplace.backend.features.user.IUserRepository;

@Service
public class AuthService implements IAuthProvider {

    private final IUserRepository userRepository;
    private final List<IAuthStragegy> strategies;

    public AuthService(IUserRepository userRepository, List<IAuthStragegy> strategies) {
        this.userRepository = userRepository;
        this.strategies = strategies;
    }

    @Override
    public UserEntity authenticate(String strategyType, String identifier, String credential) {
        IAuthStragegy strategy = strategies.stream()
                .filter(s -> s.supports(strategyType))
                .findFirst()
                .orElseThrow(
                        () -> new IllegalArgumentException("Unsupported authentication strategy: " + strategyType));

        Map<String, Object> userInfo = strategy.authenticate(identifier, identifier);

        String name = (String) userInfo.get("name");
        String email = (String) userInfo.get("email");
        UserEntity user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    UserEntity newUser = new UserEntity();
                    newUser.setName(name);
                    newUser.setEmail(email);
                    userRepository.save(newUser);
                    return newUser;
                });

        return user;
    }

}
