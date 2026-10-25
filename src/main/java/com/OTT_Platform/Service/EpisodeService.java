package com.OTT_Platform.Service;

import com.OTT_Platform.Model.Episode;
import com.OTT_Platform.Model.Season;
import com.OTT_Platform.Model.Series;
import com.OTT_Platform.Repository.EpisodeRepository;
import com.OTT_Platform.Repository.SeriesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EpisodeService {
//    @Autowired
//    private EpisodeRepository episodeRepository;
//    @Autowired
//    private SeriesRepository seriesRepository;

    private final EpisodeRepository episodeRepository;
    private final SeriesRepository seriesRepository;
    public EpisodeService(EpisodeRepository episodeRepository, SeriesRepository seriesRepository){
        this.episodeRepository = episodeRepository;
        this.seriesRepository = seriesRepository;
    }

    public Series getSeriesDetails(int id) {
        return seriesRepository.findById(id).orElse(null);
    }

    public List<Episode> getEpisodeDetails(int Id) {
        return episodeRepository.findBySeason_Series_SeriesId(Id);
    }

    public void saveEpisode(int seriesId, int seasonId, int episodeNumber, int duration, String episodeTitle){
        Series series = seriesRepository.findById(seriesId)
                .orElseThrow(() -> new IllegalArgumentException("Series not found"));

        Season selectedSeason = null;
        for (Season season : series.getSeasons()) {
            if (season.getSeasonId() == seasonId) {
                selectedSeason = season;
                break;
            }
        }

        if(selectedSeason == null) {
            throw new IllegalArgumentException("Season not found for this series");
        }

        // a new episode has no id yet, so nothing has to be ignored (0)
        ensureEpisodeNumberIsFree(selectedSeason, episodeNumber, 0);

        Episode episode = new Episode();

        episode.setEpisodeNumber(episodeNumber);
        episode.setDuration(duration);
        episode.setEpisodeTitle(episodeTitle);
        episode.setSeason(selectedSeason);

        episodeRepository.save(episode);
    }

    public void updateEpisode(int episodeId, int seasonId, int episodeNumber, int duration, String episodeTitle) {
        Episode episode = episodeRepository.findById(episodeId)
                .orElseThrow(() -> new IllegalArgumentException("Episode not found"));

        // The (possibly new) season must belong to the same series
        Season targetSeason = null;
        for (Season season : episode.getSeason().getSeries().getSeasons()) {
            if (season.getSeasonId() == seasonId) {
                targetSeason = season;
                break;
            }
        }

        if (targetSeason == null) {
            throw new IllegalArgumentException("Season not found for this series");
        }

        // ignore this episode itself, so saving it without changing the number still works
        ensureEpisodeNumberIsFree(targetSeason, episodeNumber, episodeId);

        episode.setSeason(targetSeason);
        episode.setEpisodeNumber(episodeNumber);
        episode.setDuration(duration);
        episode.setEpisodeTitle(episodeTitle);

        episodeRepository.save(episode);
    }

    public void deleteEpisode(int episodeId) {
        episodeRepository.deleteById(episodeId);
    }

    // Throws if another episode of this season already uses this number
    private void ensureEpisodeNumberIsFree(Season season, int episodeNumber, int ignoreEpisodeId) {
        boolean taken = season.getEpisodes().stream()
                .anyMatch(e -> e.getEpisodeNumber() == episodeNumber
                        && e.getEpisodeId() != ignoreEpisodeId);

        if (taken) {
            throw new IllegalArgumentException(
                    "Episode " + episodeNumber + " already exists in Season " + season.getSeasonNumber());
        }
    }
}