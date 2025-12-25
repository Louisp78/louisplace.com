package com.louisplace.backend.features.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserUpdateDTO {
    private String firstName;
    private String lastName;
}
