> The Audio Specimen can be used to document the audible aspects, for example background music, sound effects or jingles in the browser-provided interface.

### Props

- __`src: string`__ the url pointing to the source file
- `title: string` a title for the audio clip, otherwise the filename is used
- `autoplay: boolean` if true, the audio clip plays without interaction
- `loop: boolean ` if true, the audio clip plays repeatedly
- `span: number[1–6]` width of the specimen

### Example

```audio
span: 3
src: "/assets/sound.mp3"
```

````code
```audio
span: 3
src: "/assets/sound.mp3"
```
````
