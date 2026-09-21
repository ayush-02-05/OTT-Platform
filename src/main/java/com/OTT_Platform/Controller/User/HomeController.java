package com.OTT_Platform.Controller.User;

import com.OTT_Platform.DTO.HeroDTO;
import com.OTT_Platform.Service.HeroService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {
    private final HeroService heroService;
    HomeController(HeroService heroService){
        this.heroService = heroService;
    }

    @GetMapping("/api/hero")
    public List<HeroDTO> getHero() {
        return heroService.getHeroContent();
    }
}
