package com.louisplace.backend.features.user;

import org.springframework.data.repository.Repository;

import com.louisplace.backend.features.auth.UserEntity;

public interface IUserRepository extends Repository<UserEntity, Long> {
    UserEntity findById(String name);

    UserEntity save(UserEntity user);
}
