package com.OTT_Platform.Controller.User;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping({"/", "/home"})
    public String home() {
        return "forward:/HTML/home.html";
    }

    @GetMapping("/movies")
    public String movies() {
        return "forward:/HTML/movies.html";
    }

    @GetMapping("/series")
    public String series() {
        return "forward:/HTML/series.html";
    }

    @GetMapping("movies/{movieId}")
    public String movieDetails() {
        return "forward:/HTML/movieDetails.html";
    }

    @GetMapping("series/{seriesId}")
    public String seriesDetails() {
        return "forward:/HTML/seriesDetails.html";
    }

    @GetMapping("/MyList")
    public String myList() {
        return "forward:/HTML/myList.html";
    }

    @GetMapping("/login")
    public String login() {
        return "forward:/HTML/login.html";
    }

    @GetMapping("/register")
    public String register() {
        return "forward:/HTML/register.html";
    }

    @GetMapping("/profile")
    public String profile() {
        return "forward:/HTML/profile.html";
    }

}
