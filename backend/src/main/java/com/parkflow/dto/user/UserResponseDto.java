package com.parkflow.dto.user;

import com.parkflow.enums.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {

    private Long id;

    private String fullName;

    private String email;

    private Role role;
}