(() => {
    var e, s = window.location.host;
    $(document).ready((function () {
        var n = new Array;
        n[0] = "www.facebook.com", n[1] = "www.google.com";
        var a = $.inArray(s, n);
        e = a >= 0 ? "left" : "right", chrome.runtime.sendMessage({
            name: "getIP"
        }, (function (s) {

            var myip = "0.0.0.0";
            var x = new XMLHttpRequest();

            x.open("GET", 'https://4.myip.is/', false);
            //x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            //x.setRequestHeader('Access-Control-Allow-Origin', '*');
            x.onreadystatechange = function () {
                if (x.readyState == 4) {
                    if (x.status == 200) {
                        var json = x.responseText;
                        myip = JSON.parse(json).ip;
                    } else {
                        alert("Couldn't complete request, please report the bug to the developer:\n" + x.statusText);
                    }
                }
            };
            x.send(null);





            var n = "C:" + myip + " ____ " + "S:" + s.domainToIP ;
            chrome.runtime.sendMessage({
                name: "getOptions"
            }, (function (s) {
                var a = s.enableDisableIP;
                "Disable" != a && void 0 !== a || $("body").append('<div id="chrome_websiteIP" class="chrome_websiteIP_' + e + '">' + n + "</div>")
            }))
        })), $("#chrome_websiteIP").live("mouseover", (function () {
            $(this).hasClass("chrome_websiteIP_right") ? ($(this).removeClass("chrome_websiteIP_right"), $(this).addClass("chrome_websiteIP_left")) : ($(this).removeClass("chrome_websiteIP_left"), $(this).addClass("chrome_websiteIP_right"))
        })), chrome.runtime.sendMessage({
            name: "getOptions"
        }, (function (e) {
            void 0 === e.enableDisableIP && chrome.runtime.sendMessage({
                name: "setOptions",
                status: "Disable"
            }, (function (e) { }))
        }))
    })), document.addEventListener("DOMContentLoaded", (function () {
        chrome.runtime.sendMessage({
            name: "getOptions"
        }, (function (e) {
            $("#EnableDisableIP").val(e.enableDisableIP)
        })), document.querySelector("input").addEventListener("click", (function () {
            "Disable" == $("#EnableDisableIP").val() ? (chrome.runtime.sendMessage({
                name: "setOptions",
                status: "Enable"
            }, (function (e) { })), $("#EnableDisableIP").val("Enable")) : "Enable" == $("#EnableDisableIP").val() && (chrome.runtime.sendMessage({
                name: "setOptions",
                status: "Disable"
            }, (function (e) { })), $("#EnableDisableIP").val("Disable"))
        }))
    }))
})();