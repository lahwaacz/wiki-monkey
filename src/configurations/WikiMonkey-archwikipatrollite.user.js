// ==UserScript==
// @id wiki-monkey-archwikipatrollite
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.14.6-dev-archwikipatrollite
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/develop/src/configurations/WikiMonkey-archwikipatrollite.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/develop/src/configurations/WikiMonkey-archwikipatrollite.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/develop/src/files/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/develop/src/files/wiki-monkey-64.png
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/js-aux-lib/master/src/Async.js
// @require https://raw.github.com/kynikos/js-aux-lib/master/src/Compatibility.js
// @require https://raw.github.com/kynikos/js-aux-lib/master/src/DOM.js
// @require https://raw.github.com/kynikos/js-aux-lib/master/src/HTTP.js
// @require https://raw.github.com/kynikos/js-aux-lib/master/src/Obj.js
// @require https://raw.github.com/kynikos/js-aux-lib/master/src/RegEx.js
// @require https://raw.github.com/kynikos/js-aux-lib/master/src/Str.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/ArchWiki.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/ArchPackages.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Interlanguage.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Parser.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/RecentChanges.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/WhatLinksHere.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/plugins/ArchWikiQuickReport.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/plugins/ArchWikiRCFilter.js
// ==/UserScript==

WM.UI.setEditor(null);

WM.UI.setDiff([
    [
        ["ArchWikiQuickReport", "Quick report",
         ["1", "ArchWiki:Reports", "add report"]]
    ]
]);

WM.UI.setCategory(null);

WM.UI.setWhatLinksHere(null);

WM.UI.setLinkSearch(null);

WM.UI.setSpecial(null);

WM.UI.setRecentChanges([
    [
        "ArchWikiRCFilter",
        "Default filter",
        {
            language: "English",
        }
    ]
]);

WM.UI.setSpecialList(null);

WM.main();
