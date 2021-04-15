from database.database import Database as db
from database.models import Class

class Register:
    def add(collection, document, parse_ref=None):
        """
        Add a new document to collection

        @params:
            collection - collection name
            document - the new document to add
            parse_ref - query to parse reference if reference are nedded, including reference name and collection
        @returns the saved document (dict)
        """
        db.connect()
        parsed_document = document.copy()
        if bool(parse_ref):
            parsed_document[parse_ref['name']] = db.get(parse_ref['collection'], document[parse_ref['name']])[0]
        doc = db.add(collection, parsed_document)
        db.disconnect()
        return doc

    """
    Get all the documents of a collection

    @returns a list of docs (list)
    """
    def get_all(collection):
        db.connect()
        docs = db.get(collection, {})
        db.disconnect();
        return docs