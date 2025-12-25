package com.louisplace.backend.features.user;

import java.util.Optional;

public interface IUserService {
    UserEntity getUserInfo(String identifier);

    Optional<UserEntity> updateUserInfo(String identifier, UserUpdateDTO dataToUpdate);
}
