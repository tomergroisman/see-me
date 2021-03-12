class Tree {

    private:

        int rPin;
        int gPin;
        int bPin;
        int buttonPin;
        unsigned long lastClick;

    public:

        Tree(int r, int g, int b, int button) {

            rPin = r;
            gPin = g;
            bPin = b;
            buttonPin = button;
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

            // Update tree lights state
            if (lights[0] != -1) {
                
                Serial.print("updating... ");
                int i = 0;
                while (lights[i] != -1) {
                    Serial.print(lights[0]);
                    Serial.print(" ");
                    Serial.print("R: ");
                    Serial.print(lights[i] >> 16);
                    Serial.print(" G: ");
                    Serial.print((lights[i] & 0x00ff00) >> 8);
                    Serial.print(" B: ");
                    Serial.print(lights[i] & 0x0000ff);
                    
                    analogWrite(rPin, lights[i] >> 16);
                    analogWrite(gPin, (lights[i] & 0x00ff00) >> 8);
                    analogWrite(bPin, lights[i] & 0x0000ff);
                    i++;
                }
                Serial.println();
                lights[0] = -1;

            }

        }
};
