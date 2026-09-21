package com.OTT_Platform.Service;

import com.OTT_Platform.DTO.HeroDTO;
import com.OTT_Platform.Model.Movie;
import com.OTT_Platform.Model.Series;
import com.OTT_Platform.Repository.MovieRepository;
import com.OTT_Platform.Repository.SeriesRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class HeroService {
    private final MovieRepository movieRepository;
    private final SeriesRepository seriesRepository;

    public HeroService(MovieRepository movieRepository, SeriesRepository seriesRepository){
        this.movieRepository = movieRepository;
        this.seriesRepository = seriesRepository;
    }

    public List<HeroDTO> getHeroContent(){
        List<Movie> movies = movieRepository.findByRatingGreaterThan(8);
        List<Series> series = seriesRepository.findByRatingGreaterThan(8);

        List<HeroDTO> heroContent = new ArrayList<>();
        for(Movie movie : movies) {
            heroContent.add(new HeroDTO(movie.getMovieId(), movie.getTitle(), "MOVIE", movie.getPosterURL(), movie.getRating(), movie.getGenre(), movie.getSynopsis()));
        }

        for(Series serie : series){
            heroContent.add(new HeroDTO(serie.getSeriesId(), serie.getTitle(), "SERIES", serie.getPosterURL(), serie.getRating(), serie.getGenre(), serie.getSynopsis()));
        }
        Collections.shuffle(heroContent);
        return heroContent.subList(0, Math.min(5, heroContent.size()));
    }
}
