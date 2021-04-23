#ifndef FLASHER_H
#define FLASHER_H

#ifndef  STATE_MACHINE_H
#include "StateMachine.h"
#endif

#define minDelta 500
#define maxDelta 3000

class Flasher {
    
    private:

        int r;
        int g;
        int b;
        CRGB* led;
        unsigned long startTime;
        long delta;
        StateMachine stateMachine;
  
    public:

        // Constructor
        Flasher() {

            r = 0;
            g = 0;
            b = 0;
            stateMachine = StateMachine();

            randomSeed(analogRead(0) ^ analogRead(1) ^ analogRead(2));
 
        }



        // Set a CRGB Led
        void setLed(CRGB* _led) {

            led = _led;

        }

        // Set Led color
        void setColor(int _r, int _g, int _b) {

            r = _r;
            g = _g;
            b = _b;
            stateMachine.transitionTo(stateMachine.OFF);

        }

        // Flasher update function
        void update() {

            switch (stateMachine.getCurrentState()) {

                case stateMachine.OFF: {

                    setRGB(0, 0, 0);
                    break;

                }
                
                case stateMachine.TURN_ON: {

                    int diff = millis() - startTime;
                    if (diff <= delta) {

                        float prec = float(diff) / float(delta);
                        setRGB(prec * r, prec * g, prec * b);

                    }
                    else {

                        setRGB(r, g, b);
                        stateMachine.transitionTo(stateMachine.ON);

                    }
                }

                case stateMachine.ON: {

                    break;

                }

                case stateMachine.TURN_OFF: {

                    int diff = millis() - startTime;
                    if (diff <= delta) {

                        float prec = float(diff) / float(delta);
                        setRGB(r - prec * r, g - prec * g, b - prec * b);

                    }
                    else {

                        setRGB(0, 0, 0);
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

        // Set LED to RGB color
        void setRGB(int R, int G, int B) {

            *led = CRGB(R, G, B);

        }

        // Get state of a LED
        int getState() {
            return stateMachine.getCurrentState();
        }

};

#endif