package com.hms.model;

public class AuthResponse {
    private String userType;
    private String message;

    // Constructors
    public AuthResponse() {}

    public AuthResponse(String userType, String message) {
        this.userType = userType;
        this.message = message;
    }

    // Getters and Setters
    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
