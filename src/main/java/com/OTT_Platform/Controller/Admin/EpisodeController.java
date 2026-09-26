package com.OTT_Platform.Controller.Admin;

import com.OTT_Platform.Model.Episode;
import com.OTT_Platform.Model.Series;
import com.OTT_Platform.Service.EpisodeService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.List;

@Controller
public class EpisodeController {
    private EpisodeService episodeService;
    public EpisodeController(EpisodeService episodeService) {
        this.episodeService = episodeService;
    }

    @GetMapping("/admin/episodes/{id}")
    public String manageEpisodes(@PathVariable int id, Model model){
        Series series = episodeService.getSeriesDetails(id);
        List<Episode> episodes =  episodeService.getEpisodeDetails(id);

        model.addAttribute("series", series);
        model.addAttribute("episodes", episodes);
        model.addAttribute("episode", new Episode());

        return "Admin/manageEpisodes";
    }

    @PostMapping("/admin/episodes/{seriesId}/addEpisode")
    public String saveEpisode( @PathVariable int seriesId, @RequestParam int seasonId, @Valid @ModelAttribute("episode") Episode episode, BindingResult result, Model model) {
        if (result.hasErrors()) {
            Series series = episodeService.getSeriesDetails(seriesId);
            List<Episode> episodes = episodeService.getEpisodeDetails(seriesId);

            model.addAttribute("series", series);
            model.addAttribute("episodes", episodes);
            return "Admin/episodes";
        }

        episodeService.saveEpisode(seriesId, seasonId, episode.getEpisodeNumber(), episode.getDuration(), episode.getEpisodeTitle());
        return "redirect:/episodes/" + seriesId;
    }

    @PostMapping("/admin/episodes/{seriesId}/updateEpisode/{episodeId}")
    public String updateEpisode(@PathVariable int seriesId, @PathVariable int episodeId, @RequestParam int seasonId, @Valid @ModelAttribute("episode") Episode episode, BindingResult result, Model model) {

        if (result.hasErrors()) {
            Series series = episodeService.getSeriesDetails(seriesId);
            List<Episode> episodes = episodeService.getEpisodeDetails(seriesId);
            model.addAttribute("series", series);
            model.addAttribute("episodes", episodes);
            return "Admin/episodes";
        }

        episodeService.updateEpisode(episodeId, seasonId, episode.getEpisodeNumber(), episode.getDuration(), episode.getEpisodeTitle());
        return "redirect:/episodes/" + seriesId;
    }

    @PostMapping("/admin/episodes/{seriesId}/deleteEpisode/{episodeId}")
    public String deleteEpisode(@PathVariable int seriesId, @PathVariable int episodeId) {
        episodeService.deleteEpisode(episodeId);

        return "redirect:/episodes/" + seriesId;
    }
}
