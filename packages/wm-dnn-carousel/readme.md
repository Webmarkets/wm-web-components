# Carousel Component

## Overview

This component is intended to generate a carousel with slotted elements, without breaking DNN.

## Example

```html
<wm-dnn-carousel num-cards="3" transition-time="500" card-breakpoints="{'768':1,'1440':2,'3840':3}" controls-style="arrows" no-loop auto-play auto-play-interval="10000">
  <div card>
    <div class="extra-cool-card">
      <h1>Extra Cool Card One</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eu blandit consectetur, nisl nunc euismod nisi, vitae porttitor nisl nunc euismod nisi.</p>
    </div>
  </div>
  <div card>
    <img src="src/assets/placeholder.jpg" alt="" />
  </div>
</wm-dnn-carousel>
```
