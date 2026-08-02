package com.parkflow.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegisterRequestDto {

    @NotBlank(message = "Full name is required")
    @Size(
            min = 2,
            max = 100,
            message = "Full name must be between 2 and 100 characters"
    )
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(
            max = 100,
            message = "Email must not exceed 100 characters"
    )
    private String email;

    @NotBlank(message = "Password is required")
    @Size(
            min = 8,
            max = 255,
            message = "Password must be between 8 and 255 characters"
    )
    private String password;
}
