package com.parkflow.service;

import com.parkflow.dto.vehicle.CreateVehicleRequestDto;
import com.parkflow.dto.vehicle.VehicleResponseDto;
import com.parkflow.entity.AppUser;
import com.parkflow.entity.Vehicle;
import com.parkflow.enums.VehicleStatus;
import com.parkflow.exception.ConflictException;
import com.parkflow.exception.ErrorCodes;
import com.parkflow.exception.ResourceNotFoundException;
import com.parkflow.mapper.VehicleMapper;
import com.parkflow.repository.VehicleRepository;
import com.parkflow.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final VehicleMapper vehicleMapper;

    public VehicleResponseDto registerVehicle(CreateVehicleRequestDto request) {

        String vehicleNumber = request.getVehicleNumber()
                .trim()
                .toUpperCase(Locale.ROOT);

        if (vehicleRepository.existsByVehicleNumberAndStatus(
                vehicleNumber,
                VehicleStatus.ACTIVE
        )) {
            throw new ConflictException(
                    "Vehicle already exists.",
                    ErrorCodes.VEHICLE_ALREADY_EXISTS
            );
        }

        AppUser appUser = getCurrentUser();

        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleNumber(vehicleNumber);
        vehicle.setVehicleType(request.getVehicleType());
        vehicle.setBrand(request.getBrand().trim());
        vehicle.setModel(request.getModel().trim());
        vehicle.setStatus(VehicleStatus.ACTIVE);
        vehicle.setAppUser(appUser);

        vehicle = vehicleRepository.save(vehicle);

        return vehicleMapper.toResponse(vehicle);
    }

    public Page<VehicleResponseDto> getMyVehicles(Pageable pageable) {

        AppUser appUser = getCurrentUser();

        return vehicleRepository.findByAppUserAndStatus(
                        appUser,
                        VehicleStatus.ACTIVE,
                        pageable
                )
                .map(vehicleMapper::toResponse);
    }

    public VehicleResponseDto getVehicleById(Long vehicleId) {

        AppUser appUser = getCurrentUser();

        Vehicle vehicle = vehicleRepository
                .findByIdAndAppUserAndStatus(
                        vehicleId,
                        appUser,
                        VehicleStatus.ACTIVE
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found.",
                                ErrorCodes.VEHICLE_NOT_FOUND
                        ));

        return vehicleMapper.toResponse(vehicle);
    }

    public void deleteVehicle(Long vehicleId) {

        AppUser appUser = getCurrentUser();

        Vehicle vehicle = vehicleRepository
                .findByIdAndAppUserAndStatus(
                        vehicleId,
                        appUser,
                        VehicleStatus.ACTIVE
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found.",
                                ErrorCodes.VEHICLE_NOT_FOUND
                        ));

        vehicle.setStatus(VehicleStatus.INACTIVE);

        vehicleRepository.save(vehicle);
    }

    private AppUser getCurrentUser() {

        return ((CustomUserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal())
                .getAppUser();
    }
}