#include "SerialMP3Player.h"

#define TX 11
#define RX 10

SerialMP3Player mp3(RX,TX);

void setup() {
  
  Serial.begin(115200);
  mp3.begin(9600);                      // Start mp3 serial communication
  delay(500);                           // Wait for init

  mp3.sendCommand(CMD_SEL_DEV, 0, 2);   // Select sd-card
  mp3.setVol(15);
  delay(500);                           // Wait for init
  Serial.println("START");

}

void loop() {
  
  if (Serial.available()) {

    Serial.println("Got something!");
    Serial.print("Message: ");
    int n = Serial.read();
    Serial.println(n);
    mp3.play(n);

  }
}
