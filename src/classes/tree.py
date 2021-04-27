import numpy as np
from database.database import Database as db
from classes.reports import Reports
from utils.colors import Colors

class Tree:
    """
    Tree action class

    Exceptions:
        ValueError - If class id is not valid
    """
    def __init__(self, class_id, n_leds):
        """
        Tree constructor
        """
        if _is_valid(class_id):
            self.class_id = class_id
            self.n_leds = n_leds
        else:
            raise ValueError("Invalid class id")

    def update(self):
        """
        Update the tree state

        Returns a led hex array
        """
        raw_reports = Reports.get_new_reports(self.class_id)
        if len(raw_reports) == 0:
            return []

        reports = list(map(lambda report: report.report, raw_reports))
        colors = Colors(n_leds=self.n_leds)
        color_list = colors.generate_color_list(reports)

        return color_list

    def preview(self):
        """
        preview the last week's tree states

        Returns a 2d led hex array
        """
        print("in tree.preview")
        return

def _is_valid(class_id):
    """
    Return true if the class id is a valid id,
    false otherwise.
    """
    db.connect()
    is_valid = bool(db.get("Classes", { "id": class_id } ))
    db.disconnect()
    return is_valid
