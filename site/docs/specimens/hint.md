## Hint

Can be used to highlight important aspects.

### Arguments

- `directive` good for _dos_
- `warning` good for _don'ts_
- `neutral` a neutral style

### Examples

```hint
Make sure to use <pre>text-rendering: optimizeLegibility;</pre>on fonts over 36px, as well as <pre>-webkit-font-smoothing: antialiased;</pre> and <pre>-moz-osx-font-smoothing: grayscale;</pre> on dark backgrounds.
```

```code
'''hint
Make sure to use <pre>text-rendering: optimizeLegibility;</pre>on fonts over 36px, as well as <pre>-webkit-font-smoothing: antialiased;</pre> and <pre>-moz-osx-font-smoothing: grayscale;</pre> on dark backgrounds.
'''
```

```hint|directive
Make it so!
```

```code
'''hint|directive
Make it so!
'''
```

```hint|warning
No <strong>stairway</strong>
```

```code
'''hint|warning
No <strong>stairway</strong>;
'''
```

```hint|neutral
A neutral hint.
```

```code
'''hint|neutral
A neutral hint.
'''
```
