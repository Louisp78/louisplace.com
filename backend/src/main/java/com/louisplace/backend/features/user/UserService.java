package com.louisplace.backend.features.user;

import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

    IUserRepository userRepository;

    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity getUserInfo(String identifier) {
        UserEntity user = userRepository.findByEmail(identifier).orElse(null);
        return user;
    }

    public UserEntity updateUserInfo(UserUpdateDTO dataToUpdate, String identifier) {
        return new UserEntity();
    }

}
