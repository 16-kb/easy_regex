var referenceText;

(function($) {
  "use strict"; // Start of use strict
  var $whiteList = $("#whiteList");
  var $blackList = $("#blackList");

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Apply input text to main text
  $(document).on('click', '#append_button', function(e){
    referenceText += "<br />"+$("#input_text").val();
    applyText();
  });

  // Clear reference text
  $(document).on('click', '#clear_button', function(e){
    referenceText = "";
    applyText();
    clearQueryList();
  });

  //
  var currentSelectedLetters = "";
  var currentText = "";

  $("#main_text").on('mouseup touchend', function(e){
    e.preventDefault();

    var text = window.getSelection().toString();
    if(!text || !text.replace(/\s/g, '').length)
    {
      return;
    }

    var item = createQueryItem(text);
    $(item).find("i").on("click", function(e)
    {
      item.remove();
    });
    $whiteList
    .append(item)
    .sortable("refresh");
    currentSelectedLetters = text;
  });
  $whiteList.sortable({connectWith: "ul", dropOnEmpty: true});
  $blackList.sortable({connectWith: "ul", dropOnEmpty: true});

  function appendLetter(index)
  {
    if(!selectedIndex.includes(index))
    {
        selectedIndex.push(index);
        var text = currentText[index];
        if(text == null)
        {
          return;
        }
        currentSelectedLetters += text;
    }
  }

  function initializeTouch(referenceText)
  {
    touchState = null;
    currentSelectedLetters = "";
    selectedIndex = [];
    currentText = referenceText;
  }

  function applyText()
  {
    $("#main_text").html(referenceText);
  }

  function clearQueryList()
  {
    $(".queryList").empty();
  }

})(jQuery); // End of use strict


window.addEventListener('DOMContentLoaded', initializeText());

function initializeText()
{
  referenceText = document.querySelector("#main_text").innerHTML;
}

function createQueryItem(text)
{
  var item = document.createElement("li");
  item.setAttribute("class", "queryItem");
  item.textContent = text;
  item.appendChild(createDeleteButton());
  return item;
}

function createDeleteButton()
{
  var button = document.createElement("i");
  button.classList.add("fas", "fa-trash", "queryItemRemove");
  return button;
}
//
// function setTextEvent() {
// document.querySelectorAll('#main_text').forEach(el => {
//     let clean, cursor;
//     el.addEventListener('click', e => {
//         console.log("aaa");
//         let position = window.getSelection().focusOffset;
//         if (cursor && position > cursor)
//             position--;
//         if (clean)
//             el['innerText'] = clean;
//         let textnode = el.firstChild['splitText'](position);
//         clean = textnode.wholeText;
//         cursor = position;
//         el.insertBefore(document.createTextNode('|'), textnode);
//         el['innerText'] = textnode.wholeText;
//     });
// });
// console.log("set event");
// }
