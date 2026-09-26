package com.OTT_Platform.Service;

import com.OTT_Platform.Model.Movie;
import com.OTT_Platform.Model.Season;
import com.OTT_Platform.Model.Series;
import com.OTT_Platform.Repository.MovieRepository;
import com.OTT_Platform.Repository.SeriesRepository;
import com.OTT_Platform.Repository.EpisodeRepository;
import com.OTT_Platform.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {
    private final MovieRepository movieRepository;
    private final SeriesRepository seriesRepository;
    private final EpisodeRepository episodesRepository;
    private final UserRepository userRepository;

    public DashboardService(MovieRepository movieRepository, SeriesRepository seriesRepository, EpisodeRepository episodesRepository, UserRepository userRepository) {
        this.movieRepository = movieRepository;
        this.seriesRepository = seriesRepository;
        this.episodesRepository = episodesRepository;
        this.userRepository = userRepository;
    }

    public long getTotalMovies() {
        return movieRepository.count();
    }

    public long getTotalSeries() {
        return seriesRepository.count();
    }

    public long getTotalEpisodes() {
        return episodesRepository.count();
    }

    public List<Movie> getRecentMovies() {
        return movieRepository.findTop5ByOrderByMovieIdDesc();
    }

    public List<Series> getRecentSeries() {
        return seriesRepository.findTop5ByOrderBySeriesIdDesc();
    }

    public int getEpisodeCount(Series series) {
        int count = 0;
        for (Season season : series.getSeasons()) {
            if (season.getEpisodes() != null) {
                count += season.getEpisodes().size();
            }
        }
        return count;
    }

    public long getTotalUsers() {
        return userRepository.count();
    }
}
