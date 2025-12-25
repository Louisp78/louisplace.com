package com.louisplace.backend.features.user;

import org.springframework.stereotype.Service;

import com.louisplace.backend.features.user.validator.UserEntityValidator;

@Service
public class UserService implements IUserService {

    IUserRepository userRepository;
    UserEntityValidator userEntityValidator;

    public UserService(IUserRepository userRepository, UserEntityValidator userEntityValidator) {
        this.userRepository = userRepository;
        this.userEntityValidator = userEntityValidator;
    }

    public UserEntity getUserInfo(String identifier) {
        UserEntity user = userRepository.findByEmail(identifier).orElse(null);
        return user;
    }

    public UserEntity updateUserInfo(UserUpdateDTO dataToUpdate, String identifier) {
        UserEntity user = this.getUserInfo(identifier);
        if (user == null) {
            return null;
        }

        if (!userEntityValidator.validateFields(user)) {
            return null;
        }
        return new UserEntity();
    }

}
