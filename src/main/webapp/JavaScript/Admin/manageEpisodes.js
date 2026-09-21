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


// =========================
// ADD EPISODE
// =========================

addEpisodeButtons.forEach(button => {

    button.addEventListener("click", function () {

        const seasonId = this.dataset.seasonId;

        // Sidebar title
        sidebarTitle.textContent = "Add New Episode";

        // Button text
        saveEpisodeBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Episode';

        // Form action
        addEpisodeForm.action =
            `/dashboard/manageEpisodes/${seriesId}/addEpisode`;

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


// =========================
// EDIT EPISODE
// =========================

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
        addEpisodeForm.action =`/dashboard/manageEpisodes/${seriesId}/updateEpisode/${episodeId}`;


        // Open same sidebar
        addEpisodeSidebar.classList.add("active");

    });

});


// =========================
// CLOSE SIDEBAR
// =========================

closeSidebarBtn.addEventListener("click", function () {
    addEpisodeSidebar.classList.remove("active");
});


// =========================
// CANCEL
// =========================

cancelEpisodeBtn.addEventListener("click", function () {
    addEpisodeSidebar.classList.remove("active");
});



// =========================
// DELETE EPISODE
// =========================

const deleteEpisodeButtons = document.querySelectorAll(".delete-episode-btn");
deleteEpisodeButtons.forEach(button => {
    button.addEventListener("click", function () {
        const episodeId = this.dataset.episodeId;
        const confirmDelete = confirm("Are you sure you want to delete this episode?");
        if (!confirmDelete) return;

        // Create temporary form
        const form = document.createElement("form");
        form.method = "post";
        form.action = `/dashboard/manageEpisodes/${seriesId}/deleteEpisode/${episodeId}`;
        document.body.appendChild(form);
        form.submit();
    });

});