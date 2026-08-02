package com.parkflow.dto.payment;

import com.parkflow.enums.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PaymentRequestDto {

    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;
}
