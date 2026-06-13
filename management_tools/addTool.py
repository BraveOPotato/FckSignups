from json import JSONDecodeError, dump, load
from re import sub

# GLOBAL CONSTANTS
JSON_PATH = "../tools.json"


# Prompts the user with a prompt, and retrieves a whitespace-stripped response.
# @param {str} prompt - A prompt to show the end user.
def getInput(prompt):
    user_input = ""
    while user_input == "":
        user_input = input(prompt).strip()
    return user_input


# Splices the user input by the comma, and sanitizes it.
# @param {str} prompt - A prompt to show the end user.
# @returns {str list} result - An array of strings.
def getArrayInput(prompt):
    user_input = getInput(prompt)
    return [item.strip() for item in user_input.split(",") if item != ""]


# Given a dictionary, and keys to exclude, return the keys
# that remain in the dictionary.
# @param {dict} dictionary - any dictionary object.
# @param {str list} keys_to_exclude - An array of keys to exclude from the object.
# @returns {str list} result - Non-excluded keys in the dictionary.
def get_non_excluded_keys(dictionary, keys_to_exclude):
    return [key for key in dictionary if key not in keys_to_exclude]


# Turns string into URL-safe slug.
# @param {str} s - any string.
def slugify(s):
    s = s.lower().strip()
    s = sub(r"[^\w\s-]", "", s)
    s = sub(r"[\s_-]+", "-", s)
    s = sub(r"^-+|-+$", "", s)
    return s


# Builds the tool object.
def getToolInput():
    tool_obj = {
        "id": "",
        "name": "",
        "description": "",
        "url": "",
        "category": "",
        "tags": [],
        "github": "",
        "license": "",
        "stars": 0,
        "featured": False,
    }

    keys_for_input = get_non_excluded_keys(tool_obj, ["id", "featured"])

    for key in keys_for_input:
        if isinstance(tool_obj[key], str):
            tool_obj[key] = getInput(f"{key}: ")
        elif isinstance(tool_obj[key], list):
            tool_obj[key] = getArrayInput(f"{key} (comma separated): ")
        elif isinstance(tool_obj[key], int):
            tool_obj[key] = int(getInput(f"{key}: "))

    tool_obj["id"] = slugify(tool_obj["name"])

    return tool_obj


# Loads the JSON file using the JSON_PATH parameter
# and returns a dictionary object.
def loadJSONFile():
    with open(JSON_PATH, "r", encoding="utf-8") as json_file:
        return load(json_file)


# Turn the dict object into a JSON string and overwrite
# the JSON_PATH file with the string content.
# @param {dict} json_variable - dict object.
def updateJsonFile(json_variable):
    with open(JSON_PATH, "w") as json_file:
        dump(json_variable, json_file, indent=2, ensure_ascii=False)


# Entry to the program
def main():
    try:
        new_tool_json = getToolInput()
        json_file_data = loadJSONFile()

        # Add tool to 'JSON'.
        json_file_data["tools"].append(new_tool_json)

        updateJsonFile(json_file_data)

    # TODO: catch other errors.
    except JSONDecodeError:
        print(f"Invalid JSON file at:\n{JSON_PATH}")


if __name__ == "__main__":
    main()
