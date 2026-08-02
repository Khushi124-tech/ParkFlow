package com.parkflow.controller.vehicle;

import com.parkflow.dto.common.ApiResponse;
import com.parkflow.dto.vehicle.CreateVehicleRequestDto;
import com.parkflow.dto.vehicle.VehicleResponseDto;
import com.parkflow.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<ApiResponse<VehicleResponseDto>> registerVehicle(
            @Valid @RequestBody CreateVehicleRequestDto request) {

        VehicleResponseDto response =
                vehicleService.registerVehicle(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Vehicle registered successfully.",
                        response
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<VehicleResponseDto>>> getMyVehicles(
            Pageable pageable) {

        Page<VehicleResponseDto> response =
                vehicleService.getMyVehicles(pageable);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Vehicles fetched successfully.",
                        response
                )
        );
    }

    @GetMapping("/{vehicleId}")
    public ResponseEntity<ApiResponse<VehicleResponseDto>> getVehicleById(
            @PathVariable Long vehicleId) {

        VehicleResponseDto response =
                vehicleService.getVehicleById(vehicleId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Vehicle fetched successfully.",
                        response
                )
        );
    }

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<ApiResponse<Void>> deleteVehicle(
            @PathVariable Long vehicleId) {

        vehicleService.deleteVehicle(vehicleId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Vehicle deleted successfully.",
                        null
                )
        );
    }
}
