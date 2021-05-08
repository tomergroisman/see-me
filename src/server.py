from flask import Flask, request, escape
from multiprocessing import Process, Pool
from routes import api, report, update

# Create Flask instance
app = Flask(__name__)

# Student ID = 6047c75db313be4c8829b7d7
# Class ID = 6047c75db313be4c8829b7d5

# TODO: (Dynamic n_leds)
# - Set n_leds to the class document every time get n_leds query
# - Omit n_leds from Tree conctructor (and use the doc field instead)
# - Add a register school, class and student routes

# api routes
app.register_blueprint(api.api)
# report rputes
app.register_blueprint(report.report)
# update routes
app.register_blueprint(update.update)

# Check connection route
@app.route('/connection', methods=['GET'])
def check_connection():
    return "True"


if __name__ == '__main__':
    # Start with a debugger
    app.run(host='0.0.0.0', port=3000)
