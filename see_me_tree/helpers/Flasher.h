#ifndef FLASHER_H
#define FLASHER_H

#ifndef  STATE_MACHINE_H
#include "StateMachine.h"
#endif

#ifndef  COLOR_H
#include "Color.h"
#endif

#define minDelta 500
#define maxDelta 3000
#define brightnessInterval 50

class Flasher {
    
    private:

        Color color;
        CRGB* led;
        unsigned long startTime;
        long delta;
        int brightness;
        StateMachine stateMachine;
  
    public:

        // Constructor
        Flasher() {

            color = Color();
            stateMachine = StateMachine();

            randomSeed(analogRead(0) ^ analogRead(1) ^ analogRead(2));
 
        }



        // Set a CRGB Led
        void setLed(CRGB* _led) {

            led = _led;

        }

        // Set Led color
        void setColor(int r, int g, int b) {

            color = Color(r, g, b);
            stateMachine.transitionTo(stateMachine.OFF);

        }

        // Flasher update function
        void update() {

            switch (stateMachine.getCurrentState()) {

                case stateMachine.OFF: {

                    setRGB(Color(0, 0, 0));
                    break;

                }
                
                case stateMachine.TURN_ON: {

                    int diff = millis() - startTime;
                    if (diff <= delta) {

                        float prec = float(diff) / float(delta);
                        setRGB(color.multiply(prec));

                    }
                    else {

                        setRGB(color);
                        setForStay();
                        stateMachine.transitionTo(stateMachine.ON);

                    }
                    break;
                }

                case stateMachine.ON: {

                    break;

                }

                case stateMachine.TURN_OFF: {

                    int diff = millis() - startTime;
                    if (diff <= delta) {

                        float prec = float(diff) / float(delta);
                        setRGB(color.substract(color.multiply(prec)));

                    }
                    else {

                        setRGB(Color(0, 0, 0));
                        stateMachine.transitionTo(stateMachine.OFF);

                    }
                    break;

                }

            }

        }

        // Turn on LED
        void turnOn() {

            setForLunch();
            stateMachine.transitionTo(stateMachine.TURN_ON);

        }

        // Turn off LED
        void turnOff() {
            
            setForLunch();
            stateMachine.transitionTo(stateMachine.TURN_OFF);

        }

        // Set all relevant variables for on / off change transition
        void setForLunch() {

            startTime = millis();
            delta = random(minDelta, maxDelta);

        }

        // Set all relevant variables for on state
        void setForStay() {

            startTime = millis();
            brightness = random(1, 20);

        }

        // Set LED to RGB color
        void setRGB(Color newColor) {

            *led = CRGB(newColor.r(), newColor.g(), newColor.b());

        }

        // Get state of a LED
        int getState() {
            return stateMachine.getCurrentState();
        }

};

#endif