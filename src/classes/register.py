from database.database import Database as db
from database.models import Class

class Register:
    def add(collection, document, parse_ref=None):
        """
        Add a new document to collection

        @params:
            collection - collection name
            document - the new document to add
        @returns the saved document (dict)
        """
        db.connect()
        doc = db.add(collection, document)
        db.disconnect()
        return doc

    def append_class_to_school(school_ref, class_id):
        """
        Add a class to the school class list

        @params:
            school_id - the school id to update
            class_id - the class id to append
        @returns True if the update succeeded, False otherwise
        """
        db.connect()
        class_list = db.get("Schools", { "id": school_ref })[0]["classes"]
        db.update("Schools", { "id": school_ref }, { "classes": class_list + [class_id] })
        db.disconnect()
        return True

    """
    Get all the documents of a collection

    @returns a list of docs (list)
    """
    def get_all(collection):
        db.connect()
        docs = db.get(collection, {})
        db.disconnect();
        return docs