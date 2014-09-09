brackets-coffeelinter
=====================

Makes CoffeeLint the Brackets linter for CoffeeScript files. Very simple.

How
---

Uses [CoffeeLint](http://www.coffeelint.org) and [Node.js](http://nodejs.org) to provide linting support for [CoffeeScript](http://coffeescript.org) in [Brackets](http://brackets.io) using its built-in linting API, `CodeInspection`. Uses an async call to get results from Node instance of CoffeeLint as described [here](http://www.raymondcamden.com/2014/4/15/Example-of-Async-Linting-support-in-Brackets-Sprint-38).

Others
------

These extensions also do CoffeeScript linting in Brackets; check them out:

- [Interactive Linter](https://github.com/MiguelCastillo/Brackets-InteractiveLinter)
- [Coffeescript Lint Extension for Brackets](https://github.com/ingorichter/de.richter.brackets.coffeelint)

Why?
----

I wanted:

- to make a simple Brackets extension
- to make Brackets call code from Node.js
- something simple

Feedback welcome!

Limitations
-----------

- No config support (currently)

License
-------

MIT

