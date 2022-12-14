function updateCarousel(carousel, minIndex, maxIndex, leftArrow, rightArrow, step) {
    let currentSrc = carousel.getAttribute("src");
    let newIndex = parseInt(currentSrc.slice(-2)) + step;
    if (newIndex < minIndex) {
        newIndex = maxIndex;
    }else if (newIndex > maxIndex){
        newIndex = minIndex;
    }

    let newSrc = currentSrc.slice(0, -2) + (newIndex < 10 ? "0" + newIndex.toString() : newIndex.toString());
    carousel.setAttribute("src", newSrc);

    let newAsset = document.querySelector(newSrc)
    let newWidth = newAsset.getAttribute("width");

    carousel.setAttribute("width", newWidth);
    leftArrow.setAttribute("width", newWidth / 2);
    leftArrow.setAttribute("position", (-newWidth / 4).toString() + " -0.65 0.02");
    rightArrow.setAttribute("width", newWidth / 2);
    rightArrow.setAttribute("position", (newWidth / 4).toString() + " -0.65 0.02");
}

const CarouselMinIndex = 1;
const CarouselMaxIndex = 16;

const LeftArrow = document.querySelector('#ImageCarouselLeftArrowBackgroundEntity');
const RigthArrow = document.querySelector('#ImageCarouselRigthArrowBackgroundEntity');
const ImageCarousel = document.querySelector('#ImageCarouselEntity');

LeftArrow.addEventListener("click", event => {
    updateCarousel(ImageCarousel, CarouselMinIndex, CarouselMaxIndex, LeftArrow, RigthArrow, -1);
});
RigthArrow.addEventListener("click", event => {
    updateCarousel(ImageCarousel, CarouselMinIndex, CarouselMaxIndex, LeftArrow, RigthArrow, 1);
});