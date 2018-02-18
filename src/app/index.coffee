# Wiki Monkey - MediaWiki bot and editor-assistant user script
# Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
#
# This file is part of Wiki Monkey.
#
# Wiki Monkey is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Wiki Monkey is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

{Vue, Vuex, Div} = require('../modules/libs')
store = require('./store')
{version} = require('../../package.json')
route = require('./router')
Log = require('./Log')


module.exports.App = ->
    {ui, display, displayLog, nextNode} = route()

    if not ui
        return false

    store.commit('show', display)

    module.exports.log = log = new Log()

    root = Div()
    $(nextNode).before(root)

    new Vue(
        el: root

        store: store

        computed: Vuex.mapState([
            'display'
        ])

        methods: Vuex.mapMutations([
            'toggle'
        ])

        render: (h) ->
            wmmain = h('div', {attrs: {id: 'WikiMonkeyMain'}})

            legend = h('legend', [
                'Wiki Monkey '
                h('a'
                    {
                        attrs: {href: '#'}
                        on:
                            click: (event) =>
                                event.preventDefault()
                                @toggle()
                    }
                    @display and '[hide]' or '[show]'
                )
            ])

            return h('fieldset', {
                attrs: {id: 'WikiMonkey'}
            }, [
                legend
                wmmain if @display
            ])

        mounted: ->
            if not displayLog
                $(log.area).hide()

            $('#WikiMonkeyMain').append(ui, log.area)

            log.logHidden("Wiki Monkey version: #{version}")
            date = new Date()
            log.logHidden("Date: #{date.toString()}")
            log.logHidden("URL: #{location.href}")

        updated: ->
            $wmmain = $('#WikiMonkeyMain')
            if not $wmmain.children().length
                $wmmain.append(ui, log.area)
    )