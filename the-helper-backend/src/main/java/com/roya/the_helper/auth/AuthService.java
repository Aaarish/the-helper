package com.roya.the_helper.auth;

import com.roya.the_helper.profile.ProfileEntity;
import com.roya.the_helper.profile.ProfileRepo;
import com.roya.the_helper.profile.ProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    private final ProfileService profileService;
    private final ProfileRepo profileRepo;

    public AuthDto.AuthResponse authenticate(AuthDto.AuthRequest authRequest) {
        ProfileEntity profile = profileService.getProfile(authRequest.getUsername());
        return authenticate(authRequest, profile);
    }

    public AuthDto.AuthResponse register(AuthDto.RegisterRequest registerRequest) {
        ProfileEntity profileRequest = createProfileRequest(registerRequest);
        ProfileEntity profile = profileService.createProfile(profileRequest);

        return this.authenticate(AuthDto.AuthRequest.builder()
                .username(profile.getUsername())
                .password(registerRequest.getPassword())
                .build(), profile);
    }

    private ProfileEntity createProfileRequest(AuthDto.RegisterRequest registerRequest) {
        return ProfileEntity.builder()
                .profileId(UUID.randomUUID().toString())
                .username(registerRequest.getName()+"."+registerRequest.getContact())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .name(registerRequest.getName())
                .locality(registerRequest.getLocality())
                .profession(registerRequest.getProfession())
                .contact(registerRequest.getContact())
                .description(registerRequest.getDescription())
                .build();
    }

    public ProfileEntity getAuthenticatedUser () {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<ProfileEntity> user = profileRepo.findById(username);

        if (user.isEmpty()) throw new RuntimeException("Something is messed up in auth logic !!!");

        return user.get();
    }

    private AuthDto.AuthResponse authenticate(AuthDto.AuthRequest authRequest, ProfileEntity profile) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        String token = jwtUtil.generateToken(authentication);

        return AuthDto.AuthResponse.builder()
                .token(token)
                .userId(profile.getProfileId())
                .build();
    }
}

