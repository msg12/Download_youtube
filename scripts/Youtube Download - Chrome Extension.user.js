// ==UserScript==
// @name        Youtube Download - Chrome Extension
// @namespace   https://youtubedownload.video/
// @version     1.1
// @date        2019-09-19
// @author      YoutubeDownload
// @description YouTube Downloader: Download MP4 Video and MP3 Audio in one click
// @homepage    https://youtubedownload.video/
// @icon        https://youtubedownload.video/imgnew/logos/red32.png
// @icon64      https://youtubedownload.video/imgnew/logos/red32.png
// @updateURL   https://youtubedownload.video/extensions/chrome/chrome-ext.meta.js
// @downloadURL https://youtubedownload.video/extensions/chrome/chrome-ext.user.js
// @include     http://*
// @include     https://*
// @run-at      document-end
// @grant       GM_listValues
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_openInTab
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// @grant       GM_download
// @grant       GM.info
// @grant       GM.listValues
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.deleteValue
// @grant       GM.openInTab
// @grant       GM.setClipboard
// @grant       GM.xmlHttpRequest
// @connect     youtube.com
// @connect     m.youtube.com
// @connect     www.youtube.com
// @connect     youtube-nocookie.com
// @connect     youtu.be
// @connect     youtubedownload.video
// @connect     self
// @connect     *
// ==/UserScript==
var YDVMain = {
    oXHttpReq: null,
    vid: null,
    oldUrl: null,
    DocOnLoad: function(o) {
        try {
            if (null != o && null != o.body && null != o.location && (YDVMain.vid = YDVMain.getVid(o), YDVMain.vid)) {
                o.querySelector("#info-contents #info").setAttribute("style", "flex-wrap: wrap;");
                var t = o.querySelector("#menu-container"),
                    e = o.querySelector("#youtubedownloadconverter"),
                    n = YDVMain.GetCommandButton();
                null == e && (null != t ? t.parentNode.insertBefore(n, t) : (t = o.querySelector("#eow-title")).parentNode.insertBefore(n, t)), YDVMain.oldUrl = o.location.href, YDVMain.checkChangeVid()
            }
            return !0
        } catch (o) {
            console.log("Error youtubedownload.DocOnLoad. ", o)
        }
    },
    checkChangeVid: function() {
        setTimeout(function() {
            YDVMain.oldUrl == window.location.href ? YDVMain.checkChangeVid() : YDVMain.WaitLoadDom(window.document)
        }, 1e3)
    },
    WaitLoadDom: function(o) {
        YDVMain.vid = YDVMain.getVid(o), YDVMain.vid ? null != o.querySelector("#info #menu-container") ? YDVMain.DocOnLoad(o) : setTimeout(function() {
            YDVMain.WaitLoadDom(o)
        }, 1e3) : YDVMain.checkChangeVid()
    },
    goToyoutubedownload: function(o) {
        try {
            var t = "https://youtubedownload.video/extension.php?urlYoutube=https://youtube.com/watch?v=" + YDVMain.vid + "/?utm_source=chrome_addon";
            window.open(t, "_blank")
        } catch (o) {
            console.log("Erorr youtubedownload.OnButtonClick. ", o)
        }
    },
    GetCommandButton: function() {
        try {
            var o = document.createElement("button");
            return o.id = "youtubedownloadconverter", o.className = "yt-uix-tooltip", o.setAttribute("type", "button"), o.setAttribute("title", "Download with youtubedownload.video"), o.innerHTML = "Download", o.addEventListener("click", function(o) {
                YDVMain.goToyoutubedownload(o)
            }, !0), o.setAttribute("style", "min-height:25px; position:relative; top:1px; cursor: pointer; font: 13px Arial; background: #ff0100; color: #ffffff; text-transform: uppercase; display: block; padding: 10px 14px; margin: 20px 5px 10px 5px; border-radius: 2px; font-weight:bold"), o.setAttribute("onmouseover", "this.style.backgroundColor='#bb0201'"), o.setAttribute("onmouseout", "this.style.backgroundColor='#ff0100'"), o
        } catch (o) {
            console.log("Error youtubedownload.GetCommandButton. ", o)
        }
    },
    getVid: function(o) {
        var t = o.location.toString().match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/);
        return !(!t || !t[3]) && t[3]
    }
};
YDVMain.WaitLoadDom(window.document);