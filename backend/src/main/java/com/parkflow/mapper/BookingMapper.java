package com.parkflow.mapper;

import com.parkflow.dto.booking.BookingResponseDto;
import com.parkflow.entity.Booking;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {

    public BookingResponseDto toResponse(Booking booking) {

        if (booking == null) {
            return null;
        }

        BookingResponseDto response = new BookingResponseDto();

        response.setId(booking.getId());

        response.setVehicleId(booking.getVehicle().getId());
        response.setVehicleNumber(booking.getVehicle().getVehicleNumber());

        response.setParkingLotId(booking.getParkingLot().getId());
        response.setParkingLotName(booking.getParkingLot().getName());

        response.setEntryTime(booking.getEntryTime());
        response.setExitTime(booking.getExitTime());

        response.setTotalAmount(booking.getTotalAmount());

        response.setStatus(booking.getStatus());

        return response;
    }
}