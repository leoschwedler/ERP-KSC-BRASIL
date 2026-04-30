package com.erp.service;

import com.erp.config.JwtTokenProvider;
import com.erp.dto.LoginRequest;
import com.erp.dto.LoginResponse;
import com.erp.dto.RegisterRequest;
import com.erp.entity.Role;
import com.erp.entity.User;
import com.erp.exception.UnauthorizedException;
import com.erp.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
        AuthenticationManager authenticationManager,
        JwtTokenProvider jwtTokenProvider,
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Usuário não encontrado"));

            String token = jwtTokenProvider.generateTokenFromUsername(
                user.getEmail(),
                user.getRole().name()
            );

            return new LoginResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), token);
        } catch (AuthenticationException e) {
            throw new UnauthorizedException("Email ou senha inválidos");
        }
    }

    public LoginResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        User user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .build();

        User saved = userRepository.save(user);

        String token = jwtTokenProvider.generateTokenFromUsername(
            saved.getEmail(),
            saved.getRole().name()
        );

        return new LoginResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole(), token);
    }
}
