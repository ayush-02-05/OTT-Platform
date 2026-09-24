package com.OTT_Platform.Controller.User;

import com.OTT_Platform.Model.User;
import com.OTT_Platform.Service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserDetailsController {
    private final UserService userService;
    public UserDetailsController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/register")
    public void register(@RequestBody User user) {
        userService.saveUser(user);
    }
}
