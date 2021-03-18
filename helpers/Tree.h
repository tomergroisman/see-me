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

                // If the LED if off
                if (all(0)) {

                    for (int i = 0; i < NUM_LEDS; i++) {

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
                        yield();

                    }

                    colors[0] = -1;
                    
                }

                // If the LED is on
                else {

                    // Turn the LED to destroy state
                    if (!one(3)) {

                        for (int i = 0; i < NUM_LEDS; i++) {

                            flashers[i].destroy();
                            yield();

                        }

                    }
                }
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

        // Check if all Leds are on specific state
        bool all(int state) {
            
            for (int i = 0; i < NUM_LEDS; i++) {

                if (flashers[i].getState() != state) {

                    return false;

                }
                yield();

            }

            return true;

        }

        // Check if at least one Led is on specific state
        bool one(int state) {
            
            for (int i = 0; i < NUM_LEDS; i++) {

                if (flashers[i].getState() == state) {

                    return true;

                }
                yield();

            }

            return false;

        }
};
