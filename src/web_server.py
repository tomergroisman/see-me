from flask import Flask, request, escape
from classes.tree import Tree
from classes.reports import Reports

# Create Flask instance
app = Flask(__name__)

# Student ID = 6047c75db313be4c8829b7d7
# Class ID = 6047c75db313be4c8829b7d5

@app.route('/report/<student_id>', methods=['POST'])
def add_report(student_id):
    student_id = escape(student_id)
    report = request.get_json()["report"]
    report_id = Reports.add(student_id, report)
    print("ADD a report from student id " + student_id)
    return report_id

@app.route('/update/<class_id>', methods=['GET'])
def update_tree(class_id):
    class_id = escape(class_id)
    try:
        n_leds = int(request.args["n_leds"])
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

@app.route('/connection', methods=['GET'])
def check_connection():
    return "True"
