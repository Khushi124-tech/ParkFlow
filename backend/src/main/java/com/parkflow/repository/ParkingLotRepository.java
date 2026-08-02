package com.parkflow.repository;

import com.parkflow.entity.ParkingLot;
import com.parkflow.enums.ParkingLotStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParkingLotRepository extends JpaRepository<ParkingLot, Long> {

    Page<ParkingLot> findByStatus(ParkingLotStatus status, Pageable pageable);

    Optional<ParkingLot> findByIdAndStatus(Long id, ParkingLotStatus status);

}
