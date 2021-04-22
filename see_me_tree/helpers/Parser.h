// Parse a byte message to the msg buffer (global)
void parseMsg(byte* payload, unsigned int length) {
    for (int i = 0; i < length; i++) {
        msg[i] = (char)payload[i];
    }
    msg[length + 1] = '\0';
}

// Parse a byte message to the msg buffer (global)
void parseMsg(String payload) {

    int length = payload.length();
    payload.toCharArray(msg, length + 1);
    
}

// Parse an update message
void parseUpdate() {

    colors[0] = -1;
    char* classId = strtok(msg, " ");
    Serial.print("Class Id: ");
    Serial.println(classId);

    if (!String(classId).equals(String(CLASS_ID))) {
        
        Serial.println("Not me");
    }
    
    char* payload = strtok(NULL, " ");
    Serial.print("payload: ");
    Serial.println(payload);

    char* color = strtok(payload, ",");
    int i = 0;
    while (color != NULL) {
        colors[i] = atoi(color);
        color = strtok(NULL, ",");
        i++;
    }
    colors[i] = -1;
    
}

// Parse a preview message
void parsePreview() {

    Serial.println(msg);

}
