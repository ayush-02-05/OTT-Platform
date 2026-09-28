package com.OTT_Platform.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // Role based login redirect
    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {

        return (request, response, authentication) -> {

            boolean isAdmin = authentication.getAuthorities()
                    .stream()
                    .anyMatch(
                            authority ->
                                    authority.getAuthority()
                                            .equals("ROLE_ADMIN")
                    );

            if (isAdmin) {
                response.sendRedirect("/admin/dashboard");
            } else {
                response.sendRedirect("/home");
            }
        };
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // ==============================
                        // PUBLIC
                        // ==============================

                        .requestMatchers(
                                "/register",
                                "/login",
                                "/api/user/register",
                                "/HTML/login.html",
                                "/HTML/register.html",
                                "/CSS/**",
                                "/JavaScript/**",
                                "/Images/**"
                        ).permitAll()


                        // ==============================
                        // ADMIN
                        // ==============================

                        .requestMatchers(
                                "/admin/**"
                        ).hasRole("ADMIN")


                        // ==============================
                        // USER + ADMIN PROFILE APIs
                        // ==============================

                        .requestMatchers(
                                "/api/user/me",
                                "/api/user/change-password"
                        ).hasAnyRole("USER", "ADMIN")


                        // ==============================
                        // USER SIDE
                        // ==============================

                        .requestMatchers(
                                "/home/**",
                                "/movies/**",
                                "/series/**",
                                "/MyList/**",
                                "/profile",
                                "/api/movies/**",
                                "/api/series/**",
                                "/api/my-list/**"
                        ).hasRole("USER")


                        // ==============================
                        // EVERYTHING ELSE
                        // ==============================

                        .anyRequest().authenticated()
                )


                // ==============================
                // LOGIN
                // ==============================

                .formLogin(form -> form

                        .loginPage("/login")

                        .usernameParameter("email")
                        .passwordParameter("password")

                        .successHandler(authenticationSuccessHandler())

                        .permitAll()
                )


                // ==============================
                // LOGOUT
                // ==============================

                .logout(logout -> logout

                        .logoutSuccessUrl("/login")

                        .permitAll()
                );


        return http.build();
    }
}