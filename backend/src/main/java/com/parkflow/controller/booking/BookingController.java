package com.parkflow.controller.booking;

import com.parkflow.dto.booking.BookingResponseDto;
import com.parkflow.dto.booking.CreateBookingRequestDto;
import com.parkflow.dto.common.ApiResponse;
import com.parkflow.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponseDto>> createBooking(
            @Valid @RequestBody CreateBookingRequestDto request) {

        BookingResponseDto response =
                bookingService.createBooking(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Booking created successfully.",
                        response
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<BookingResponseDto>>> getMyBookings(
            @PageableDefault(size = 10, sort = "createdAt")
            Pageable pageable) {

        Page<BookingResponseDto> response =
                bookingService.getMyBookings(pageable);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Bookings fetched successfully.",
                        response
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookingResponseDto>> getBookingById(
            @PathVariable Long id) {

        BookingResponseDto response =
                bookingService.getBookingById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Booking fetched successfully.",
                        response
                )
        );
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<ApiResponse<BookingResponseDto>> completeBooking(
            @PathVariable Long id) {

        BookingResponseDto response =
                bookingService.completeBooking(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Booking completed successfully.",
                        response
                )
        );
    }
}