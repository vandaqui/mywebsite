/*--------- PROJECT FILTER AND POPUP ---------*/
(() =>{
      const filterContainer = document.querySelector(".dropdown-el"),
      jobsItemsContainer = document.querySelector(".jobs-items"),
      jobsItems = document.querySelectorAll(".jobs-item"),
      popup = document.querySelector(".jobs-popup-video"),
      prevBtn = popup.querySelector(".pp-prev-video"),
      nextBtn = popup.querySelector(".pp-next-video"),
      closeBtn = popup.querySelector(".pp-close-video"),
      projectDetailsContainer = popup.querySelector(".pp-details-video");
      let itemIndex, slideIndex, videos;

      /* filter jobs items */
      filterContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item") && !event.target.classList.contains("active")){
          // deactivate existing active 'filter-item'
          filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
          // activate new 'filter-item'
          event.target.classList.add("active","outer-shadow");
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
        if(event.target.closest(".jobs-item-inner-video")){
          const jobsItem = event.target.closest(".jobs-item-inner-video").parentElement;
          // get the jobs index
          itemIndex = Array.from(jobsItem.parentElement.children).indexOf(jobsItem);
          videos = jobsItems[itemIndex].querySelector(".jobs-item-img-video iframe").getAttribute("data-videos");
          // convert ideos into array
          videos = videos.split(",");
          if(videos.length === 1){
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
        if(projectDetailsContainer.classList.contains("active")){
          popupDetailsToggle();
        }
      })

      function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
      }

      function popupSlideshow(){
        const imgSrc = videos[slideIndex];
        const popupImg = popup.querySelector(".pp-vid");
        popupImg.src = imgSrc;
        popup.querySelector(".pp-counter-video").innerHTML = (slideIndex+1) + " de " + videos.length;
      }

      //next slide
      nextBtn.addEventListener("click", () =>{
        if(slideIndex === videos.length-1){
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
          slideIndex = videos.length-1
        }
        else{
          slideIndex--;
        }
        popupSlideshow();
      })

      function popupDetails(){
        // get the project details
        const details = jobsItems[itemIndex].querySelector(".jobs-item-details-video").innerHTML;
        popup.querySelector(".pp-project-details-video").innerHTML = details;
        const title = jobsItems[itemIndex].querySelector(".jobs-item-title-video").innerHTML;
      }

   function popupDetails(){
        // if jobs-item-details not exists
        if(!jobsItems[itemIndex].querySelector(".jobs-item-details-video")){
          projectDetailsBtn.style.display = "none";
          return; /* end function execution */
        }
        // get the project details
        const details = jobsItems[itemIndex].querySelector(".jobs-item-details-video").innerHTML;
        // set the project details
        popup.querySelector(".pp-project-details-video").innerHTML = details;
        // get the project title
        const title = jobsItems[itemIndex].querySelector(".jobs-item-title-video").innerHTML;
        // set the project title
        popup.querySelector(".pp-title-video h2").innerHTML = title;
      }
})(); 