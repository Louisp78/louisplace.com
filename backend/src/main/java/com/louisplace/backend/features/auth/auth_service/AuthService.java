package com.louisplace.backend.features.auth.auth_service;

import org.springframework.stereotype.Service;

import com.louisplace.backend.features.auth.UserEntity;
import com.louisplace.backend.features.auth.auth_strategy.AuthUserInfoDTO;
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
        AuthUserInfoDTO userInfo = strategy.authenticate(identifier, credential);

        String firstName = userInfo.getFirstName();
        String lastName = userInfo.getLastName();
        String username = userInfo.getUsername();
        String email = userInfo.getEmail();
        UserEntity user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    UserEntity newUser = new UserEntity();
                    newUser.setFirstName(firstName);
                    newUser.setLastName(lastName);
                    newUser.setUsername(username);
                    newUser.setEmail(email);
                    UserEntity savedUser = userRepository.save(newUser);
                    return savedUser;
                });

        return user;
    }

}
