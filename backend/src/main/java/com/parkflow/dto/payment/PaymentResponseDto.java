package com.parkflow.dto.payment;

import com.parkflow.enums.PaymentMethod;
import com.parkflow.enums.PaymentStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class PaymentResponseDto {

    private Long id;

    private Long bookingId;

    private BigDecimal amount;

    private PaymentMethod paymentMethod;

    private PaymentStatus status;

    private String transactionId;

    private LocalDateTime paymentTime;
}
