
function escape2Html(str) {
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t];
    });
}

function ejsRenderImg(src, cls, alt) {
    if(!src) return "";
    return `<img src="${src}" class="${cls}" alt="${alt}" />`
}

function ejsRenderTagProperty(flag, value) {
    if (flag) {
        return value
    }
    return ""
}

async function renderEjsWithEjsComponent(target, template, data) {
    try {
        let ejsComponent = await window.jsBridge.ejs.getComponent(template)
        //console.log("ejsComponent : ", ejsComponent)
        let ejsRenderResult = ejs.render(ejsComponent, data)
        $(target).html(ejsRenderResult)
    } catch (e) {
        $(target).html(`<div>${template} render failed. <br /> ${e}</div>`)
    }
}

function renderEjsWithEjsTemplte(target, template, data) {
    let templateHtml = $(template).html()
    //console.log("templateNode : ", templateHtml)
    if (!templateHtml) {
        $(target).html(`<div>${template} not exists.</div>`)
        return
    }
    let templateString = escape2Html(templateHtml)
    let ejsRenderResult = ejs.render(templateString, data)
    $(target).html(ejsRenderResult)
}

function renderEjs(target, template, data) {

    if (!window.jsBridge || !window.jsBridge.ejs) {
        renderEjsWithEjsTemplte(target, "#ejs-" + template, data)
    } else {
        renderEjsWithEjsComponent(target, template, data)
    }
}