package com.OTT_Platform.DTO;

public class UserProfileDTO {

    private String name;
    private String email;

    public UserProfileDTO(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
