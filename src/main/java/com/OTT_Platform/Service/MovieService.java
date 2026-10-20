package com.OTT_Platform.Service;

import com.OTT_Platform.Model.ContentType;
import com.OTT_Platform.Model.Movie;
import com.OTT_Platform.Repository.MovieRepository;
import com.OTT_Platform.Repository.MyListRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final MyListRepository myListRepository;
    public MovieService(MovieRepository movieRepository, MyListRepository myListRepository) {
        this.movieRepository = movieRepository;
        this.myListRepository = myListRepository;
    }

    public void saveMovie(Movie movie){
        movieRepository.save(movie);
    }

    public List<Movie> getAllMovies(){
        return movieRepository.findAll();
    }


    public List<Movie> latestRelease(){
        return movieRepository.findTop5ByOrderByMovieIdDesc();
    }

    public Movie movieDetails(int movieId){
        return movieRepository.findById(movieId).orElseThrow(() -> new RuntimeException("Movie not found"));
    }

    @Transactional
    public void deleteMovie(int movieId){
        myListRepository.deleteByContentTypeAndContentId(ContentType.MOVIE, movieId);
        movieRepository.deleteById(movieId);
    }
}
