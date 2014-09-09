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
maxerr: 50, browser: true */
/*global $, define, brackets */

define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils  = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain      = brackets.getModule("utils/NodeDomain"),
        CodeInspection  = brackets.getModule("language/CodeInspection");

    var lintDomain      = new NodeDomain("coffeelinter", ExtensionUtils.getModulePath(module, "node/coffeelinter"));
    
    var testColumn      = /^\[[\w\W]*\]:\d+:\d+/,
        sliceColumn     = /^(?:\[[\w\W]+\]:\d+:)(\d)/,
        sliceMessage    = /^(?:\[[\w\W]+\]:\d+:\d+: )?([\w\W]+)$/;

    function doLinter(text, path) {
        var response = new $.Deferred();
        
        lintDomain.exec("linter", text)
            .done(function (thelint) {
                var i;
                console.log("[coffeelinter] %d pieces of lint", thelint.length);

                if (thelint.length === 0) {
                    response.resolve(null);
                }
                var result = {
                    errors: []
                };
                for (i = 0; i < thelint.length; i++) {
                    
                    // categorize the error from CoffeeLint to Brackets
                    var errorType;
                    var error = thelint[i];
                    if (error.level === 'error') {
                        errorType = CodeInspection.Type.ERROR;
                    } else if (error.level === 'warn') {
                        errorType = CodeInspection.Type.WARNING;
                    } else {
                        // TODO is there another Brackets type?
                        errorType = CodeInspection.Type.WARNING;
                    }
                    
                    // get the column (if any) and line
                    var pos, message, firstline;
                    if (testColumn.test(error.message)) {
                        pos = {
                            line: error.lineNumber - 1,
                            ch: parseInt(sliceColumn.exec(error.message)[1], 10) - 1
                        };
                    } else {
                        pos = { line: error.lineNumber - 1 };
                    }
                    
                    // get the message; first line only
                    firstline = error.message.split("\n", 1)[0];
                    message = sliceMessage.exec(firstline)[1];
                    
                    // push this error to array
                    result.errors.push(
                        {
                            pos: pos,
                            message: message,
                            type: errorType
                        }
                    );
                }
                console.log("[coffeelinter] errors", result);
                response.resolve(result);
            }).fail(function (err) {
                console.error("[coffeelinter] failed", err);
                response.reject(); // TODO is that right?
            });
        return response.promise();
    }
        
    CodeInspection.register('coffeescript', {
        name: "CoffeeLint",
        scanFileAsync: doLinter
    });

});
