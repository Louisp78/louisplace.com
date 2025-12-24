package com.louisplace.backend.features.user;

public interface IUserService {
    UserEntity getUserInfo(String identifier);

    UserEntity updateUserInfo(UserUpdateDTO dataToUpdate, String identifier);
}
