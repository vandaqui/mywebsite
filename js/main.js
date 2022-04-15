
/*--------- NAVIGATION MENU ---------*/
(()=>{
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
  navMenu = document.querySelector(".nav-menu"),
  closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);
  
  function showNavMenu(){
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu(){
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function fadeOutEffect(){
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() =>{
      document.querySelector(".fade-out-effect").classList.remove("active");
    },300)
  }
  // attach and event handler to document
  document.addEventListener("click", (event) =>{
    if(event.target.classList.contains('link-item')){
      /* make sure event.target.hash has a value before overriding defeault behavior*/
      if(event.target.hash !==""){
        // prevent default anchor click behavior
        event.preventDefault();
        const hash = event.target.hash;
        // deactivate existing active "section"
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // activate new section
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        // deactivate existing active navigation menu
        navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
        navMenu.querySelector(".active").classList.remove("active","inner-shadow");
        /* if clicked 'link-item' is contained whitin the navigation menu */
        if (navMenu.classList.contains("open")){
        // activate new navigation menu 'link-item'
        event.target.classList.add("active","inner-shadow");
        event.target.classList.remove("outer-shadow","hover-in-shadow");
        // hide navtigation menu
        hideNavMenu();
      }
      else{
        let navItems = navMenu.querySelectorAll(".link-item");
        navItems.forEach((item) =>{
          if(hash === item.hash){
            // activate new navigation menu 'link-item'
            item.classList.add("active", "inner-shadow");
            item.classList.remove("outer-shadow", "hover-in-shadow");
        }
      })
      fadeOutEffect();
      }
      // add hash(#) to url
      window.location.hash = hash;
      }
    }
  })

})();


/*--------- ABOUT SECTION ---------*/
(() =>{
  const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");
  /* if event.target contains 'tab-item' class and not contains 'active' class */
  tabsContainer.addEventListener("click", (event) => {
    if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")){
      const target = event.target.getAttribute("data-target");
        // deactivate existing active 'tab item'
      tabsContainer.querySelector(".active").classList.remove("active");
        // activate new 'tab-item'
      event.target.classList.add("active");
        // deactivate existing active 'tab-content'
      aboutSection.querySelector(".tab-content.active").classList.remove("active");
        // activate new 'tab-content'
      aboutSection.querySelector(target).classList.add("active");
    }
  })
})();

function bodyScrollingToggle(){
  document.body.classList.toggle("bodyScrollingToggle");
}

/*--------- PROJECT FILTER AND POPUP ---------*/

(() =>{
      const filterContainer = document.querySelector(".jobs-filter"),
      jobsItemsContainer = document.querySelector(".jobs-items"),
      jobsItems = document.querySelectorAll(".jobs-item"),
      popup = document.querySelector(".jobs-popup"),
      prevBtn = popup.querySelector(".pp-prev"),
      nextBtn = popup.querySelector(".pp-next"),
      closeBtn = popup.querySelector(".pp-close");
      let itemIndex, slideIndex, screenshots;

      /* filter jobs items */
      filterContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item") && !event.target.classList.contains("active")){
          // deactivate existing active 'filter-item'
          filterContainer.querySelector(".active").classList.remove("active");
          // activate new 'filter-item'
          event.target.classList.add("active");
          const target = event.target.getAttribute("data-target");
          jobsItems.forEach((item) =>{
            if(target === item.getAttribute("data-category") || target === 'all'){
              item.classList.remove("hide");
              item.classList.add("show");
            }
            else{
              item.classList.remove("show");
              item.classList.add("hide");
            }
          })
        }
      })

      jobsItemsContainer.addEventListener("click", (event)=>{
        if(event.target.closest(".jobs-item-inner")){
          const jobsItem = event.target.closest(".jobs-item-inner").parentElement;
          // get the jobs index
          itemIndex = Array.from(jobsItem.parentElement.children).indexOf(jobsItem);
          screenshots = jobsItems[itemIndex].querySelector(".jobs-item-img img").getAttribute("data-screenshots");
          // convert screenshots into array
          screenshots = screenshots.split(",");
          if(screenshots.length === 1){
            prevBtn.style.display="none";
            nextBtn.style.display="none";
          }
          else{
            prevBtn.style.display="block";
            nextBtn.style.display="block";
          }
          slideIndex = 0;
          popupToggle();
          popupSlideshow();
          popupDetails();
        }
      })

      closeBtn.addEventListener("click", () =>{
        popupToggle();
      })

      function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
      }

      function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        /* activate loader until the popupImg loaded*/ 
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
          // deactivate loader afer popupImg loaded
          popup.querySelector(".pp-loader").classList.remove("active");
        }
          popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " de " + screenshots.length;
      }

      //next slide
      nextBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
          slideIndex = 0;
        }
        else{
          slideIndex++;
        }
        popupSlideshow();
      })

      // prev slide
      prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
          slideIndex = screenshots.length-1
        }
        else{
          slideIndex--;
        }
        popupSlideshow();
      })

      function popupDetails(){
        // get the project details
        const details = jobsItems[itemIndex].querySelector(".jobs-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = jobsItems[itemIndex].querySelector(".jobs-item-title").innerHTML;
      }

      function popupDetails(){
        // if jobs-item-details not exists
        if(!jobsItems[itemIndex].querySelector(".jobs-item-details")){
          projectDetailsBtn.style.display = "none";
          return; /* end function execution */
        }
        // get the project details
        const details = jobsItems[itemIndex].querySelector(".jobs-item-details").innerHTML;
        // set the project details
        popup.querySelector(".pp-project-details").innerHTML = details;
        // get the project title
        const title = jobsItems[itemIndex].querySelector(".jobs-item-title").innerHTML;
        // set the project title
        popup.querySelector(".pp-title h2").innerHTML = title;
        // get the project category
        const category = jobsItems[itemIndex].getAttribute("data-category");
        // set the project category
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
      }
})();

(() =>{
  const sections = document.querySelectorAll(".section");
  sections.forEach((section)=>{
    if(!section.classList.contains("active")){
     section.classList.add("hide");
    }
  })
})();

window.addEventListener("load", () =>{
  // preloader
  document.querySelector(".preloader").classList.add("fadeout");
  setTimeout(()=>{
    document.querySelector(".preloader").style.display="none";
  }, 600)
})