$(document).ready(function () {
  $.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
  };

  // SLIDERS
  const screenWidth = $(document).width();
  const prevArrow = `
  <button type="button" class="slick-prev" aria-hidden="true">
    <svg width="48" height="16">
      <use xlink:href="#icon-arrow-prev"></use>
    </svg>
  </button>`;
  const nextArrow = `
  <button type="button" class="slick-next" aria-hidden="true">
    <svg width="48" height="16">
      <use xlink:href="#icon-arrow-next"></use>
    </svg>
  </button>`;


  // Брейкпоинты для разрешений
  const media = {
    MD: 767,
    LG: 991,
    XL: 1199,
    XXL: 1439,
  };

  const counter = function (slider, i) {
    const current = i + 1;
    const total = slider.slideCount;

    return (
      `<span class="current">${current}</span>/
      <span class="total">${total}</span>`
    );
  };


  $('[data-main-slider]').each(function () {
    $(this).slick({
      appendArrows: $('[data-main-slider-wrap]').find('[data-main-slider-btns]'),
      appendDots: $('[data-main-slider-wrap]').find('[data-main-slider-counter]'),
      fade: true,
      speed: 1100,
      draggable: false,
      waitForAnimate: true,
      lazyLoad: 'ondemand',
      prevArrow: prevArrow,
      nextArrow: nextArrow,
      dots: true,
      autoplay: true,
      autoplaySpeed: 5000,
      customPaging: counter,
      responsive: [{
        breakpoint: 1199,
        settings: {
          draggable: true,
        }
      }]
    });
  });


  $('[data-prod-slider]').each(function () {
    $(this).slick({
      fade: true,
      accessibility: false,
      speed: 800,
      draggable: false,
      waitForAnimate: true,
      dots: true,
      arrows: true,
      prevArrow: prevArrow,
      swipeToSlide: true,
      nextArrow: nextArrow,
      autoplay: false,
      autoplaySpeed: 5000,
      responsive: [{
        breakpoint: 1199,
        settings: {
          draggable: true,
          speed: 150,
          fade: false,
        }
      }]
    });
  });


  $('[data-slider]').each(function () {
    const slider = $(this);

    // Общие настройки атрибутов для всех слайдеров: количество слайдов на разрешениях, зацикленность
    // _____________________________________
    const isLooped = slider.hasAttr('data-loop') ? slider.attr('data-loop') === "true" : true;
    const isFaded = slider.hasAttr('data-fade') ? slider.attr('data-fade') === "true" : false;
    const isVariableWidth = slider.attr('data-variable') === 'true';
    const isDotted = slider.attr('data-dots') === 'true';
    const isDottedDesk = slider.attr('data-dots-desktop') === 'true';
    // _____________________________________

    // Количество слайдов на разрешениях
    // slideCount - количество слайдов, отображаемое в мобилке

    slider.settings = {};
    slider.settings.slideCount = slider.attr('data-slide-count');
    slider.settings.slideCountMD = slider.attr('data-slide-md-count');
    slider.settings.slideCountLG = slider.attr('data-slide-lg-count');
    slider.settings.slideCountXL = slider.attr('data-slide-xl-count');
    slider.settings.slideCountXXL = slider.attr('data-slide-xxl-count');
    slider.settings.slideCountXXXL = slider.attr('data-slide-xxxl-count');
    // _____________________________________



    // Если слайдер в табах - вынос кнопок за пределы
    // Все кнопки вынесены за пределы слайдера. Контейнер для кнопок
    let buttonContainer = $(this).closest('[data-slider-container]').find('[data-slider-btns]');

    // Если слайдер в табах, задаем обертки для кнопок. Они будут скрываться и открывать по очереди
    const isInTab = $(this).closest('[data-tabs-item]:not(".arrows-in")').not('.arrows-in').length > 0;

    if (isInTab) {
      var tabNumber = $(this).closest('[data-tabs-item]').attr('data-tabs-item');
      var wrapForBtns = $(`<div data-tabs-item='${tabNumber}'></div>`);
      buttonContainer = buttonContainer.append(wrapForBtns);
    }

    slider.settings.isLooped = isLooped;
    slider.settings.isFaded = isFaded;
    slider.settings.isVariableWidth = isVariableWidth;
    slider.settings.isDotted = isDotted;
    slider.settings.buttonContainer = isInTab ? buttonContainer.find(`[data-tabs-item ='${tabNumber}']`) : buttonContainer.length > 0 ? buttonContainer : slider;
    // _____________________________________
    // Индивидуальные настройки слайдеров

    if (slider.hasAttr('data-simple-slider')) {
      $(this).slick({
        accessibility: false,
        speed: slider.settings.isFaded ? 900 : 600,
        draggable: true,
        fade: isFaded,
        slidesToShow: slider.settings.slideCountXXXL ? slider.settings.slideCountXXXL : (slider.settings.slideCountXXL ? slider.settings.slideCountXXL : slider.settings.slideCount),
        dots: isDottedDesk ? true : false,
        arrows: true,
        prevArrow: prevArrow,
        swipeToSlide: true,
        nextArrow: nextArrow,
        variableWidth: !!slider.settings.isVariableWidth,
        infinite: !!slider.settings.isLooped,
        appendArrows: slider.settings.buttonContainer,
        responsive: [{
          breakpoint: 1919,
          settings: {
            speed: 600,
            slidesToShow: slider.settings.slideCountXXXL ? slider.settings.slideCountXXXL : slider.settings.slideCountXXL
          }
        },
        {
          breakpoint: media.XXL,
          settings: {
            speed: 600,
            slidesToShow: slider.settings.slideCountXXL ? slider.settings.slideCountXXL : slider.settings.slideCount
          }
        }, {
          breakpoint: media.XL,
          settings: {
            draggable: true,
            speed: 600,
            arrows: true,
            dots: isDotted,
            slidesToShow: slider.settings.slideCountXL ? slider.settings.slideCountXL : slider.settings.slideCount
          }
        }, {
          breakpoint: media.LG,
          settings: {
            draggable: true,
            speed: 600,
            arrows: true,
            dots: isDotted,
            slidesToShow: slider.settings.slideCountLG ? slider.settings.slideCountLG : slider.settings.slideCount
          }
        }, {
          breakpoint: media.MD,
          settings: {
            dots: isDotted,
            arrows: true,
            slidesToShow: slider.settings.slideCountMD ? slider.settings.slideCountMD : slider.settings.slideCount
          }
        }, {
          breakpoint: 575,
          settings: {
            slidesToShow: slider.settings.slideCount,
            dots: isDotted,
            arrows: !isDotted,
          }
        }]
      });

      if (isInTab) {
        let addedBtns = $(`[data-tabs-item ='${tabNumber}']`).find('[data-slider-added-buttons]');
        if (addedBtns.length > 0) {
          addedBtns.find('.slick-next').on('click', function () {
            var next = slider.slick('slickNext');
            slider.slick('slickGoTo', next);
          });
          addedBtns.find('.slick-prev').on('click', function () {
            var prev = slider.slick('slickPrev');
            slider.slick('slickGoTo', prev);
          });
        }
      }
    }


    if (slider.hasAttr('data-slider-reviews')) {
      // $(this).on('init', function () {
      $(this).find($('[data-text-wrap]')).each(function () {
        const wrap = $(this);
        const text = wrap.find('[data-text]');
        const btn = wrap.find('[data-text-btn]');

        if (text.outerHeight() > 102) {
          wrap.addClass('show-more');
        }

        btn.on('click', function () {
          wrap.toggleClass('visible');
        });

        $(window).on('resize', function () {
          wrap.removeClass('show-more');
          if (text.outerHeight() > 102) {
            wrap.addClass('show-more');
          }
        })
      })
      // })
    }

    if (slider.hasAttr('data-compl-slider')) {
      $(this).slick({
        accessibility: false,
        speed: 600,
        draggable: false,
        dots: false,
        arrows: true,
        prevArrow: prevArrow,
        swipeToSlide: true,
        nextArrow: nextArrow,
        variableWidth: true,
        infinite: !!slider.settings.isLooped,
        appendArrows: slider.settings.buttonContainer,
        responsive: [{
          breakpoint: 1199,
          settings: {
            draggable: true,
            speed: 150,
          }
        }, {
          breakpoint: 767,
          settings: {
            dots: isDotted,
            arrows: !isDotted,
            variableWidth: false,
            slideCount: 1,
            adaptiveHeight: true
          }
        }]
      });
    }
  });


});
