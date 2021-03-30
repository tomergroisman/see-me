#!/bin/sh -e

source bin/activate
flask run --host=0.0.0.0 --port=3000
# trap 'kill %1' SIGINT
# flask run --host=0.0.0.0 --port=3000 & python src/mqtt_client.py