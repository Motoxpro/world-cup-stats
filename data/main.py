# from datetime import datetime
# import matplotlib.pyplot as plt
#
#
# import requests
# import time
# import os
# import json
#
#
# def fetch_data():
#     url = "https://prod.chronorace.be/api/results/generic/uci/20240503_mtb/dh?key=3"
#     response = requests.get(url)
#     if response.status_code == 200:
#         return response.json()
#     else:
#         print(f"Failed to fetch data: HTTP {response.status_code}")
#         return None
#
#
# def save_data(data, folder, file_name):
#     path = os.path.join(folder, file_name)
#     with open(path, 'w') as f:
#         json.dump(data, f)
#     print(f"Data saved to {path}")
#
#
# def main():
#     folder = "saved_data"  # Folder where the data will be saved
#     if not os.path.exists(folder):
#         os.makedirs(folder)
#
#     while True:
#         now = datetime.now()
#         print(f"Current time: {now}")
#         if now.hour >= 8 and now.minute >= 0:
#             print("It's 8 AM or later. Program will exit.")
#             break
#         data = fetch_data()
#         if data is not None:
#             timestamp = int(time.time())
#             file_name = f"data_{timestamp}.json"
#             save_data(data, folder, file_name)
#         time.sleep(1)  # Wait for 1 second before the next poll
#
#
# def parse_data():
#     # "ContextName": "20240503_mtb",
#     # "DisplayName": "Final",
#     # "Riders": {
#     #     ...
#     # },
#     # "OnTrack": [
#     #     ...
#     # ],
#     # "LastFinisher": [
#     #     ...
#     # ],
#     # "Results": [
#     #     ...
#     # ],
#     # "NextToStart": [
#     #     ...
#     # ]
#     # Get all the files in the saved_data folder. Open them one by one and and append the data to a list.
#     # Then, write the list to a new file.
#     folder = "saved_data"
#     files = os.listdir(folder)
#     rider_list = []
#     on_track_list = []
#     for file in files:
#         with open(os.path.join(folder, file)) as f:
#             data = json.load(f)
#             if not rider_list:
#                 rider_list.extend(data['Riders'].values())
#             on_track_list.extend(data['OnTrack'])
#
#     deduped_rider_list = []
#     for rider in rider_list:
#         if rider['Id'] not in [r['Id'] for r in deduped_rider_list]:
#             rider['Id'] = int(str(rider['Id'])[2:])
#             deduped_rider_list.append(rider)
#
#     deduped_on_track_list = []
#     for on_track in on_track_list:
#         # Check if the rider is already in the list using the RaceNr and LastPoint
#         if not on_track.get('RaceNr') or not on_track.get('LastPoint'):
#             continue
#         if f"{on_track['RaceNr']}{on_track['LastPoint']}" not in [f"{r['RaceNr']}{r['LastPoint']}" for r in
#                                                                   deduped_on_track_list]:
#             # Find the rider in the rider_list and add it to the deduped_on_track_list
#             for rider in rider_list:
#                 if rider['Id'] == on_track['RaceNr']:
#                     on_track = {**rider, **on_track}
#                     break
#             deduped_on_track_list.append(on_track)
#
#     # sort by RaceNr and then by LastPoint
#     deduped_on_track_list.sort(key=lambda x: (x['RaceNr'], x['LastPoint']))
#
#     results = []
#     for on_track in deduped_on_track_list:
#         # print( on_track.get("PrintName").split(" "))
#         yo = " ".join(on_track.get("PrintName").split(" ")[:2][::-1]).title()
#         result = {
#             "name": yo,
#             "sector": int(on_track['LastPoint'][1:]),
#             "time": on_track.get("RaceTime"),
#             "distance": on_track.get("CompletedDistance")
#         }
#         results.append(result)
#
#     print(results)
#     results.sort(key=lambda x: (x['name'], x['sector']))
#     # Organizing data by rider
#     plot_data = {}
#     for entry in results:
#         if entry['name'] not in plot_data:
#             plot_data[entry['name']] = {'sectors': [], 'times': []}
#         plot_data[entry['name']]['sectors'].append(entry['sector'])
#         plot_data[entry['name']]['times'].append(entry['time'])
#
#     # Plotting
#     fig, ax = plt.subplots( )
#     for rider, rider_data in plot_data.items():
#         ax.plot(rider_data['sectors'], rider_data['times'], marker='o', label=rider)
#
#     ax.set_xlabel('Sector')
#     ax.set_ylabel('Time (ms)')
#     ax.set_title('Time per Sector for Each Rider')
#     ax.legend()
#
#     plt.show()
#

import json
import os

def combine_json_files(folder_path, output_file):
    # List to hold the data from all JSON files
    all_data = []

    # Iterate over each file in the given folder
    for filename in os.listdir(folder_path):
        if filename.endswith('.json'):
            # Construct full file path
            file_path = os.path.join(folder_path, filename)
            # Open and load the JSON data
            print(f"Reading data from {filename}")
            with open(file_path, 'r') as file:
                data = json.load(file)
                all_data.append(data)

    # Write all data to a new JSON file
    with open(output_file, 'w') as file:
        json.dump(all_data, file, indent=4)

# Specify the folder path and output file
if __name__ == "__main__":
    folder_path = './saved_data'
    output_file = '../supabase/functions/get-data/helpers/data.json'

    combine_json_files(folder_path, output_file)

