
import sys
from database.database import Database, collections

Database.connect()

if (len(sys.argv) == 2):
    collections[sys.argv[1]].drop_collection()
    
Database.disconnect()
