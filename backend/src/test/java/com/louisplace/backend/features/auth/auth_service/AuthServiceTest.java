package com.louisplace.backend.features.auth.auth_service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.louisplace.backend.features.auth.UserEntity;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService Tests")
class AuthServiceTest {

    @InjectMocks
    private AuthService authService;

    // Mock dependencies that will be needed for OAuth flow
    // TODO: Add mocks for OAuth client, user repository, etc.

    @BeforeEach
    void setUp() {
        // Setup common test data
    }

    @Nested
    @DisplayName("OAuth Code Flow Tests")
    class OAuthCodeFlowTests {

        @Test
        @DisplayName("Should successfully authenticate with Google provider")
        void shouldAuthenticateWithGoogle() {
            // Given
            String authorizationCode = "google_auth_code_123";

            // When
            UserEntity user = authService.authenticate("OAUTH", "google", authorizationCode);

            // Then
            assertNotNull(user);
            assertNotNull(user.getName());
            assertNotNull(user.getEmail());
        }

        @Test
        @DisplayName("Should successfully authenticate with GitHub provider")
        void shouldAuthenticateWithGitHub() {
            // Given
            String authorizationCode = "github_auth_code_456";

            // When
            UserEntity result = authService.authenticate("OAUTH", "github", authorizationCode);

            // Then
            assertNotNull(result);
            assertNotNull(result.getId());
            assertNotNull(result.getName());
        }

    }
}
