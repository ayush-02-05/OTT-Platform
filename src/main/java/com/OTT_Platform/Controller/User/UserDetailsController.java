package com.OTT_Platform.Controller.User;

import com.OTT_Platform.DTO.ChangePasswordDTO;
import com.OTT_Platform.DTO.RegisterDTO;
import com.OTT_Platform.DTO.UserProfileDTO;
import com.OTT_Platform.Model.User;
import com.OTT_Platform.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserDetailsController {
    private final UserService userService;
    public UserDetailsController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDTO dto,
                                           BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(result.getAllErrors().get(0).getDefaultMessage());
        }
        userService.registerUser(dto);
        return ResponseEntity.ok("Registration successful");
    }

    @GetMapping("/me")
    public UserProfileDTO getCurrentUser(Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        return new UserProfileDTO(user.getName(), user.getEmail());
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UserProfileDTO profile, BindingResult result, Authentication authentication, HttpServletRequest request, HttpServletResponse response) {

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors().get(0).getDefaultMessage());
        }

        String currentEmail = authentication.getName();
        UserProfileDTO updated = userService.updateProfile(currentEmail, profile);

        if (!currentEmail.equals(updated.getEmail())) {
            Authentication newAuthentication = new UsernamePasswordAuthenticationToken(updated.getEmail(), null, authentication.getAuthorities());
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(newAuthentication);
            SecurityContextHolder.setContext(securityContext);
            new HttpSessionSecurityContextRepository().saveContext(securityContext, request, response);
        }
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO passwordDTO, Authentication authentication) {
        userService.changePassword(authentication.getName(), passwordDTO);
        return ResponseEntity.ok("Password changed successfully");
    }
}
