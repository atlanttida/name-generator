function initSimpleSliders(selector, autoplayDelay = 3000) {
  // 1. Find all matching elements on the page
  const containers = document.querySelectorAll(selector);

  containers.forEach(container => {
    const images = Array.from(container.querySelectorAll('img'));
    if (images.length === 0) return;

    // 2. Setup Container Styles
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.width = '100%';

    // 3. Create and Setup Track
    const track = document.createElement('div');
    track.style.display = 'flex';
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.width = `${images.length * 100}%`;

    // Move images into the track and format them
    images.forEach(img => {
      img.style.width = `${100 / images.length}%`;
      img.style.height = 'auto';
      img.style.display = 'block';
      track.appendChild(img);
    });
    container.appendChild(track);

    // 4. Create Navigation Buttons
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    prevBtn.innerHTML = '&#10094;';
    nextBtn.innerHTML = '&#10095;';

    const styleButton = (btn, isRight) => {
      Object.assign(btn.style, {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [isRight ? 'right' : 'left']: '15px',
        background: 'rgba(0, 0, 0, 0.4)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10',
        transition: 'background 0.2s',
        outline: 'none'
      });
      btn.onmouseenter = () => btn.style.background = 'rgba(0, 0, 0, 0.7)';
      btn.onmouseleave = () => btn.style.background = 'rgba(0, 0, 0, 0.4)';
    };

    styleButton(prevBtn, false);
    styleButton(nextBtn, true);
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);

    // 5. Localized Slider Logic (Scoped inside the forEach loop)
    let currentIndex = 0;
    let autoplayInterval = null;

    function updateSlider() {
      const offset = -currentIndex * (100 / images.length);
      track.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
    }

    function startAutoplay() {
      if (!autoplayInterval) {
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
      }
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }

    // 6. Event Listeners for this specific slider
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });

    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    container.classList.add("initialized");

    // Start individual autoplay
    startAutoplay();
  });
}

// Initialize all elements with class 'my-slider'
document.addEventListener('DOMContentLoaded', () => {
  initSimpleSliders('.my-slider', 2000);
});