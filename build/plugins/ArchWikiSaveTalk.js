// Generated by CoffeeScript 2.0.3
  // Wiki Monkey - MediaWiki bot and editor-assistant user script
  // Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>

  // This file is part of Wiki Monkey.

  // Wiki Monkey is free software: you can redistribute it and/or modify
  // it under the terms of the GNU General Public License as published by
  // the Free Software Foundation, either version 3 of the License, or
  // (at your option) any later version.

  // Wiki Monkey is distributed in the hope that it will be useful,
  // but WITHOUT ANY WARRANTY; without even the implied warranty of
  // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  // GNU General Public License for more details.

  // You should have received a copy of the GNU General Public License
  // along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
var CSS, HTTP, Plugin, ref,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

({Plugin} = require('./_Plugin'));

CSS = require('../../lib.js.generic/dist/CSS');

HTTP = require('../../lib.js.generic/dist/HTTP');

ref = module.exports.ArchWikiSaveTalk = (function() {
  class ArchWikiSaveTalk extends Plugin {
    constructor() {
      super(...arguments);
      this.mainGetEndTimestamp = this.mainGetEndTimestamp.bind(this);
      this.mainWrite = this.mainWrite.bind(this);
      this.mainEnd = this.mainEnd.bind(this);
    }

    makeUI() {
      var article, link;
      CSS.addStyleElement("#WikiMonkey-ArchWikiSaveTalk {margin-left:0.33em;}");
      article = this.conf.title;
      link = document.createElement('a');
      link.id = "WikiMonkey-ArchWikiSaveTalk";
      link.href = "/index.php/" + article;
      link.innerHTML = article;
      return link;
    }

    main_diff(callNext) {
      var article, summary;
      article = this.conf.title;
      summary = this.conf.edit_summary;
      this.WM.Log.logInfo('Appending diff to ' + this.WM.Log.linkToWikiPage(article, article) + " ...");
      return this.WM.Diff.getEndTimestamp(this.mainGetEndTimestamp, [article, summary, callNext]);
    }

    mainGetEndTimestamp(enddate, args) {
      var article, callNext, summary;
      boundMethodCheck(this, ref);
      article = args[0];
      summary = args[1];
      callNext = args[2];
      return this.WM.MW.callQueryEdit(article, this.mainWrite, [summary, enddate, callNext]);
    }

    mainWrite(article, source, timestamp, edittoken, args) {
      var callNext, enddate, newtext, pEnddate, summary, title;
      boundMethodCheck(this, ref);
      summary = args[0];
      enddate = args[1];
      callNext = args[2];
      title = HTTP.getURIParameter(null, 'title');
      pEnddate = enddate.substr(0, 10) + "&nbsp;" + enddate.substr(11, 8);
      newtext = this.WM.Tables.appendRow(source, "<!-- REPLY TABLE -->", ["[" + location.href + " " + title + "]", pEnddate]);
      return this.WM.MW.callAPIPost({
        action: "edit",
        bot: "1",
        title: article,
        summary: summary,
        text: newtext,
        basetimestamp: timestamp,
        token: edittoken
      }, this.mainEnd, [article, callNext], null);
    }

    mainEnd(res, args) {
      var article, callNext;
      boundMethodCheck(this, ref);
      article = args[0];
      callNext = args[1];
      if (res.edit && res.edit.result === 'Success') {
        this.WM.Log.logInfo('Diff correctly appended to ' + this.WM.Log.linkToWikiPage(article, article));
        if (callNext) {
          return callNext();
        }
      } else {
        return this.WM.Log.logError('The diff has not been appended!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
      }
    }

  };

  ArchWikiSaveTalk.conf_default = {
    diff_menu: ["Save discussion"],
    title: "User:Kynikos/Tasks",
    edit_summary: "add discussion"
  };

  return ArchWikiSaveTalk;

})();
