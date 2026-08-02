package com.parkflow.dto.vehicle;

import com.parkflow.enums.VehicleType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateVehicleRequestDto {

    @NotBlank(message = "Vehicle number is required")
    @Size(max=20, message="Vehicle number must not exceed 20 characters")
    private String vehicleNumber;

    @NotNull(message = "Vehicle type is required")
    private VehicleType vehicleType;

    @NotBlank(message = "Brand is required")
    @Size(max=50, message = "Brand must not exceed 50 characters")
    private String brand;

    @NotBlank(message = "Model is required")
    @Size(max=50, message = "Model must not exceed 50 characters")
    private String model;
}
