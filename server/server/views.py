from rest_framework.decorators import api_view
from rest_framework.response import Response
import cv2
import numpy as np
from collections import OrderedDict
import json
from django.http import HttpResponse

# Hello world home page
@api_view(['GET'])
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@api_view(['POST'])
def upload_file(request):
    image = request.FILES.get('image')
    if image:
        img = cv2.imdecode(np.frombuffer(image.read(), np.uint8), cv2.IMREAD_COLOR)
        colors = analyze_colors(img)
        color_names = ['URO', 'BIL', 'KET', 'BLD', 'PRO', 'NIT', 'LEU', 'GLU', 'SG', 'PH']
        color_data = OrderedDict()
        for index, name in enumerate(color_names):
            color_data[name] = colors[index]

        # print(color_data);
        response_data = color_data

        json_data = json.dumps(response_data, sort_keys=False)
        return Response(json_data, status=200)
    else:
        return Response({'error': 'No file provided.'}, status=400)



def analyze_colors(image):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    color_regions = [
        (0, 0, 10, 100),    # Region for Color 1
        (10, 0, 20, 100),   # Region for Color 2
        (20, 0, 30, 100),   # Region for Color 3
        (30, 0, 40, 100),   # Region for Color 4
        (40, 0, 50, 100),   # Region for Color 5
        (50, 0, 60, 100),   # Region for Color 6
        (60, 0, 70, 100),   # Region for Color 7
        (70, 0, 80, 100),   # Region for Color 8
        (80, 0, 90, 100),   # Region for Color 9
        (90, 0, 100, 100)   # Region for Color 10
    ]

    colors = []

    for region in color_regions:
        x, y, w, h = region
        color_region = image[y:y+h, x:x+w]
        mean_color = np.mean(color_region, axis=(0, 1))
        rgb = [int(channel) for channel in mean_color]
        colors.append(rgb)
    return colors




