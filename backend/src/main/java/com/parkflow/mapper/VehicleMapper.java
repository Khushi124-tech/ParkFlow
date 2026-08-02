package com.parkflow.mapper;

import com.parkflow.dto.vehicle.VehicleResponseDto;
import com.parkflow.entity.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class VehicleMapper {

    public VehicleResponseDto toResponse(Vehicle vehicle) {

        if (vehicle == null) {
            return null;
        }

        VehicleResponseDto response = new VehicleResponseDto();

        response.setId(vehicle.getId());
        response.setVehicleNumber(vehicle.getVehicleNumber());
        response.setVehicleType(vehicle.getVehicleType());
        response.setBrand(vehicle.getBrand());
        response.setModel(vehicle.getModel());
        response.setStatus(vehicle.getStatus());

        return response;
    }
}