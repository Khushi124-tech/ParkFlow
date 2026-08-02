package com.parkflow.entity;

import com.parkflow.enums.VehicleStatus;
import com.parkflow.enums.VehicleType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "vehicles",
        indexes = {
                @Index(name = "idx_vehicle_app_user", columnList = "app_user_id")
        })
public class Vehicle extends BaseEntity {

    @Column(nullable = false, unique = true, length = 20)
    private String vehicleNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleType vehicleType;

    @Column(nullable = false, length = 50)
    private String brand;

    @Column(nullable = false, length = 50)
    private String model;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id", nullable = false)
    private AppUser appUser;
}