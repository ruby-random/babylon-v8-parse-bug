# Why?
Node emits strange error when loading valid source. This is somehow connected to babel, because error does not reproduce on bare node.

# How?
To confirm, launch `./run-single.sh` in console, it will test it once. If bug reproduces, it should throw `ReferenceError: XY is not defined`.

To experiment, launch `./run.sh` in console, it will run check each second.
