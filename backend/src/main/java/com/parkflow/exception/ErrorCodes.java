package com.parkflow.exception;

public final class ErrorCodes {

    private ErrorCodes() {
    }

    public static final String USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS";
    public static final String USER_NOT_FOUND = "USER_NOT_FOUND";

    public static final String INVALID_CREDENTIALS = "INVALID_CREDENTIALS";
    public static final String UNAUTHORIZED = "UNAUTHORIZED";
    public static final String ACCESS_DENIED = "ACCESS_DENIED";

    public static final String VEHICLE_ALREADY_EXISTS = "VEHICLE_ALREADY_EXISTS";
    public static final String VEHICLE_NOT_FOUND = "VEHICLE_NOT_FOUND";

    public static final String PARKING_LOT_NOT_FOUND = "PARKING_LOT_NOT_FOUND";
    public static final String PARKING_LOT_FULL = "PARKING_LOT_FULL";
    public static final String PARKING_LOT_INACTIVE = "PARKING_LOT_INACTIVE";

    public static final String BOOKING_NOT_FOUND = "BOOKING_NOT_FOUND";
    public static final String ACTIVE_BOOKING_EXISTS = "ACTIVE_BOOKING_EXISTS";
    public static final String INVALID_BOOKING_STATE = "INVALID_BOOKING_STATE";

    public static final String PAYMENT_NOT_FOUND = "PAYMENT_NOT_FOUND";
    public static final String PAYMENT_FAILED = "PAYMENT_FAILED";
    public static final String PAYMENT_PENDING = "PAYMENT_PENDING";
    public static final String PAYMENT_ALREADY_EXISTS = "PAYMENT_ALREADY_EXISTS";

    public static final String VALIDATION_ERROR = "VALIDATION_ERROR";
    public static final String INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";
}
