package com.louisplace.backend.features.auth.auth_service;

import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.louisplace.backend.features.auth.OAuthProvider;
import com.louisplace.backend.features.auth.UserEntity;
import com.louisplace.backend.features.auth.config.OAuthConfig;
import com.louisplace.backend.features.user.IUserRepository;

@Service
public class AuthService implements OAuthStrategy {

    private final WebClient webClient;

    private final OAuthConfig oAuthConfig;

    private final IUserRepository userRepository;

    public AuthService(WebClient.Builder webClientBuilder,
            OAuthConfig oAuthConfig,
            IUserRepository userRepository) {
        this.webClient = webClientBuilder.build();
        this.oAuthConfig = oAuthConfig;
        this.userRepository = userRepository;
    }

    @Override
    public UserEntity authenticate(OAuthProvider provider, String code) {

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("code", code);
        formData.add("client_id", oAuthConfig.getClientId(provider.getName()));
        formData.add("client_secret", oAuthConfig.getClientSecret(provider.getName()));
        formData.add("redirect_uri", oAuthConfig.getRedirectUri(provider.getName()));
        formData.add("grant_type", "authorization_code");

        Map tokenResponse = webClient.post()
                .uri(provider.getTokenUrl())
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        String accessToken = (String) tokenResponse.get("access_token");

        Map userInfo = webClient.get()
                .uri(provider.getUserInfoUrl())
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        String name = (String) userInfo.get("name");
        String email = (String) userInfo.get("email");

        UserEntity user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    UserEntity newUser = new UserEntity();
                    newUser.setName(name);
                    newUser.setEmail(email);
                    userRepository.save(newUser);
                    return newUser;
                });

        return user;
    }

}
