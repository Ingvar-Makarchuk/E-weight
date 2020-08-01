wow = new WOW(
    {
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       60,          // default
    mobile:       true,       // default
    live:         true        // default
    }
    )
    wow.init();

let designBtns = document.querySelectorAll('.sendDesign');
designBtns.forEach(item => {
    item.onclick = function(){
        let thisDesignSrc = item.getAttribute('attr-src');
        let thisDesignName = item.getAttribute('attr-design');
        console.log(thisDesignSrc);
        console.log(thisDesignName);
        localStorage.setItem('thisDesignSrc', thisDesignSrc)
        localStorage.setItem('thisDesignName', thisDesignName)
    }
});

var slideInterval = setInterval(slide,3000);
let i = 0;
function slide(){
  let sliderItems = document.querySelectorAll('.reviews-block-item');
  sliderItems[i].classList.remove('reviews-block-item-show')
  i = (i+1)%sliderItems.length;
  sliderItems[i].classList.add('reviews-block-item-show')

}