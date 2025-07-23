package com.roya.the_helper.profile;

import com.roya.the_helper.common.SearchFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepo profileRepo;

    @Override
    public ProfileEntity createProfile(ProfileEntity profile) {
        ProfileEntity profileEntity = ProfileEntity.builder()
                .profileId(profile.getProfileId())
                .password(profile.getPassword())
                .name(profile.getName())
                .profession(profile.getProfession())
                .locality(profile.getLocality())
                .description(profile.getDescription())
                .contact(profile.getContact())
                .build();

        return profileRepo.save(profileEntity);
    }

    @Override
    public ProfileEntity getProfile(String profileId) {
        return profileRepo.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found with id: " + profileId));
    }

    @Override
    public List<ProfileEntity> searchProfile(Map<Integer, String> filters) {
        String profession = null;
        String locality = null;
        String name = null;

        for (Map.Entry<Integer, String> filter : filters.entrySet()) {
            int filterId = filter.getKey();
            String filterValue = filter.getValue();

            if (filterId == SearchFilter.NAME.getFilterId()) {
                name = filterValue;
            } else if (filterId == SearchFilter.PROFESSION.getFilterId()) {
                profession = filterValue;
            } else if (filterId == SearchFilter.LOCALITY.getFilterId()) {
                locality = filterValue;
            }
        }

        if (name != null) {
            return profileRepo.findByName(name);
        } else if (profession != null && locality != null) {
            return profileRepo.findByProfessionAndLocality(profession, locality);
        } else if (profession != null) {
            return profileRepo.findByProfession(profession);
        } else if (locality != null) {
            return profileRepo.findByLocality(locality);
        } else {
            return profileRepo.findAll();
        }
    }

    @Override
    public ProfileEntity updateProfile(String profileId, ProfileEntity profileData) {
        ProfileEntity originalProfile = profileRepo.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found with id: " + profileId));

        if (profileData.getProfession() != null) originalProfile.setProfession(profileData.getProfession());
        if (profileData.getContact() != null) originalProfile.setContact(profileData.getContact());
        if (profileData.getLocality() != null) originalProfile.setLocality(profileData.getLocality());
        if (profileData.getDescription() != null) originalProfile.setDescription(profileData.getDescription());

        return profileRepo.save(originalProfile);
    }

    @Override
    public void deleteProfile(String profileId) {
        ProfileEntity profileEntity = profileRepo.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found with id: " + profileId));

        profileRepo.delete(profileEntity);
    }
}
