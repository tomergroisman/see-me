from flask import Blueprint, escape, request
from classes.reports import Reports
from flask_cors import cross_origin

report = Blueprint('report', __name__)

# Add report route
@report.route('/report/<student_id>', methods=['POST'])
@cross_origin()
def add_report(student_id):
    report, message = None, None
    body = request.get_json()
    if "report" in body:
        report = body["report"]
    if "message" in body:
        message = body["message"]
        
    report_id = Reports.add(student_id, report, message)
    print("ADD a report from student id " + student_id)
    return report_id

@report.route('/report/mockRed', methods=['POST'])
@cross_origin()
def mock_reds():       
    Reports.add("6047c75db313be4c8829b7d7", -2, None)
    Reports.add("6047c75db313be4c8829b7d7", -1, None)
    Reports.add("6047c75db313be4c8829b7d7", -2, None)
    Reports.add("6047c75db313be4c8829b7d7", -2, None)
    Reports.add("6047c75db313be4c8829b7d7", 2, None)
    print("MOCK red report")
    return "Success"

@report.route('/report/mockGreen', methods=['POST'])
@cross_origin()
def mock_greens():
    Reports.add("6047c75db313be4c8829b7d7", 2, None)
    Reports.add("6047c75db313be4c8829b7d7", 2, None)
    Reports.add("6047c75db313be4c8829b7d7", 2, None)
    Reports.add("6047c75db313be4c8829b7d7", 1, None)
    Reports.add("6047c75db313be4c8829b7d7", -2, None)
    print("MOCK green report")
    return "Success"