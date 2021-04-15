from database.database import Database as db
from web_server import update_tree

# Push update trigger listener
def push_update_trigger():
    import time
    N_THREAD_POOL = 8
    
    while True:
        with Pool(N_THREAD_POOL) as pool:
            pool.map(push_data.push, push_data.get_classes_ids())
        time.sleep(10)

# Get all the classes ids list
def get_classes_ids():
    db.connect()
    classes = db.get("Classes", {})
    db.disconnect()

    return [_class.id for _class in classes]

# Push update to all the classes
def push(class_id):
    print(update_tree(class_id, use_n_leds=False))