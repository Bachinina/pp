$(window).on('load', (function () {
  const screenWidth = $(window).width();
  // Брейкпоинты для разрешений
  const media = {
    MD: 767,
    LG: 991,
    XL: 1199,
    XXL: 1439,
  };

  // FILE
  $('form input[type="file"]').change(function () {
    let fileNames = [];
    for (let i = 0; i < $(this).get(0).files.length; ++i) {
      let name = $(this).get(0).files[i].name;

      if (name.length > 25) {
        const lastIndexOf = name.indexOf('.', 0);
        const type = name.substr(lastIndexOf);

        name = `${name.substr(0, 25)}...${type}`;
      }
      fileNames.push(name);
    }

    const result = fileNames.join(", ");
    // $(this).next().text(`Выбрано файлов: ${fileNames.length}`);

    if (result.length > 0) {
      $(this).parent().find('span').text(result);
    } else {
      const placeholder = $(this).parent().attr('data-placeholder');
      $(this).parent().find('span').text(placeholder);
    }
  });


  $('[data-bottom-desc]').each(function () {
    const block = $(this);
    const tabs = [];
    const tabsContent = [];
    const img = [];
    block.find('.right_tabs_seo > ul li').each(function () {
      tabs.push($(this).html());
    });
    block.find('.right_tabs_seo > div').each(function () {
      tabsContent.push($(this).html());
    });
    block.find('.left_img_seo > img').each(function () {
      img.push($(this)[0].currentSrc);
    });

    if (tabs.length > 0) {
      block.html(`
      <div class="container container--content pt-0">
          <div class="top">
            <div class="tabs-wrap">
              <ul class="tabs" data-tabs="tabs-bottom">
              ${tabs.map(function (el, i) {
        return `
                <li class="tabs__toggle" data-tabs-toggle="tab-${i + 1}"><button aria-hidden="true">${el}</button>
                </li>`;
      }).join('')}
              </ul>
            </div>
          </div>

          <div class="tabs-cont" data-tabs-content="tabs-bottom">
          ${tabsContent.map(function (el, i) {
        return `
            <div class="tabs-cont__item" data-tabs-item="tab-${i + 1}">
              <div class="row">
                <div class="col-12 col-md-4 mb-3">
                  <img alt="" src="${img[i]}">
                </div>
                <div class="col-12 col-lg-8">
                  ${el}
                </div>
              </div>
            </div>`;
      }).join('')}
          </div>
        </div>
      `);
    } else {
      block.addClass('bg-gray');
    }
  });

  // TABS
  $('[data-tabs]').each(function () {
    const tabToggles = $(this).children('[data-tabs-toggle]');
    const content = $(`[data-tabs-content='${$(this).attr('data-tabs')}']`);

    let activeTab = 0;

    tabToggles.each(function (i) {
      if ($(this).hasClass('active')) {
        activeTab = i;
      }

      $(this).on('click', function (e) {
        e.preventDefault();

        const tabContent = $(content).children(`[data-tabs-item='${$(this).attr('data-tabs-toggle')}']`);

        // DEL ACTIVE CLASS
        tabToggles.not($(this)).removeClass('active');
        content.children('[data-tabs-item]').removeClass('active');

        // ADD ACTIVE CLASS
        $(this).addClass('active');
        $(tabContent).addClass('active');
      });
    });
    tabToggles[activeTab].click();
  });

  // ACCORDION
  $('[data-acc]').each(function () {
    const acc = $(this);
    const isOne = acc.attr('data-acc-one') === 'true';

    const items = acc.children('[data-acc-item]');
    const btnsWraps = items.children('[data-acc-title-wrap]');
    const btns = btnsWraps.children('[data-acc-title]');

    const bodies = items.children('[data-acc-body]');

    items.each(function () {
      const it = $(this);
      const btnsWrap = $(this).children('[data-acc-title-wrap]');
      const btn = btnsWrap.children('[data-acc-title]');
      const body = $(this).children('[data-acc-body]');

      btn.on('click', function () {
        if (isOne) {
          btns.not($(this)).removeClass('active');
          it.removeClass('active');
          btnsWrap.removeClass('active');
        }

        if ($(this).hasClass('active')) {
          $(this).trigger('blur');
        }

        $(this).toggleClass('active');
        btnsWrap.toggleClass('active');
        it.toggleClass('active');
        if ($(this).hasClass('active')) {
          body.slideDown(500);
        } else {
          body.slideUp(500);
        }
      });
    });

    if (screenWidth <= media.XL) {
      btns.removeClass('active');
      btnsWraps.removeClass('active');
      items.removeClass('active');
    }
  });
  $('[data-acc-title].active').next().slideDown(0);
  $('[data-acc-title-wrap].active').next().slideDown(0);


  // SCROLL ANCHOR
  $("a[href^='#']").on("click", function (e) {
    var fixed_offset = $('.header').outerHeight() + 30;
    // if ($(window).width() <= 1199) {
    // fixed_offset = 35 + 65;
    // }
    $('html,body').stop().animate({
      scrollTop: $(this.hash).offset().top - fixed_offset
    }, 1000);
    e.preventDefault();
    return false;
  });

  // SCROLL TO TOP
  if (screenWidth > media.MD) {
    function scrollToTop() {
      let button = $('[data-scroll-top]');

      $(window).on('scroll', () => {
        if ($(this).scrollTop() >= 250) {
          button.fadeIn();
        } else {
          button.fadeOut();
        }
      });

      button.click(function () {
        $('html, body').animate({
          scrollTop: 0
        }, 800);
      })
    };
    scrollToTop();

  }



  //NUMBER_FORMAT
  function formatNumber(number) {
    let result = number.val();
    result = result.replace(/\s+/g, '');
    result = result.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
    result = result.replace(/^\s/g, '');

    return result;
  };

  // RANGE
  $('[data-range]').each(function () {
    const range = $(this);
    const nameOfInput = `${range.attr('data-range')}`;

    const minInput = $(`[data-range-min="${nameOfInput}"]`);
    const valueInput = $(`[data-range-value='${nameOfInput}']`);

    range.on('input', function () {

      valueInput.val(formatNumber(range))
    });
  });

  // RANK
  $('[data-rank]').each(function () {
    const value = $(this).attr('data-rank-value');
    const items = $(this).find('[data-rank-item]');

    items.each(function (i) {
      if (i < value) {
        $(this).addClass('active');
      }
    })
  });

  // RANK SELECT
  $('[data-rank-select]').each(function () {
    let selectedValue = '';

    const items = $(this).find('[data-rank-item]');
    const input = $($(this).attr('data-rank-input'));

    function onRankMouseover(rank) {
      items.removeClass('active');
      items.each(function (i) {
        if (i <= rank) {
          $(this).addClass('active');
        }
      });
    };

    function onRankMouseout() {
      if (screenWidth > media.XL) {
        items.removeClass('active');
      }
    };

    function onRankClick() {
      items.removeClass('active');
      items.each(function (i) {
        if (i < selectedValue) {
          $(this).addClass('active');
        }
      });
      input.val(selectedValue);
    };


    items.each(function (i) {
      $(this).on('mouseover', function () {
        onRankMouseover(i);
      });
      $(this).on('mouseout', onRankMouseout);

      $(this).on('click', function () {
        selectedValue = $(this).attr('data-rank-value');

        // DEL EVENT LISTENERS
        items.each(function () {
          $(this).off('mouseover');
          $(this).off('mouseout');
        });
        $(this).addClass('active');

        onRankClick();
      });
    })
  });

  // INPUT COUNT
  $('[data-count]').each(function () {
    const input = $(this).find('input');
    const plus = $(this).find('[data-count-plus]');
    const minus = $(this).find('[data-count-minus]');


    minus.on('click', function () {
      if (input.val() > 1) {
        const current = parseInt(input.val());
        input.val(current - 1);
      }
    });
    plus.on('click', function () {
      if (input.val() < parseInt(input.attr('max'))) {
        const current = parseInt(input.val());
        input.val(current + 1);
      }
    });
  });



  //BTNS
  $('[data-btn]').on('click', function () {
    $(this).toggleClass('active');
    $('[data-btn]').not($(this)).removeClass('active');
  });


  // MODAL TOGGLE
  $('[data-toggle-modal]').on('click', function (event) {
    event.stopPropagation();
    $('[data-toggle-modal]').not($(this)).removeClass('active');
    $('[data-modal]').not($(this).attr('data-toggle-modal')).removeClass('active');

    $($(this).attr('data-toggle-modal')).toggleClass('active');
    $(this).toggleClass('active');

    if (!$(this).hasClass('active')) {
      $(this).blur();
    }

    if ($($(this).attr('data-toggle-modal')).hasClass('active')) {
      document.addEventListener('click', closeAll);
    }
  });

  const closeModals = function () {
    $('[data-modal]').removeClass('active');
    $('[data-toggle-modal]').removeClass('active');
    $('[data-toggle-modal]').blur();
    $('[data-open-modal]').blur();
    $('[data-modal]').find('form').trigger("reset");
    $('[data-modal]').find('form .invalid').removeClass('invalid');
    $('body').css({
      'overflow': 'auto',
    });
    document.removeEventListener('click', closeAll);
  }

  const closeAll = function (evt) {
    if (!evt.target.hasAttribute('data-modal') && evt.target.closest('[data-modal]') === null) {
      closeModals();
    }
  };


  // OPEN
  $('[data-open]').each(function () {
    const btn = $(this);
    const btnText = btn.html();
    const elem = $(`[data-opened=${btn.attr('data-open')}]`);

    btn.on('click', function () {
      elem.toggleClass('active');

      if (elem.hasClass('active')) {
        $(this).html(`
      <svg width="12" height="10" fill="none">
        <use xlink:href="#icon-arrow-bottom-up"></use>
      </svg>
      <span>Свернуть</span>
    `)
      } else {
        $(this).html(`${btnText}`);
      }
    });
  });

  // TOGGLE
  $('[data-toggle]').on('click', function () {
    const elem = $(`[data-toggled=${$(this).attr('data-toggle')}]`);
    const otherBtns = $(`[data-toggle=${$(this).attr('data-toggle')}][data-toggle-hidden]`);
    elem.toggleClass('active');

    if (elem.hasClass('active')) {
      otherBtns.addClass('d-none');
    } else {
      otherBtns.removeClass('d-none');
    }
  });



  // MODAL OPENING
  $('[data-open-modal]').on('click', function () {
    const modal = $($(this).attr('data-open-modal'));
    closeModals();
    $(this).blur();
    modal.addClass('active');
  });

  // MODAL CLOSING
  const modals = $('[data-modal]');
  const closeModalsByEsc = (evt) => {
    if (evt.keyCode === 27) {
      closeModals();
    }
  };
  modals.each(function () {
    let modalClose = $(this).find('[data-modal-close]');

    const closeModal = () => {
      $(this).removeClass('active');
      $('[data-toggle-modal]').removeClass('active');
      $('[data-toggle-modal]').blur();

      const form = $(this).find('form');
      if (form) {
        // CLEAR FORM
        form.trigger("reset");
      }
      document.removeEventListener('click', closeAll);
    };

    $(this).on('click', function (e) {
      if ($(e.target).is($(this)) && $(this).find('[data-modal-container]').length) {
        closeModal();
      }
    });

    modalClose.on('click', closeModal);
  });
  $(document).on('keydown', closeModalsByEsc);

  $('[data-toggle-active]').each(function () {
    $(this).on('click', function () {
      $(this).toggleClass('active');
    });
  });

  // VALIDATION
  $('[required]').on("invalid", function (event) {
    $(this).addClass('invalid');
  });

  // RELOAD ON CLICK
  $('[data-reloader]').on('click', function () {
    setTimeout(function () {
      window.location.reload();
    }, 500);
  });


}));

