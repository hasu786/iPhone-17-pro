const slides = [
  {
    title: "Dark Aesthetic",
    subtitle: "Sleek and modern interface",
    bgClass: "bg-0",
    imageUrl: "asest\\image\\iPhone-color2.jpg"
  },
  {
    title: "Vibrant Colors",
    subtitle: "Stunning display technology",
    bgClass: "bg-1",
    imageUrl: "asest\\image\\iPhone-chip2.jpg"
  },
  {
    title: "Nature Views",
    subtitle: "Breathtaking wallpapers",
    bgClass: "bg-2",
    imageUrl: "asest\\image\\iPhne-zoom2.jpg"
  },
  {
    title: "Urban Style",
    subtitle: "City life aesthetics",
    bgClass: "bg-3",
    imageUrl: "asest\\image\\iPhone-camera2.jpg"
  },
  {
    title: "Minimalist Design",
    subtitle: "Clean and simple",
    bgClass: "bg-4",
    imageUrl: "asest\\image\\iPhone-highlights2.jpg"
  },
  {
    title: "Colorful Dreams",
    subtitle: "Express your creativity",
    bgClass: "bg-5",
    imageUrl: "asest\\image\\iPhone-intelligence2.jpg"
  }
];

let heroCurrentSlide = 0;
let isAutoPlaying = true;
let heroAutoPlayInterval;

// Elements
const background = document.getElementById('background');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');
const dotsContainer = document.getElementById('dotsContainer');
const controlBtn = document.getElementById('controlBtn');
const heroPrevBtn = document.getElementById('heroPrevBtn');
const heroNextBtn = document.getElementById('heroNextBtn');

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.className = 'dot';
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToHeroSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.dot');

function updateHeroSlide() {
  const current = slides[heroCurrentSlide];
  const prev = slides[(heroCurrentSlide - 1 + slides.length) % slides.length];
  const next = slides[(heroCurrentSlide + 1) % slides.length];

  // Update text
  title.textContent = current.title;
  subtitle.textContent = current.subtitle;

  // Update background
  background.className = `background ${current.bgClass}`;

  // Update images
  centerImage.src = current.imageUrl;
  leftImage.src = prev.imageUrl;
  rightImage.src = next.imageUrl;

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === heroCurrentSlide);
  });
}

function nextHeroSlide() {
  heroCurrentSlide = (heroCurrentSlide + 1) % slides.length;
  updateHeroSlide();
}

function prevHeroSlide() {
  heroCurrentSlide = (heroCurrentSlide - 1 + slides.length) % slides.length;
  updateHeroSlide();
}

function goToHeroSlide(index) {
  isAutoPlaying = false;
  stopHeroAutoPlay();
  heroCurrentSlide = index;
  updateHeroSlide();
}

function startHeroAutoPlay() {
  heroAutoPlayInterval = setInterval(nextHeroSlide, 4000);
}

function stopHeroAutoPlay() {
  clearInterval(heroAutoPlayInterval);
}

function toggleAutoPlay() {
  isAutoPlaying = !isAutoPlaying;
  if (isAutoPlaying) {
    controlBtn.textContent = '⏸ Pause';
    startHeroAutoPlay();
  } else {
    controlBtn.textContent = '▶ Play';
    stopHeroAutoPlay();
  }
}

// Event listeners
heroPrevBtn.addEventListener('click', () => {
  isAutoPlaying = false;
  controlBtn.textContent = '▶ Play';
  stopHeroAutoPlay();
  prevHeroSlide();
});

heroNextBtn.addEventListener('click', () => {
  isAutoPlaying = false;
  controlBtn.textContent = '▶ Play';
  stopHeroAutoPlay();
  nextHeroSlide();
});

controlBtn.addEventListener('click', toggleAutoPlay);

// Start auto play
startHeroAutoPlay();

