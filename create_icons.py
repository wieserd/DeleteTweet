from PIL import Image

def create_icon(size, color, file_path):
  img = Image.new('RGB', (size, size), color = color)
  img.save(file_path)

create_icon(16, 'black', '/Users/dw2022/gemini/icons/icon16.png')
create_icon(48, 'black', '/Users/dw2022/gemini/icons/icon48.png')
create_icon(128, 'black', '/Users/dw2022/gemini/icons/icon128.png')
