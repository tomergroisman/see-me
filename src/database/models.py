import mongoengine_goodjson as gj
from mongoengine import Document, UUIDField, IntField, StringField, ReferenceField, BooleanField, DateTimeField, ListField
from datetime import datetime, timezone
import pytz



# Class model
class Class(gj.Document):
    grade = IntField(min_value=1, max_value=12)
    class_number = IntField(min_value=1)
    # school_ref = ReferenceField(School)

    # Metadata
    meta = {
        'collection': 'Classes'
    }
    
# School model
# TODO:
# - Add class list reference
class School(gj.Document):
    name = StringField()
    city = StringField()
    address = StringField()
    classes = ListField(ReferenceField(Class))

    # Metadata
    meta = {
        'collection': 'Schools'
    }

# Student model
class Student(gj.Document):
    class_ref = ReferenceField(Class)

    # Metadata
    meta = {
        'collection': 'Students'
    }
    
# Report model
class Report(gj.Document):
    student_ref = ReferenceField(Student)
    class_ref = ReferenceField(Class)
    report = IntField(min_value=-5, max_value=5)
    message = StringField()
    new = BooleanField()
    time = DateTimeField(default=datetime.now(pytz.timezone('Asia/Jerusalem')))

    # Metadata
    meta = {
        'collection': 'Reports'
    }