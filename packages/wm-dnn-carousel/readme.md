# Carousel Component

## Overview

This component is intended to generate a carousel with slotted elements.

## Example

```html
<wm-carousel .num-cards="3" auto-play-interval="1000" transition-time="500" card-breakpoints="{'768':1,'1440':2}">
  <style slot="carousel-style">
    .extra-cool-card {
      padding: 1rem;
      background-color: #efefef;
      border-radius: 1rem;
    }

    img {
      max-width: 100%;
      height: auto;
    }
  </style>
  <div class="extra-cool-card" slot="carousel-items">
    <h1>Extra Cool Card</h1>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod consequatur ullam perferendis impedit assumenda, quibusdam commodi placeat maxime voluptates quia asperiores optio est quo nobis at voluptatum illo ratione nam. Facilis beatae animi, praesentium nostrum cumque sint at commodi ipsam ab quis totam esse cupiditate minus reprehenderit et, quidem consectetur sunt quas sapiente error necessitatibus blanditiis numquam omnis! Dolor, cupiditate. Culpa repudiandae animi ratione, mollitia dolorem dicta ducimus! Facilis necessitatibus recusandae sed voluptatibus, ipsa sunt id vitae quaerat dignissimos in quisquam officia explicabo expedita deserunt quas deleniti blanditiis dolorem ratione.</p>
  </div>
  <img src="src/assets/placeholder.jpg" slot="carousel-items" alt="" />
</wm-carousel>
```
