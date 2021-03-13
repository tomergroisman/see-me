class Flasher {
  
    int r;
    int g;
    int b;
    int delta;
    int currentLed;
    unsigned long prevMillis;
    int comet;
  
    public:

        Flasher(int R, int G, int B, int deltaMillis) {
            r = R;
            g = G;
            b = B;
            delta = deltaMillis;
            currentLed = -1;
            prevMillis = millis();
            comet = 0;
        }

        // Flasher loop function
        void Update() {
            if (millis() - prevMillis >= delta) {
                currentLed = (currentLed + 1) % 10;
                CircuitPlayground.clearPixels();
                CircuitPlayground.setPixelColor(currentLed, r, g, b);
                updateComet();
                if (comet > 0) {
                    CircuitPlayground.setPixelColor((currentLed + 9) % 10, r / 4, g / 4, b / 4);
                }
                if (comet > 1) {
                    CircuitPlayground.setPixelColor((currentLed + 8) % 10, r / 7, g / 7, b / 7);
                }
                prevMillis = millis();
            }
        }

        // Clear all the leds
        void Destroy() {
            CircuitPlayground.clearPixels();
            currentLed = -1;
            comet = 0;
        }

        // 3 leds logic
        void updateComet() {
            if (comet < 2) {
                if (comet == 0 && currentLed == 1) {
                   comet = 1;
                }
                if (comet == 1 && currentLed == 2) {
                   comet = 2;
                }
            }
        }
};