$('[data-cont-tel]').each(function () {
  const cont = $(this);
  const btn = cont.find('[data-cont-btn]');
  btn.on('click', function () {
    cont.addClass('active');
  })
});


$('[data-ukladka-card]').on('change', function () {
  if ($(this).is(':checked')) {
    yaCounter25949018.reachGoal('klick_ukladka_kartochka');
  } else {
    yaCounter25949018.reachGoal('klick_off_ukladka_kartochka');
  }
});

$('[data-ukladka-basket]').on('change', function () {
  if ($(this).is(':checked')) {
    yaCounter25949018.reachGoal('klick_ukladka_korzina');
  } else {
    yaCounter25949018.reachGoal('klick_off_ukladka_korzin');
  }
});

$('[data-open-step]').each(function () {
  $(this).on('click', function () {
    $('[data-modal-step]').removeClass('d-flex');
    $('[data-modal-step]').addClass('d-none');
    $(`[data-modal-step=${$(this).attr('data-open-step')}]`).removeClass('d-none').addClass('d-flex');
  })
});


$('[data-del-btn]').on('click', function () {
  $(this).closest('[data-del-parent]').remove();
})

$('[data-menu-btn-mob]').on('click', function () {
  $(this).toggleClass('active');
  $('[data-menu-mob]').toggleClass('active');
  $('[data-header]').toggleClass('active');
  if ($('[data-header]').hasClass('active')) {
    $('body').addClass('over-hid');
  } else {
    $('body').removeClass('over-hid');
  }
});

