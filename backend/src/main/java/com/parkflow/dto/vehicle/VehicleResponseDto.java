package com.parkflow.dto.vehicle;

import com.parkflow.enums.VehicleStatus;
import com.parkflow.enums.VehicleType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VehicleResponseDto {

    private Long id;

    private String vehicleNumber;

    private VehicleType vehicleType;

    private String brand;

    private String model;

    private VehicleStatus status;
}