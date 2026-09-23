package com.OTT_Platform.Controller.User;

import com.OTT_Platform.DTO.HeroDTO;
import com.OTT_Platform.DTO.SeriesDTO;
import com.OTT_Platform.Model.Movie;
import com.OTT_Platform.Service.HeroService;
import com.OTT_Platform.Service.MovieService;
import com.OTT_Platform.Service.SeriesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {
    private final HeroService heroService;
    private final MovieService movieService;
    private final SeriesService seriesService;
    HomeController(HeroService heroService, MovieService movieService, SeriesService seriesService){
        this.heroService = heroService;
        this.movieService = movieService;
        this.seriesService = seriesService;
    }

    @GetMapping("/hero")
    public List<HeroDTO> getHero() {
        return heroService.getHeroContent();
    }

    @GetMapping("/movies")
    public List<Movie> latestMovies(){
        return movieService.latestRelease();
    }

    @GetMapping("/series")
    public List<SeriesDTO> latestSeries(){
        return seriesService.latestRelease();
    }
}
