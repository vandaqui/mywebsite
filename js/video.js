/*--------- PROJECT FILTER AND POPUP ---------*/
(() =>{
      const filterContainer = document.querySelector(".jobs-filter"),
      jobsItemsContainer = document.querySelector(".jobs-items"),
      jobsItems = document.querySelectorAll(".jobs-item"),
      popup = document.querySelector(".jobs-popup"),
      prevBtn = popup.querySelector(".pp-prev"),
      nextBtn = popup.querySelector(".pp-next"),
      closeBtn = popup.querySelector(".pp-close"),
      projectDetailsContainer = popup.querySelector(".pp-details"),
      projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
      let itemIndex, slideIndex, screenshots;

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
        if(projectDetailsContainer.classList.contains("active")){
          popupDetailsToggle();
        }
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
        projectDetailsBtn.style.display ="block";
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

      projectDetailsBtn.addEventListener("click", ()=>{
        popupDetailsToggle();
      })

      function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
          projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
          projectDetailsBtn.querySelector("i").classList.add("fa-plus");
          projectDetailsContainer.classList.remove("active");
          projectDetailsContainer.style.maxHeight = 0 + "px";
        }
        else{
          projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
          projectDetailsBtn.querySelector("i").classList.add("fa-minus");
          projectDetailsContainer.classList.add("active");
          projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
          popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
      }

})();