/**************** Imports ****************/

#include <FastLED.h>

/************** Definitions **************/

#define NUM_LEDS 42
#define strand WS2812B
#define strandPin 6

/********* Import Helper Classes *********/

CRGB leds[NUM_LEDS];
CRGB colors[NUM_LEDS] = {
    CRGB(255,255,0), CRGB(0, 0, 255), CRGB(0, 0, 255), CRGB(0, 0, 255),CRGB(255,255,0),
    CRGB(0,0,255), CRGB(0, 0, 255), CRGB(255,255,0), CRGB(255,255,0),CRGB(0, 0, 255),
    CRGB(255,255,0), CRGB(0, 0, 255), CRGB(255,255,0), CRGB(255,255,0),CRGB(255,255,0),
    CRGB(0, 0, 255), CRGB(0, 0, 255), CRGB(255,255,0), CRGB(0, 0, 255),CRGB(255,255,0),
    CRGB(255,255,0), CRGB(255,255,0), CRGB(255,255,0), CRGB(0, 0, 255),CRGB(255,255,0),
    CRGB(255,255,0), CRGB(255,255,0), CRGB(255,255,0), CRGB(0, 0, 255),CRGB(255,255,0),
    CRGB(255,255,0), CRGB(255,255,0), CRGB(255,255,0), CRGB(0, 0, 255),CRGB(255,255,0),
    CRGB(255,255,0), CRGB(255,255,0), CRGB(255,255,0), CRGB(0, 0, 255),CRGB(255,255,0),
    CRGB(255,255,0), CRGB(255,255,0)
};

/************* Sketch Logic **************/

// Setup callback
void setup() {
    
  FastLED.addLeds<strand, strandPin>(leds, NUM_LEDS);

  for (int i = 0; i < NUM_LEDS; i++) {

    leds[i] = colors[i];
      
  }

  FastLED.setBrightness(30);
  
}

// Loop callback
void loop() {
  FastLED.show();
}
