#ifndef  FLASHER_H  
#include "Flasher.h"
#endif

class Tree {

    private:

        int rPin;
        int gPin;
        int bPin;
        int buttonPin;
        int* colors;
        Flasher* flashers;
        unsigned long lastClick;

    public:

        Tree(int r, int g, int b, int _buttonPin, int* _colors, Flasher* _flashers) {

            rPin = r;
            gPin = g;
            bPin = b;
            colors = _colors;
            buttonPin = _buttonPin;
            flashers = _flashers;

            lastClick = millis();
            pinMode(buttonPin, INPUT_PULLUP);

        }

        void update() {

            // Update leds
            for (int i = 0; i < NUM_LEDS; i++) {

                flashers[i].update();
                yield();

            }

            checkUpdateRequest();

            // Update tree colors payload list
            if (colors[0] != -1) {
                
                Serial.print("updating... ");
                int i = 0;
                while (colors[i] != -1) {

                    // If the LED if off
                    if (flashers[NUM_LEDS  - 1].getState() == 0) {

                        Serial.print(" ");
                        Serial.print("R: ");
                        Serial.print(colors[i] >> 16);
                        Serial.print(" G: ");
                        Serial.print((colors[i] & 0x00ff00) >> 8);
                        Serial.print(" B: ");
                        Serial.print(colors[i] & 0x0000ff);
                        
                        // Flaser led
                        flashers[i].setColor(colors[i] >> 16, (colors[i] & 0x00ff00) >> 8, colors[i] & 0x0000ff);
                        flashers[i].start();
                        i++;
                        yield();
                        
                    }

                    // If the LED is on
                    else {

                        // Turn the LED to destroy state
                        if (flashers[NUM_LEDS  - 1].getState() != 3) {
                            for (int j = 0; j < NUM_LEDS; j++) {

                                flashers[j].destroy();
                                yield();

                            }
                        }
                        // Turn off the LED
                        else {
                            for (int i = 0; i < NUM_LEDS; i++) {

                                flashers[i].update();
                                yield();

                            }
                        }
                        
                    }

                }
                Serial.println();
                colors[0] = -1;

            }

        }

        // Check for lunch update
        void checkUpdateRequest() {

            int buttonState = digitalRead(buttonPin);
            if (buttonState == LOW && millis() - lastClick > 1500) {

                Serial.println("pull update");
                lastClick = millis();
                mqtt.publish(updateTopic, CLASS_ID);

            }

        }
};
