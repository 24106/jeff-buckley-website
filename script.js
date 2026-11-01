document.addEventListener("DOMContentLoaded", function () {

    // 1. MOBILE NAVIGATION
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links, #primary-navigation");
    
    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
            
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label", 
                isOpen ? "Close navigation" : "Open navigation"
            );
            
            navigation.classList.toggle("Open", isOpen);
            navigation.classList.toggle("is-open", isOpen);
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("open", "is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
                menuToggle.textContent = "☰";
            });
        });
    }
    
    
    // 2. GALLERY FILTERS
    const filterButtons = document.querySelectorAll(".filter-button");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const galleryStatus = document.querySelector(".gallery-status")
    
    function filterGallery(selectedCategory) {
        let visibleCount = 0;
        
        galleryItems.forEach(function (item) {
            const category = (item.dataset.category || "")
                .trim()
                .toLowerCase();
            
            const shouldShow = 
                selectedCategory === "all" ||
                category === selectedCategory;
                
            item.hidden = !shouldShow;
                
            if (shouldShow) visibleCount++;
        });
            
        filterButtons.forEach(function (button) {
            const category = (button.dataset.filter || "all")
                .trim()
                .toLowerCase();

            const isActive = category === selectedCategory;
                
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
            
        if (galleryStatus) {
            galleryStatus.textContent = 
                selectedCategory === "all"
                    ? "Showing all " + visibleCount + " photographs"
                    : "Showing " + visibleCount + " " +
                      selectedCategory + " photographs";
        }
    }
        
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const category = (button.dataset.filter || "all")
                .trim()
                .toLowerCase();

            filterGallery(category);
        });
    });

    if (filterButtons.length && galleryItems.length) {
        filterGallery("all");
    }
        
    // 3. PHOTO VIEWER / CLICK TO ZOOM
    const photoViewer = document.querySelector(".photo-viewer");
        
    if (photoViewer) {
        const viewerImage = photoViewer.querySelector("img");
        const viewerCaption = photoViewer.querySelector(".viewer-caption");
        const viewerClose = photoViewer.querySelector(".viewer-close")

        // open when a gallery photo/button is clicked
        document.addEventListener("click", function (event) {
            const trigger = event.target.closest(".photo-open, .gallery-item");

            if (!trigger) return;

            const galleryItem = trigger.closest(".gallery-item");

            // don't open filtered-out photos
            if (galleryItem && galleryItem.hidden) return;

            const image = trigger.querySelector("img");
            if (!image || !viewerImage) return;
                    
            viewerImage.src = image.currentSrc || image.src;
            viewerImage.alt = image.alt || "Jeff Buckley photograph";

            const figure = trigger.closest("figure");
            const caption = figure
                ? figure.querySelector("figcaption")
                : null;

            if (viewerCaption) {
                viewerCaption.textContent = caption
                    ? caption.textContent.replace(/\s+/g, " ").trim()
                    : image.alt;
            }
                    
            if (!photoViewer.open) {
                photoViewer.showModal();
            }
        });

        // close button
        if (viewerClose) {
            viewerClose.addEventListener("click", function() {
                photoViewer.close();
            });
        }
            
        // close when clicking the dark backdrop
        photoViewer.addEventListener("click", function (event) {
            if (event.target === photoViewer) {
                photoViewer.close();
            }
        });

        // clear the image after closing
        photoViewer.addEventListener("close", function () {
            if (viewerImage) {
                viewerImage.removeAttribute("src");
            }
        });
    }
        
    // 4. SONG LISTENING NOTES
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
                songNoteOutput.textContent = button.dataset.note || "";
            }
        });
    });
        
    // 5. IMAGE LOAD WARNINGS
    document.querySelectorAll("img").forEach(function (image) {
        image.addEventListener("error", function () {
            console.warn(
                "Image could not be loaded:", 
                image.getAttribute("src")
            );
        });
    });
        
    // 6. AUTOMATIC COPYRIGHT YEAR
    const footerYear = document.querySelector(".footer > span");
        
    if (footerYear) {
        footerYear.textContent = 
            "© " + new Date().getFullYear() + " · A PERSONAL ARCHIVE";
    }
});