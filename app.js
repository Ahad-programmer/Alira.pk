
  // fade in grid items  ==================================

  $(document).on("scroll", function () {
    var pageTop = $(document).scrollTop()
    var pageBottom = pageTop + $(window).height()
    var tags = $(".fadein")

    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i]

      if ($(tag).offset().top < pageBottom) {
        $(tag).addClass("visible")
      } else {
        $(tag).removeClass("visible")
      }
    }
  })
  
  const user = {
    category: "men",
    price: "99",
    image: "20",
    title:"shoes",
  };
  
  
  localStorage.setItem("addtocard", JSON.stringify(user));
  
  const savedUser = JSON.parse(localStorage.getItem("addtocard"));

  console.log(savedUser.category)
  
  