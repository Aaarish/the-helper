package com.roya.the_helper.profile;

import com.roya.the_helper.common.SearchFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepo profileRepo;

    @Override
    public ProfileEntity createProfile(ProfileEntity profile) {
        log.info("request received to create a new profile with data: {}", profile);

        if (!isProfileDataValid(profile)) throw new RuntimeException("Invalid profile data");

        ProfileEntity profileEntity = ProfileEntity.builder()
                .profileId(profile.getProfileId())
                .password(profile.getPassword())
                .name(profile.getName().toLowerCase())
                .profession(profile.getProfession().toLowerCase())
                .locality(profile.getLocality().toLowerCase())
                .description(profile.getDescription().toLowerCase())
                .contact(profile.getContact())
                .build();

        log.info("creating profile with profile id: {}", profileEntity.getProfileId());
        return profileRepo.save(profileEntity);
    }

    private boolean isProfileDataValid(ProfileEntity profile) {
        if (profile.getContact().toString().length() != 10) {
            return false;
        }

        return true;
    }

    @Override
    public ProfileEntity getProfile(String profileId) {
        return profileRepo.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found with id: " + profileId));
    }

    @Override
    public List<ProfileEntity> searchProfile(Map<String, String> filters) {
        String profession = null;
        String locality = null;
        String name = null;

        for (Map.Entry<String, String> filter : filters.entrySet()) {
            int filterId = Integer.parseInt(filter.getKey());
            String filterValue = filter.getValue();
            log.debug("filter id: {}, filter value: {} in the search query", filterId, filterValue);

            if (filterId == SearchFilter.NAME.getFilterId()) {
                name = filterValue.toLowerCase();
            } else if (filterId == SearchFilter.PROFESSION.getFilterId()) {
                profession = filterValue.toLowerCase();
            } else if (filterId == SearchFilter.LOCALITY.getFilterId()) {
                locality = filterValue.toLowerCase();
            }
        }

        log.info("searching profiles with filters - name: {}, profession: {}, locality: {}", name, profession, locality);

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

        log.info("updating profile with profile id: {} with data: {}", profileId, profileData);

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

        log.info("deleting profile with profile id: {}", profileId);
        profileRepo.delete(profileEntity);
    }
}
