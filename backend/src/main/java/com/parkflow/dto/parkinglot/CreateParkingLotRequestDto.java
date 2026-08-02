package com.parkflow.dto.parkinglot;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class CreateParkingLotRequestDto {

    @NotBlank(message = "Parking lot name is required")
    @Size(min=2, max = 100, message = "Parking lot name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Address is required")
    @Size(min=5, max = 255, message = "Address must be between 5 and 255 characters")
    private String address;

    @NotBlank(message = "City is required")
    @Size(min=2, max = 100, message = "City must be between 2 and 100 characters")
    private String city;

    @NotNull(message = "Total slots are required")
    @Positive(message = "Total slots must be greater than zero")
    private Integer totalSlots;

    @NotNull(message = "Hourly rate is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Hourly rate must be greater than zero")
    private BigDecimal hourlyRate;
}
