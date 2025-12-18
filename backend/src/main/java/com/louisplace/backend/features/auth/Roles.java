package com.louisplace.backend.features.auth;

public final class Roles {
    private Roles() {
    }

    // Role names
    public static final String USER = "USER";
    public static final String ADMIN = "ADMIN";

    // Authority names
    public static final String ROLE_USER = "ROLE_" + USER;
    public static final String ROLE_ADMIN = "ROLE_" + ADMIN;
}
