package com.louisplace.backend.features.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.louisplace.backend.features.user.validator.UserEntityValidator;

public class UserEntityValidatorTest {

    UserEntityValidator validator;

    public UserEntityValidatorTest() {
        this.validator = new UserEntityValidator();
    }

    @Test
    @DisplayName("should email valid when classic format")
    void shouldHaveFieldsWellValidated() {
        String email = "example@example.com";
        UserEntity user = new UserEntity();
        user.setEmail(email);

        boolean isValid = validator.validateFields(user);

        assert (isValid);
    }

    @Test
    @DisplayName("should email invalid when missing at symbol")
    void shouldInvalidateEmailWhenMissingAtSymbol() {
        String email = "exampleexample.com";
        UserEntity user = new UserEntity();
        user.setEmail(email);

        boolean isValid = validator.validateFields(user);

        assert (!isValid);
    }

    @Test
    @DisplayName("should email invalid when missing domain")
    void shouldInvalidateEmailWhenMissingDomain() {
        String email = "example@.com";
        UserEntity user = new UserEntity();
        user.setEmail(email);

        boolean isValid = validator.validateFields(user);

        assert (!isValid);
    }

    @Test
    @DisplayName("should email invalid when missing extension")
    void shouldInvalidateEmailWhenMissingExtension() {
        String email = "example@example.";
        UserEntity user = new UserEntity();
        user.setEmail(email);

        boolean isValid = validator.validateFields(user);

        assert (!isValid);
    }

}