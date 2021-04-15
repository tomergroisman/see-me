from flask import Flask, request, escape
from multiprocessing import Process, Pool
from classes.tree import Tree
from classes.reports import Reports
from classes.register import Register
import helpers.push_data as push_data

DEFAULT_NUM_LEDS = 42

# Create Flask instance
app = Flask(__name__)

# Student ID = 6047c75db313be4c8829b7d7
# Class ID = 6047c75db313be4c8829b7d5

# Add report route
@app.route('/report/<student_id>', methods=['POST'])
def add_report(student_id):
    student_id = escape(student_id)
    report = request.get_json()["report"]
    report_id = Reports.add(student_id, report)
    print("ADD a report from student id " + student_id)
    return report_id

@app.route('/class', methods=['POST'])
def add_class():
    _class = request.get_json()
    class_doc = Register.add("Classes", _class, {
        'name': 'school_ref',
        'collection': 'Schools'
    })
    print("REGISTERED new class: " + class_doc)
    return class_doc

# TODO: (Dynamic n_leds)
# - Set n_leds to the class document every time get n_leds query
# - Omit n_leds from Tree conctructor (and use the doc field instead)
# - Add a register school, class and student routes

# Update tree route
@app.route('/update/<class_id>', methods=['GET'])
def update_tree(class_id, use_n_leds=True):
    class_id = escape(class_id)
    try:
        if use_n_leds:
            n_leds = int(request.args["n_leds"])
        else:
            n_leds = DEFAULT_NUM_LEDS
        tree = Tree(class_id, n_leds)
    except:
        print("id or query are not valid")
        return "ERROR: id or query are not valid"

    lights = tree.update()
    if len(lights) > 0:
        print("UPDATE tree of id " + class_id)
        return f"{class_id} {','.join(str(light) for light in lights)}"
    else:
        return class_id + " "

# Check connection route
@app.route('/connection', methods=['GET'])
def check_connection():
    return "True"


if __name__ == '__main__':
    server = Process(target=app.run, kwargs={'host': '0.0.0.0', 'port': '3000', 'use_reloader': False})
    trigger = Process(target=push_data.push_update_trigger)
    server.start()
    # trigger.start()
