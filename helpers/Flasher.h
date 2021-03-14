#ifndef FLASHER_H
#define FLASHER_H

class Flasher {
    
    private:

        int r;
        int g;
        int b;
        int state;      // 0 - off, 1 - start, 2 - standby on 3 - destroy
        unsigned long startTime;
        long delta;
  
    public:

        Flasher(int R, int G, int B) {

            r = R;
            g = G;
            b = B;
            state = 0;

            randomSeed(analogRead(0) ^ analogRead(1) ^ analogRead(2));
 
        }

        // Flasher update function
        void update() {
            switch (state) {

                case 0: {

                    setRGB(0, 0, 0);
                    break;

                }

                case 1: {

                    int diff = millis() - startTime;
                    if (diff <= delta) {

                        float prec = float(diff) / float(delta);
                        setRGB(prec * r, prec * g, prec * b);

                    }
                    else {

                        setRGB(r, g, b);
                        state = 2;

                    }
                }

                case 2: {

                    break;

                }

                case 3: {

                    int diff = millis() - startTime;
                    if (diff <= delta) {

                        float prec = float(diff) / float(delta);
                        setRGB(r - prec * r, g - prec * g, b - prec * b);

                    }
                    else {

                        setRGB(0, 0, 0);
                        state = 0;

                    }
                    break;

                }

            }

        }

        // Turn off LED
        void start() {

            startTime = millis();
            delta = random(500, 5000);
            state = 1;

        }

        // Turn off LED
        void destroy() {
            
            startTime = millis();
            delta = random(500, 5000);
            state = 3;

        }

        // Set LED to RGB color
        void setRGB(int R, int G, int B) {

            analogWrite(rPin, R);
            analogWrite(gPin, G);
            analogWrite(bPin, B);

        }

        int getState() {
            return state;
        }

};

#endif