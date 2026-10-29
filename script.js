document.addEventListener("DOMContentLoaded", function () {
    // 1. MOBILE NAVIGATION
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
    
    // 2. GALLERY FILTERS
    const filterButtons = document.querySelectorAll(".filter-button");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const galleryStatus = document.querySelector(".gallery-status")
    
    function filterGallery(selectedCategory) {
        let visibleCount = 0;
        
        galleryItems.forEach(function (photo) {
            const category = (photo.dataset.category || "").trim().toLowerCase();
            
            const shouldShow = 
                selectedCategory === "all" ||
                category === selectedCategory;
                
                photo.hidden = !shouldShow;
                
                if (shouldShow) {
                    visibleCount++;
                }
            });
            
            filterButtons.forEach(function (button) {
                const isSelected = button.dataset.filter === selectedCategory;
                
                button.classList.toggle("active", isSelected);
                button.setAttribute("aria-pressed", String(isSelected));
            });
            
            if (galleryStatus) {
                if (selectedCategory === "all") {
                    galleryStatus.textContent = "Showing all " + visibleCount + " photographs";
                } else {
                    galleryStatus.textContent = "Showing " + visibleCount + " " + selectedCategory + " photographs";
                }
            }

            console.log("Gallery filter:", selectedCategory, "| Photos shown:", visibleCount);
        }
        
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                filterGallery(
                    (button.dataset.filter || "all").trim().toLowerCase()
                );
            });
        });

        if (filterButtons.length && galleryItems.length) {
            filterGallery("all");
        } else {
            console.warn("Gallery setup: check .filter-button and .gallery-item in your HTML.")
        }
        
        // 3. PHOTO VIEWER
        const photoViewer = document.querySelector(".photo-viewer");
        
        if (photoViewer) {
            const viewerImage = photoViewer.querySelector("img");
            const viewerCaption = photoViewer.querySelector(".viewer-caption");
            const viewerClose = photoViewer.querySelector(".viewer-close")
            
            galleryItems.forEach(function (photo) {
                photo.addEventListener("click", function () {
                    if (photo.hidden || !viewerImage) return;
                    
                    const image = photo.querySelector("img");
                    const caption = photo.querySelector("figcaption");
                    
                    if (!image) return;
                    
                    viewerImage.src = image.src;
                    viewerImage.alt = image.alt;

                    if (viewerCaption) {
                        viewerCaption.textContent = caption
                            ? caption.textContent.replace(/\s+/g, " ").trim()
                            : image.alt;
                    }
                    
                    if (!photoViewer.open) {
                        photoViewer.showModal();
                    }
                });
            });

            if (viewerClose) {
                viewerClose.addEventListener("click", function() {
                    photoViewer.close();
                });
            }
            
            photoViewer.addEventListener("click", function (event) {
                if (event.target === photoViewer) {
                    photoViewer.close();
                }
            });
            
            photoViewer.addEventListener("click", function (event) {
                if (event.target === photoViewer) {
                    photoViewer.close()
                }
            });

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
        
        // 5. MISSING IMAGE WARNINGS
        document.querySelectorAll("img").forEach(function (image) {
            image.addEventListener("error", function () {
                console.warn("Image could not be loaded:", image.getAttribute("src"));
                image.style.opacity = "0";
            });
        });
        
        // 6. AUTOMATIC COPYRIGHT YEAR
        const footerYear = document.querySelector(".footer > span");
        
        if (footerYear) {
            footerYear.textContent = "© " + new Date().getFullYear() + " · A PERSONAL ARCHIVE";
        }
    });