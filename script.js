// =====================================
// 1. MOBILE NAVIGATION
// =====================================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// close the menu when a navigation link is selected
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// =====================================
// 2. PHOTO GALLERY FILTERS
// =====================================
const filterButtons = document.querySelectorAll(".filter-button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        // remove the active state from every filter
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });
        // highlight the selected filter
        button.classList.add("active");
        const selectedCategory = button.CDATA_SECTION_NODE.filter;
        galleryItems.forEach(function (photo) {
            const category = photo.CDATA_SECTION_NODE.category;
            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {
                photo.classList.remove("hidden");
            } else {
                photo.classList.add("hidden");
            }
        });
    });
});

// =====================================
// 3. ENLARGED PHOTO VIEWER
// =====================================
const photoViewer = document.querySelector(".photo-viewer");
const viewerImage = photoViewer.querySelector("img");
const viewerCaption = document.querySelector(".viewer-caption");
const viewerClose = document.querySelector(".viewer-close");

galleryItems.forEach(function (photo) {
    photo.addEventListener("click", function () {
        const image = photo.querySelector("img");
        const caption = photo.querySelector("figcaption");

        // copy the selected photo into the viewer
        viewerImage.src = image.src;
        viewerImage.alt = image.alt;

        // copy the caption underneath the enlarged image
        viewerCaption.textContent = caption.textContent
            .replace(/\s+/g, " ")
            .trim();
        photoViewer.showModal();
    });
});

// close using the close button
viewerClose.addEventListener("click", function () {
    photoViewer.closest();
});

// close if the user clicks the dark background
photoViewer.addEventListener("click", function (event) {
    if (event.target === photoViewer) {
        photoViewer.closest();
    }
});

// clear the enlarged image when the viewer closes
photoViewer.addEventListener("close", function () {
    viewerImage.src = "";
});

// =====================================
// 4. INTERACTIVE SONG NOTES
// =====================================
const songButtons = document.querySelectorAll(".song-button");
const songNoteOutput = document.querySelector(".song-note-output");

songButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        // remove the selected state from other songs
        songButtons.forEach(function (song) {
            song.classList.remove("selected");
        });

        // highlight the chosen song
        button.classList.add("selected");

        //display its listening note
        songNoteOutput.textContent = button.dataset.note;
    });
});

// =====================================
// 5. CHECK FOR MISSING PHOTOS
// =====================================
const allImages = document.querySelectorAll("img");

allImages.forEach(function (image) {
    image.addEventListener("error", function () {
        // keep the layout intact when a photo is missing
        image.style.visibility = "hidden";
        console.warn(
            "Photo not found. Check this filename:",
            image.getAttribute("src")
        );
    });
});

// =====================================
// 6. FOOTER YEAR
// =====================================
// automatically update the copyright year
const footerYear = document.querySelector(".footer > span");

footerYear.textContent =
"© " + new Date().getFullYear() + " · A PERSONAL ARCHIVE";