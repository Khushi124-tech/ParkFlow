package com.parkflow.dto.parkinglot;

import com.parkflow.enums.ParkingLotStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class ParkingLotResponseDto {

    private Long id;

    private String name;

    private String address;

    private String city;

    private Integer totalSlots;

    private Integer availableSlots;

    private BigDecimal hourlyRate;

    private ParkingLotStatus status;
}
