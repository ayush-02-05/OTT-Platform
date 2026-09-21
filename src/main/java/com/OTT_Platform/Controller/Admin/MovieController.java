package com.OTT_Platform.Controller.Admin;

import com.OTT_Platform.Model.Movie;
import com.OTT_Platform.Service.MovieService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/admin/dashboard/movies")
    public String Movies(Model model){
        List<Movie> movies = movieService.getAllMovies();
        model.addAttribute("movies", movies);//database wali movies
        model.addAttribute("movie", new Movie()); //Form bind karne ke liye
        return "Admin/Movies";
    }

    @PostMapping("/admin/dashboard/movies")
    public String addMovie(@Valid @ModelAttribute("movie") Movie movie, BindingResult result) {
        if (result.hasErrors()) {
            return "Admin/Movies";
        }
        movieService.saveMovie(movie);
        return "redirect:/dashboard/movies";
    }

    @PostMapping("/admin/dashboard/movies/delete")
    public String deleteMovie(@RequestParam int movieId) {
        movieService.deleteMovie(movieId);
        return "redirect:/dashboard/movies";
    }


}
