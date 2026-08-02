package com.parkflow.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateUserRequestDto {

    @NotBlank(message = "Full name is required")
    @Size(max = 100)
    private String fullName;
}