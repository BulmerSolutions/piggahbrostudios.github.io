/* Page Directory */

var page = {
  start: 'Home',
  current: 'Home'
};

if (window.location.hash === ''){
  window.location.hash = '#' + page.start;
  document.getElementById(page.start).style.display = "block";
} else {
  document.getElementById(page.start).style.display = "block";
}

var update = function update() {
  //Check to see if the hash is the same as what is page.current
  
  if(window.location.hash.slice(1,window.location.hash.length) !== page.current){
    document.getElementById(page.current).style.display = "none";
    page.current = window.location.hash.slice(1,window.location.hash.length);
    document.getElementById(page.current).style.display = "block";
  }
  
  requestAnimationFrame(update);
};

update();