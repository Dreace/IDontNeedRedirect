// ==UserScript==
// @name        IDontNeedRedirect
// @namespace   IDontNeedRedirect
// @match       https://mail.qq.com/cgi-bin/frame_html*
// @match       https://www.zhihu.com/*
// @version     1.0.0
// @author      Dreace
// @license     GPL-3.0
// @description 去除常见网站的对域外链接的重定向
// @grant       unsafeWindow
// ==/UserScript==

"use strict";
var handlers = {};

handlers["https://mail.qq.com/cgi-bin/frame_html"] = function () {
  unsafeWindow._openExtLink = function () {
    return true;
  };
};

handlers["https://www.zhihu.com"] = function () {
  var count = 0;
  var interval = setInterval(function () {
    document.querySelectorAll(".external").forEach(function (aTag) {
      try {
        aTag.href = decodeURIComponent(
          aTag.href.match(/link.zhihu.com\/\?target=(.*)/)[1]
        );
        aTag.className = "";
      } catch (error) {
        log(error);
      }
    });
    count += 1;
    if (count >= 60) {
      clearInterval(interval);
    }
  }, 1000);
};

for (var url in handlers) {
  if (location.href.match(url)) {
    log(url + " detected");
    handlers[url]();
    log(url + " done");
  }
}

function log(content) {
  console.log("[IDontNeedRedirect] " + content);
}
