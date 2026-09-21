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
        Series series = seriesRepository.findById(seriesId).orElse(null);
        if(series == null) return;

        Season selectedSeason = null;
        for (Season season : series.getSeasons()) {
            if (season.getSeasonId() == seasonId) {
                selectedSeason = season;
                break;
            }
        }

        if(selectedSeason == null) return;
        Episode episode = new Episode();

        episode.setEpisodeNumber(episodeNumber);
        episode.setDuration(duration);
        episode.setEpisodeTitle(episodeTitle);
        episode.setSeason(selectedSeason);

        episodeRepository.save(episode);
    }

    public void updateEpisode(
            int episodeId,
            int seasonId,
            int episodeNumber,
            int duration,
            String episodeTitle) {

        Episode episode = episodeRepository.findById(episodeId).orElse(null);

        if (episode == null) {
            return;
        }

        // Season change hua ho toh
        for (Season season : episode.getSeason().getSeries().getSeasons()) {

            if (season.getSeasonId() == seasonId) {
                episode.setSeason(season);
                break;
            }
        }

        episode.setEpisodeNumber(episodeNumber);
        episode.setDuration(duration);
        episode.setEpisodeTitle(episodeTitle);

        episodeRepository.save(episode);
    }

    public void deleteEpisode(int episodeId) {

        episodeRepository.deleteById(episodeId);

    }
}