$(document).ready(function () {
    const $slides = $('.slides');
    const $images = $('.slides img');

    let currentSlide = 0;
    const totalSlides = $images.length;

    function nextSlide() {
        currentSlide++;

        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        $slides.css(
            'transform',
            `translateX(-${currentSlide * 100}%)`
        );
    }

    setInterval(nextSlide, 5000);
});

    const $stats = $('.cards-stat h3 span:first-child');
    let animated = false;

    $(window).on('scroll', function () {
        const topOfWindow = $(window).scrollTop() + $(window).height();
        const topOfStats = $('.cards-stat').offset().top;

        if (topOfWindow > topOfStats) {
            $stats.each(function () {
                const $this = $(this);
                if ($this.hasClass('done')) return;
                $this.addClass('done');
                const targetValue = parseInt($this.data('target'));

                $({ Counter: 0 }).animate({ Counter: targetValue }, {
                    duration: 1500,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    },
                    complete: function () {
                        $this.text(targetValue);
                    }
                });
            });
        } else {
            $stats.removeClass('done');
            $stats.each(function () {
                $(this).text('0');
            });
        }
    });

    let currentSpotlightIndex = 0;
    const $spotlightContainer = $('.spotlight-cards-container');
    const $spotlightCards = $('.spotlight-card');
    const totalSpotlightCards = $spotlightCards.length;

    function updateSpotlightSlider() {
        const percentage = -(currentSpotlightIndex * 100);
        if ($spotlightContainer.length > 0) {
            $spotlightContainer.css({
                'transform': `translateX(${percentage}%)`,
                'transition': 'transform 0.5s ease-in-out'
            });
        }
    }

    $('.spotlight-next').on('click', function () {
        if (totalSpotlightCards > 0) {
            if (currentSpotlightIndex < totalSpotlightCards - 1) {
                currentSpotlightIndex++;
            } else {
                currentSpotlightIndex = 0;
            }
            updateSpotlightSlider();
        }
    });

    $('.spotlight-prev').on('click', function () {
        if (totalSpotlightCards > 0) {
            if (currentSpotlightIndex > 0) {
                currentSpotlightIndex--;
            } else {
                currentSpotlightIndex = totalSpotlightCards - 1;
            }
            updateSpotlightSlider();
        }
    });

$('.timeline-head').on('click', function () {
    const $item = $(this).closest('.timeline-item');
    const $body = $(this).next('.timeline-body');
    const $icon = $(this).find('.tl-toggle-icon');

    if ($item.hasClass('active')) {
        $body.slideUp(300);
        $item.removeClass('active');
        $icon.text('+');
    } else {
        $('.timeline-item.active').find('.timeline-body').slideUp(300);
        $('.timeline-item.active').find('.tl-toggle-icon').text('+');
        $('.timeline-item.active').removeClass('active');

        $body.slideDown(300);
        $item.addClass('active');
        $icon.text('−');
    }
});

$('#cultTabs .cult-tab').on('click', function () {
    $('#cultTabs .cult-tab').removeClass('active');
    $(this).addClass('active');

    const targetPanel = $(this).data('target');

    $('.cult-panel').removeClass('active');

    $('#panel-' + targetPanel).addClass('active');
});

$('#glossarySearch').on('keyup', function () {
    const value = $(this).val().toLowerCase().trim();
    let matchCount = 0;

    $('#glossaryGrid .subpage-card').each(function () {
        const term = $(this).data('term') ? $(this).data('term').toString().toLowerCase() : '';
        const headingText = $(this).find('h4').text().toLowerCase();
        const paragraphText = $(this).find('p').text().toLowerCase();

        if (term.includes(value) || headingText.includes(value) || paragraphText.includes(value)) {
            $(this).show();
            matchCount++;
        } else {
            $(this).hide();
        }
    });

    if (matchCount === 0 && value !== '') {
        $('#noResults').show();
    } else {
        $('#noResults').hide();
    }
});

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});