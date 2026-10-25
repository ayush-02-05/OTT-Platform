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
        if (series == null) {
            return "redirect:/admin/series";
        }
        List<Episode> episodes =  episodeService.getEpisodeDetails(id);

        model.addAttribute("series", series);
        model.addAttribute("episodes", episodes);
        model.addAttribute("episode", new Episode());

        return "Admin/manageEpisodes";
    }

    @PostMapping("/admin/episodes/{seriesId}/addEpisode")
    public String saveEpisode( @PathVariable int seriesId, @RequestParam int seasonId, @Valid @ModelAttribute("episode") Episode episode, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return showPageWithErrors(seriesId, model);
        }

        try {
            episodeService.saveEpisode(seriesId, seasonId, episode.getEpisodeNumber(), episode.getDuration(), episode.getEpisodeTitle());
        } catch (IllegalArgumentException e) {
            result.rejectValue("episodeNumber", "episode.invalid", e.getMessage());
            return showPageWithErrors(seriesId, model);
        }
        return "redirect:/admin/episodes/" + seriesId;
    }

    @PostMapping("/admin/episodes/{seriesId}/updateEpisode/{episodeId}")
    public String updateEpisode(@PathVariable int seriesId, @PathVariable int episodeId, @RequestParam int seasonId, @Valid @ModelAttribute("episode") Episode episode, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return showPageWithErrors(seriesId, model);
        }

        try {
            episodeService.updateEpisode(episodeId, seasonId, episode.getEpisodeNumber(), episode.getDuration(), episode.getEpisodeTitle());
        } catch (IllegalArgumentException e) {
            result.rejectValue("episodeNumber", "episode.invalid", e.getMessage());
            return showPageWithErrors(seriesId, model);
        }
        return "redirect:/admin/episodes/" + seriesId;
    }

    @PostMapping("/admin/episodes/{seriesId}/deleteEpisode/{episodeId}")
    public String deleteEpisode(@PathVariable int seriesId, @PathVariable int episodeId) {
        episodeService.deleteEpisode(episodeId);
        return "redirect:/admin/episodes/" + seriesId;
    }

    // Shows the episodes page again (with the form errors).
    // If the series does not exist, go back to the series list instead of crashing.
    private String showPageWithErrors(int seriesId, Model model) {
        Series series = episodeService.getSeriesDetails(seriesId);
        if (series == null) {
            return "redirect:/admin/series";
        }
        model.addAttribute("series", series);
        model.addAttribute("episodes", episodeService.getEpisodeDetails(seriesId));
        return "Admin/manageEpisodes";
    }
}
