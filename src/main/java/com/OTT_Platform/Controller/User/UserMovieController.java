package com.OTT_Platform.Controller.User;

import com.OTT_Platform.Model.Movie;
import com.OTT_Platform.Service.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserMovieController {
    private final MovieService movieService;
    UserMovieController(MovieService movieService){
        this.movieService = movieService;
    }

    @GetMapping("/api/movies")
    public List<Movie> movies(){
        return movieService.getAllMovies();
    }

    @GetMapping("/api/movies/{movieId}")
    public Movie movieDetails(@PathVariable int movieId) {
        return movieService.movieDetails(movieId);
    }
}