const featureBtns = document.querySelectorAll('.feature-btn');
const screenContents = document.querySelectorAll('.screen-content');
const phone = document.querySelector('.phone');
const infoPanel = document.querySelector('.info-panel');

let infoTimeout;

featureBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const feature = btn.dataset.feature;

    // Update active button
    featureBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update screen content with animation
    screenContents.forEach(content => {
      content.classList.remove('active');
    });

    // Add slight 3D rotation effect
    phone.style.transform = 'rotateY(5deg)';
    setTimeout(() => {
      phone.style.transform = 'rotateY(0deg)';
    }, 300);

    // Activate new content
    setTimeout(() => {
      const activeContent = document.querySelector(`[data-content="${feature}"]`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    }, 200);

    // Show info panel temporarily
    infoPanel.classList.add('visible');
    clearTimeout(infoTimeout);
    infoTimeout = setTimeout(() => {
      infoPanel.classList.remove('visible');
    }, 3000);
  });
});

// Show info panel on load
setTimeout(() => {
  infoPanel.classList.add('visible');
  setTimeout(() => {
    infoPanel.classList.remove('visible');
  }, 4000);
}, 1000);

// Add your 8 images here
const images = [
  "asest/image/200mm.jpg",
  "asest/image/100mm.jpg",
  "asest/image/48mm.jpg",
  "asest/image/38mm.jpg",
  "asest/image/28mm.jpg",
  "asest/image/24mm.jpg",
  "asest/image/13mm.jpg",
  "asest/image/macro.jpg"
];

const zoomButtons = document.querySelectorAll(".controls button");
const imageElement = document.getElementById("mainImage");

// Button click listener
zoomButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    zoomButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const index = btn.getAttribute("data-index");

    // Fade + zoom animation
    imageElement.style.opacity = 0;
    imageElement.style.transform = "scale(1.08)";

    setTimeout(() => {
      imageElement.src = images[index];
      imageElement.style.opacity = 1;
      imageElement.style.transform = "scale(1)";
    }, 300);
  });
});
const galleryTrack = document.getElementById('galleryCarouselTrack');
const navDotsContainer = document.getElementById('navDots');
const imageCards = document.querySelectorAll('.image-card');
let galleryCurrentIndex = 0;

// Create navigation dots (5 dots for 5 images)
imageCards.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToImage(index));
  navDotsContainer.appendChild(dot);
});

const dotsCarousel = navDotsContainer.querySelectorAll('.dot');

function goToImage(index) {
  galleryCurrentIndex = index;

  // Remove active class from all cards
  imageCards.forEach(card => card.classList.remove('active'));

  // Add active class to selected card
  imageCards[index].classList.add('active');

  // Update active dot
  dotsCarousel.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Optional: Auto-advance through images
let galleryAutoAdvance = setInterval(() => {
  galleryCurrentIndex = (galleryCurrentIndex + 1) % imageCards.length;
  goToImage(galleryCurrentIndex);
}, 4000);

// Pause auto-advance on hover
const galleryCarouselContainer = document.querySelectorAll('.carousel-container')[0];
galleryCarouselContainer.addEventListener('mouseenter', () => {
  clearInterval(galleryAutoAdvance);
});

galleryCarouselContainer.addEventListener('mouseleave', () => {
  galleryAutoAdvance = setInterval(() => {
    galleryCurrentIndex = (galleryCurrentIndex + 1) % imageCards.length;
    goToImage(galleryCurrentIndex);
  }, 4000);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    galleryCurrentIndex = (galleryCurrentIndex - 1 + imageCards.length) % imageCards.length;
    goToImage(galleryCurrentIndex);
  } else if (e.key === 'ArrowRight') {
    galleryCurrentIndex = (galleryCurrentIndex + 1) % imageCards.length;
    goToImage(galleryCurrentIndex);
  }
});
const filterBtns = document.querySelectorAll('.filter-btn');
const photos = document.querySelectorAll('.photo');
let currentFilter = 'original';

