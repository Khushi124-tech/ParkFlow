package com.parkflow.service;

import com.parkflow.dto.booking.BookingResponseDto;
import com.parkflow.dto.booking.CreateBookingRequestDto;
import com.parkflow.entity.AppUser;
import com.parkflow.entity.Booking;
import com.parkflow.entity.ParkingLot;
import com.parkflow.entity.Vehicle;
import com.parkflow.enums.BookingStatus;
import com.parkflow.enums.ParkingLotStatus;
import com.parkflow.enums.VehicleStatus;
import com.parkflow.exception.ConflictException;
import com.parkflow.exception.ErrorCodes;
import com.parkflow.exception.ResourceNotFoundException;
import com.parkflow.mapper.BookingMapper;
import com.parkflow.repository.BookingRepository;
import com.parkflow.repository.ParkingLotRepository;
import com.parkflow.repository.VehicleRepository;
import com.parkflow.security.CustomUserDetails;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;
    private final ParkingLotRepository parkingLotRepository;
    private final BookingMapper bookingMapper;


    @Transactional
    public BookingResponseDto createBooking(CreateBookingRequestDto request) {

        AppUser appUser = getCurrentUser();

        Vehicle vehicle = vehicleRepository
                .findByIdAndAppUserAndStatus(
                        request.getVehicleId(),
                        appUser,
                        VehicleStatus.ACTIVE
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found.",
                                ErrorCodes.VEHICLE_NOT_FOUND
                        ));

        if (bookingRepository.existsByVehicleAndStatus(
                vehicle,
                BookingStatus.ACTIVE
        )) {

            throw new ConflictException(
                    "Vehicle already has an active booking.",
                    ErrorCodes.ACTIVE_BOOKING_EXISTS
            );
        }

        ParkingLot parkingLot = parkingLotRepository
                .findByIdAndStatus(
                        request.getParkingLotId(),
                        ParkingLotStatus.ACTIVE
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Parking lot not found.",
                                ErrorCodes.PARKING_LOT_NOT_FOUND
                        ));

        if (parkingLot.getAvailableSlots() <= 0) {

            throw new ConflictException(
                    "No parking slots available.",
                    ErrorCodes.PARKING_LOT_FULL
            );
        }

        parkingLot.setAvailableSlots(
                parkingLot.getAvailableSlots() - 1
        );

        Booking booking = new Booking();

        booking.setAppUser(appUser);
        booking.setVehicle(vehicle);
        booking.setParkingLot(parkingLot);
        booking.setEntryTime(LocalDateTime.now());
        booking.setStatus(BookingStatus.ACTIVE);
        booking.setTotalAmount(null);

        booking = bookingRepository.save(booking);

        parkingLotRepository.save(parkingLot);

        return bookingMapper.toResponse(booking);
    }

    public Page<BookingResponseDto> getMyBookings(
            Pageable pageable) {

        AppUser appUser = getCurrentUser();

        return bookingRepository
                .findByAppUserOrderByCreatedAtDesc(
                        appUser,
                        pageable
                )
                .map(bookingMapper::toResponse);
    }

    public BookingResponseDto getBookingById(Long bookingId) {

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

        return bookingMapper.toResponse(booking);
    }

    @Transactional
    public BookingResponseDto completeBooking(Long bookingId) {

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

        if (booking.getStatus() != BookingStatus.ACTIVE) {

            throw new ConflictException(
                    "Booking is already completed or cancelled.",
                    ErrorCodes.INVALID_BOOKING_STATE
            );
        }

        booking.setExitTime(LocalDateTime.now());

        booking.setTotalAmount(
                calculateParkingFee(booking)
        );

        booking.setStatus(BookingStatus.COMPLETED);

        ParkingLot parkingLot = booking.getParkingLot();

        parkingLot.setAvailableSlots(
                parkingLot.getAvailableSlots() + 1
        );

        parkingLotRepository.save(parkingLot);

        booking = bookingRepository.save(booking);

        return bookingMapper.toResponse(booking);
    }

    private BigDecimal calculateParkingFee(Booking booking) {

        LocalDateTime entryTime = booking.getEntryTime();
        LocalDateTime exitTime = booking.getExitTime();

        long minutes = Duration
                .between(entryTime, exitTime)
                .toMinutes();

        long hours = Math.max(1, (long)Math.ceil(minutes / 60.0));

        return booking.getParkingLot()
                .getHourlyRate()
                .multiply(BigDecimal.valueOf(hours));
    }

    private AppUser getCurrentUser() {

        return ((CustomUserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal())
                .getAppUser();
    }
}