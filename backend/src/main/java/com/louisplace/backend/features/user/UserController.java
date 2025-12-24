package com.louisplace.backend.features.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.louisplace.backend.features.auth.session_service.SessionService;

@RestController
@RequestMapping("/users")
public class UserController {

    SessionService sessionService;

    UserService userService;

    public UserController(SessionService sessionService, UserService userService) {
        this.sessionService = sessionService;
        this.userService = userService;
    }

    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateUserInfos(UserUpdateDTO dataToUpdate) {
        String email = sessionService.getPrincipal();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getUserInfos() {
        String email = sessionService.getPrincipal();
        UserEntity user = userService.getUserInfo(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        UserDTO userDTO = new UserDTO(user);

        return ResponseEntity.ok().body(userDTO);
    }

}
