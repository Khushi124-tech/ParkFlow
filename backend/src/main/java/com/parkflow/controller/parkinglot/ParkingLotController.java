package com.parkflow.controller.parkinglot;

import com.parkflow.dto.common.ApiResponse;
import com.parkflow.dto.parkinglot.CreateParkingLotRequestDto;
import com.parkflow.dto.parkinglot.ParkingLotResponseDto;
import com.parkflow.service.ParkingLotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.web.PageableDefault;
@RestController
@RequestMapping("/api/v1/parking-lots")
@RequiredArgsConstructor
public class ParkingLotController {

    private final ParkingLotService parkingLotService;

    @PostMapping
    public ResponseEntity<ApiResponse<ParkingLotResponseDto>> createParkingLot(
            @Valid @RequestBody CreateParkingLotRequestDto request) {

        ParkingLotResponseDto response =
                parkingLotService.createParkingLot(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Parking lot created successfully.",
                        response
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ParkingLotResponseDto>>> getParkingLots(
            @PageableDefault(size = 10, sort = "id")
            Pageable pageable) {

        Page<ParkingLotResponseDto> response =
                parkingLotService.getParkingLots(pageable);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Parking lots fetched successfully.",
                        response
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ParkingLotResponseDto>> getParkingLotById(
            @PathVariable Long id) {

        ParkingLotResponseDto response =
                parkingLotService.getParkingLotById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Parking lot fetched successfully.",
                        response
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteParkingLot(
            @PathVariable Long id) {

        parkingLotService.deleteParkingLot(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Parking lot deleted successfully.",
                        null
                )
        );
    }
}
