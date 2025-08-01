package com.roya.the_helper.auth;

import lombok.Builder;
import lombok.Data;

public class AuthDto {
    @Data
    @Builder
    public static class AuthRequest {
        private String username;
        private String password;
    }

    @Data
    @Builder
    public static class RegisterRequest {
        private String name;
        private String password;
        private String profession;
        private String locality;
        private String description;
        private Long contact;
    }

    @Data
    @Builder
    public static class AuthResponse {
        private String token;
        private String userId;
    }

}
