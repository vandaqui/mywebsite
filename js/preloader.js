window.addEventListener("load", () =>{
  // preloader
  document.querySelector(".preloader").classList.add("fadeout");
  setTimeout(()=>{
    document.querySelector(".preloader").style.display="none";
  }, 600)
})