// =====================================
// 1. MOBILE NAVIGATION
// =====================================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// =====================================
// 2. GALLERY FILTERS
// =====================================
const filterButtons = document.querySelectorAll(".filter-button");
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryStatus = document.querySelector(".gallery-status")

function filterGallery(selectedCategory) {
    let visibleCount = 0;
    galleryItems.forEach(function (photo) {
        const category = photo.dataset.category;
        const shouldShow = 
            selectedCategory === "all" ||
            category === selectedCategory
        // use the actual hidden property so the item is removed from the visible layout
            photo.hidden = !shouldShow;
            if (shouldShow) {
                visibleCount++;
            }
        });
        // update the selected filter and its accessibility state
        filterButtons.forEach(function (button) {
            const isSelected =
                button.dataset.filter === selectedCategory;
            button.classList.toggle("active", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });
        // update the small message above the gallery
        if (galleryStatus) {
            const categoryNames = {
                all: "all",
                portrait: "portrait",
                live: "live",
                candid: "candid"
            };
            const categoryName = categoryNames[selectedCategory];
            galleryStatus.textContent =
                "Showing " + visibleCount + " " +
                categoryName + " photograph" +
                (visibleCount === 1 ? "" : "s")
        }
    }
    // attach a click event to every filter
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterGallery(button.dataset.filter);
        });
    });
    // start with all photos visible
    filterGallery("all");

// =====================================
// 3. PHOTO VIEWER
// =====================================
const photoViewer = document.querySelector(".photo-viewer");

if (photoViewer) {
    const viewerImage = photoViewer.querySelector("img");
    const viewerCaption = photoViewer.querySelector(".viewer-caption");
    const viewerClose = photoViewer.querySelector(".viewer-close")
    galleryItems.forEach(function (photo) {
        photo.addEventListener("click", function () {
            // ignore hidden photos
            if (photo.hidden) return
            const image = photo.querySelector("img");
            const caption = photo.querySelector("figcaption");
            if (!image || !image.src) return;
            viewerImage.src = image.src;
            viewerImage.alt = image.alt;
            viewerCaption.textContent = caption
                ? caption.textContent.replace(/\s+/g, " ").trim()
                : image.alt;
            if (!photoViewer.open) {
                photoViewer.showModal();
            }
        });
    });
    viewerClose.addEventListener("click", function() {
        photoViewer.closest();
    });
    photoViewer.addEventListener("click", function (event) {
        if (event.target === photoViewer) {
            photoViewer.closest();
        }
    });
    photoViewer.addEventListener("close", function () {
        viewerImage.removeAttribute("src");
    });
}

// =====================================
// 4. SONG LISTENING NOTES
// =====================================
const songButtons = document.querySelectorAll(".song-button");
const songNoteOutput = document.querySelector(".song-note-output");

songButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        songButtons.forEach(function (song) {
            song.classList.remove("selected");
            song.setAttribute("aria-pressed", "false");
        });
        button.classList.add("selected");
        button.setAttribute("aria-pressed", "true");
        if (songNoteOutput) {
            songNoteOutput.textContent = button.dataset.note;
        }
    });
});

// =====================================
// 5. MISSING IMAGE CHECK
// =====================================
document.querySelectorAll("img").forEach(function (image) {
    image.addEventListener("error", function () {
        console.warn(
            "Image could not be loaded:",
            image.getAttribute("src")
        );
        // keep the empty photo frame visible
        // background colour provides a placeholder
        image.style.opacity = "0";
    });
});

// =====================================
// 6. AUTOMATIC COPYRIGHT YEAR
// =====================================
const footerYear = document.querySelector(".footer > span");

if (footerYear) {
    footerYear.textContent =
        "© " + new Date().getFullYear() + 
        " · A PERSONAL ARCHIVE";
}