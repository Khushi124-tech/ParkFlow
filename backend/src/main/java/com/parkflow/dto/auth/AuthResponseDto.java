package com.parkflow.dto.auth;

import com.parkflow.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {

    private String accessToken;

    private String tokenType;

    private Long expiresIn;

    private Long id;

    private String fullName;

    private String email;

    private Role role;
}