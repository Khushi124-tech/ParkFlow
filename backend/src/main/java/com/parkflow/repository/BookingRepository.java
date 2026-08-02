package com.parkflow.repository;

import com.parkflow.entity.AppUser;
import com.parkflow.entity.Booking;
import com.parkflow.entity.Vehicle;
import com.parkflow.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByIdAndAppUser(
            Long id,
            AppUser appUser
    );

    Optional<Booking> findByIdAndStatus(
            Long id,
            BookingStatus status
    );

    Page<Booking> findByAppUserAndStatus(
            AppUser appUser,
            BookingStatus status,
            Pageable pageable
    );
};