const filters = {
  original: 'none',
  vivid: 'saturate(1.5) contrast(1.2) brightness(1.05)',
  dramatic: 'contrast(1.5) brightness(0.9) saturate(1.3)',
};

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Find current and target photos
    const currentPhoto = document.querySelector('.photo.active');
    const targetPhoto = Array.from(photos).find(p => p.getAttribute('data-filter') === filter);

    if (targetPhoto && targetPhoto !== currentPhoto) {
      // Exit animation for current photo
      currentPhoto.classList.add('exit');
      currentPhoto.classList.remove('active');

      // Enter animation for new photo
      setTimeout(() => {
        currentPhoto.classList.remove('exit');
        targetPhoto.classList.add('active');

        // Apply filter
        targetPhoto.style.filter = filters[filter];
      }, 250);
    } else if (currentPhoto) {
      // Just update filter on current photo
      currentPhoto.style.filter = filters[filter];
    }

    currentFilter = filter;
  });
});

// Initialize first photo with original filter
const firstPhoto = document.querySelector('.photo.active');
if (firstPhoto) {
  firstPhoto.style.filter = filters.original;
}

// Add click animation to shutter button
const shutterBtn = document.querySelector('.shutter-btn');
shutterBtn.addEventListener('click', () => {
  const currentPhoto = document.querySelector('.photo.active');
  if (currentPhoto) {
    // Flash effect
    currentPhoto.style.opacity = '0.5';
    setTimeout(() => {
      currentPhoto.style.opacity = '1';
    }, 100);
  }
});
const proCarouselContainer = document.querySelectorAll('.carousel-container')[1];
const proGrid = proCarouselContainer?.querySelector('.carousel-grid');
const proItems = proGrid ? proGrid.querySelectorAll('.carousel-item') : [];
const proButtons = proCarouselContainer?.querySelectorAll('.control-btn') || [];

let proCarouselCurrent = 0;
let proCarouselAutoPlayInterval;

function scrollProIntoView(index) {
  if (!proGrid || !proItems.length) return;
  const target = proItems[index];
  const containerWidth = proGrid.clientWidth;
  const itemWidth = target.clientWidth;
  const offset = target.offsetLeft - (containerWidth - itemWidth) / 2;
  proGrid.scrollTo({ left: offset, behavior: 'smooth' });
}

function goToProSlide(index) {
  if (!proItems.length) return;
  proCarouselCurrent = (index + proItems.length) % proItems.length;

  proItems.forEach(item => item.classList.remove('active', 'animating'));
  proButtons.forEach(btn => btn.classList.remove('active'));

  const activeItem = proItems[proCarouselCurrent];
  const activeBtn = proButtons[proCarouselCurrent];

  if (activeItem) {
    activeItem.classList.add('active', 'animating');
    // remove the animating class after animation ends
    setTimeout(() => activeItem.classList.remove('animating'), 600);
  }
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  scrollProIntoView(proCarouselCurrent);
}

function nextProSlide() {
  goToProSlide(proCarouselCurrent + 1);
}

function startProAutoPlay() {
  if (proCarouselAutoPlayInterval || !proItems.length) return;
  proCarouselAutoPlayInterval = setInterval(nextProSlide, 5000);
}

function stopProAutoPlay() {
  clearInterval(proCarouselAutoPlayInterval);
  proCarouselAutoPlayInterval = null;
}

// Button click handlers
proButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    stopProAutoPlay();
    goToProSlide(index);
    startProAutoPlay();
  });
});

// Initialize and autoplay
goToProSlide(0);
startProAutoPlay();

