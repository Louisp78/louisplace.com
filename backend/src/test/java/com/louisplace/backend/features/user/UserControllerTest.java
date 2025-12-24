package com.louisplace.backend.features.user;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.louisplace.backend.features.auth.session_service.SessionService;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    UserService userService;

    @Mock
    SessionService sessionService;

    @InjectMocks
    UserController userController;

    @Test
    @DisplayName("should expose get current user profile endpoint")
    void shouldExposeGetUserProfileEndpoint() {
        ResponseEntity<UserDTO> response = userController.getUserInfos();

        Assertions.assertEquals(HttpStatus.ACCEPTED, response.getStatusCode().value());
    }

    @Test
    @DisplayName("should reject get current user profile when unauthenticated")
    void shouldGetUserProfileEndpointProtected() {
        when(sessionService.getPrincipal()).thenReturn(null);

        ResponseEntity<UserDTO> response = userController.getUserInfos();

        Assertions.assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode().value());
    }

    @Test
    @DisplayName("should update current user profile given valid data for authenticated user")
    void shouldExposeUpdateUserProfileEndpoint() {
        UserUpdateDTO updateUserDto = new UserUpdateDTO("First", "Last", "username", "email@example.com");

        when(sessionService.getPrincipal()).thenReturn("email@example.com");

        ResponseEntity<UserDTO> response = userController.updateUserInfos(updateUserDto);

        Assertions.assertEquals(HttpStatus.ACCEPTED, response.getStatusCode().value());
        Assertions.assertNotNull(response.getBody());
    }

    @Test
    @DisplayName("should reject update current user profile endpoint for unauthenticated user")
    void shouldUpdateUserProfileEndpointProtected() {
        UserUpdateDTO updateUserDto = new UserUpdateDTO("First", "Last", "username", "email@example.com");

        when(sessionService.getPrincipal()).thenReturn(null);

        ResponseEntity<UserDTO> response = userController.updateUserInfos(updateUserDto);

        Assertions.assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode().value());
    }

}
