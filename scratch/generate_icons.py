from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('icons', exist_ok=True)

for size in [192, 512]:
    img = Image.new('RGBA', (size, size), color=(15, 23, 42, 255))
    draw = ImageDraw.Draw(img)

    # Draw rounded background circle/square
    padding = size // 10
    draw.rounded_rectangle([padding, padding, size - padding, size - padding], radius=size // 5, fill=(30, 41, 59, 255), outline=(245, 158, 11, 255), width=size // 40)

    # Draw a stylized beer mug / snack symbol
    cx, cy = size // 2, size // 2
    r = size // 5
    
    # Mug body
    mug_w = size // 3
    mug_h = int(size // 2.4)
    x0 = cx - mug_w // 2 - size // 25
    y0 = cy - mug_h // 2 + size // 25
    draw.rounded_rectangle([x0, y0, x0 + mug_w, y0 + mug_h], radius=size // 20, fill=(245, 158, 11, 255))

    # Mug handle
    handle_w = size // 8
    handle_h = size // 4
    hx0 = x0 + mug_w
    hy0 = y0 + size // 15
    draw.arc([hx0 - handle_w // 2, hy0, hx0 + handle_w, hy0 + handle_h], start=270, end=90, fill=(245, 158, 11, 255), width=size // 30)

    # Mug foam
    foam_y = y0 - size // 30
    draw.ellipse([x0 - size // 40, foam_y, x0 + mug_w // 2, foam_y + size // 8], fill=(255, 255, 255, 255))
    draw.ellipse([x0 + mug_w // 3, foam_y - size // 50, x0 + mug_w + size // 40, foam_y + size // 8], fill=(255, 255, 255, 255))

    img.save(f'icons/icon-{size}.png')

print("Icons created successfully in icons/ folder!")
