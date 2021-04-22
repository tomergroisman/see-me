#include "Parser.h"

// Connect to WiFi network
void connectToWifi() {

    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
  
    WiFi.mode(WIFI_STA);

    WiFi.persistent(false);
    WiFi.disconnect(true);
    WiFi.begin(ssid, password);
  
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
  
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  
}

// Send a HTTP post request
void get(String host, String slug, String parser) {

    HTTPClient http;

    // configure target server and url
    String url = "http://" + host + slug;
    http.begin(url);

    // start connection and send HTTP header and body
    int status = http.GET();

    Serial.print("[HTTP] GET: Status: ");
    Serial.print(url);
    Serial.print(" Status: ");
    Serial.println(status);

    // httpCode will be negative on error
    if (status > 0) {
        // Parse payload
        String payload = http.getString();
        parseMsg(payload);

    }
    else {

        Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(status).c_str());

    }

    http.end();

    // Parse the payload
    if (parser.equals("UPDATE")) {

        parseUpdate();
    
    }
    if (parser.equals("PREVIEW")) {

        parsePreview();

    }

}
