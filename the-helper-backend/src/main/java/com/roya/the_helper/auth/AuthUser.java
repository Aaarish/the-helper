package com.roya.the_helper.auth;

import com.roya.the_helper.profile.ProfileEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class AuthUser extends ProfileEntity implements UserDetails {
    private final ProfileEntity profile;

    public AuthUser(ProfileEntity profile) {
        this.profile = profile;
    }

    public ProfileEntity getProfile() {
        return profile;
    }

    @Override
    public String getPassword() {
        return profile.getPassword();
    }

    @Override
    public String getUsername() {
        return profile.getUsername();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
