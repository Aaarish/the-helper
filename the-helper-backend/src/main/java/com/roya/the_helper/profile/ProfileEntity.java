package com.roya.the_helper.profile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProfileEntity {
    @Id
    @JsonProperty("id")
    @Column(name="profile_id", nullable = false, unique = true, updatable = false)
    private String profileId;

    @Column(name="username", nullable = false, unique = true)
    private String username;

    @Column(name="password", nullable = false)
    private String password;

    // functional fields
    @Column(name="name", nullable = false)
    private String name;

    @Column(name="profession", nullable = false)
    private String profession;

    @Column(name="locality", nullable = false)
    private String locality;

    @Column(name="description", nullable = false)
    private String description;

    @Column(name="contact", nullable = false)
    private Long contact;

    @JsonIgnore
    public String getPassword() {
        return password;
    }
}
