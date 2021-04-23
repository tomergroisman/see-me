#ifndef STATE_MACHINE_H
#define STATE_MACHINE_H

class StateMachine {

    public:

        static const int OFF = 0;
        static const int TURN_ON = 1;
        static const int ON = 2;
        static const int TURN_OFF = 3;
        static const int REVEAL = 4;

        int currentState;

        // Constructor
        StateMachine() {

            currentState = OFF;

        }

        // Get the current state
        int getCurrentState() {

            return currentState;

        }

        // Change currentState to state
        void transitionTo(int state) {
            
            currentState = state;

        }

};

#endif