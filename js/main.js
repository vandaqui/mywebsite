
/*--------- NAVIGATION MENU ---------*/
/*(()=>{
  // attach and event handler to document
  document.addEventListener("click", (event) =>{
    if(event.target.classList.contains('link-item')){
       make sure event.target.hash has a value before overriding defeault behavior
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
      // add hash(#) to url
      window.location.hash = hash;
      }
    }
  })
})();*/

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
        popupImg.src = imgSrc;
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
        // set the project details
        popup.querySelector(".pp-project-details").innerHTML = details;
        // get the project title
        const title = jobsItems[itemIndex].querySelector(".jobs-item-title").innerHTML;
        // set the project title
        popup.querySelector(".pp-title h2").innerHTML = title;
      }
})();

window.addEventListener("load", () =>{
  // preloader
  document.querySelector(".preloader").classList.add("fadeout");
  setTimeout(()=>{
    document.querySelector(".preloader").style.display="none";
  }, 600)
})