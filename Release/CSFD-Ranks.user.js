// ==UserScript==
// @name         CSFD - Ranks
// @namespace    https://github.com/Martas86/TamperMonkey
// @version      0.6
// @description  try to take over the world!
// @author       You
// @match        https://www.csfd.cz/zebricky/vlastni-vyber/*
// @grant        none
// @downloadURL  https://github.com/Martas86/TamperMonkey/raw/master/Release/CSFD-Ranks.user.js
// @updateURL    https://github.com/Martas86/TamperMonkey/raw/master/Release/CSFD-Ranks.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
	$ = window.jQuery;
    function rwsCntRecalc() {
        $("#xRwsCnt").text("(" + $(".box-content article:visible").length + ")");
    }

    function dofiltruj() {
        var minRatCnt = parseInt($("#xMinRatingCnt").val());
        var notRateByMe = $('#xNotRateByMe').is(':checked');
        $(".box-content article").each(function() {
            $(this).toggle((parseInt($("div.rating-total", this).text().replace(/\D/g, ""), 10) >= minRatCnt) && (!notRateByMe || $("div.rating-mine", this).length == 0));
        });
        rwsCntRecalc();
    }

    function dofiltrujZrus() {
        $(".box-content article").show();
        rwsCntRecalc();
    }

    $(document).ready(function() {
        $(".search-item-full").first().append('<div style="width: 100%;">\
<span>Min. poč. hodnocení:</span><input id="xMinRatingCnt" style="width:50px;min-width:50px;" type="input" value="500" />\
<span style="margin: 0px 0px 0px 10px;">Mnou nehodnoceno:</span><input id="xNotRateByMe" style="width:13px;height:13px;min-width:13px;" type="checkbox" />\
<button id="xDofiltruj" style="margin: 0px 0px 0px 10px;" type=button>Dofiltruj</button><button id="xZrus" style="margin: 0px 0px 0px 10px;" type=button>Zruš</button>\
<span id="xRwsCnt" style="float: right;">()</span>\
</div>');

        $(".search-item-full").on("click", "#xDofiltruj", function(){
            dofiltruj();
        })
        .on("click", "#xZrus", function(){
            dofiltrujZrus();
        })
        ;

        rwsCntRecalc();
    });

})();
