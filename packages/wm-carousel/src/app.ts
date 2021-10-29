import CarouselItem from "./Carousel_Item";
import { WebMarketsCarousel } from "./wm-carousel";

let carousel: WebMarketsCarousel = document.getElementById("carousel") as WebMarketsCarousel;
carousel.addCarouselItem(new CarouselItem("Mr Nice Guy", "You see, I'm very nice"));
carousel.addCarouselItems([
  new CarouselItem("Mr Mean Guy", "You see, I'm very mean"),
  new CarouselItem("Mr Apathetic Guy", "You see, I'm very apathetic"),
  new CarouselItem("Mr Mean Guy", "You see, I'm very mean"),
  new CarouselItem("Mr Apathetic Guy", "You see, I'm very apathetic"),
  new CarouselItem("Mr Mean Guy", "You see, I'm very mean"),
  new CarouselItem("Mr Apathetic Guy", "You see, I'm very apathetic"),
]);
// carousel.nextSlide();
// setTimeout(carousel.nextSlide, 1000);
