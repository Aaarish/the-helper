package com.roya.the_helper.profile;

import java.util.List;
import java.util.Map;

public interface ProfileService {
    ProfileEntity createProfile(ProfileEntity profile);
    ProfileEntity getProfile(String profileId);
    List<ProfileEntity> searchProfile(Map<String, String> filters);
    ProfileEntity updateProfile(String profileId, ProfileEntity profile);
    void deleteProfile(String profileId);

}
