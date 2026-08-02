package com.parkflow.repository;

import com.parkflow.entity.AppUser;
import com.parkflow.entity.Booking;
import com.parkflow.entity.Vehicle;
import com.parkflow.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    Page<Booking> findByAppUser(AppUser appUser, Pageable pageable);

    boolean existsByVehicleAndStatus(Vehicle vehicle, BookingStatus status);
};
