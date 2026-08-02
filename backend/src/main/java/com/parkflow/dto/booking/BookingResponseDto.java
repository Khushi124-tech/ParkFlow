package com.parkflow.dto.booking;

import com.parkflow.enums.BookingStatus;
import com.parkflow.enums.PaymentStatus;
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

    private String vehicleNumber;

    private Long parkingLotId;

    private String parkingLotName;

    private LocalDateTime entryTime;

    private LocalDateTime exitTime;

    private BigDecimal totalAmount;

    private BookingStatus status;
}