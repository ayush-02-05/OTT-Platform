package com.OTT_Platform.Service;

import com.OTT_Platform.DTO.EpisodeDTO;
import com.OTT_Platform.DTO.SeasonDTO;
import com.OTT_Platform.DTO.SeriesDTO;
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

    public List<SeriesDTO> latestRelease() {
        return seriesRepository.findTop5ByOrderBySeriesIdDesc().stream()
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

    public List<SeriesDTO> getAllSeriesDTO() {
        return seriesRepository.findAll().stream()
                .map(series -> {
                    SeriesDTO dto = new SeriesDTO();

                    dto.setSeriesId(series.getSeriesId());
                    dto.setTitle(series.getTitle());
                    dto.setGenre(series.getGenre());
                    dto.setRating(series.getRating());
                    dto.setPosterURL(series.getPosterURL());
                    dto.setSynopsis(series.getSynopsis());
                    if (!series.getSeasons().isEmpty()) {
                        dto.setReleaseYear(series.getSeasons().get(0).getReleaseYear());
                    }
                    return dto;
                }).toList();
    }

    public SeriesDTO seriesDetails(int seriesId){
        Series series = seriesRepository.findById(seriesId).orElseThrow(() -> new RuntimeException("Series not found"));

        SeriesDTO dto = new SeriesDTO();

        dto.setSeriesId(series.getSeriesId());
        dto.setTitle(series.getTitle());
        dto.setGenre(series.getGenre());
        dto.setRating(series.getRating());
        if (!series.getSeasons().isEmpty()) {
            dto.setReleaseYear(series.getSeasons().get(0).getReleaseYear());
        }
        dto.setPosterURL(series.getPosterURL());
        dto.setSynopsis(series.getSynopsis());

        return dto;
    }




    public List<SeasonDTO> getSeasons(int seriesId){
        Series series = seriesRepository.findById(seriesId).orElseThrow(() -> new RuntimeException("Series Not Found"));
        return series.getSeasons()
                .stream()
                .map(season -> {

                    SeasonDTO dto = new SeasonDTO();

                    dto.setSeasonId(season.getSeasonId());
                    dto.setSeasonNumber(season.getSeasonNumber());
                    dto.setReleaseYear(season.getReleaseYear());

                    return dto;
                })
                .toList();
    }




    public List<EpisodeDTO> getEpisodes(int seasonId) {
        for (Series series : seriesRepository.findAll()) {
            for (Season season : series.getSeasons()) {
                if (season.getSeasonId() == seasonId) {
                    return season.getEpisodes()
                            .stream()
                            .map(episode -> {
                                EpisodeDTO dto = new EpisodeDTO();
                                dto.setEpisodeId(episode.getEpisodeId());
                                dto.setEpisodeNumber(episode.getEpisodeNumber());
                                dto.setEpisodeTitle(episode.getEpisodeTitle());
                                dto.setDuration(episode.getDuration());
                                return dto;
                            })
                            .toList();
                }
            }
        }
        throw new RuntimeException("Season not found");
    }
}
