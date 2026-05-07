import json
import os
import requests
from dotenv import load_dotenv
import argparse

load_dotenv()
BASE_URL = os.getenv("NOCODB_DOMAIN")

parser = argparse.ArgumentParser(description="Télécharge les icônes depuis un fichier JSON.")
parser.add_argument("--json", type=str, default="items.json", help="Chemin du fichier JSON")
parser.add_argument("--output", type=str, default="items", help="Dossier de sortie")
args = parser.parse_args()

JSON_FILE = "./src/data/" + args.json
OUTPUT_DIR = "./public/img/" + args.output

os.makedirs(OUTPUT_DIR, exist_ok=True)

def clear_directory(path):
    if not os.path.isdir(path):
        return

    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)

        if os.path.isfile(file_path):
            os.remove(file_path)

clear_directory(OUTPUT_DIR)

with open(JSON_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

    print(data)

    for record in data:
        fields = record.get("fields", {})
        icons = fields.get("Icon")

        if not icons:
            continue

        icon = icons[0]
        path = icon.get("path")
        uid = icon.get("id")

        if not path:
            continue

        url = BASE_URL + "/" + path.lstrip("/")

        filename = os.path.join(OUTPUT_DIR, uid + "_" + os.path.basename(path))

        print(f"Téléchargement : {url}")

        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()

            with open(filename, "wb") as img_file:
                img_file.write(response.content)

            print(f"✔ Image enregistrée : {filename}")

        except Exception as e:
            print(f"❌ Erreur pour {url} : {e}")
