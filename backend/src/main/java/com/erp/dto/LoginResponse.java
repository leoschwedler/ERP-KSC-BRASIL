package com.erp.dto;

import com.erp.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;
    private String token;
    private String tokenType;

    public LoginResponse(Long id, String name, String email, Role role, String token) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.token = token;
        this.tokenType = "Bearer";
    }
}
