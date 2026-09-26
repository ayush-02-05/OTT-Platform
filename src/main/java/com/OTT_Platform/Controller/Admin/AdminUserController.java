package com.OTT_Platform.Controller.Admin;

import com.OTT_Platform.Model.User;
import com.OTT_Platform.Service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin/users")
public class AdminUserController {
    private final UserService userService;
    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String users(Model model) {
        model.addAttribute("users", userService.getUsers());
        return "Admin/manageUsers";
    }

    @GetMapping("/{id}")
    public String viewUser(@PathVariable int id, Model model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        return "Admin/viewUser";
    }

    @PostMapping("/delete/{id}")
    public String deleteUser(@PathVariable int id, Authentication authentication) {
        User user = userService.getUserById(id);

        // Admin cannot delete himself
        if (user.getEmail().equals(authentication.getName())) {
            return "redirect:/admin/users?error=selfDelete";
        }
        userService.deleteUser(id);
        return "redirect:/admin/users";
    }
}