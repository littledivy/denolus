this file will serve to define the syntax we use for denolus
denolus is strongly inspired by Stylus
it uses a Yaml for parsing the tokens.

```yaml
# comments can be usefull for statements
@import something
#or
# denolus import something
body:
    margin: 0px
    padding: 0px

body > div:
    #we can select one element and make complex selectors
    #nested elements
    span:
        width: 10px
```
# Some ideas

## Typed Scopes
the idea is to let the possiblity to reuse already declared style for a selector, and/or to assert that all the required properties are implemented

we need to declare first the types

```yaml
@type RedOrBlackBackground:
    background: red | black
```

I suggest to use `@type` which looks like `@media` or `@keyframes`. but the issue is if CSS maintainers decide to implement it in a new version of CSS...

### how to use types

```yaml
[RedOrBlackBackground] body div:
    background: black # no error here
    [RedOrBlackBackground] span:
        background: blue # error here
```
### Generic Types
like in ts, we need to let the possibility to declare parameters for the types

```yaml
@type RedOrBlackBackground<T>:
    background: T
    width: px | em # value has to end with px or em

[RedOrBlackBackground<black>] body div:
    width: 10px
```


