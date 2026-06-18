from addTool import getArrayInput, getInput, loadJSONFile, slugify, updateJSONFile
from githubBridge import GitHubIssueBridge, GitHubRepoBridge

# GLOBAL CONSTANTS
JSON_PATH = "../tools.json"


def validate(fields):
    if len(fields) != 6:
        print("Invalid number of arguments.")
        raise

    github_url = fields[4]
    if github_url == "—":
        print("Missing GitHub link / Non-FOSS.")
        raise


def createToolDict(fields):
    repoBridge = GitHubRepoBridge(github_repo_link=fields[4])

    new_tool_json = {
        "id": slugify(fields[0]),
        "name": fields[0],
        "description": "",
        "url": fields[2],
        "category": "",
        "tags": [],
        "github": repoBridge.getURL(),
        "license": repoBridge.getLicense(),
        "stars": repoBridge.getStars(),
        "featured": False,
    }

    new_tool_json["category"] = getInput("Category: ")
    new_tool_json["tags"] = getArrayInput("Tags (comma separated): ")
    new_tool_json["description"] = getInput("Description: ")

    return new_tool_json


def printAllCategories(json_file_data):
    for category in json_file_data["categories"]:
        print(category["id"], end=", ")
    print()


def main():
    userInput = input("Issue URL:")
    issueBridge = GitHubIssueBridge(userInput)
    fields = issueBridge.getAutomationString().split(";;")

    validate(fields)

    json_file_data = loadJSONFile()

    printAllCategories(json_file_data)

    new_tool_json = createToolDict(fields)

    # Add tool to 'JSON'.
    json_file_data["tools"].append(new_tool_json)

    print("Adding...")
    print(json_file_data["tools"][-1])

    updateJSONFile(json_file_data)


if __name__ == "__main__":
    main()
