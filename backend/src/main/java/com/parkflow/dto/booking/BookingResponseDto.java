package com.parkflow.dto.booking;

import com.parkflow.enums.BookingStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class BookingResponseDto {

    private Long id;

    private Long vehicleId;

    private Long parkingLotId;

    private LocalDateTime entryTime;

    private LocalDateTime exitTime;

    private BigDecimal amount;

    private BookingStatus status;
}