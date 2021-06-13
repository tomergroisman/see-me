/**************** Imports ****************/

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <PubSubClient.h>
#include <FastLED.h>
#include <SoftwareSerial.h>

/************** Definitions **************/

#define NUM_LEDS 61

#define MSG_BUFFER_SIZE 1024
#define buttonPin D5
#define strand WS2812B
#define strandPin 6
#define colorMode GRB

/*********** Wifi Configuration **********/

// Update these with values suitable for your network.
const char* ssid = "IDC-Wireless";
const char* password = "";
//const char* ssid = "SeeMe";
//const char* password = "12345678";

/******** Web Server Configuration *******/

const String host = "18.133.245.223:3000";

/***** Second Serial Configuration /******/

SoftwareSerial SoundSerial(13, 15);

/************ Set Connections ************/

WiFiClient espClient;
PubSubClient mqtt(espClient);
unsigned long lastMsg = 0;
char msg[MSG_BUFFER_SIZE];
uint32_t lastReconnectAttempt = 0;

/********* Variable Declerations *********/

char CLASS_ID[] = "6047c75db313be4c8829b7d5";
int colors[MSG_BUFFER_SIZE];
int reportsAvg;

/********* Import Helper Classes *********/

#include "./helpers/Connections.h"
#include "./helpers/Tree.h"
#include "./helpers/Flasher.h"
Flasher flashers[NUM_LEDS];
CRGB leds[NUM_LEDS];
Tree tree(buttonPin, colors, flashers);

/************* Sketch Logic **************/

// Setup callback
void setup() {
  
  Serial.begin(115200);
  SoundSerial.begin(115200);
  
  connectToWifi();
  colors[0] = -1;

  FastLED.addLeds<strand, strandPin, colorMode>(leds, NUM_LEDS);
  for (int i = 0; i < NUM_LEDS; i++) {

      flashers[i].setLed(&leds[i]);
      
  }

  randomSeed(analogRead(0) ^ analogRead(1) ^ analogRead(2));
  FastLED.setBrightness(50);
  
}

// Loop callback
void loop() {

  tree.update();
  
}
