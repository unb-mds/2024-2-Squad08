# geojson.py
import json
from shapely.geometry import shape
from flask import current_app

def normalize_region_name(region: str) -> str:
    return "".join(region.split()).lower()

def load_ra_geometries():
    
    geojson_path = "/app/regioesAdm.json"
    with open(geojson_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    ra_geometries = {}
    for feature in data.get("features", []):
        
        ra_value = feature.get("properties", {}).get("ra")
        if ra_value:
            normalized_ra = normalize_region_name(ra_value)
            ra_geometries[normalized_ra] = shape(feature["geometry"])
    return ra_geometries
