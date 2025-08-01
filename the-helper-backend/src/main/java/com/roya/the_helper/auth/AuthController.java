package com.roya.the_helper.auth;

import com.roya.the_helper.profile.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthDto.AuthResponse> login(@RequestBody AuthDto.AuthRequest authRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.authenticate(authRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthDto.AuthResponse> signup(@RequestBody AuthDto.RegisterRequest registerRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(registerRequest));
    }

    @GetMapping("/authenticated-user")
    public ResponseEntity<ProfileEntity> getAuthenticatedUser () {
        return ResponseEntity.ok(authService.getAuthenticatedUser());
    }

}

