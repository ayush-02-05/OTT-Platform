const addEpisodeSidebar = document.getElementById("addEpisodeSidebar");
const closeSidebarBtn = document.getElementById("closeSidebarBtn");
const cancelEpisodeBtn = document.getElementById("cancelEpisodeBtn");
const addEpisodeButtons = document.querySelectorAll(".add-episode-btn");
const editEpisodeButtons = document.querySelectorAll(".edit-episode-btn");
const seasonSelect = document.getElementById("season");
const episodeNumberInput = document.getElementById("episodeNumber");
const durationInput = document.getElementById("duration");
const episodeTitleInput = document.getElementById("episodeTitle");
const addEpisodeForm = document.getElementById("addEpisodeForm");
const sidebarTitle = document.getElementById("sidebarTitle");
const saveEpisodeBtn = document.getElementById("saveEpisodeBtn");
const seriesId = addEpisodeForm.dataset.seriesId;

// ADD EPISODE
addEpisodeButtons.forEach(button => {
    button.addEventListener("click", function () {
        const seasonId = this.dataset.seasonId;

        // Sidebar title
        sidebarTitle.textContent = "Add New Episode";

        // Button text
        saveEpisodeBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Episode';

        // Form action
        addEpisodeForm.action =`/admin/episodes/${seriesId}/addEpisode`;

        // Clear previous data
        episodeNumberInput.value = "";
        durationInput.value = "";
        episodeTitleInput.value = "";

        // Select clicked season
        seasonSelect.value = seasonId;

        // Open sidebar
        addEpisodeSidebar.classList.add("active");
    });
});

// EDIT EPISODE
editEpisodeButtons.forEach(button => {
    button.addEventListener("click", function () {

        const episodeId = this.dataset.episodeId;
        const seasonId = this.dataset.seasonId;
        const episodeNumber = this.dataset.episodeNumber;
        const duration = this.dataset.duration;
        const episodeTitle = this.dataset.episodeTitle;

        // Sidebar title
        sidebarTitle.textContent = "Edit Episode";

        // Button text
        saveEpisodeBtn.innerHTML ='<i class="fa-solid fa-floppy-disk"></i> Update Episode';

        // Fill existing data
        seasonSelect.value = seasonId;
        episodeNumberInput.value = episodeNumber;
        durationInput.value = duration;
        episodeTitleInput.value = episodeTitle;

        // Form action
        addEpisodeForm.action =`/admin/episodes/${seriesId}/updateEpisode/${episodeId}`;

        // Open same sidebar
        addEpisodeSidebar.classList.add("active");
    });
});

// CLOSE SIDEBAR
closeSidebarBtn.addEventListener("click", function () {
    addEpisodeSidebar.classList.remove("active");
});

// CANCEL
cancelEpisodeBtn.addEventListener("click", function () {
    addEpisodeSidebar.classList.remove("active");
});

// DELETE EPISODE
const deleteEpisodeButtons = document.querySelectorAll(".delete-episode-btn");
deleteEpisodeButtons.forEach(button => {
    button.addEventListener("click", function () {
        const episodeId = this.dataset.episodeId;
        const confirmDelete = confirm("Are you sure you want to delete this episode?");
        if (!confirmDelete) return;

        // Create temporary form
        const form = document.createElement("form");
        form.method = "post";
        form.action = `/admin/episodes/${seriesId}/deleteEpisode/${episodeId}`;
        document.body.appendChild(form);
        addCsrfInput(form);
        form.submit();
    });
});


// ---------- SERVER ERRORS ----------
// The form inputs are plain HTML, so the page forgets what was typed when the server
// rejects the form. Remember the values on submit and put them back after the reload.
addEpisodeForm.addEventListener("submit", function () {
    sessionStorage.setItem("lastEpisodeForm", JSON.stringify({
        seasonId: seasonSelect.value,
        episodeNumber: episodeNumberInput.value,
        duration: durationInput.value,
        episodeTitle: episodeTitleInput.value
    }));
});

// If the server sent back an error, reopen the sidebar so the message is visible
const hasServerError = Array.from(document.querySelectorAll("#addEpisodeSidebar .error"))
    .some(el => el.textContent.trim() !== "");

if (hasServerError) {
    // Stay in "Edit" mode if the request that failed was an update
    if (/\/updateEpisode\/\d+$/.test(window.location.pathname)) {
        addEpisodeForm.action = window.location.pathname;
        sidebarTitle.textContent = "Edit Episode";
        saveEpisodeBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Update Episode';
    }

    // Put back what the admin had typed
    const saved = JSON.parse(sessionStorage.getItem("lastEpisodeForm") || "null");
    if (saved) {
        seasonSelect.value = saved.seasonId;
        episodeNumberInput.value = saved.episodeNumber;
        durationInput.value = saved.duration;
        episodeTitleInput.value = saved.episodeTitle;
    }

    addEpisodeSidebar.classList.add("active");
}