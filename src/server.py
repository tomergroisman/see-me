from flask import Flask, request, escape
from flask_cors import CORS
from multiprocessing import Process, Pool
from routes import api, report, update

# Create Flask instance
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Student ID = 6047c75db313be4c8829b7d7
# Class ID = 6047c75db313be4c8829b7d5

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
    app.run(host='0.0.0.0', port=3000, debug=False)