// Pause on hover
if (proCarouselContainer) {
  proCarouselContainer.addEventListener('mouseenter', stopProAutoPlay);
  proCarouselContainer.addEventListener('mouseleave', startProAutoPlay);
}
const phones = [
  {
    name: 'iPhone 15 Pro Max',
    image: 'asest/image/15 pro max.jpg',
    stats: [
      { label: 'Display', value: '6.7"', desc: 'Super Retina XDR' },
      { label: 'Chip', value: 'A17 Pro', desc: 'Next-gen performance' },
      { label: 'Camera', value: '48MP Main', desc: 'Pro camera system' },
      { label: 'Battery', value: 'Up to 29h', desc: 'video playback' }
    ]
  },
  {
    name: 'iPhone 15 Pro',
    image: 'asest/image/15 pro.jpg',
    stats: [
      { label: 'Display', value: '6.1"', desc: 'Super Retina XDR' },
      { label: 'Chip', value: 'A17 Pro', desc: 'Next-gen performance' },
      { label: 'Camera', value: '48MP Main', desc: 'Pro camera system' },
      { label: 'Battery', value: 'Up to 23h', desc: 'video playback' }
    ]
  },
  {
    name: 'iPhone 15 Plus',
    image: 'asest/image/iPhone 15.jpg',
    stats: [
      { label: 'Display', value: '6.7"', desc: 'Super Retina XDR' },
      { label: 'Chip', value: 'A16 Bionic', desc: 'Powerful performance' },
      { label: 'Camera', value: '48MP Main', desc: 'Advanced dual camera' },
      { label: 'Battery', value: 'Up to 26h', desc: 'video playback' }
    ]
  },
  {
    name: 'iPhone 15',
    image: 'asest/image/iPhone 15.jpg',
    stats: [
      { label: 'Display', value: '6.1"', desc: 'Super Retina XDR' },
      { label: 'Chip', value: 'A16 Bionic', desc: 'Powerful performance' },
      { label: 'Camera', value: '48MP Main', desc: 'Advanced dual camera' },
      { label: 'Battery', value: 'Up to 20h', desc: 'video playback' }
    ]
  },
  {
    name: 'iPhone 14 Pro',
    image: 'asest/image/14 pro max.jpg',
    stats: [
      { label: 'Display', value: '6.1"', desc: 'Super Retina XDR' },
      { label: 'Chip', value: 'A16 Bionic', desc: 'High performance' },
      { label: 'Camera', value: '48MP Main', desc: 'Pro camera system' },
      { label: 'Battery', value: 'Up to 23h', desc: 'video playback' }
    ]
  },
  {
    name: 'iPhone 14',
    image: 'asest/image/iPhone 14.jpg',
    stats: [
      { label: 'Display', value: '6.1"', desc: 'Super Retina XDR' },
      { label: 'Chip', value: 'A15 Bionic', desc: 'Fast performance' },
      { label: 'Camera', value: '12MP Main', desc: 'Dual camera system' },
      { label: 'Battery', value: 'Up to 20h', desc: 'video playback' }
    ]
  },
  {
    name: 'iPhone 13 Pro Max',
    image: 'asest/image/13 pro max.jpg',
    stats: [
      { label: 'Display', value: '6.7"', desc: 'Super Retina XDR' },
      { label: 'Chip', value: 'A15 Bionic', desc: 'Powerful chip' },
      { label: 'Camera', value: '12MP Main', desc: 'Pro camera system' },
      { label: 'Battery', value: 'Up to 28h', desc: 'video playback' }
    ]
  },
  {
    name: 'iPhone 13 Pro',
    image: 'asest/image/13 pro.jpg',
    stats: [
      { label: 'Display', value: '6.1"', desc: 'Super Retina XDR' },
      { label: 'Chip', value: 'A15 Bionic', desc: 'High performance' },
      { label: 'Camera', value: '12MP Main', desc: 'Pro camera system' },
      { label: 'Battery', value: 'Up to 22h', desc: 'video playback' }
    ]
  },
  {
    name: 'iPhone 13',
    image: 'asest/image/iPhone 13.jpg',
    stats: [
      { label: 'Display', value: '6.1"', desc: 'Super Retina XDR' },
      { label: 'Chip', value: 'A15 Bionic', desc: 'Fast performance' },
      { label: 'Camera', value: '12MP Main', desc: 'Dual camera system' },
      { label: 'Battery', value: 'Up to 19h', desc: 'video playback' }
    ]
  }
];

