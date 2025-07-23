package com.roya.the_helper.profile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@ToString
public class ProfileEntity {
    @Id
    private String profileId = UUID.randomUUID().toString();
    private String password;

    // functional fields
    private String name;
    private String profession;
    private String locality;
    private String description;
    private Long contact;

    @JsonIgnore
    public String getPassword() {
        return password;
    }
}
