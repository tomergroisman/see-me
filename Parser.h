// Parse a byte message to the msg buffer (global)
void parseMsg(byte* payload, unsigned int length) {
    for (int i = 0; i < length; i++) {
        msg[i] = (char)payload[i];
    }
    msg[length] = '\0';
}

// Parse an update message
int* parseUpdate() {

    Serial.println(msg);
    lights[0] = -1;
    char* classId = strtok(msg, " ");
    Serial.print("Class Id: ");
    Serial.println(classId);

    if (!String(classId).equals(String(CLASS_ID))) {
        Serial.println("Not me");
        return NULL;
    }
    
    char* payload = strtok(NULL, " ");
    Serial.print("payload: ");
    Serial.println(payload);

    char* light = strtok(payload, ",");
    int i = 0;
    while (light != NULL) {
        lights[i] = atoi(light);
        light = strtok(NULL, ",");
        i++;
    }
    lights[i] = -1;

    return lights;
    
}

// Parse a preview message
int* parsePreview() {
    Serial.println(msg);
    return NULL;
}
