// ==UserScript==
// @id wiki-monkey-editor
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.16.0-editor
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-editor.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-editor.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/files/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/files/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// @require https://raw.github.com/kynikos/lib.js.generic/1.6/src/Async.js
// @require https://raw.github.com/kynikos/lib.js.generic/1.6/src/Compatibility.js
// @require https://raw.github.com/kynikos/lib.js.generic/1.6/src/CSS.js
// @require https://raw.github.com/kynikos/lib.js.generic/1.6/src/DOM.js
// @require https://raw.github.com/kynikos/lib.js.generic/1.6/src/HTTP.js
// @require https://raw.github.com/kynikos/lib.js.generic/1.6/src/Obj.js
// @require https://raw.github.com/kynikos/lib.js.generic/1.6/src/RegEx.js
// @require https://raw.github.com/kynikos/lib.js.generic/1.6/src/Str.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/Filters.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/Interlanguage.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/Parser.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/modules/WhatLinksHere.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/plugins/FixFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/plugins/FixLinkFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/plugins/MultipleLineBreaks.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.16.0/src/plugins/SimpleReplace.js
// ==/UserScript==

WM.UI.setEditor([
    [
        ["FixFragments", "Fix section links", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Squash multiple line breaks", null]
    ],
    [
        ["SimpleReplace", "RegExp substitution", ["1"]]
    ],
    [
        ["FixLinkFragments", "Fix external section links", null]
    ]
]);

WM.UI.setDiff(null);

WM.UI.setCategory(null);

WM.UI.setWhatLinksHere(null);

WM.UI.setLinkSearch(null);

WM.UI.setSpecial(null);

WM.UI.setRecentChanges(null);

WM.UI.setNewPages(null);

WM.UI.setSpecialList(null);

WM.main();
