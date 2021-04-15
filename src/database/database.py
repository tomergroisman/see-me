import os
from dotenv import load_dotenv, find_dotenv
from mongoengine import connect, disconnect
from database.models import School, Class, Student, Report

# Models dic
collections = {
    "Schools": School,
    "Classes": Class,
    "Students": Student,
    "Reports": Report,
}

load_dotenv(find_dotenv())

class Database:
    def add(collection, obj):
        """
        Add an object to a collection

        Params:
            collection - The collection's name
            obj - A collection object
        """
        doc = collections[collection]()
        for key in obj:
            doc[key] = obj[key]

        doc.save()
        return doc

    def get(collection, query):
        """
        Get object(s) from the database

        Params:
            collection - The collection's name
            query - A dict containing the search query
        """
        if "id" in query:
            doc = collections[collection].objects(id=query["id"])[0]
        else:
            doc = collections[collection].objects(**query)

        return doc

    def update(collection, query, update):
        """
        Get object(s) from the database

        Params:
            collection - The collection's name
            query - A dict containing the search query
            update - A dict containing the update keys and values
        """
        docs = Database.get(collection, query)
        res = []
        for doc in docs:
            doc.update(**update)
            res.append(doc)

        return res

    def connect():
        """
        Connect to the database
        """
        connect(
            host="localhost",
            port=27017,
            username=os.getenv("MONGO_USERNAME"),
            password=os.getenv("MONGO_PASSWORD"),
            db=os.getenv("MONGO_DB"),
            authentication_source="admin",
            alias='default'
        )

    def disconnect():
        """
        Disconnect from the database
        """
        disconnect()