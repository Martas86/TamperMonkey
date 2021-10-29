// ==UserScript==
// @name         ZalandoLounge-AddToCart
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        ttps://www.zalando-lounge.cz/campaigns/*/categories/*
// @icon         https://www.google.com/s2/favicons?domain=zalando-lounge.cz
// @grant        GM_addStyle
// @require 	 https://code.jquery.com/jquery-latest.js
// @downloadURL  https://raw.githubusercontent.com/Martas86/TemperMonkey/master/Release/ZalandoLounge-AddToCart.user.js
// @updateURL    https://raw.githubusercontent.com/Martas86/TemperMonkey/master/Release/ZalandoLounge-AddToCart.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var myTimeout;
    $(document).ready(function()
    {
        setTimeout(function(){
            $(".grid-page-layout div a:first").after("<button class='stopTimeout' style='height:100%;color:black;'>STOP auto add to cart</button>");
            $(".grid-page-layout div").on("click", "button.stopTimeout", function(){
                clearTimeout(myTimeout);
            });
        }, 250);

        var mySizes = new Array("45", "L", "32x32", "33x32");
        myTimeout = setTimeout(function(){
            /*var sizes = $("\
                span[class*='ArticleSizeItemTitle']:contains('45') \
                ,span[class*='ArticleSizeItemTitle']:contains('L') \
            ");*/
            var sizes = $("span[class*='ArticleSizeItemTitle']").filter(function() {return jQuery.inArray($(this).text(), mySizes) != -1;});

            var dostupne = false;

            $(sizes).each(function() {
                if(!$(this).parent().is(":disabled"))
                {
                    dostupne = true;
                    $(this).parent().click();
                    $("button[class*='add-to-cart']").click();
                    alert("Dostupne " + $(this).text());
                }
            });

            if(!dostupne)
                location.reload();
            //debugger;
        }, 3000);
    });
})();
