package com.louisplace.backend.features.auth.auth_service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.louisplace.backend.features.auth.UserEntity;
import com.louisplace.backend.features.auth.auth_strategy.IAuthStragegy;
import com.louisplace.backend.features.user.IUserRepository;

@Service
public class AuthService implements IAuthProvider {

    private final IUserRepository userRepository;
    private final IAuthStragegy strategy;

    public AuthService(IUserRepository userRepository, IAuthStragegy strategy) {
        this.userRepository = userRepository;
        this.strategy = strategy;
    }

    @Override
    public UserEntity authenticate(String identifier, String credential) {
        Map<String, Object> userInfo = strategy.authenticate(identifier, credential);

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
