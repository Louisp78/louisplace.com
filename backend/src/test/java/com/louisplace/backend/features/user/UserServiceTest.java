package com.louisplace.backend.features.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserService Tests")
public class UserServiceTest {

    @Mock
    private IUserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Nested
    @DisplayName("UserService Tests")
    class UserServiceTests {

        @Test
        @DisplayName("Should successfully retrieve user by email")
        void shouldRetrieveUserByEmail() {
            // Given
            String email = "test@example.com";
            String firstName = "FirstName";
            String lastName = "LastName";
            String username = "username";
            UserEntity mockUser = new UserEntity();
            mockUser.setEmail(email);
            mockUser.setFirstName(firstName);
            mockUser.setLastName(lastName);
            mockUser.setUsername(username);

            when(userRepository.findByEmail(email))
                    .thenReturn(java.util.Optional.of(mockUser));

            // When
            UserEntity user = userService.getUserInfo();

            // Then
            assertNotNull(user);
            assertEquals(email, user.getEmail());
            assertEquals(firstName, user.getFirstName());
            assertEquals(lastName, user.getLastName());
            assertEquals(username, user.getUsername());
        }
    }
}
