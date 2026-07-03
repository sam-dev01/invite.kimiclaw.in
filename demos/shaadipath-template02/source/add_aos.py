import re

file_path = r"D:\VOWED\kiminew\demos\shaadipath-template02\source\index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add data-aos="fade-up" to various sections
replacements = {
    'class="sec-header"': 'class="sec-header" data-aos="fade-up"',
    'class="ev-card"': 'class="ev-card" data-aos="fade-up" data-aos-delay="100"',
    'class="ev-card ev-hero-card"': 'class="ev-card ev-hero-card" data-aos="fade-up" data-aos-delay="200"',
    'class="sm-item"': 'class="sm-item" data-aos="fade-right" data-aos-delay="100"',
    'class="story-left"': 'class="story-left" data-aos="slide-right"',
    'class="story-right"': 'class="story-right" data-aos="slide-left"',
    'class="gi gi-tall"': 'class="gi gi-tall" data-aos="fade-right"',
    'class="gi"': 'class="gi" data-aos="fade-up" data-aos-delay="100"',
    'class="kc"': 'class="kc" data-aos="flip-left" data-aos-delay="100"',
    'class="rsvp-h"': 'class="rsvp-h" data-aos="fade-up" data-aos-delay="120"',
    'class="rsvp-sub"': 'class="rsvp-sub" data-aos="fade-up" data-aos-delay="200"',
    'class="rsvp-btns"': 'class="rsvp-btns" data-aos="fade-up" data-aos-delay="300"',
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated HTML with data-aos.")