let currentPhone = 0;

const phoneImage = document.getElementById('phoneImage');
const statsGrid = document.getElementById('statsGrid');
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
// use dropdown button as the phone name label
const phoneNameEl = dropdownBtn;

function updatePhone(index) {
  currentPhone = index;
  const phone = phones[index];

  phoneImage.classList.remove('active');
  document.querySelectorAll('.stat-card').forEach(card => card.classList.remove('active'));

  setTimeout(() => {
    phoneImage.querySelector('img').src = phone.image;
    dropdownBtn.textContent = phone.name;

    const statCards = document.querySelectorAll('.stat-card');
    phone.stats.forEach((stat, i) => {
      if (statCards[i]) {
        statCards[i].querySelector('.stat-label').textContent = stat.label;
        statCards[i].querySelector('.stat-value').textContent = stat.value;
        statCards[i].querySelector('.stat-description').textContent = stat.desc;
      }
    });

    setTimeout(() => {
      phoneImage.classList.add('active');
      phoneNameEl.classList.add('active');
      document.querySelectorAll('.stat-card').forEach(card => card.classList.add('active'));
    }, 50);
  }, 300);


}

// initial render
updatePhone(0);



dropdownBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('active');
});

document.querySelectorAll('.dropdown-menu button').forEach(btn => {
  btn.addEventListener('click', () => {
    const phoneIndex = parseInt(btn.dataset.phone);
    updatePhone(phoneIndex);
    dropdownMenu.classList.remove('active');
  });
});

document.addEventListener('click', () => {
  dropdownMenu.classList.remove('active');
});

dropdownMenu.addEventListener('click', (e) => {
  e.stopPropagation();
});
// Feature data
const features = [
  {
    title: "Liquid Glass",
    description: "The new iOS design reflects and mirrors what's beneath it in real time, dynamically adapting to your content across apps and devices.",
    tag: "NEW",
    type: "new",
    hasView: false
  },
  {
    title: "Dynamic Lock Screen",
    description: "A new vibrant Lock Screen. The time dynamically adapts to your photo wallpaper and notifications, keeping your subject in view. When you move your iPhone, your photo comes to life with a new 3D effect.",
    tag: "UPDATED",
    type: "updated",
    hasView: false
  },
  {
    title: "Call Screening",
    description: "Automatically answers unknown callers. Once they share their name and reason for calling, your phone rings and you decide if you want to pick up.",
    tag: "NEW",
    type: "new",
    hasView: true
  },
  {
    title: "Hold Assist",
    description: "Keeps your spot in line while you wait for a live agent and notifies you when they're ready.",
    tag: "NEW",
    type: "new",
    hasView: false
  },
  {
    title: "Polls in Messages",
    description: "Create a poll and let everyone in the conversation contribute and watch as the votes come in.",
    tag: "NEW",
    type: "new",
    hasView: false
  }
];

