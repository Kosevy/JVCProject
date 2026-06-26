import re
import sys

def process_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Pattern to find img tags
    # We'll replace <img src="(...)" alt="(...)">
    # with <img src="\1" alt="\2" loading="lazy" srcset="\1 1x, \1 2x">
    # Ensure we don't double modify
    def repl(match):
        tag = match.group(0)
        src = match.group(1)
        alt = match.group(2)
        # If already has loading or srcset, skip?
        if 'loading=' in tag or 'srcset=' in tag:
            return tag
        new_tag = f'<img src="{src}" alt="{alt}" loading="lazy" srcset="{src} 1x, {src} 2x">'
        return new_tag
    # Regex capturing src and alt (assuming order src then alt)
    pattern = r'<img\s+src="([^"]+)"\s+alt="([^"]*)"\s*/?>'
    new_content = re.sub(pattern, repl, content, flags=re.IGNORECASE)
    # Also handle case where alt may be empty
    pattern2 = r'<img\s+src="([^"]+)"\s*/?>'
    def repl2(match):
        tag = match.group(0)
        src = match.group(1)
        if 'loading=' in tag or 'srcset=' in tag:
            return tag
        return f'<img src="{src}" loading="lazy" srcset="{src} 1x, {src} 2x">'
    new_content = re.sub(pattern2, repl2, new_content, flags=re.IGNORECASE)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == '__main__':
    for f in ['index.html', 'projects.html']:
        process_html(f)
        print(f'Processed {f}')