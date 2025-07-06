from PIL import Image

SOURCE_ICON_PATH = '/Users/dw2022/gemini/icons/icon128.png'

def resize_icon(size, output_path):
    try:
        img = Image.open(SOURCE_ICON_PATH)
        img = img.resize((size, size), Image.Resampling.LANCZOS)
        img.save(output_path)
        print(f"Successfully created {output_path}")
    except Exception as e:
        print(f"Error creating {output_path}: {e}")

resize_icon(128, '/Users/dw2022/gemini/icons/icon128.png')
resize_icon(48, '/Users/dw2022/gemini/icons/icon48.png')
resize_icon(16, '/Users/dw2022/gemini/icons/icon16.png')
