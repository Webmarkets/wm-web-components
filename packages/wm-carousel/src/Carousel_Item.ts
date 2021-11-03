/**
 * Regulates carousel data
 */
export default class CarouselItem {
  title: string;
  description: string;
  style: string = "display:none;";

  // constructor() {
  //   this.title = "";
  //   this.description = "";
  // }

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
