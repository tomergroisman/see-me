#ifndef  FLASHER_H
#include "Flasher.h"
#endif

#ifndef  STATE_MACHINE_H
#include "StateMachine.h"
#endif

StateMachine stateMachine;
int counter = 1;

class Tree {

    private:

        int buttonPin;
        int* colors;
        Flasher* flashers;
        unsigned long lastClick;

    public:

        Tree(int _buttonPin, int* _colors, Flasher* _flashers) {

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
            FastLED.show();

            // Check for initiated update
            checkUpdateRequest();

            // Update tree colors payload list
            if (colors[0] != -1) {

                // If the LED if off
                if (all(stateMachine.OFF)) {

                    Serial.println("updating...");
                    for (int i = 0; i < NUM_LEDS; i++) {

                        Serial.print(" ");
                        Serial.print("R: ");
                        Serial.print(colors[i] >> 16);
                        Serial.print(" G: ");
                        Serial.print((colors[i] & 0x00ff00) >> 8);
                        Serial.print(" B: ");
                        Serial.println(colors[i] & 0x0000ff);
                        
                        // Flaser led
                        flashers[i].setColor(colors[i] >> 16, (colors[i] & 0x00ff00) >> 8, colors[i] & 0x0000ff);
                        flashers[i].turnOn();
                        yield();

                    }

                    colors[0] = -1;
                    SoundSerial.write(counter);
                    counter += 2;
                    
                }

                // If a LED is on
                else {

                    // Turn the LED off
                    if (!one(stateMachine.TURN_OFF)) {

                        for (int i = 0; i < NUM_LEDS; i++) {

                            flashers[i].turnOff();
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

                Serial.println();
                Serial.println("PULLING UPDATE");
                lastClick = millis();
                String slug = "/update/" + String(CLASS_ID);
                String query = "?n_leds=" + String(NUM_LEDS);
                get(host, slug + query, "UPDATE");

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
