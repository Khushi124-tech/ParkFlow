package com.parkflow.dto.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

    private boolean success;

    private String message;

    private String errorCode;

    private LocalDateTime timestamp;

    private String path;

    private Map<String, String> errors;
}