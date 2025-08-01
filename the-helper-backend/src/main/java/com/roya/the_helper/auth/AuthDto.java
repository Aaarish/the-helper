package com.roya.the_helper.auth;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

public class AuthDto {
    @Data
    @Builder
    public static class AuthRequest {
        @NotNull
        private String username;

        @NotNull
        private String password;
    }

    @Data
    @Builder
    public static class RegisterRequest {
        @NotNull
        private String name;

        @NotNull
        private String password;

        @NotNull
        private String profession;

        @NotNull
        private String locality;

        @NotNull
        private Long contact;

        private String description;
    }

    @Data
    @Builder
    public static class AuthResponse {
        private String token;
        private String userId;
    }

}
