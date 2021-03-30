# Set base directory path for module import
import sys
from pathlib import Path, PurePath
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(BASE_DIR)
# Load enviorment variables
from dotenv import load_dotenv
load_dotenv(PurePath.joinpath(BASE_DIR, "../.env"))
# Import modules
import paho.mqtt.client as mqtt
from classes.tree import Tree
from classes.reports import Reports

REPORT_TOPIC = "see_me/report"
UPDATE_TOPIC = "see_me/update"
PREVIEW_TOPIC = "see_me/preview"
# Student ID = 6047c75db313be4c8829b7d7
# Class ID = 6047c75db313be4c8829b7d5


class Client:
    """
    MQTT client class

    Connects to a MQTT broket on a topic and response to MQTT publishes
    comming from microcontroller in class.

    The requests form is of CLASS_ID to the topics 'update' and 'preview'.
    """
    def run():
        client = mqtt.Client(client_id="see_me_server")
        client.on_connect = on_connect
        client.on_message = on_message

        client.connect("localhost", 1883, 60)

        # Blocking call that processes network traffic, dispatches callbacks and
        # handles reconnecting.
        # Other loop*() functions are available that give a threaded interface and a
        # manual interface.
        client.loop_forever()


        # The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(REPORT_TOPIC)
    client.subscribe(UPDATE_TOPIC)
    client.subscribe(PREVIEW_TOPIC)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    """
    report payload: student_id report
    update payload: class_id | "server" response
    preview payload: class_id | "server" response
    """
    payload = msg.payload.decode()

    if msg.topic == REPORT_TOPIC:
        [student_id, report] = payload.split(" ")
        Reports.add(student_id, report)
        print("MQTT Client: ADD a report from student id " + student_id)
    
    elif len(payload.split(" ")) == 1:
        class_id = payload
        try:
            tree = Tree(class_id)
        except:
            print("Id is not valid")
            return

        if msg.topic == UPDATE_TOPIC:
            lights = tree.update()
            if len(lights) > 0:
                client.publish(UPDATE_TOPIC, f"{class_id} {','.join(str(light) for light in lights)}")
            print("MQTT Client: UPDATE tree of id " + class_id)
        if msg.topic == PREVIEW_TOPIC:
            tree.preview()
            client.publish(PREVIEW_TOPIC, "PREVIEW PAYLOAD")
            print("MQTT Client: Preview tree of id " + class_id)

Client.run()