$(window).on('resize', function () {
  if ($(window).width() > 1199) {
    $('body').removeClass('over-hid');
  } else if ($('[data-header]').hasClass('active')) {
    $('body').addClass('over-hid');
  }
})


// NEW MENU 
$('[data-catalog]').each(function () {
  // OPEN / CLOSE CATALOG
  const catalog = $(this);
  const btn = $('[data-catalog-btn]');
  const overlay = $('[data-catalog-overlay]');

  let isCatalogOpened = false;

  const onOpen = function () {
    isCatalogOpened = true;
    btn.addClass('active');
    $('body').addClass('drop-opened');
    catalog.addClass('active');

    overlay.on('click', onClose);
    $(document).on('keydown', onCloseByEsc);
  }

  const onClose = function () {
    isCatalogOpened = false;
    btn.removeClass('active');
    $('body').removeClass('drop-opened');
    catalog.removeClass('active');
    setFirstCatalogItemActive();
    openedPanel.removeClass('active');

    overlay.off('click', onClose);
    $(document).off('keydown', onCloseByEsc);
  }

  window.onCloseMenu = onClose;

  const onCloseByEsc = (evt) => {
    if (evt.keyCode === 27) {
      onClose();
    }
  };

  btn.on('click', function () {
    if (isCatalogOpened) {
      onClose();
    } else {
      onOpen();
    }
  });

  //CATALOG ITEMS
  const catalogItems = catalog.find('[data-catalog-item]');
  const catalogLists = catalogItems.map(function () {
    return $($(this).attr('data-catalog-item'));
  });

  // CATALOG MOBILE
  const openedPanel = $('[data-catalog-drop]');
  const openedTitle = $('[data-catalog-opened-title]');
  const btnBack = $('[data-catalog-btn-back]');
  // ______________

  const resetCatalogVisible = function () {
    catalogItems.removeClass('active');
    catalogLists.each(function () {
      $(this).removeClass('active')
    });
  };

  const openCatalogItem = function () {
    const catalogList = $($(this).attr('data-catalog-item'));
    // Замена заголовка в мобилке
    const title = $(this).attr('data-catalog-item-title');
    openedTitle.text(title);
    // ______________

    resetCatalogVisible();
    $(this).addClass('active');
    catalogList.addClass('active');

    openedPanel.addClass('active');
    $('.menu-d__container').addClass('active');
  };

  const setFirstCatalogItemActive = function () {
    resetCatalogVisible();
    const firstCatalogItem = catalog.find('[data-catalog-item]').first();
    firstCatalogItem.addClass('active');
    $(firstCatalogItem.attr('data-catalog-item')).addClass('active');
  };

  btnBack.on('click', function () {
    openedPanel.removeClass('active');
  });


  catalogItems.each(function () {
    $(this).on('mouseover', openCatalogItem);
    $(this).on('focus', openCatalogItem);
  });

  setFirstCatalogItemActive();



});


