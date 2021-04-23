#ifndef COLOR_H
#define COLOR_H

class Color {

    private:
    
        int _r;
        int _g;
        int _b;

    public:

        // Empty constructor - black color
        Color() {

            _r = 0;
            _g = 0;
            _b = 0;

        }
        // Constructor
        Color(int r, int g, int b) {

            _r = r;
            _g = g;
            _b = b;

        }

        // Return red value
        int r() {
            return _r;
        }

        // Return green value
        int g() {
            return _g;
        }

        // Return blue value
        int b() {
            return _b;
        }

        // Substract value from color
        Color substract(int value) {

            int r = _r - value > 0 ? _r - value : 0;
            int g = _g - value > 0 ? _g - value : 0;
            int b = _b - value > 0 ? _b - value : 0;
            return Color(r, g, b);
            
        }

        // Substract value from color
        Color substract(Color color) {

            int r = _r - color.r() > 0 ? _r - color.r() : 0;
            int g = _g - color.g() > 0 ? _g - color.g() : 0;
            int b = _b - color.b() > 0 ? _b - color.b() : 0;
            return Color(r, g, b);
            
        }

        // Multiply color with value
        Color multiply(float value) {

            int r = _r * value;
            int g = _g * value;
            int b = _b * value;
            return Color(r, g, b);
            
        }
};

#endif
