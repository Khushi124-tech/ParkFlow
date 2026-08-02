package com.parkflow.mapper;

import com.parkflow.dto.payment.PaymentResponseDto;
import com.parkflow.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public PaymentResponseDto toResponse(Payment payment) {

        if (payment == null) {
            return null;
        }

        PaymentResponseDto response = new PaymentResponseDto();

        response.setId(payment.getId());
        response.setBookingId(payment.getBooking().getId());
        response.setAmount(payment.getAmount());
        response.setPaymentMethod(payment.getPaymentMethod());
        response.setStatus(payment.getStatus());
        response.setTransactionId(payment.getTransactionId());
        response.setPaymentTime(payment.getPaymentTime());

        return response;
    }
}