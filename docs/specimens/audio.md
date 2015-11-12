## Audio

The audio specimen can be used to document the audible aspects, for example background music, sound effects or jingles in the browser-provided interface.

### Keys

- __`src: string`__ the url pointing to the source file
- `autoplay: boolean` if true, the audio clip plays without interaction
- `loop: boolean ` if true, the audio clip plays repeatedly

### Arguments
- `span-[1-6]` defines the width of the audio player

### Example

```audio|span-2
[   
    {
        "src": "docs/html-project-example/sound.mp3"
    }
]
```

```code
'''audio|span-2
  [   
      {
          "src": "docs/html-project-example/sound.mp3"
      }
  ]
'''
```
