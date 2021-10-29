// ==UserScript==
// @name         ZalandoLounge-CountSale
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.zalando-lounge.cz/campaigns/*
// @icon         https://www.google.com/s2/favicons?domain=zalando-lounge.cz
// @grant        GM_addStyle
// @require 	 https://code.jquery.com/jquery-latest.js
// @downloadURL  https://raw.githubusercontent.com/Martas86/TemperMonkey/master/Release/ZalandoLounge-CountSale.user.js
// @updateURL    https://raw.githubusercontent.com/Martas86/TemperMonkey/master/Release/ZalandoLounge-CountSale.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $(document).ready(function()
    {
        setInterval(function(){
            $(".jnYFBs:not(.edited)").each(function() {
                var originalPrice = $(".eddxoJ span", this).text().substr(0, $(".eddxoJ span", this).text().indexOf("Kč")-1).replace(",",".").replace(/[^0-9\.]+/g,"");
                var salePrice =  $(".ixsQUL span", this).text().substr(0, $(".eddxoJ span", this).text().indexOf("Kč")-1).replace(",",".").replace(/[^0-9\.]+/g,"");
                $(this).append("<div style='text-align:center;'>" + ((originalPrice-salePrice) / originalPrice * 100.0).toFixed(2) + " (" + (originalPrice - salePrice).toFixed(2) + ")</div>");
                $(this).addClass("edited");
            });
        }, 1500);
    });
})();
