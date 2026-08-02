package com.parkflow.service;

import com.parkflow.config.JwtProperties;
import com.parkflow.dto.auth.AuthResponseDto;
import com.parkflow.dto.auth.LoginRequestDto;
import com.parkflow.dto.auth.RegisterRequestDto;
import com.parkflow.entity.AppUser;
import com.parkflow.enums.Role;
import com.parkflow.exception.ConflictException;
import com.parkflow.exception.ErrorCodes;
import com.parkflow.exception.UnauthorizedException;
import com.parkflow.repository.AppUserRepository;
import com.parkflow.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final String TOKEN_TYPE = "Bearer";

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final JwtProperties jwtProperties;

    public AuthResponseDto register(RegisterRequestDto request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase(Locale.ROOT);

        if (appUserRepository.existsByEmail(email)) {
            throw new ConflictException(
                    "User already exists.",
                    ErrorCodes.USER_ALREADY_EXISTS
            );
        }

        AppUser appUser = new AppUser();
        appUser.setFullName(request.getFullName().trim());
        appUser.setEmail(email);
        appUser.setPassword(passwordEncoder.encode(request.getPassword()));
        appUser.setRole(Role.APP_USER);

        appUser = appUserRepository.save(appUser);

        String token = jwtService.generateToken(appUser.getEmail());

        return buildAuthResponse(appUser, token);
    }

    public AuthResponseDto login(LoginRequestDto request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase(Locale.ROOT);

        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            email,
                            request.getPassword()
                    )
            );

        } catch (AuthenticationException ex) {

            throw new UnauthorizedException(
                    "Invalid email or password.",
                    ErrorCodes.INVALID_CREDENTIALS
            );
        }

        AppUser appUser = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException(
                        "Invalid email or password.",
                        ErrorCodes.INVALID_CREDENTIALS
                ));

        String token = jwtService.generateToken(appUser.getEmail());

        return buildAuthResponse(appUser, token);
    }

    private AuthResponseDto buildAuthResponse(
            AppUser appUser,
            String token) {

        return AuthResponseDto.builder()
                .accessToken(token)
                .tokenType(TOKEN_TYPE)
                .expiresIn(jwtProperties.getExpiration())
                .id(appUser.getId())
                .fullName(appUser.getFullName())
                .email(appUser.getEmail())
                .role(appUser.getRole())
                .build();
    }
}