// Generated by CoffeeScript 1.10.0
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports.ArchWikiUpdatePackageTemplates = (function() {
  function ArchWikiUpdatePackageTemplates(WM) {
    this.WM = WM;
    this.mainAutoEnd = bind(this.mainAutoEnd, this);
    this.mainAutoWrite = bind(this.mainAutoWrite, this);
    this.mainAutoReplace = bind(this.mainAutoReplace, this);
    this.mainEnd = bind(this.mainEnd, this);
    this.doUpdateContinue3 = bind(this.doUpdateContinue3, this);
    this.checkGroup32lc2 = bind(this.checkGroup32lc2, this);
    this.checkGroup32_2 = bind(this.checkGroup32_2, this);
    this.checkGroup64lc2 = bind(this.checkGroup64lc2, this);
    this.checkGroup64_2 = bind(this.checkGroup64_2, this);
    this.checkAURlc2 = bind(this.checkAURlc2, this);
    this.checkAUR2 = bind(this.checkAUR2, this);
    this.checkOfficiallc2 = bind(this.checkOfficiallc2, this);
    this.checkOfficial2 = bind(this.checkOfficial2, this);
    this.checkGroup32lc = bind(this.checkGroup32lc, this);
    this.checkGroup32 = bind(this.checkGroup32, this);
    this.checkGroup64lc = bind(this.checkGroup64lc, this);
    this.checkGroup64 = bind(this.checkGroup64, this);
    this.checkAURlc = bind(this.checkAURlc, this);
    this.checkAUR = bind(this.checkAUR, this);
    this.checkOfficiallc = bind(this.checkOfficiallc, this);
    this.checkOfficial = bind(this.checkOfficial, this);
    this.doUpdateContinue2 = bind(this.doUpdateContinue2, this);
    this.doUpdateContinue = bind(this.doUpdateContinue, this);
    this.doUpdate = bind(this.doUpdate, this);
  }

  ArchWikiUpdatePackageTemplates.prototype.doUpdate = function(source, call, callArgs) {
    var newText, templates;
    templates = this.WM.Parser.findTemplatesPattern(source, "[Pp]kg|[Aa]ur|AUR|[Gg]rp");
    newText = "";
    if (templates.length > 0) {
      return this.doUpdateContinue(source, newText, templates, 0, call, callArgs);
    } else {
      return call(source, source, callArgs);
    }
  };

  ArchWikiUpdatePackageTemplates.prototype.doUpdateContinue = function(source, newText, templates, index, call, callArgs) {
    this.WM.Log.logInfo("Processing " + templates[index].rawTransclusion + " ...");
    newText += source.substring((index === 0 ? 0 : templates[index - 1].index + templates[index - 1].length), templates[index].index);
    switch (templates[index].title.toLowerCase()) {
      case 'pkg':
        return this.doUpdateContinue2([this.checkGroup32lc, this.checkGroup32, this.checkGroup64lc, this.checkGroup64, this.checkAURlc, this.checkAUR, this.checkOfficiallc, this.checkOfficial], source, newText, templates, index, call, callArgs);
      case 'aur':
        return this.doUpdateContinue2([this.checkGroup32lc, this.checkGroup32, this.checkGroup64lc, this.checkGroup64, this.checkOfficiallc, this.checkOfficial, this.checkAURlc, this.checkAUR], source, newText, templates, index, call, callArgs);
      case 'grp':
        return this.doUpdateContinue2([this.checkAURlc, this.checkAUR, this.checkOfficiallc, this.checkOfficial, this.checkGroup32lc, this.checkGroup32, this.checkGroup64lc, this.checkGroup64], source, newText, templates, index, call, callArgs);
      default:
        newText += templates[index].rawTransclusion;
        return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
    }
  };

  ArchWikiUpdatePackageTemplates.prototype.doUpdateContinue2 = function(checks, source, newText, templates, index, call, callArgs) {
    var check, pkg;
    check = checks.pop();
    if (check) {
      return check(checks, source, newText, templates, index, call, callArgs);
    } else {
      pkg = templates[index]["arguments"][0].value.trim();
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
  };

  ArchWikiUpdatePackageTemplates.prototype.checkOfficial = function(checks, source, newText, templates, index, call, callArgs) {
    var pkgname;
    pkgname = templates[index]["arguments"][0].value.trim();
    this.WM.Log.logInfo("Looking for " + pkgname + " in the official repositories ...");
    return this.WM.ArchPackages.isOfficialPackage(pkgname, this.checkOfficial2, [checks, source, newText, templates, index, call, callArgs]);
  };

  ArchWikiUpdatePackageTemplates.prototype.checkOfficiallc = function(checks, source, newText, templates, index, call, callArgs) {
    var pkgname;
    pkgname = templates[index]["arguments"][0].value.trim();
    if (pkgname.toLowerCase() !== pkgname) {
      this.WM.Log.logInfo("Looking for " + pkgname.toLowerCase() + " (lowercase) in the official repositories ...");
      return this.WM.ArchPackages.isOfficialPackage(pkgname.toLowerCase(), this.checkOfficiallc2, [checks, source, newText, templates, index, call, callArgs]);
    } else {
      return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
    }
  };

  ArchWikiUpdatePackageTemplates.prototype.checkAUR = function(checks, source, newText, templates, index, call, callArgs) {
    var pkgname;
    pkgname = templates[index]["arguments"][0].value.trim();
    this.WM.Log.logInfo("Looking for " + pkgname + " in the AUR ...");
    return this.WM.ArchPackages.isAURPackage(pkgname, this.checkAUR2, [checks, source, newText, templates, index, call, callArgs]);
  };

  ArchWikiUpdatePackageTemplates.prototype.checkAURlc = function(checks, source, newText, templates, index, call, callArgs) {
    var pkgname;
    pkgname = templates[index]["arguments"][0].value.trim();
    if (pkgname.toLowerCase() !== pkgname) {
      this.WM.Log.logInfo("Looking for " + pkgname.toLowerCase() + " (lowercase) in the AUR ...");
      return this.WM.ArchPackages.isAURPackage(pkgname.toLowerCase(), this.checkAURlc2, [checks, source, newText, templates, index, call, callArgs]);
    } else {
      return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
    }
  };

  ArchWikiUpdatePackageTemplates.prototype.checkGroup64 = function(checks, source, newText, templates, index, call, callArgs) {
    var grpname;
    grpname = templates[index]["arguments"][0].value.trim();
    this.WM.Log.logInfo("Looking for " + grpname + " as an x86_64 package group ...");
    return this.WM.ArchPackages.isPackageGroup64(grpname, this.checkGroup64_2, [checks, source, newText, templates, index, call, callArgs]);
  };

  ArchWikiUpdatePackageTemplates.prototype.checkGroup64lc = function(checks, source, newText, templates, index, call, callArgs) {
    var grpname;
    grpname = templates[index]["arguments"][0].value.trim();
    if (grpname.toLowerCase() !== grpname) {
      this.WM.Log.logInfo("Looking for " + grpname.toLowerCase() + " (lowercase) as an x86_64 package group ...");
      return this.WM.ArchPackages.isPackageGroup64(grpname.toLowerCase(), this.checkGroup64lc2, [checks, source, newText, templates, index, call, callArgs]);
    } else {
      return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
    }
  };

  ArchWikiUpdatePackageTemplates.prototype.checkGroup32 = function(checks, source, newText, templates, index, call, callArgs) {
    var grpname;
    grpname = templates[index]["arguments"][0].value.trim();
    this.WM.Log.logInfo("Looking for " + grpname + " as an i686 package group ...");
    return this.WM.ArchPackages.isPackageGroup32(grpname, this.checkGroup32_2, [checks, source, newText, templates, index, call, callArgs]);
  };

  ArchWikiUpdatePackageTemplates.prototype.checkGroup32lc = function(checks, source, newText, templates, index, call, callArgs) {
    var grpname;
    grpname = templates[index]["arguments"][0].value.trim();
    if (grpname.toLowerCase() !== grpname) {
      this.WM.Log.logInfo("Looking for " + grpname.toLowerCase() + " (lowercase) as an i686 package group ...");
      return this.WM.ArchPackages.isPackageGroup32(grpname.toLowerCase(), this.checkGroup32lc2, [checks, source, newText, templates, index, call, callArgs]);
    } else {
      return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
    }
  };

  ArchWikiUpdatePackageTemplates.prototype.checkOfficial2 = function(res, args) {
    var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
    checks = args[0];
    source = args[1];
    newText = args[2];
    templates = args[3];
    index = args[4];
    call = args[5];
    callArgs = args[6];
    template = templates[index];
    pkgname = template["arguments"][0].value.trim();
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
  };

  ArchWikiUpdatePackageTemplates.prototype.checkOfficiallc2 = function(res, args) {
    var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
    checks = args[0];
    source = args[1];
    newText = args[2];
    templates = args[3];
    index = args[4];
    call = args[5];
    callArgs = args[6];
    template = templates[index];
    pkgname = template["arguments"][0].value.trim();
    if (res) {
      newtemplate = "{{Pkg|" + pkgname.toLowerCase() + "}}";
      newText += newtemplate;
      this.WM.Log.logInfo("Replacing template with " + newtemplate);
      return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
    } else {
      return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
    }
  };

  ArchWikiUpdatePackageTemplates.prototype.checkAUR2 = function(res, args) {
    var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
    checks = args[0];
    source = args[1];
    newText = args[2];
    templates = args[3];
    index = args[4];
    call = args[5];
    callArgs = args[6];
    template = templates[index];
    pkgname = template["arguments"][0].value.trim();
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
  };

  ArchWikiUpdatePackageTemplates.prototype.checkAURlc2 = function(res, args) {
    var call, callArgs, checks, index, newText, newtemplate, pkgname, source, template, templates;
    checks = args[0];
    source = args[1];
    newText = args[2];
    templates = args[3];
    index = args[4];
    call = args[5];
    callArgs = args[6];
    template = templates[index];
    pkgname = template["arguments"][0].value.trim();
    if (res) {
      newtemplate = "{{AUR|" + pkgname.toLowerCase() + "}}";
      newText += newtemplate;
      this.WM.Log.logInfo("Replacing template with " + newtemplate);
      return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
    } else {
      return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
    }
  };

  ArchWikiUpdatePackageTemplates.prototype.checkGroup64_2 = function(res, args) {
    var call, callArgs, checks, grpname, index, newText, newtemplate, source, template, templates;
    checks = args[0];
    source = args[1];
    newText = args[2];
    templates = args[3];
    index = args[4];
    call = args[5];
    callArgs = args[6];
    template = templates[index];
    grpname = template["arguments"][0].value.trim();
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
  };

  ArchWikiUpdatePackageTemplates.prototype.checkGroup64lc2 = function(res, args) {
    var call, callArgs, checks, grpname, index, newText, newtemplate, source, template, templates;
    checks = args[0];
    source = args[1];
    newText = args[2];
    templates = args[3];
    index = args[4];
    call = args[5];
    callArgs = args[6];
    template = templates[index];
    grpname = template["arguments"][0].value.trim();
    if (res) {
      newtemplate = "{{Grp|" + grpname.toLowerCase() + "}}";
      newText += newtemplate;
      this.WM.Log.logInfo("Replacing template with " + newtemplate);
      return this.doUpdateContinue3(source, newText, templates, index, call, callArgs);
    } else {
      return this.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
    }
  };

  ArchWikiUpdatePackageTemplates.prototype.checkGroup32_2 = function(res, args) {
    var call, callArgs, checks, grpname, index, newText, source, template, templates;
    checks = args[0];
    source = args[1];
    newText = args[2];
    templates = args[3];
    index = args[4];
    call = args[5];
    callArgs = args[6];
    template = templates[index];
    grpname = template["arguments"][0].value.trim();
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
  };

  ArchWikiUpdatePackageTemplates.prototype.checkGroup32lc2 = function(res, args) {
    var call, callArgs, checks, grpname, index, newText, source, template, templates;
    checks = args[0];
    source = args[1];
    newText = args[2];
    templates = args[3];
    index = args[4];
    call = args[5];
    callArgs = args[6];
    template = templates[index];
    grpname = template["arguments"][0].value.trim();
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
  };

  ArchWikiUpdatePackageTemplates.prototype.doUpdateContinue3 = function(source, newText, templates, index, call, callArgs) {
    index++;
    if (templates[index]) {
      return this.doUpdateContinue(source, newText, templates, index, call, callArgs);
    } else {
      newText += source.substring(templates[index - 1].index + templates[index - 1].length);
      return call(source, newText, callArgs);
    }
  };

  ArchWikiUpdatePackageTemplates.prototype.main = function(args, callNext) {
    var source, title;
    title = this.WM.Editor.getTitle();
    source = this.WM.Editor.readSource();
    this.WM.Log.logInfo("Updating package templates ...");
    return this.doUpdate(source, this.mainEnd, [title, callNext]);
  };

  ArchWikiUpdatePackageTemplates.prototype.mainEnd = function(source, newtext, args) {
    var callNext;
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
  };

  ArchWikiUpdatePackageTemplates.prototype.mainAuto = function(args, title, callBot, chainArgs) {
    var summary;
    summary = args;
    return this.WM.MW.callQueryEdit(title, this.mainAutoReplace, [summary, callBot]);
  };

  ArchWikiUpdatePackageTemplates.prototype.mainAutoReplace = function(title, source, timestamp, edittoken, args) {
    var callBot, summary;
    summary = args[0];
    callBot = args[1];
    return this.doUpdate(source, this.mainAutoWrite, [title, edittoken, timestamp, summary, callBot]);
  };

  ArchWikiUpdatePackageTemplates.prototype.mainAutoWrite = function(source, newtext, args) {
    var callBot, edittoken, summary, timestamp, title;
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
      }, null, this.mainAutoEnd, callBot, null);
    } else {
      return callBot(0, null);
    }
  };

  ArchWikiUpdatePackageTemplates.prototype.mainAutoEnd = function(res, callBot) {
    if (res.edit && res.edit.result === 'Success') {
      return callBot(1, null);
    } else if (res.error) {
      this.WM.Log.logError(res.error.info + " (" + res.error.code + ")");
      return callBot(res.error.code, null);
    } else {
      return callBot(false, null);
    }
  };

  return ArchWikiUpdatePackageTemplates;

})();
