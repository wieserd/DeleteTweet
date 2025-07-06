from PIL import Image

def create_icon(size, color, file_path):
  img = Image.new('RGB', (size, size), color = color)
  img.save(file_path)

create_icon(16, 'black', 'icons/icon16.png')
create_icon(48, 'black', 'icons/icon48.png')
create_icon(128, 'black', 'icons/icon128.png')