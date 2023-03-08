import difflib
try:
    from apps.home.db import get_people, update_person, delete_person
    from apps.home.user_info import get_json
except:
    from db import get_people, update_person, delete_person
    from user_info import get_json

class person():
    def __init__(self, name="", json="") -> None:
        self.name = name
        self.json = json
        name = name
    def verify(self):
        lookupname = self.name.strip().title()
        if 'name is' in lookupname:
            lookupname = lookupname.split(' ')[-2:]
            print("longer response - lookup name is ",lookupname)
        data = get_people()
        name_list = list(data["People"].keys())
        # print('ALL PEOPLE IN DB vvv')
        # print(lookupname, name_list )
        try:
            # first_name_match = difflib.get_close_matches(lookupname.split(' ')[0],[name.split(' ')[0] for name in name_list], n=1, cutoff=.7)[0]
            # # NOW, LOOK AT ANY LAST NAMES THAT MATCH
            # last_name_match = difflib.get_close_matches(lookupname.split(' ')[1], [name.split(' ')[1] for name in name_list], n=1, cutoff=.7)[0]

            closest_match = difflib.get_close_matches(lookupname, name_list, n=2, cutoff=0.4)[0]
            # COMBINE
            # closest_match = first_name_match + ' ' + last_name_match
            print(f"We are assuming '{lookupname}' is", closest_match)
            self.name = closest_match
      
            return True
        except:
            print("No match found for ", self.name, "Will need to add new entry with person.update(): ",self.json)
            return False

    def update(self):
        json_input = get_json(self.json)
        update_person(self.name, json_input['People'][self.name])

    def delete(self):
        print("deleting user - ", self.name)
        delete_person(self.name)

    def get_info(self):
        data = get_people()
        name_list = list(data["People"].keys())
        if self.name in name_list:
            info = data["People"][self.name]
            # print('FROM DB:', info)
            self.json = info
        else:
            print("No data found  for "+self.name+" - try verifying the user first.")
            info = None
        return info



class dialog():
    # DIALOG CLASS: New conversation, new question, new response. Can be used to retrie
    def __init__(self) -> None:
        pass


class Session():
    # SESSION CLASS: Session ID, 
    def __init__(self) -> None:
        pass

    def respond():
        # Sends a response to the response prompt textarea. 
        pass

    def speak():
        # Sends a response to the audio portion of the console. 
        pass
        

# human = person(" DANIEL CRAIG ")
# human.verify()

# user_js = conversation_json = """{   "People":{
#             "John Hooligan": {
#             "School": "James Brown U",
#             "Fondest Memory":"Swimming the English Channel",
#             "Fun Facts":"Knows a thing or two about being incognito" }}}"""

# dude = person("John Hooligan", json=user_js)

# dude = person("RONNIE ZIERZER")
# dude.verify()
# print(dude.name)
# dude.update()
# dude.delete()

# dude.get_info()


# WORKFLOW

#  = person()