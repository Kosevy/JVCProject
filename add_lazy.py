import re

def add_attrs_to_img(match):
    tag = match.group(0)
    if 'loading=' in tag or 'srcset=' in tag:
        return tag
    # Insert before closing >
    # Ensure we don't break self-closing
    if tag.endswith('/>'):
        # replace '/>' with ' loading="lazy" srcset="$1 1x, $1 2x"/>'
        # need src value
        src_match = re.search(r'src="([^"]+)"', tag)
        if src_match:
            src = src_match.group(1)
            new_tag = token = f' loading="lazy" srcset="{src} 1x, {src} 2x"/>'
            # replace '/>' with new_tag
            return tag[:-2] + new_tag
        else:
            return tag
    else:
        # ends with >
        src_match = re.search(r'src="([^"]+)"', tag)
        if src_match:
            src = src_match.group(1)
            # insert before >
            return tag[:-1] + f' loading="lazy" srcset="{src} 1x, {src} 2x">'
        else:
            return tag

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # pattern to match img tag (non-greedy)
    pattern = r'<img[^>]*>'
    new_content = re.sub(pattern, add_attrs_to_img, content, flags=re.IGNORECASE)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == '__main__':
    for f in ['index.html', 'projects.html']:
        process_file(f)
        print(f'Added loading and srcset to {f}')