#!/bin/python3

import json
import os
import time

if not os.path.exists("../statistics"):
    os.makedirs("../statistics")

existing_files = os.listdir("../statistics")

#find the newest Statistic
highest_number = 0
for filename in existing_files:
    if filename.startswith("statistics_"):
        try:
            number = int(filename.split("_")[1].split(".")[0])
            highest_number = max(highest_number, number)
        except ValueError:
            pass
next_number = highest_number + 1

# save the new Statistic
filename = f"statistics_{next_number}.json"
data = {
    "date": int(time.time()), "Moisture": 0.8, "Temperature": 0.0, "Nutrients": 0.0, "pH": 0.0, "Electricity": 0.0, "Humidity": 1.0
}
with open(os.path.join("../statistics", filename), "w") as outfile:
    json.dump(data, outfile)

#add the new date
new_date = {"date": int(time.time()), "name": "statistics_" + str(next_number)}
try:
    with open("../statistics/list.json","r") as file:
        old_dates = json.load(file)
except FileNotFoundError:
    old_dates = {}
if "events" not in old_dates:
    old_dates["events"] = []
old_dates["events"].append(new_date)

#sort the dates
old_dates["events"] = sorted(old_dates["events"], key=lambda event: event["date"])

#save the json
with open("../statistics/list.json", 'w') as file:
    json.dump(old_dates, file, indent=4)