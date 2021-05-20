import json
from flask import Blueprint, request, jsonify, abort
from bson import ObjectId, json_util
from classes.register import Register
from database.database import Database as db

api = Blueprint('api', __name__)

# Register new school route
@api.route('/api/school', methods=['GET', 'POST'])
def schools_route():
    if request.method == 'GET':
        db.connect()
        docs = db.get('Schools', {})
        db.disconnect()
        return docs.to_json()
        
    '''
    API documentation:
        - name (string)
        - city (string)
        - address (string)
    '''
    if request.method == 'POST':
        _school = request.get_json()
        _school["classes"] = []
        school_doc = Register.add("Schools", _school)
        print("REGISTERED new school: " + str(school_doc["id"]))
        return school_doc.to_json()

@api.route('/api/school/<school_id>', methods=['GET'])
def school_route(school_id):
    db.connect()
    # try:
    doc = db.get('Schools', { "id": school_id })[0]
    classes = [db.get("Classes", { "id": _class["id"] })[0].to_mongo() for _class in doc["classes"]]
    db.disconnect()
    doc = doc.to_mongo()
    doc["classes"] = classes
    return json_util.dumps(doc)
    # except:
    #     abort(400, 'Record not found')

# Register new class route
@api.route('/api/class', methods=['GET', 'POST'])
def classes_route():
    if request.method == 'GET':
        db.connect()
        docs = db.get('Classes', {})
        db.disconnect()
        return docs.to_json()

    '''
    API documentation:
        - grade (number)
        - class_number (number)
        - school_id (objectId)
    '''
    if request.method == 'POST':
        _class = request.get_json()
        school_id = _class["school_id"]
        del _class["school_id"]
        class_doc = Register.add("Classes", _class)
        Register.append_class_to_school(school_id ,class_doc["id"])
        print("REGISTERED new class: " + str(class_doc["id"]))
        return class_doc.to_json()

# Register new student route
@api.route('/api/student', methods=['GET', 'POST'])
def students_route():
    if request.method == 'GET':
        db.connect()
        docs = db.get('Students', {})
        db.disconnect()
        return docs.to_json()

    '''
    API documentation:
        - class_id (objectId)
    '''
    if request.method == 'POST':
        class_id = request.get_json()["class_id"]
        _student = { "class_ref": ObjectId(class_id) }
        student_doc = Register.add("Students", _student)
        print("REGISTERED new student: " + str(student_doc["id"]))
        return student_doc.to_json()