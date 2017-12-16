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
var ArchWiki, Bot, Cat, Diff, Editor, Filters, Interlanguage, Log, MW, Menu, Mods, Parser, Plugin, Tables, UI, Upgrade, WM, WhatLinksHere, mwmodpromise, wm;

mwmodpromise = mw.loader.using(['mediawiki.api.edit', 'mediawiki.notification']);

// Initialize the libraries immediately (especially babel-polyfill)
require('./libs');

// The ArchPackages module is currently unusable
// ArchPackages = require('./ArchPackages')
ArchWiki = require('./ArchWiki');

Bot = require('./Bot');

Cat = require('./Cat');

Diff = require('./Diff');

Editor = require('./Editor');

Filters = require('./Filters');

Interlanguage = require('./Interlanguage');

Log = require('./Log');

Menu = require('./Menu');

Mods = require('./Mods');

MW = require('./MW');

Parser = require('./Parser');

Tables = require('./Tables');

UI = require('./UI');

Upgrade = require('./Upgrade');

WhatLinksHere = require('./WhatLinksHere');

({Plugin} = require('../plugins/_Plugin'));

WM = (function() {
  class WM {
    constructor() {
      this.setup = this.setup.bind(this);
      this.init = this.init.bind(this);
    }

    setup(wiki_name, ...installed_plugins_temp) {
      this.wiki_name = wiki_name;
      this.installed_plugins_temp = installed_plugins_temp;
    }

    async init(user_config = {}) {
      var PluginSub, i, interface_, len, option, pmod, pname, ref, value;
      for (option in user_config) {
        value = user_config[option];
        if (!(option in this.conf)) {
          continue;
        }
        this.conf[option] = value;
        delete user_config[option];
      }
      this.Plugins = {
        bot: [],
        diff: [],
        editor: [],
        newpages: [],
        recentchanges: [],
        special: []
      };
      ref = this.installed_plugins_temp;
      for (i = 0, len = ref.length; i < len; i++) {
        pmod = ref[i];
        for (pname in pmod) {
          PluginSub = pmod[pname];
          if (!(PluginSub.prototype instanceof Plugin)) {
            continue;
          }
          PluginSub.__configure(this.wiki_name, user_config);
          for (interface_ in this.Plugins) {
            if (PluginSub.prototype[`main_${interface_}`]) {
              this.Plugins[interface_].push(PluginSub);
            }
          }
        }
      }
      if (!$.isEmptyObject(user_config)) {
        console.warn("Unkown configuration options", user_config);
      }
      delete this.installed_plugins_temp;
      await $.when(mwmodpromise, $.ready);
      // The ArchPackages module is currently unusable
      // @ArchPackages = new ArchPackages(this)
      this.ArchWiki = new ArchWiki(this);
      this.Bot = new Bot(this);
      this.Cat = new Cat(this);
      this.Diff = new Diff(this);
      this.Editor = new Editor(this);
      this.Filters = new Filters(this);
      this.Interlanguage = new Interlanguage(this);
      this.Log = new Log(this);
      this.Menu = new Menu(this);
      this.Mods = new Mods(this);
      this.MW = new MW(this);
      this.Parser = new Parser(this);
      this.Tables = new Tables(this);
      this.UI = new UI(this);
      this.Upgrade = new Upgrade(this);
      this.WhatLinksHere = new WhatLinksHere(this);
      if (this.conf.update_check_wdays) {
        this.Upgrade.check_and_notify();
      }
      return this.UI._makeUI();
    }

  };

  // The build script updates the version number
  WM.prototype.VERSION = '4.0.0';

  WM.prototype.conf = {
    default_bot_plugin: "SimpleReplace",
    default_recentchanges_plugin: null,
    default_newpages_plugin: null,
    update_check_wdays: [6],
    hide_rollback_links: true,
    disable_edit_summary_submit_on_enter: true,
    scroll_to_first_heading: false,
    heading_number_style: false
  };

  return WM;

})();

wm = new WM();

module.exports = wm.setup;

window.wikimonkey = wm.init;
