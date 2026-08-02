package com.parkflow.controller.payment;

import com.parkflow.dto.common.ApiResponse;
import com.parkflow.dto.payment.PaymentRequestDto;
import com.parkflow.dto.payment.PaymentResponseDto;
import com.parkflow.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/{bookingId}")
    public ResponseEntity<ApiResponse<PaymentResponseDto>> makePayment(
            @PathVariable Long bookingId,
            @Valid @RequestBody PaymentRequestDto request) {

        PaymentResponseDto response =
                paymentService.makePayment(bookingId, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Payment completed successfully.",
                        response
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<PaymentResponseDto>>> getMyPayments(
            @PageableDefault(size = 10, sort = "createdAt")
            Pageable pageable) {

        Page<PaymentResponseDto> response =
                paymentService.getMyPayments(pageable);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Payments fetched successfully.",
                        response
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PaymentResponseDto>> getPaymentById(
            @PathVariable Long id) {

        PaymentResponseDto response =
                paymentService.getPaymentById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Payment fetched successfully.",
                        response
                )
        );
    }
}