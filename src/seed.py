
import sys
from database.database import Database, collections

Database.connect()

if (len(sys.argv) == 2):
    collections[sys.argv[1]].drop_collection()

else:
    # Drop all databases
    for collection in collections:
        collections[collection].drop_collection()

    # Add seed schools
    schools = [
        {
            "name": "שיזף",
            "city": "אור יהודה",
            "address": "שיזף 3"
        }
    ]
    for i, school in enumerate(schools):
        schools[i] = Database.add("Schools", school)

    # Add seed class
    n_leds = 42
    classes = [
        {
            "grade": 4,
            "class_number": 1,
            "school_ref": Database.get("Schools", { "name": "שיזף" })[0],
            "n_leds": n_leds
        },
        {
            "grade": 4,
            "class_number": 2,
            "school_ref": Database.get("Schools", { "name": "שיזף" })[0],
            "n_leds": n_leds
        },
    ]
    for i, classroom in enumerate(classes):
        classes[i] = Database.add("Classes", classroom)

    # Add seed student
    students = [
        {
            "class_ref": classes[0]
        },
        {
            "class_ref": classes[1]
        },
        {
            "class_ref": classes[0]
        },
    ]
    for i, student in enumerate(students):
        students[i] = Database.add("Students", student)

Database.disconnect()