package com.roya.the_helper.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepo extends JpaRepository<ProfileEntity, String> {
    List<ProfileEntity> findByProfessionAndLocality(String profession, String locality);
    List<ProfileEntity> findByProfession(String profession);
    List<ProfileEntity> findByLocality(String locality);

    List<ProfileEntity> findByName(String name);
}
