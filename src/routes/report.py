from flask import Blueprint, escape, request
from classes.reports import Reports

report = Blueprint('report', __name__)

# Add report route
@report.route('/report/<student_id>', methods=['POST'])
def add_report(student_id):
    student_id = escape(student_id)

    report, message = None, None
    body = request.get_json()
    if "report" in body:
        report = body["report"]
    if "message" in body:
        message = body["message"]
        
    report_id = Reports.add(student_id, report, message)
    print("ADD a report from student id " + student_id)
    return report_id