// POINTS
$('[data-points-block]').each(function () {
  const block = $(this);
  const points = block.find('[data-point]');
  const info = block.find('[data-info]');

  points.each(function () {
    const point = $(this);
    point.on('mouseover', function () {
      points.removeClass('active');
      info.removeClass('active');
      point.addClass('active');
      $(`[data-info=${point.attr('data-point')}]`).addClass('active');
    });
  });
});

// REVIEWS
$('[data-text-wrap]').each(function () {
  if ($(this).closest('[data-slider-reviews]').length > 0) {
    return;
  }
  const wrap = $(this);
  const text = wrap.find('[data-text]');
  const btn = wrap.find('[data-text-btn]');

  if (text.outerHeight() > 51) {
    wrap.addClass('show-more');
  }

  btn.on('click', function () {
    wrap.toggleClass('visible');
  });

  $(window).on('resize', function () {
    wrap.removeClass('show-more');
    if (text.outerHeight() > 51) {
      wrap.addClass('show-more');
    }
  })
});


// CATALOG CARDS
$(function () {
  $('[data-card-item]').each(function () {
    const card = $(this);
    card.css({
      'min-height': $(this).outerHeight(),
    });
  });

  $(window).on('resize', function () {
    $('[data-card-item]').each(function () {
      $(this).css({
        'min-height': 'auto',
      });
    });
    $('[data-card-item]').each(function () {
      const card = $(this);
      card.css({
        'min-height': $(this).outerHeight(),
      });
    });
  });
});

// HEADER
$(function () {
  var header = document.querySelector('.header');
  document.addEventListener('scroll', function (evt) {
    if (pageYOffset > 40) {
      header.classList.remove('on-top');
    } else {
      header.classList.add('on-top');
    }
  });

  if (pageYOffset < 40) {
    header.classList.add('on-top');
  }
});

// PARALLAX

// $(window).scroll(function () {
//   var scrollTop = $(this).scrollTop();
//   // Изменяем позицию фонового изображения в зависимости от прокрутки страницы
//   $('.parallax').css('background-position-y', -(scrollTop * 0.3) + 'px');
// });

// $(window).scroll(function () {
//   var scrollTop = $(this).scrollTop();
//   $('[data-parallax]').css('background-position', 'center ' + scrollTop * 0.5 + 'px');
// });
