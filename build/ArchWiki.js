// Generated by CoffeeScript 1.10.0
var WM, WM_;

WM_ = require('./modules/_Init').WM;

WM = new WM_(['ArchWikiFixHeader', require("./plugins/ArchWikiFixHeader").ArchWikiFixHeader], ['ArchWikiFixHeadings', require("./plugins/ArchWikiFixHeadings").ArchWikiFixHeadings], ['ArchWikiFixLinks', require("./plugins/ArchWikiFixLinks").ArchWikiFixLinks], ['ArchWikiNewTemplates', require("./plugins/ArchWikiNewTemplates").ArchWikiNewTemplates], ['ArchWikiNPFilter', require("./plugins/ArchWikiNPFilter").ArchWikiNPFilter], ['ArchWikiOldAURLinks', require("./plugins/ArchWikiOldAURLinks").ArchWikiOldAURLinks], ['ArchWikiQuickReport', require("./plugins/ArchWikiQuickReport").ArchWikiQuickReport], ['ArchWikiSortContacts', require("./plugins/ArchWikiSortContacts").ArchWikiSortContacts], ['ArchWikiSummaryToRelated', require("./plugins/ArchWikiSummaryToRelated").ArchWikiSummaryToRelated], ['ArchWikiRCFilter', require("./plugins/ArchWikiRCFilter").ArchWikiRCFilter], ['ArchWikiUpdatePackageTemplates', require("./plugins/ArchWikiUpdatePackageTemplates").ArchWikiUpdatePackageTemplates], ['ExpandContractions', require("./plugins/ExpandContractions").ExpandContractions], ['FixBacklinkFragments', require("./plugins/FixBacklinkFragments").FixBacklinkFragments], ['FixDoubleRedirects', require("./plugins/FixDoubleRedirects").FixDoubleRedirects], ['FixFragments', require("./plugins/FixFragments").FixFragments], ['FixLinkFragments', require("./plugins/FixLinkFragments").FixLinkFragments], ['MultipleLineBreaks', require("./plugins/MultipleLineBreaks").MultipleLineBreaks], ['SimpleReplace', require("./plugins/SimpleReplace").SimpleReplace], ['SynchronizeInterlanguageLinks', require("./plugins/SynchronizeInterlanguageLinks").SynchronizeInterlanguageLinks], ['UpdateCategoryTree', require("./plugins/UpdateCategoryTree").UpdateCategoryTree]);

WM.main(require("../build/configurations/ArchWiki-bot"));
