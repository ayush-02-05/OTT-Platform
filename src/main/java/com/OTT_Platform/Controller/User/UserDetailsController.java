package com.OTT_Platform.Controller.User;

import com.OTT_Platform.DTO.ChangePasswordDTO;
import com.OTT_Platform.DTO.UserProfileDTO;
import com.OTT_Platform.Model.User;
import com.OTT_Platform.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserDetailsController {
    private final UserService userService;
    public UserDetailsController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            userService.saveUser(user);
            return ResponseEntity.ok("Registration successful");
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public UserProfileDTO getCurrentUser(Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        return new UserProfileDTO(user.getName(), user.getEmail());
    }

    @PutMapping("/me")
    public UserProfileDTO updateProfile(@RequestBody UserProfileDTO profile, Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        String currentEmail = authentication.getName();
        UserProfileDTO updated = userService.updateProfile(currentEmail, profile);

        if (!currentEmail.equals(updated.getEmail())) {
            Authentication newAuthentication = new UsernamePasswordAuthenticationToken(updated.getEmail(), null, authentication.getAuthorities());
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(newAuthentication);
            SecurityContextHolder.setContext(securityContext);
            new HttpSessionSecurityContextRepository().saveContext(securityContext, request, response);
        }
        return updated;
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO passwordDTO, Authentication authentication) {
        try {userService.changePassword(authentication.getName(), passwordDTO);
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
