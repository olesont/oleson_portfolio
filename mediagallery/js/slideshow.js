document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll("#slideshow .heroshot-img");
    let currentIndex = 0;

    function showNextSlide() {
        slides[currentIndex].style.opacity = "0";
        slides[currentIndex].style.zIndex = "0";
        currentIndex = (currentIndex + 1) % slides.length; 
        slides[currentIndex].style.opacity = "1";
        slides[currentIndex].style.zIndex = "1"; 
    }

    setInterval(showNextSlide, 4000); 
});