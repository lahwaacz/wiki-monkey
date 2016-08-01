// Generated by CoffeeScript 1.10.0
var ArchPackages_, ArchWiki_, Bot_, Cat_, Cfg_, Diff_, Editor_, Filters_, Interlanguage_, Log_, MW_, Menu_, Mods_, Parser_, Tables_, UI_, WhatLinksHere_,
  slice = [].slice;

ArchPackages_ = require('./ArchPackages').ArchPackages;

ArchWiki_ = require('./ArchWiki').ArchWiki;

Bot_ = require('./Bot').Bot;

Cat_ = require('./Cat').Cat;

Cfg_ = require('./Cfg').Cfg;

Diff_ = require('./Diff').Diff;

Editor_ = require('./Editor').Editor;

Filters_ = require('./Filters').Filters;

Interlanguage_ = require('./Interlanguage').Interlanguage;

Log_ = require('./Log').Log;

Menu_ = require('./Menu').Menu;

Mods_ = require('./Mods').Mods;

MW_ = require('./MW').MW;

Parser_ = require('./Parser').Parser;

Tables_ = require('./Tables').Tables;

UI_ = require('./UI').UI;

WhatLinksHere_ = require('./WhatLinksHere').WhatLinksHere;

module.exports.WM = (function() {
  function WM() {
    var Plugin, i, installedPlugins, len, pname, ref;
    installedPlugins = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.ArchPackages = new ArchPackages_(this);
    this.ArchWiki = new ArchWiki_(this);
    this.Bot = new Bot_(this);
    this.Cat = new Cat_(this);
    this.Cfg = new Cfg_(this);
    this.Diff = new Diff_(this);
    this.Editor = new Editor_(this);
    this.Filters = new Filters_(this);
    this.Interlanguage = new Interlanguage_(this);
    this.Log = new Log_(this);
    this.Menu = new Menu_(this);
    this.Mods = new Mods_(this);
    this.MW = new MW_(this);
    this.Parser = new Parser_(this);
    this.Tables = new Tables_(this);
    this.UI = new UI_(this);
    this.WhatLinksHere = new WhatLinksHere_(this);
    this.Plugins = {};
    for (i = 0, len = installedPlugins.length; i < len; i++) {
      ref = installedPlugins[i], pname = ref[0], Plugin = ref[1];
      this.Plugins[pname] = new Plugin(this);
    }
  }

  WM.prototype.main = function(defaultConfig) {
    this.Cfg._load(defaultConfig);
    return this.UI._makeUI();
  };

  return WM;

})();
