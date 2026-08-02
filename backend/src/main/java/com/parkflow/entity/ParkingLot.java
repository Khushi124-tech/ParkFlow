package com.parkflow.entity;

import com.parkflow.enums.ParkingLotStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "parking_lots",
        indexes = {
                @Index(name = "idx_parking_lot_city", columnList = "city"),
                @Index(name = "idx_parking_lot_status", columnList = "status")
        })
public class ParkingLot extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false)
    private Integer totalSlots;

    @Column(nullable = false)
    private Integer availableSlots;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal hourlyRate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ParkingLotStatus status;
}