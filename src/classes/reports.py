from database.database import Database as db
from database.models import Report

class Reports:
    def add(student_id, report, message):
        """
        Add a report th the database

        @returns the report id number (string)
        """
        db.connect()
        student_ref = db.get("Students", { "id": student_id })[0]
        report_doc = db.add("Reports", {
            "student_ref": student_ref,
            "class_ref": student_ref.class_ref,
            "report": report,
            "message": message,
            "new": True
        })
        db.disconnect()
        return str(report_doc["id"])

    def get_new_reports(class_id):
        db.connect()
        class_ref = db.get("Classes", { "id": class_id })[0]
        query = {
            "class_ref": class_ref,
            "new": True
        }
        update = {
            "new": False
        }
        reports = db.update("Reports", query, update)
        db.disconnect();
        return reports