package com.parkflow.repository;

import com.parkflow.entity.ParkingLot;
import com.parkflow.enums.ParkingLotStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingLotRepository extends JpaRepository<ParkingLot, Long> {

    Page<ParkingLot> findByStatus(ParkingLotStatus status, Pageable pageable);

}
