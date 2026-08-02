package com.parkflow.repository;

import com.parkflow.entity.AppUser;
import com.parkflow.entity.Booking;
import com.parkflow.entity.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByBooking(Booking booking);

    Page<Payment> findByBooking_AppUserOrderByCreatedAtDesc(AppUser appUser, Pageable pageable);

    Optional<Payment> findByIdAndBooking_AppUser(
            Long id,
            AppUser appUser
    );
}
