
package com.parkflow.security;

import com.parkflow.entity.AppUser;
import com.parkflow.exception.ErrorCodes;
import com.parkflow.exception.ResourceNotFoundException;
import com.parkflow.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {

        AppUser appUser = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Invalid email or password",
                        ErrorCodes.USER_NOT_FOUND
                ));

        return new CustomUserDetails(appUser);
    }
}