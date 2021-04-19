import json
from flask import Blueprint, request, jsonify
from classes.register import Register
from database.database import Database as db

api = Blueprint('api', __name__)

# Register new school route
@api.route('/api/school', methods=['GET', 'POST'])
def school_route():
    if request.method == 'GET':
        db.connect()
        docs = db.get('Schools', {})
        db.disconnect()
        return docs.to_json()
        
    if request.method == 'POST':
        _school = request.get_json()
        school_doc = Register.add("Schools", _school)
        print("REGISTERED new class: " + school_doc.id)
        return school_doc

# Register new class route
@api.route('/api/class', methods=['GET', 'POST'])
def class_route():
    if request.method == 'GET':
        db.connect()
        docs = db.get('Classes', {})
        db.disconnect()
        return docs.to_json()

    if request.method == 'POST':
        _class = request.get_json()
        class_doc = Register.add("Classes", _class)
        print("REGISTERED new class: " + class_doc.id)
        return class_doc

# Register new student route
@api.route('/api/student', methods=['GET', 'POST'])
def student_route():
    if request.method == 'GET':
        db.connect()
        docs = db.get('Students', {})
        db.disconnect()
        return docs.to_json()

    if request.method == 'POST':
        _student = request.get_json()
        student_doc = Register.add("Students", _student)
        print("REGISTERED new student: " + student_doc.id)
        return student_doc