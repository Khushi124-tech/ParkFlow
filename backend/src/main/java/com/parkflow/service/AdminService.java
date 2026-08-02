package com.parkflow.service;

import com.parkflow.dto.admin.DashboardResponseDto;
import com.parkflow.enums.BookingStatus;
import com.parkflow.repository.AppUserRepository;
import com.parkflow.repository.BookingRepository;
import com.parkflow.repository.ParkingLotRepository;
import com.parkflow.repository.PaymentRepository;
import com.parkflow.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AppUserRepository appUserRepository;
    private final VehicleRepository vehicleRepository;
    private final ParkingLotRepository parkingLotRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;

    public DashboardResponseDto getDashboard() {

        return new DashboardResponseDto(
                appUserRepository.count(),
                vehicleRepository.count(),
                parkingLotRepository.count(),
                bookingRepository.count(),
                paymentRepository.count(),
                bookingRepository.countByStatus(
                        BookingStatus.ACTIVE
                )
        );
    }
}