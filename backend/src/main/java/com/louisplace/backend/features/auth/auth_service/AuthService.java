package com.louisplace.backend.features.auth.auth_service;

import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.louisplace.backend.features.auth.OAuthProvider;
import com.louisplace.backend.features.auth.config.OAuthConfig;

@Service
public class AuthService implements OAuthStrategy {

    private final WebClient webClient;

    private final OAuthConfig oAuthConfig;

    public AuthService(WebClient.Builder webClientBuilder, OAuthConfig oAuthConfig) {
        this.webClient = webClientBuilder.build();
        this.oAuthConfig = oAuthConfig;
    }

    @Override
    public UserModel authenticate(OAuthProvider provider, String code) {

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

        System.out.println("Access Token: " + accessToken);
        return new UserModel();
    }

}
