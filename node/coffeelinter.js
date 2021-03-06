/*
 * Copyright (c) 2014 Dan Casey.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global */

(function () {
    "use strict";
    var cl = require('coffeelint');

    function linter(text) {
        return cl.lint(text);
    }

    function init(domainManager) {
        if (!domainManager.hasDomain("coffeelinter")) {
            domainManager.registerDomain("coffeelinter", {major: 0, minor: 1});
        }
        domainManager.registerCommand(
            "coffeelinter", // domain name
            "linter",       // command name
            linter,         // command handler function
            false,          // async?
            "Lints given coffeescript", // description
            [{  name: "text",
                type: "string",
                description: "Text to lint"}],
            [{  name: "results", // return values
                type: "object",
                description: "lint results"}]
        );
    }

    exports.init = init;

}());