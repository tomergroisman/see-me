#include "SerialMP3Player.h"

#define TX 11
#define RX 10
#define MAX_SAMPLES 1   // The max number of sample type

int SAMPLES_NUMS[] = { 1, 1, 1, 1 };   // The number of samples per sample type

int samples[4][3] = {
  { 9, 9, 9 },    // Red reports
  { 11, 13, 15 },    // Red-Green reports
  { 3, 5, 7 },    // Green-Red reports
  { 1, 1, 1 }     // Green reports
};

SerialMP3Player mp3(RX,TX);

void setup() {
  
  Serial.begin(115200);
  mp3.begin(9600);                      // Start mp3 serial communication
  delay(500);                           // Wait for init

  mp3.sendCommand(CMD_SEL_DEV, 0, 2);   // Select sd-card
  mp3.setVol(20);
  delay(500);                           // Wait for init
  Serial.println("START");

}

void loop() {
  
  if (Serial.available()) {

    Serial.println("Got something!");
    Serial.print("Message: ");
    int i = Serial.read();
    Serial.print("type: ");
    Serial.println(i);
    int j = random(SAMPLES_NUMS[i]);
    Serial.print("sample number: ");
    Serial.println(j);
    Serial.print("sample: ");
    Serial.println(samples[i][j]);
    
    mp3.play(samples[i][j]);

  }
}
