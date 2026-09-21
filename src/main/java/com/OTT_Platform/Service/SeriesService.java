package com.OTT_Platform.Service;

import com.OTT_Platform.Model.Season;
import com.OTT_Platform.Model.Series;
import com.OTT_Platform.Repository.SeriesRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeriesService {
    private final SeriesRepository seriesRepository;

    public SeriesService(SeriesRepository seriesRepository) {
        this.seriesRepository = seriesRepository;
    }

    public void saveSeries(Series series){
        seriesRepository.save(series);
    }

    public List<Series> getAllSeries() {
        return seriesRepository.findAll();
    }

    @Transactional
    public void updateSeries(Series series, int numberOfSeasons,List<Integer> seasonReleaseYears) {
        Series existingSeries = seriesRepository.findById(series.getSeriesId())
                .orElseThrow(() -> new RuntimeException("Series not found"));

        existingSeries.setTitle(series.getTitle());
        existingSeries.setGenre(series.getGenre());
        existingSeries.setRating(series.getRating());
        existingSeries.setSynopsis(series.getSynopsis());
        existingSeries.setPosterURL(series.getPosterURL());

        // Update existing Seasons / add new Seasons
        List<Season> existingSeasons = existingSeries.getSeasons();

        for (int i = 0; i < numberOfSeasons; i++) {
            int seasonNumber = i + 1;
            Season season = existingSeasons.stream().filter(s -> s.getSeasonNumber() == seasonNumber).findFirst()
                    .orElse(null);

            if (season != null) {
                season.setReleaseYear(seasonReleaseYears.get(i));
            } else {
                Season newSeason = new Season();
                newSeason.setSeasonNumber(seasonNumber);
                newSeason.setReleaseYear(seasonReleaseYears.get(i));
                newSeason.setSeries(existingSeries);
                existingSeasons.add(newSeason);
            }
        }
        seriesRepository.save(existingSeries);
    }

    public void deleteSeries(int seriesId) {
        seriesRepository.deleteById(seriesId);
    }
}
