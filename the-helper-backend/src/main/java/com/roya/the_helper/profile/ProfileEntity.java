package com.roya.the_helper.profile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@ToString
public class ProfileEntity {
    @Id
    @JsonProperty("id")
    private String profileId;
    private String username;
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
