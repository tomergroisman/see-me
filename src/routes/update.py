from flask import Blueprint, request
from classes.tree import Tree

DEFAULT_NUM_LEDS = 42

update = Blueprint('update', __name__)

# Update tree route
@update.route('/update/<class_id>', methods=['GET'])
def update_tree(class_id, use_n_leds=True):
    class_id = escape(class_id)
    try:
        if use_n_leds:
            n_leds = int(request.args["n_leds"])
        else:
            n_leds = DEFAULT_NUM_LEDS
        tree = Tree(class_id, n_leds)
    except:
        print("id or query are not valid")
        return "ERROR: id or query are not valid"

    lights = tree.update()
    if len(lights) > 0:
        print("UPDATE tree of id " + class_id)
        return f"{class_id} {','.join(str(light) for light in lights)}"
    else:
        return class_id + " "