OUPENG = {
    ad_url: "http://c.bxb.oupeng.com/ads?",
    loadAd: function(b) {
        var a = OUPENG.ad_url + "slot=" + b.slot + "&refer=nav&ct=mobile&cb=OUPENG.render&op_id=" + OUPENG.getParameter("_u") + "&op_channel=" + OUPENG.getParameter("_ch") + "&op_branding=" + OUPENG.getParameter("_b") + "&op_platform=" + OUPENG.getParameter("_pf") + "&_=" + (new Date()).getTime();
        OUPENG.loadJS(a)
    },
    loadJS: function(b) {
        var a, c;
        a = document.createElement("script");
        a.charset = "utf-8";
        a.src = b;
        a.async = !0;
        c = document.getElementsByTagName("head")[0].firstChild;
        c.parentNode.insertBefore(a, c)
    },
    getParameter: function(c, b) {
        b = b || document.location.href;
        var a = b.match(new RegExp("(\\?|#|&)" + c + "=([^&#]*)(&|#|$)"));
        return ( !a ? "" : a[2]) 
    },
    clk_ads: function(a) {
        try {
            if (a) {
                for (var b in a) {
                    OUPENG.loadJS(a[b])
                }
            }
        } catch (c) {
            console.warn("点击上报异常")
        }
    },
    render: function(f) {
        if (f) {
            var d, c, e, b = document.createElement("a");
            b.href = f.clk_url;
            b.onclick = function(a) {
                OUPENG.clk_ads(f.clk_track)
            }
            ;
            for (var g in f.impr_track) {
                new Image().src = f.impr_track[g]
            }
            switch (f.type) {
            case 1:
            case 6:
                e = document.createElement("span");
                e.innerText = f.title;
                b.appendChild(e);
                break;
            case 2:
                c = document.createElement("img");
                c.src = f.banner;
                b.appendChild(c);
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                c = document.createElement("img");
                c.src = f.icon;
                b.appendChild(c);
                e = document.createElement("span");
                e.innerText = f.title;
                b.appendChild(e);
                break;
            default:
            }
            d = document.getElementById("op_" + f.slot);
            if (d) {
                d.parentNode.insertBefore(b, d);
                d.parentNode.removeChild(d)
            } else {
                console.warn("找不到广告填充位!" + f.slot)
            }
        } else {
            console.warn("没有获取到广告!")
        }
    }
};

document.addEventListener("DOMContentLoaded",(function() {
    var a = window.BXB;
    if (a && a.length) {
        OUPENG.loadAd(a.shift())
    }
    }), false);


