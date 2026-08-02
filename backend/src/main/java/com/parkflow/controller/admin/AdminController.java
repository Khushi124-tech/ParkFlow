package com.parkflow.controller.admin;

import com.parkflow.dto.admin.DashboardResponseDto;
import com.parkflow.dto.common.ApiResponse;
import com.parkflow.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponseDto>> getDashboard() {

        DashboardResponseDto response =
                adminService.getDashboard();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Dashboard fetched successfully.",
                        response
                )
        );
    }
}