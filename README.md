<p align="center">
    <img src="https://raw.githubusercontent.com/divy-work/denolus/master/assets/denolus_official_logo.svg" width="350">
</p>

# Denolus

Denolus is strongly inspired by Stylus.

### Authors

* SRNV
* divy-work

#### Join Discord

[![](https://discordapp.com/api/guilds/715564894904123424/widget.png?style=banner2)](https://discord.gg/uqywa4W)

### Examples
```yaml
@import "examples/module"
$variable = #ff000
div:
  span:
    ~ nth-child(1):
      color: #ff000

    ~ nth-child(2):
      color: #0000ff

    ~#denolus:
      color: #00ff00
      grid-template:
        - "a a"
        - "b b"
        - "c c"
      ~ #sub:
        font-weight: bold
        color: $variable
```
