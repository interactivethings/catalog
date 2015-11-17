## Video

The video specimen can be used to embed videos. 
It can be used to document design specifications that are done in an animation program or highlight behaviors through a screencast.


### Keys

- __`src: string`__ the url pointing to the source file
- `muted: boolean ` if true, the sound of the video clip is muted
- `autoplay: boolean` if true, the video clip plays without interaction
- `loop: boolean ` if true, the video clip plays repeatedly

### Arguments
- `span-[1-6]` defines the width of the video player


### Example

```video|span-3
[   
    {
        "src": "docs/html-project-example/video.m4v"
    }
]
```


```code
'''video|span-3
[   
    {
        "src": "docs/html-project-example/video.m4v"
    }
]
'''
```
