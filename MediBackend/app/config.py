# app/config.py

import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://tbhowmick:Eragon28$@peakspeakcluster.r2lkwtb.mongodb.net/?retryWrites=true&w=majority&appName=PeakSpeakCluster")
DB_NAME = os.getenv("DB_NAME", "medimind")