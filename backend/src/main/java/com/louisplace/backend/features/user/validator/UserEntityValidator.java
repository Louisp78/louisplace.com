package com.louisplace.backend.features.user.validator;

import org.springframework.stereotype.Service;

import com.louisplace.backend.features.user.UserEntity;

@Service
public class UserEntityValidator implements IUserEntityValidator {

    public boolean validateFields(UserEntity user) {
        return validateEmail(user.getEmail());
    }

    private boolean validateEmail(String email) {
        return true;
    }

}
