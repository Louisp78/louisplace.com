package com.louisplace.backend.features.user;

import java.util.Optional;

import org.springframework.data.repository.Repository;

import com.louisplace.backend.features.auth.UserEntity;

public interface IUserRepository extends Repository<UserEntity, Long> {
    Optional<UserEntity> findById(Long id);

    Optional<UserEntity> findByEmail(String email);

    UserEntity save(UserEntity user);
}
