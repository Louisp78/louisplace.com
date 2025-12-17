package com.louisplace.backend.features.auth;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
public class UserEntity implements Serializable {
    @Getter
    @Id
    @GeneratedValue
    private Long id;

    @Setter
    @Getter
    @Column(nullable = false)
    private String name;

    @Setter
    @Getter
    @Column(nullable = false)
    private String email;
}
