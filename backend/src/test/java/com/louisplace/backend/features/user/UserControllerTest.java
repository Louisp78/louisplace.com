package com.louisplace.backend.features.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webclient.test.autoconfigure.AutoConfigureWebClient;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureWebClient
public class UserControllerTest {

    UserController userController;

    public UserControllerTest() {
        this.userController = new UserController();
    }

    @Test
    @DisplayName("should expose get current user profile endpoint")
    void shouldExposeGetUserProfileEndpoint() {
        ResponseEntity<UserDTO> response = userController.getUserInfos();

        Assertions.assertEquals(200, response.getStatusCode().value());
    }

    @Test
    @DisplayName("should get current user profile endpoint being protected according to user identity")
    void shouldGetUserProfileEndpointProtected() {
    }

    @Test
    @DisplayName("should expose update current user profile endpoint")
    void shouldExposeUpdateUserProfileEndpoint() {
        UserUpdateDTO updateUserDto = new UserUpdateDTO("First", "Last", "username", "email@example.com");

        ResponseEntity<UserDTO> response = userController.updateUserInfos(updateUserDto);

        Assertions.assertEquals(200, response.getStatusCode().value());
        Assertions.assertNotNull(response.getBody());
    }

    @Test
    @DisplayName("should update current user profile endpoint being protected according to user identity")
    void shouldUpdateUserProfileEndpointProtected(@Autowired MockMvc mvc) throws Exception {

        // use mockmvc with security context to test protection
        mvc.perform(MockMvcRequestBuilders.put("/users/me").contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

}