let currentIndex = 0;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  const images = document.querySelectorAll('.feature-image');
  const buttons = document.querySelectorAll('.nav-button');
  const title = document.querySelector('.feature-title');
  const description = document.querySelector('.feature-description');
  const tag = document.querySelector('.feature-tag');
  const featureView = document.querySelector('.feature-view');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Initialize carousel
  function initializeCarousel() {
    // Set initial active states
    updateFeature(currentIndex);
  }

  // Update feature display
  function updateFeature(index) {
    // Validate index
    if (index < 0 || index >= features.length) return;

    // Get current and next feature
    const currentFeature = features[currentIndex];
    const nextFeature = features[index];

    // Remove active classes from current elements
    images[currentIndex]?.classList.remove('active');
    buttons[currentIndex]?.classList.remove('active');
    [tag, title, description, featureView].forEach(el => {
      if (el) el.classList.remove('active');
    });

    // Add active class to new image
    setTimeout(() => {
      images[index]?.classList.add('active');
    }, 50);

    // Add active class to button
    buttons[index]?.classList.add('active');

    // Update text content
    if (title && description && tag) {
      // Fade out animation
      title.style.transition = 'none';
      description.style.transition = 'none';
      tag.style.transition = 'none';
      featureView.style.transition = 'none';

      // Update content
      title.textContent = nextFeature.title;
      description.textContent = nextFeature.description;
      tag.textContent = nextFeature.tag;
      tag.className = `feature-tag ${nextFeature.type} active`;

      // Show/hide feature view based on feature
      if (nextFeature.hasView) {
        featureView.style.display = 'none';
        setTimeout(() => {
          featureView.classList.add('active');
        }, 100);
      } else {
        featureView.style.display = 'none';
      }

      // Force reflow
      void title.offsetWidth;
      void description.offsetWidth;
      void tag.offsetWidth;

      // Fade in animation
      title.style.transition = '';
      description.style.transition = '';
      tag.style.transition = '';
      featureView.style.transition = '';

      setTimeout(() => {
        [tag, title, description].forEach(el => {
          if (el) el.classList.add('active');
        });
      }, 100);
    }

    // Update current index
    currentIndex = index;
  }

  // Button click handlers
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (index !== currentIndex) {
        updateFeature(index);
      }
    });
  });

  // Arrow navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIndex = (currentIndex - 1 + features.length) % features.length;
      updateFeature(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIndex = (currentIndex + 1) % features.length;
      updateFeature(newIndex);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevBtn?.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn?.click();
    }
  });

  // Initialize the carousel
  initializeCarousel();

  // Add auto-rotate feature (optional)
  let autoRotate = setInterval(() => {
    nextBtn.click();
  }, 5000);

  // Pause auto-rotate on hover
  const showcase = document.querySelector('.showcase');
  showcase.addEventListener('mouseenter', () => {
    clearInterval(autoRotate);
  });

  showcase.addEventListener('mouseleave', () => {
    autoRotate = setInterval(() => {
      nextBtn.click();
    }, 5000);
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.feature-image');
  const buttons = document.querySelectorAll('.nav-button');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;

  // Initialize - show only first image
  images.forEach((img, index) => {
    if (index !== 0) {
      img.classList.remove('active');
    }
  });

  // Update image function
  function updateImage(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    // Remove active class from current
    images[currentIndex].classList.remove('active');
    buttons[currentIndex].classList.remove('active');

    // Add active class to new
    images[index].classList.add('active');
    buttons[index].classList.add('active');

    currentIndex = index;
  }

  // Button click handlers
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => updateImage(index));
  });

  // Arrow navigation
  prevBtn.addEventListener('click', () => updateImage(currentIndex - 1));
  nextBtn.addEventListener('click', () => updateImage(currentIndex + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') updateImage(currentIndex - 1);
    if (e.key === 'ArrowRight') updateImage(currentIndex + 1);
  });

  // Auto rotate (optional - uncomment to enable)
  // let autoRotate = setInterval(() => {
  //     updateImage(currentIndex + 1);
  // }, 4000);

  // // Pause on hover
  // const imageBox = document.querySelector('.image-box');
  // imageBox.addEventListener('mouseenter', () => clearInterval(autoRotate));
  // imageBox.addEventListener('mouseleave', () => {
  //     autoRotate = setInterval(() => {
  //         updateImage(currentIndex + 1);
  //     }, 4000);
  // });
});
document.addEventListener('DOMContentLoaded', function () {
  // Add current year to copyright
  const copyrightElement = document.querySelector('.copyright p');
  if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.innerHTML = `Copyright © ${currentYear} Apple Inc. All rights reserved.`;
  }
});