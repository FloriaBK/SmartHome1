#!/bin/python3
import json
import os

# Check if the list.json exists
if not os.path.exists("../statistics"):
    os.makedirs("../statistics")
try:
    with open("../statistics/list.json","r") as file:
        old_dates = json.load(file)
except FileNotFoundError:
    old_dates = {}

# Check if all event exist as files
filtered_events = []
for event in old_dates.get("events", []):
    file_name = event.get("name")
    if file_name:
        file_path = os.path.join("../statistics/", file_name + ".json")
        if os.path.exists(file_path):
            filtered_events.append(event)

old_dates["events"] = filtered_events

# Sort list.json
old_dates["events"] = sorted(old_dates["events"], key=lambda event: event["date"])
with open("../statistics/list.json", 'w') as file:
    json.dump(old_dates, file, indent=4)