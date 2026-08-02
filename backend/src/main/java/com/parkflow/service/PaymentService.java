package com.parkflow.service;

import com.parkflow.dto.payment.PaymentRequestDto;
import com.parkflow.dto.payment.PaymentResponseDto;
import com.parkflow.entity.AppUser;
import com.parkflow.entity.Booking;
import com.parkflow.entity.Payment;
import com.parkflow.enums.BookingStatus;
import com.parkflow.enums.PaymentStatus;
import com.parkflow.exception.ConflictException;
import com.parkflow.exception.ErrorCodes;
import com.parkflow.exception.ResourceNotFoundException;
import com.parkflow.mapper.PaymentMapper;
import com.parkflow.repository.BookingRepository;
import com.parkflow.repository.PaymentRepository;
import com.parkflow.security.CustomUserDetails;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final PaymentMapper paymentMapper;

    @Transactional
    public PaymentResponseDto makePayment(
            Long bookingId,
            PaymentRequestDto request) {

        AppUser appUser = getCurrentUser();

        Booking booking = bookingRepository
                .findByIdAndAppUser(
                        bookingId,
                        appUser
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found.",
                                ErrorCodes.BOOKING_NOT_FOUND
                        ));

        if (booking.getStatus() != BookingStatus.COMPLETED) {

            throw new ConflictException(
                    "Booking must be completed before payment.",
                    ErrorCodes.INVALID_BOOKING_STATE
            );
        }

        if (paymentRepository.findByBooking(booking).isPresent()) {

            throw new ConflictException(
                    "Payment already exists.",
                    ErrorCodes.PAYMENT_ALREADY_EXISTS
            );
        }

        Payment payment = new Payment();

        payment.setBooking(booking);
        payment.setAmount(booking.getTotalAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setTransactionId(
                UUID.randomUUID().toString()
        );
        payment.setPaymentTime(LocalDateTime.now());

        payment = paymentRepository.save(payment);

        return paymentMapper.toResponse(payment);
    }

    public Page<PaymentResponseDto> getMyPayments(
            Pageable pageable) {

        AppUser appUser = getCurrentUser();

        return paymentRepository
                .findByBooking_AppUserOrderByCreatedAtDesc(
                        appUser,
                        pageable
                )
                .map(paymentMapper::toResponse);
    }

    public PaymentResponseDto getPaymentById(
            Long paymentId) {

        AppUser appUser = getCurrentUser();

        Payment payment = paymentRepository
                .findByIdAndBooking_AppUser(
                        paymentId,
                        appUser
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found.",
                                ErrorCodes.PAYMENT_NOT_FOUND
                        ));

        return paymentMapper.toResponse(payment);
    }

    private AppUser getCurrentUser() {

        return ((CustomUserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal())
                .getAppUser();
    }
}