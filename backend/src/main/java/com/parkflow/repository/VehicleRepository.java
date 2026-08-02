package com.parkflow.repository;

import com.parkflow.entity.AppUser;
import com.parkflow.entity.Vehicle;
import com.parkflow.enums.VehicleStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Page<Vehicle> findByAppUserAndStatus(AppUser appUser, VehicleStatus status, Pageable pageable);

    boolean existsByVehicleNumberAndStatus(String vehicleNumber, VehicleStatus status);

    Optional<Vehicle> findByIdAndAppUserAndStatus(Long id, AppUser appUser, VehicleStatus status);

}
