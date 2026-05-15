"""
Колоризация чёрно-белых фотографий через DeepAI API.
Принимает изображение в base64, возвращает URL раскрашенного фото.
"""
import os
import json
import base64
import requests


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    raw_body = event.get("body") or "{}"
    body = json.loads(raw_body) if raw_body.strip() else {}
    image_b64 = body.get("image")

    if not image_b64:
        return {
            "statusCode": 400,
            "headers": cors,
            "body": json.dumps({"error": "Изображение не передано"}),
        }

    # Убираем data:image/...;base64, префикс если есть
    if "," in image_b64:
        image_b64 = image_b64.split(",", 1)[1]

    image_bytes = base64.b64decode(image_b64)

    api_key = os.environ.get("DEEPAI_API_KEY", "")

    response = requests.post(
        "https://api.deepai.org/api/colorizer",
        files={"image": ("photo.jpg", image_bytes, "image/jpeg")},
        headers={"api-key": api_key},
        timeout=60,
    )

    result = response.json()

    if "output_url" not in result:
        return {
            "statusCode": 500,
            "headers": cors,
            "body": json.dumps({"error": result.get("err", "Ошибка обработки")}),
        }

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"url": result["output_url"]}),
    }