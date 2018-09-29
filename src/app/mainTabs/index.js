// Wiki Monkey - MediaWiki bot and editor-assistant user script
// Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
//
// This file is part of Wiki Monkey.
//
// Wiki Monkey is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Wiki Monkey is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

const {Vue, Vuex} = require('../../modules/libs')
const WM = require('../../modules')
const Maintenance = require('../_components/maintenance')


module.exports = class {
  static plugins = {}

  static installPlugin(plugin, {name, tabTitle, tabComponent, page}) {
    if (name in this.plugins) {
      throw new Error(`Duplicated tab plugin: ${name}`)
    }
    this.plugins[name] = {plugin, tabTitle, tabComponent, page}
  }

  constructor(bodyContent) { // eslint-disable-line max-lines-per-function
    const plugins = {
      ...this.constructor.plugins,
      maintenance: {
        plugin: null,
        tabTitle: 'Show the maintenance interface',
        tabComponent: 'maintenance',
        page: Maintenance,
      },
    }

    const root = document.createElement('div')
    bodyContent.before(root)

    return new Vue({
      el: root,

      store: WM.App.store,

      computed: {
        ...Vuex.mapState('main', [
          'shown',
          'selectedTab',
        ]),
      },

      methods: {
        ...Vuex.mapMutations('main', [
          'selectTab',
        ]),
        ...Vuex.mapActions('main', {
          closeMain: 'closeAlone',
        }),
      },

      created() {
        this.selectTab(Object.keys(plugins)[0])
      },

      render(h) { // eslint-disable-line max-lines-per-function
        if (!this.shown) { return h('div') }

        return h('div', {
          class: {
            'mw-body-content': true,
          },
        }, [
          h('div', [
            '[ ',
            ...Object.entries(plugins).reduce((acc, [name, plugin]) => {
              return acc.concat([' | ', h('a', {
                attrs: {
                  href: `#${name}`,
                  title: plugin.tabTitle,
                },
                on: {
                  click: (event) => {
                    event.preventDefault()
                    this.selectTab(name)
                  },
                },
              }, [plugin.tabComponent])])
            }, []).slice(1),
            ' ]',
          ]),
          h('div', [h(plugins[this.selectedTab].page)]),
        ])
      },
    })
  }
}