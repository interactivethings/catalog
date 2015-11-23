## Audio

The audio specimen can be used to document the audible aspects, for example background music, sound effects or jingles in the browser-provided interface.

### Keys

- __`src: string`__ the url pointing to the source file
- `title: string` a title for the audio clip, otherwise the filename is used
- `autoplay: boolean` if true, the audio clip plays without interaction
- `loop: boolean ` if true, the audio clip plays repeatedly

### Arguments
- `span-[1-6]` defines the width of the audio player

### Example

```audio|span-3
{
  "src": "docs/assets/sound.mp3"
}
```

```code|lang-javascript
'''audio|span-3
{
  "src": "docs/assets/sound.mp3"
}
'''
```
