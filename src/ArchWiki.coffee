wmsetup = require('./modules/_Init')

wmsetup(
    "ArchWiki",

    # The require paths can't be constructed dynamically, or browserify won't
    # understand and import them
    require("./plugins/ArchWikiFixHeader"),
    require("./plugins/ArchWikiFixHeadings"),
    require("./plugins/ArchWikiFixLinks"),
    require("./plugins/ArchWikiNewTemplates"),
    require("./plugins/ArchWikiNPFilter"),
    require("./plugins/ArchWikiQuickReport"),
    require("./plugins/ArchWikiSortContacts"),
    require("./plugins/ArchWikiSummaryToRelated"),
    require("./plugins/ArchWikiRCFilter"),
    require("./plugins/ExpandContractions"),
    require("./plugins/FixBacklinkFragments"),
    require("./plugins/FixDoubleRedirects"),
    require("./plugins/FixFragments"),
    require("./plugins/FixLinkFragments"),
    require("./plugins/MultipleLineBreaks"),
    require("./plugins/SimpleReplace"),
    require("./plugins/SynchronizeInterlanguageLinks"),
    require("./plugins/UpdateCategoryTree"),
)
