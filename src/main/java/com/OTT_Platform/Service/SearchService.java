package com.OTT_Platform.Service;

import com.OTT_Platform.DTO.SeriesDTO;
import com.OTT_Platform.Model.Movie;
import com.OTT_Platform.Model.Series;
import com.OTT_Platform.Repository.MovieRepository;
import com.OTT_Platform.Repository.SeriesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    private final MovieRepository movieRepository;
    private final SeriesRepository seriesRepository;

    public SearchService(MovieRepository movieRepository,
                         SeriesRepository seriesRepository) {
        this.movieRepository = movieRepository;
        this.seriesRepository = seriesRepository;
    }

    public List<Movie> searchMovies(String query) {
        return movieRepository.findByTitleContainingIgnoreCase(query);
    }

    public List<SeriesDTO> searchSeries(String query) {

        return seriesRepository.findByTitleContainingIgnoreCase(query)
                .stream()
                .map(series -> {

                    SeriesDTO dto = new SeriesDTO();

                    dto.setSeriesId(series.getSeriesId());
                    dto.setTitle(series.getTitle());
                    dto.setGenre(series.getGenre());
                    dto.setRating(series.getRating());
                    dto.setPosterURL(series.getPosterURL());
                    dto.setSynopsis(series.getSynopsis());
                    dto.setReleaseYear(series.getSeasons().get(0).getReleaseYear());
                    return dto;
                })
                .toList();
    }
}