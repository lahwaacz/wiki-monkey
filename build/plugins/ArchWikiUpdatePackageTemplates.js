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
var Plugin, ref,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

({Plugin} = require('./_Plugin'));

ref = module.exports.ArchWikiUpdatePackageTemplates = (function() {
  class ArchWikiUpdatePackageTemplates extends Plugin {
    constructor() {
      super(...arguments);
      this.doUpdate = this.doUpdate.bind(this);
      this.doUpdateContinue = this.doUpdateContinue.bind(this);
      this.doUpdateContinue2 = this.doUpdateContinue2.bind(this);
      this.checkOfficial = this.checkOfficial.bind(this);
      this.checkOfficiallc = this.checkOfficiallc.bind(this);
      this.checkAUR = this.checkAUR.bind(this);
      this.checkAURlc = this.checkAURlc.bind(this);
      this.checkGroup64 = this.checkGroup64.bind(this);
      this.checkGroup64lc = this.checkGroup64lc.bind(this);
      this.checkGroup32 = this.checkGroup32.bind(this);
      this.checkGroup32lc = this.checkGroup32lc.bind(this);
      this.checkOfficial2 = this.checkOfficial2.bind(this);
      this.checkOfficiallc2 = this.checkOfficiallc2.bind(this);
      this.checkAUR2 = this.checkAUR2.bind(this);
      this.checkAURlc2 = this.checkAURlc2.bind(this);
      this.checkGroup64_2 = this.checkGroup64_2.bind(this);
      this.checkGroup64lc2 = this.checkGroup64lc2.bind(this);
      this.checkGroup32_2 = this.checkGroup32_2.bind(this);
      this.checkGroup32lc2 = this.checkGroup32lc2.bind(this);
      this.doUpdateContinue3 = this.doUpdateContinue3.bind(this);
      this.mainEnd = this.mainEnd.bind(this);
      this.mainAutoReplace = this.mainAutoReplace.bind(this);
      this.mainAutoWrite = this.mainAutoWrite.bind(this);
      this.mainAutoEnd = this.mainAutoEnd.bind(this);
    }

    doUpdate(source, call, callArgs) {
      var newText, templates;
      boundMethodCheck(this, ref);
      // Note that findTemplatesPattern puts the pattern in a capturing group
      //   (parentheses) by itself
      templates = this.WM.Parser.findTemplatesPattern(source, "[Pp]kg|[Aa]ur|AUR|[Gg]rp");
      newText = "";
      if (templates.length > 0) {
        return this.doUpdateContinue(source, newText, templates, 0, call, callArgs);
      } else {
        return call(source, source, callArgs);
      }
    }

    doUpdateContinue(source, newText, templates, index, call, callArgs) {
      boundMethodCheck(this, ref);
      this.WM.Log.logInfo("Processing " + templates[index].rawTransclusion + " ...");
      newText += source.substring((index === 0 ? 0 : templates[index - 1].index + templates[index - 1].length), templates[index].index);
      switch (templates[index].title.toLowerCase()) {
        case 'pkg':
          // Checks must be in reversed order because they are popped
          return this.doUpdateContinue2([this.checkGroup32lc, this.checkGroup32, this.checkGroup64lc, this.checkGroup64, this.checkAURlc, this.checkAUR, this.checkOfficiallc, this.checkOfficial], source, newText, templates, index, call, callArgs);
        case 'aur':
          // Checks must be in reversed order because they are popped
          return this.doUpdateContinue2([this.checkGroup32lc, this.checkGroup32, this.checkGroup64lc, this.checkGroup64, this.checkOfficiallc, this.checkOfficial, this.checkAURlc, this.checkAUR], source, newText, templates, index, call, callArgs);
        case 'grp':
          // Checks must be in reversed order because they are popped
          return this.doUpdateContinue2([this.checkAURlc, this.checkAUR, this.checkOfficiallc, this.checkOfficial, this.checkGroup32lc, this.checkGroup32, this.checkGroup64lc, this.checkGroup64], source, newText, templates, index, call, callArgs);
        default:
          newText += templates[index].rawTransclusion;
          return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
      }
    }

    doUpdateContinue2(checks, source, newText, templates, index, call, callArgs) {
      var check, pkg;
      boundMethodCheck(this, ref);
      check = checks.pop();
      if (check) {
        return check(checks, source, newText, templates, index, call, callArgs);
      } else {
        pkg = templates[index].arguments[0].value.trim();
        this.WM.Log.logWarning(pkg + " hasn't been found neither in the official " + "repositories nor in the AUR nor as a package group");
        this.WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates", {
          "error": "notfound",
          "page": callArgs[0],
          "pagelanguage": this.WM.ArchWiki.detectLanguage(callArgs[0])[1],
          "package": pkg
        });
        newText += templates[index].rawTransclusion;
        return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
      }
    }

    checkOfficial(checks, source, newText, templates, index, call, callArgs) {
      var pkgname;
      boundMethodCheck(this, ref);
      pkgname = templates[index].arguments[0].value.trim();
      this.WM.Log.logInfo("Looking for " + pkgname + " in the official repositories ...");
      return this.WM.ArchPackages.isOfficialPackage(pkgname, this.checkOfficial2, [checks, source, newText, templates, index, call, callArgs]);
    }

    checkOfficiallc(checks, source, newText, templates, index, call, callArgs) {
      var pkgname;
      boundMethodCheck(this, ref);
      pkgname = templates[index].arguments[0].value.trim();
      if (pkgname.toLowerCase() !== pkgname) {
        this.WM.Log.logInfo("Looking for " + pkgname.toLowerCase() + " (lowercase) in the official repositories ...");
        return this.WM.ArchPackages.isOfficialPackage(pkgname.toLowerCase(), this.checkOfficiallc2, [checks, source, newText, templates, index, call, callArgs]);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    checkAUR(checks, source, newText, templates, index, call, callArgs) {
      var pkgname;
      boundMethodCheck(this, ref);
      pkgname = templates[index].arguments[0].value.trim();
      this.WM.Log.logInfo("Looking for " + pkgname + " in the AUR ...");
      return this.WM.ArchPackages.isAURPackage(pkgname, this.checkAUR2, [checks, source, newText, templates, index, call, callArgs]);
    }

    checkAURlc(checks, source, newText, templates, index, call, callArgs) {
      var pkgname;
      boundMethodCheck(this, ref);
      pkgname = templates[index].arguments[0].value.trim();
      if (pkgname.toLowerCase() !== pkgname) {
        this.WM.Log.logInfo("Looking for " + pkgname.toLowerCase() + " (lowercase) in the AUR ...");
        return this.WM.ArchPackages.isAURPackage(pkgname.toLowerCase(), this.checkAURlc2, [checks, source, newText, templates, index, call, callArgs]);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    checkGroup64(checks, source, newText, templates, index, call, callArgs) {
      var grpname;
      boundMethodCheck(this, ref);
      grpname = templates[index].arguments[0].value.trim();
      this.WM.Log.logInfo("Looking for " + grpname + " as an x86_64 package group ...");
      return this.WM.ArchPackages.isPackageGroup64(grpname, this.checkGroup64_2, [checks, source, newText, templates, index, call, callArgs]);
    }

    checkGroup64lc(checks, source, newText, templates, index, call, callArgs) {
      var grpname;
      boundMethodCheck(this, ref);
      grpname = templates[index].arguments[0].value.trim();
      if (grpname.toLowerCase() !== grpname) {
        this.WM.Log.logInfo("Looking for " + grpname.toLowerCase() + " (lowercase) as an x86_64 package group ...");
        return this.WM.ArchPackages.isPackageGroup64(grpname.toLowerCase(), this.checkGroup64lc2, [checks, source, newText, templates, index, call, callArgs]);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    checkGroup32(checks, source, newText, templates, index, call, callArgs) {
      var grpname;
      boundMethodCheck(this, ref);
      grpname = templates[index].arguments[0].value.trim();
      this.WM.Log.logInfo("Looking for " + grpname + " as an i686 package group ...");
      return this.WM.ArchPackages.isPackageGroup32(grpname, this.checkGroup32_2, [checks, source, newText, templates, index, call, callArgs]);
    }

    checkGroup32lc(checks, source, newText, templates, index, call, callArgs) {
      var grpname;
      boundMethodCheck(this, ref);
      grpname = templates[index].arguments[0].value.trim();
      if (grpname.toLowerCase() !== grpname) {
        this.WM.Log.logInfo("Looking for " + grpname.toLowerCase() + " (lowercase) as an i686 package group ...");
        return this.WM.ArchPackages.isPackageGroup32(grpname.toLowerCase(), this.checkGroup32lc2, [checks, source, newText, templates, index, call, callArgs]);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    checkOfficial2(res, args) {
      var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
      boundMethodCheck(this, ref);
      checks = args[0];
      source = args[1];
      newText = args[2];
      templates = args[3];
      index = args[4];
      call = args[5];
      callArgs = args[6];
      template = templates[index];
      pkgname = template.arguments[0].value.trim();
      if (res) {
        if (template.title.toLowerCase() !== 'pkg') {
          newtemplate = "{{Pkg|" + pkgname + "}}";
          newText += newtemplate;
          this.WM.Log.logInfo("Replacing template with " + newtemplate);
        } else {
          newText += template.rawTransclusion;
        }
        return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    checkOfficiallc2(res, args) {
      var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
      boundMethodCheck(this, ref);
      checks = args[0];
      source = args[1];
      newText = args[2];
      templates = args[3];
      index = args[4];
      call = args[5];
      callArgs = args[6];
      template = templates[index];
      pkgname = template.arguments[0].value.trim();
      if (res) {
        newtemplate = "{{Pkg|" + pkgname.toLowerCase() + "}}";
        newText += newtemplate;
        this.WM.Log.logInfo("Replacing template with " + newtemplate);
        return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    checkAUR2(res, args) {
      var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
      boundMethodCheck(this, ref);
      checks = args[0];
      source = args[1];
      newText = args[2];
      templates = args[3];
      index = args[4];
      call = args[5];
      callArgs = args[6];
      template = templates[index];
      pkgname = template.arguments[0].value.trim();
      if (res) {
        if (template.title.toLowerCase() !== 'aur') {
          newtemplate = "{{AUR|" + pkgname + "}}";
          newText += newtemplate;
          this.WM.Log.logInfo("Replacing template with " + newtemplate);
        } else {
          newText += template.rawTransclusion;
        }
        return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    checkAURlc2(res, args) {
      var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
      boundMethodCheck(this, ref);
      checks = args[0];
      source = args[1];
      newText = args[2];
      templates = args[3];
      index = args[4];
      call = args[5];
      callArgs = args[6];
      template = templates[index];
      pkgname = template.arguments[0].value.trim();
      if (res) {
        newtemplate = "{{AUR|" + pkgname.toLowerCase() + "}}";
        newText += newtemplate;
        this.WM.Log.logInfo("Replacing template with " + newtemplate);
        return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    checkGroup64_2(res, args) {
      var call, callArgs, checks, grpname, index, newText, newtemplate, source, template, templates;
      boundMethodCheck(this, ref);
      checks = args[0];
      source = args[1];
      newText = args[2];
      templates = args[3];
      index = args[4];
      call = args[5];
      callArgs = args[6];
      template = templates[index];
      grpname = template.arguments[0].value.trim();
      if (res) {
        if (template.title.toLowerCase() !== 'grp') {
          newtemplate = "{{Grp|" + grpname + "}}";
          newText += newtemplate;
          this.WM.Log.logInfo("Replacing template with " + newtemplate);
        } else {
          newText += template.rawTransclusion;
        }
        return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    checkGroup64lc2(res, args) {
      var call, callArgs, checks, grpname, index, newText, newtemplate, source, template, templates;
      boundMethodCheck(this, ref);
      checks = args[0];
      source = args[1];
      newText = args[2];
      templates = args[3];
      index = args[4];
      call = args[5];
      callArgs = args[6];
      template = templates[index];
      grpname = template.arguments[0].value.trim();
      if (res) {
        newtemplate = "{{Grp|" + grpname.toLowerCase() + "}}";
        newText += newtemplate;
        this.WM.Log.logInfo("Replacing template with " + newtemplate);
        return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    checkGroup32_2(res, args) {
      var call, callArgs, checks, grpname, index, newText, source, template, templates;
      boundMethodCheck(this, ref);
      checks = args[0];
      source = args[1];
      newText = args[2];
      templates = args[3];
      index = args[4];
      call = args[5];
      callArgs = args[6];
      template = templates[index];
      grpname = template.arguments[0].value.trim();
      if (res) {
        newText += template.rawTransclusion;
        this.WM.Log.logWarning(grpname + " is a package group for i686 only, " + "and Template:Grp only supports x86_64");
        this.WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates", {
          "error": "group64",
          "page": callArgs[0],
          "pagelanguage": this.WM.ArchWiki.detectLanguage(callArgs[0])[1],
          "package": grpname
        });
        return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    checkGroup32lc2(res, args) {
      var call, callArgs, checks, grpname, index, newText, source, template, templates;
      boundMethodCheck(this, ref);
      checks = args[0];
      source = args[1];
      newText = args[2];
      templates = args[3];
      index = args[4];
      call = args[5];
      callArgs = args[6];
      template = templates[index];
      grpname = template.arguments[0].value.trim();
      if (res) {
        newText += template.rawTransclusion;
        this.WM.Log.logWarning(grpname + " is a package group for i686 only, " + "and Template:Grp only supports x86_64");
        this.WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates", {
          "error": "group64",
          "page": callArgs[0],
          "pagelanguage": this.WM.ArchWiki.detectLanguage(callArgs[0])[1],
          "package": grpname
        });
        return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
      } else {
        return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
      }
    }

    doUpdateContinue3(source, newText, templates, index, call, callArgs) {
      boundMethodCheck(this, ref);
      index++;
      if (templates[index]) {
        return this.doUpdateContinue(source, newText, templates, index, call, callArgs);
      } else {
        newText += source.substring(templates[index - 1].index + templates[index - 1].length);
        return call(source, newText, callArgs);
      }
    }

    main_editor(callNext) {
      var source, title;
      title = this.WM.Editor.getTitle();
      source = this.WM.Editor.readSource();
      this.WM.Log.logInfo("Updating package templates ...");
      return this.doUpdate(source, this.mainEnd, [title, callNext]);
    }

    mainEnd(source, newtext, args) {
      var callNext;
      boundMethodCheck(this, ref);
      callNext = args[1];
      if (newtext !== source) {
        this.WM.Editor.writeSource(newtext);
        this.WM.Log.logInfo("Updated package templates");
      } else {
        this.WM.Log.logInfo("No automatically updatable package templates " + "found");
      }
      if (callNext) {
        return callNext();
      }
    }

    main_bot(title, callBot, chainArgs) {
      var summary;
      summary = this.conf.edit_summary;
      return this.WM.MW.callQueryEdit(title, this.mainAutoReplace, [summary, callBot]);
    }

    mainAutoReplace(title, source, timestamp, edittoken, args) {
      var callBot, summary;
      boundMethodCheck(this, ref);
      summary = args[0];
      callBot = args[1];
      return this.doUpdate(source, this.mainAutoWrite, [title, edittoken, timestamp, summary, callBot]);
    }

    mainAutoWrite(source, newtext, args) {
      var callBot, edittoken, summary, timestamp, title;
      boundMethodCheck(this, ref);
      title = args[0];
      edittoken = args[1];
      timestamp = args[2];
      summary = args[3];
      callBot = args[4];
      if (newtext !== source) {
        return this.WM.MW.callAPIPost({
          action: "edit",
          bot: "1",
          title: title,
          summary: summary,
          text: newtext,
          basetimestamp: timestamp,
          token: edittoken
        }, this.mainAutoEnd, callBot, null);
      } else {
        return callBot(0, null);
      }
    }

    mainAutoEnd(res, callBot) {
      boundMethodCheck(this, ref);
      if (res.edit && res.edit.result === 'Success') {
        return callBot(1, null);
      } else if (res.error) {
        this.WM.Log.logError(res.error.info + " (" + res.error.code + ")");
        return callBot(res.error.code, null);
      } else {
        return callBot(false, null);
      }
    }

  };

  ArchWikiUpdatePackageTemplates.conf_default = {
    // TODO: Disabled because the ArchPackages module is currently unusable
    enabled: false,
    editor_menu: ["Query plugins", "Update package templates"],
    bot_label: "Check packages linked with Pkg/AUR templates and possibly update them",
    edit_summary: "update Pkg/AUR templates to reflect new package status"
  };

  return ArchWikiUpdatePackageTemplates;

})();
