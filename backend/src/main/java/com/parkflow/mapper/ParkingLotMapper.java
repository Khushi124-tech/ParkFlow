package com.parkflow.mapper;

import com.parkflow.dto.parkinglot.ParkingLotResponseDto;
import com.parkflow.entity.ParkingLot;
import org.springframework.stereotype.Component;

@Component
public class ParkingLotMapper {

    public ParkingLotResponseDto toResponse(ParkingLot parkingLot) {

        if (parkingLot == null) {
            return null;
        }

        ParkingLotResponseDto response = new ParkingLotResponseDto();

        response.setId(parkingLot.getId());
        response.setName(parkingLot.getName());
        response.setAddress(parkingLot.getAddress());
        response.setCity(parkingLot.getCity());
        response.setTotalSlots(parkingLot.getTotalSlots());
        response.setAvailableSlots(parkingLot.getAvailableSlots());
        response.setHourlyRate(parkingLot.getHourlyRate());
        response.setStatus(parkingLot.getStatus());

        return response;
    }
}