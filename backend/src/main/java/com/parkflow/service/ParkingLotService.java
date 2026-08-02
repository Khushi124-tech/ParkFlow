package com.parkflow.service;

import com.parkflow.dto.parkinglot.CreateParkingLotRequestDto;
import com.parkflow.dto.parkinglot.ParkingLotResponseDto;
import com.parkflow.entity.ParkingLot;
import com.parkflow.enums.ParkingLotStatus;
import com.parkflow.exception.ErrorCodes;
import com.parkflow.exception.ResourceNotFoundException;
import com.parkflow.mapper.ParkingLotMapper;
import com.parkflow.repository.ParkingLotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ParkingLotService {

    private final ParkingLotRepository parkingLotRepository;
    private final ParkingLotMapper parkingLotMapper;

    public ParkingLotResponseDto createParkingLot(
            CreateParkingLotRequestDto request) {

        ParkingLot parkingLot = new ParkingLot();

        parkingLot.setName(request.getName().trim().replaceAll("\\s+"," "));
        parkingLot.setAddress(request.getAddress().trim().replaceAll("\\s+"," "));
        parkingLot.setCity(request.getCity().trim().replaceAll("\\s+"," "));

        parkingLot.setTotalSlots(request.getTotalSlots());
        parkingLot.setAvailableSlots(request.getTotalSlots());

        parkingLot.setHourlyRate(request.getHourlyRate());

        parkingLot.setStatus(ParkingLotStatus.ACTIVE);

        parkingLot = parkingLotRepository.save(parkingLot);

        return parkingLotMapper.toResponse(parkingLot);
    }

    public Page<ParkingLotResponseDto> getParkingLots(
            Pageable pageable) {

        return parkingLotRepository
                .findByStatus(
                        ParkingLotStatus.ACTIVE,
                        pageable
                )
                .map(parkingLotMapper::toResponse);
    }

    public ParkingLotResponseDto getParkingLotById(
            Long parkingLotId) {

        ParkingLot parkingLot = parkingLotRepository
                .findByIdAndStatus(
                        parkingLotId,
                        ParkingLotStatus.ACTIVE
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Parking lot not found.",
                                ErrorCodes.PARKING_LOT_NOT_FOUND
                        ));

        return parkingLotMapper.toResponse(parkingLot);
    }

    public void deleteParkingLot(
            Long parkingLotId) {

        ParkingLot parkingLot = parkingLotRepository
                .findByIdAndStatus(
                        parkingLotId,
                        ParkingLotStatus.ACTIVE
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Parking lot not found.",
                                ErrorCodes.PARKING_LOT_NOT_FOUND
                        ));

        parkingLot.setStatus(ParkingLotStatus.INACTIVE);

        parkingLotRepository.save(parkingLot);
    }
}