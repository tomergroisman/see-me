#ifndef  FLASHER_H  
#include "Flasher.h"
#endif

class Tree {

    private:

        int rPin;
        int gPin;
        int bPin;
        int buttonPin;
        Flasher* leds;
        unsigned long lastClick;

    public:

        Tree(int r, int g, int b, int button, Flasher *ledsList) {

            rPin = r;
            gPin = g;
            bPin = b;
            buttonPin = button;
            leds = ledsList;
            lastClick = millis();

            pinMode(buttonPin, INPUT_PULLUP);

        }

        void update() {

            // Check for initiated update
            int buttonState = digitalRead(buttonPin);
            if (buttonState == LOW && millis() - lastClick > 1500) {

                Serial.println("pull update");
                lastClick = millis();
                mqtt.publish(updateTopic, CLASS_ID);

            }

            // Update leds
            for (int i = 0; i < NUM_LEDS; i++) {

                leds[i].update();

            }

            // Update tree lights state
            if (lights[0] != -1) {
                
                Serial.print("updating... ");
                int i = 0;
                while (lights[i] != -1) {

                    // If the LED if off
                    if (leds[NUM_LEDS  - 1].getState() == 0) {

                        Serial.print(lights[0]);
                        Serial.print(" ");
                        Serial.print("R: ");
                        Serial.print(lights[i] >> 16);
                        Serial.print(" G: ");
                        Serial.print((lights[i] & 0x00ff00) >> 8);
                        Serial.print(" B: ");
                        Serial.print(lights[i] & 0x0000ff);
                        
                        // Flaser led
                        leds[i] = Flasher(lights[i] >> 16, (lights[i] & 0x00ff00) >> 8, lights[i] & 0x0000ff);
                        leds[i].start();
                        i++;
                        
                    }

                    // If the LED is on
                    else {

                        // Turn the LED to destroy state
                        if (leds[NUM_LEDS  - 1].getState() != 3) {
                            for (int j = 0; j < NUM_LEDS; j++) {

                                leds[j].destroy();

                            }
                        }
                        // Turn off the LED
                        else {
                            for (int i = 0; i < NUM_LEDS; i++) {

                                leds[i].update();

                            }
                        }
                        
                    }

                }
                Serial.println();
                lights[0] = -1;

            }

        }
};
