package org.athisworkshop.leavehub.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class ApplicationConfig {

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails employee = User.builder()
                .username("angajat")
                .password("{noop}parola123")
                .roles("USER")
                .build();

        UserDetails manager = User.builder()
                .username("manager")
                .password("{noop}admin123")
                .roles("USER", "ADMIN")
                .build();

        return new InMemoryUserDetailsManager(employee, manager);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}