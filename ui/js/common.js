const App = {
    log: function (...msg) {
        console.log(msg)
    }
}

const UI = {
    isElement: function (o) {
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement :
                o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
        );
    },
    Card: {
        create: function (options = null) {
            defaultOptions = {
                title: null,
                content: null,
                buttons: {}
            }
            options = Object.assign(defaultOptions, options)

            let card = document.createElement("div")
            card.className = "card"
            if (options.title) {
                if (!(UI.isElement(options.title))) {
                    let titleNode = document.createElement("div")
                    titleNode.className = "card-header"
                    titleNode.innerHTML = "<label>" + options.title + "</label>"
                    options.title = titleNode
                }
                card.appendChild(options.title)
            }
            if (options.content) {
                if (!(UI.isElement(options.content))) {
                    let contentNode = document.createElement("div")
                    contentNode.className = "card-body"
                    contentNode.innerHTML = options.content
                    options.content = contentNode
                }
                card.appendChild(options.content)
            }
            if (options.buttons) {
                let footerNode = document.createElement("div")
                footerNode.className = "card-footer"
                for (let key in options.buttons) {
                    let button = document.createElement("button")
                    button.className = "btn"
                    button.innerHTML = key
                    button.onclick = options.buttons[key]
                    footerNode.appendChild(button)
                }
                card.appendChild(footerNode)
            }
            return card
        }
    },
    EJS: {
        escape2Html: function (str) {
            var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
            return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
                return arrEntities[t];
            });
        },

        renderImg: function (src, cls, alt) {
            if (!src) return "";
            return `<img src="${src}" class="${cls}" alt="${alt}" />`
        },

        renderTagProperty: function (flag, value) {
            if (flag) {
                return value
            }
            return ""
        },

        renderWithEjsComponent: async function (target, template, data) {
            try {
                let ejsComponent = await window.mainApi.ejs.getComponent(template)
                let ejsRenderResult = ejs.render(ejsComponent, data)
                $(target).html(ejsRenderResult)
            } catch (e) {
                $(target).html(`<div>${template} render failed. <br /> ${e}</div>`)
            }
        },

        renderWithEjsTemplte: function (target, template, data) {
            let templateHtml = $(template).html()
            if (!templateHtml) {
                $(target).html(`<div>${template} not exists.</div>`)
                return
            }
            let templateString = escape2Html(templateHtml)
            let ejsRenderResult = ejs.render(templateString, data)
            $(target).html(ejsRenderResult)
        },

        render: function (target, template, data) {
            if (!window.mainApi || !window.mainApi.ejs) {
                UI.EJS.renderWithEjsTemplte(target, "#ejs-" + template, data)
            } else {
                UI.EJS.renderWithEjsComponent(target, template, data)
            }
        }
    },
    HUD: {
        show: function () {
            $(".hud").show()
        },
        hide: function (id = null) {
            if (id) {
                $("#" + id).remove()
                return
            }
            $("body div[id^='hud-loading-']").remove()
        },
        create: function (content = null, mask = false) {
            let hud = document.createElement("div")
            if (mask) {
                hud.className = "hud mask"
            } else {
                hud.className = "hud"
            }
            hud.id = "hud-loading-" + new Date().getTime()
            if (content) {
                if (!UI.isElement(content)) {
                    hud.innerHTML = "" + content
                } else {
                    hud.appendChild(content)
                }
            }
            return hud
        },
        showDialog: function (options) {
            defaultOptions = {
                mask: false,
                title: null,
                content: "...",
                buttons: {}
            }
            options = Object.assign(defaultOptions, options)

            let card = UI.Card.create(options)
            let hud = UI.HUD.create(card, options.mask)
            document.body.appendChild(hud)
            return hud.id
        },
        showLoading: function (showMask = false) {
            let loadingImg = document.createElement("img")
            loadingImg.src = "assets/loading.gif"
            loadingImg.className = "hud-loading"
            let loadingCard = UI.Card.create({ content: loadingImg })
            let hud = UI.HUD.create(loadingCard, showMask)
            document.body.appendChild(hud)
            return hud.id
        },
    }
}

window.UI = UI
window.EJS = UI.EJS