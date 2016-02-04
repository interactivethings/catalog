# Foo

- Foo can do anything.
- So what, you might think?
- Even hot reloading
- This is awesome

```react
state:
  counter: 0
---
<Foo name={counter}>
  <button onClick={() => setState(({counter}) => ({counter: counter + 1}))}>+ 1</button>
</Foo>
```

### What is `Foo`?

- `children`: `node`

```react
<Foo>
  <Foo>Bar</Foo>
  <Foo>
    asdf
    <Foo>Bar</Foo>
  </Foo>
  <p style={{fontWeight: 'bold'}}>Bar</p>
</Foo>
```
