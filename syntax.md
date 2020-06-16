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