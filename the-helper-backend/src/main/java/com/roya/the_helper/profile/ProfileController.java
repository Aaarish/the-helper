package com.roya.the_helper.profile;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
//@CrossOrigin("*")
public class ProfileController {
    private final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<ProfileEntity> createProfile(@RequestBody ProfileEntity profile) {
        return ResponseEntity.status(HttpStatus.CREATED).body(profileService.createProfile(profile));
    }

    @GetMapping("/open/{profileId}")
    public ResponseEntity<ProfileEntity> getProfile(@PathVariable String profileId) {
        return ResponseEntity.ok(profileService.getProfile(profileId));
    }

    @PutMapping("/{profileId}")
    public ResponseEntity<ProfileEntity> updateProfile(@PathVariable String profileId, @RequestBody ProfileEntity profileData) {
        return ResponseEntity.ok(profileService.updateProfile(profileId, profileData));
    }

    @DeleteMapping("/{profileId}")
    public ResponseEntity<String> deleteProfile(@PathVariable String profileId) {
        profileService.deleteProfile(profileId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Profile deleted successfully");
    }

    @PutMapping("/open")
    public ResponseEntity<List<ProfileEntity>> searchProfile(@RequestBody Map<String, String> filters) {
        return ResponseEntity.ok(profileService.searchProfile(filters));
    }
}
