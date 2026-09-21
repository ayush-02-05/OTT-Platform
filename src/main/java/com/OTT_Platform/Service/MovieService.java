package com.OTT_Platform.Service;

import com.OTT_Platform.Model.Movie;
import com.OTT_Platform.Repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;


    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public void saveMovie(Movie movie){
        movieRepository.save(movie);
    }

    public List<Movie> getAllMovies(){
        return movieRepository.findAll();
    }

    public void deleteMovie(int movieId){
        movieRepository.deleteById(movieId);
    }
}
