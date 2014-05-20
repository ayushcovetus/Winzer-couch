/*
 * Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-prefixes-domprefixes
 */
;
window.Modernizr = function (a, b, c) {
    function y(a) {
        i.cssText = a
    }

    function z(a, b) {
        return y(l.join(a + ";") + (b || ""))
    }

    function A(a, b) {
        return typeof a === b
    }

    function B(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function C(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!B(e, "-") && i[e] !== c) return b == "pfx" ? e : !0
        }
        return !1
    }

    function D(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : A(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }

    function E(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1),
            e = (a + " " + n.join(d + " ") + d).split(" ");
        return A(b, "string") || A(b, "undefined") ? C(e, b) : (e = (a + " " + o.join(d + " ") + d).split(" "), D(e, b, c))
    }
    var d = "2.6.2",
        e = {}, f = b.documentElement,
        g = "modernizr",
        h = b.createElement(g),
        i = h.style,
        j, k = {}.toString,
        l = " -webkit- -moz- -o- -ms- ".split(" "),
        m = "Webkit Moz O ms",
        n = m.split(" "),
        o = m.toLowerCase().split(" "),
        p = {}, q = {}, r = {}, s = [],
        t = s.slice,
        u, v = function (a, c, d, e) {
            var h, i, j, k, l = b.createElement("div"),
                m = b.body,
                n = m || b.createElement("body");
            if (parseInt(d, 10))
                while (d--) j = b.createElement("div"), j.id = e ? e[d] : g + (d + 1), l.appendChild(j);
            return h = ["&#173;", '<style id="s', g, '">', a, "</style>"].join(""), l.id = g, (m ? l : n).innerHTML += h, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = f.style.overflow, f.style.overflow = "hidden", f.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), f.style.overflow = k), !! i
        }, w = {}.hasOwnProperty,
        x;
    !A(w, "undefined") && !A(w.call, "undefined") ? x = function (a, b) {
        return w.call(a, b)
    } : x = function (a, b) {
        return b in a && A(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = t.call(arguments, 1),
            e = function () {
                if (this instanceof e) {
                    var a = function () {};
                    a.prototype = c.prototype;
                    var f = new a,
                        g = c.apply(f, d.concat(t.call(arguments)));
                    return Object(g) === g ? g : f
                }
                return c.apply(b, d.concat(t.call(arguments)))
            };
        return e
    }), p.touch = function () {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : v(["@media (", l.join("touch-enabled),("), g, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (a) {
            c = a.offsetTop === 9
        }), c
    }, p.csstransitions = function () {
        return E("transition")
    };
    for (var F in p) x(p, F) && (u = F.toLowerCase(), e[u] = p[F](), s.push((e[u] ? "" : "no-") + u));
    return e.addTest = function (a, b) {
        if (typeof a == "object")
            for (var d in a) x(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c) return e;
            b = typeof b == "function" ? b() : b, typeof enableClasses != "undefined" && enableClasses && (f.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, y(""), h = j = null, e._version = d, e._prefixes = l, e._domPrefixes = o, e._cssomPrefixes = n, e.testProp = function (a) {
        return C([a])
    }, e.testAllProps = E, e.testStyles = v, e.prefixed = function (a, b, c) {
        return b ? E(a, b, c) : E(a, "pfx")
    }, e
}(this, this.document);
(function (c, b, a, e) {
    var d = function (g, f) {
        this.elem = g;
        this.$elem = c(g);
        this.options = f;
        this.metadata = this.$elem.data("swipe-options")
    };
    d.prototype = {
        defaults: {
            left: function (f) {},
            right: function (f) {},
            up: function (f) {},
            down: function (f) {},
            threshold: {
                x: 100,
                y: 50
            }
        },
        init: function () {
            this.config = c.extend({}, this.defaults, this.options, this.metadata);
            this.coords = {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            };
            c(this.elem).on({
                touchstart: c.proxy(this.touchStart, this),
                touchmove: c.proxy(this.touchMove, this),
                touchend: c.proxy(this.touchEnd, this)
            });
            return this
        },
        touchEnd: function (f) {
            var g = {
                x: this.coords.start.x - this.coords.end.x,
                y: this.coords.start.y - this.coords.end.y
            };
            if (g.y < this.config.threshold.y && g.y > (this.config.threshold.y * -1)) {
                if (g.x > this.config.threshold.x) {
                    this.config.left()
                }
                if (g.x < (this.config.threshold.x * -1)) {
                    this.config.right()
                }
            } else {
                if (g.y >= 0) {
                    this.config.up()
                } else {
                    this.config.down()
                }
            }
        },
        touchMove: function (f) {
            var g = f.originalEvent.targetTouches[0];
            this.coords.end = {
                x: g.pageX,
                y: g.pageY
            };
            f.preventDefault()
        },
        touchStart: function (f) {
            var g = f.originalEvent.targetTouches[0];
            this.coords = {
                start: {
                    x: g.pageX,
                    y: g.pageY
                },
                end: {
                    x: g.pageX,
                    y: g.pageY
                }
            }
        }
    };
    d.defaults = d.prototype.defaults;
    c.fn.swipe = function (f) {
        return this.each(function () {
            new d(this, f).init()
        })
    }
})(jQuery, window, document);
(function (a) {
    a.fn.extend({
        defaultAnimate: a.fn.animate,
        animate: function (b, c, d, e) {
            var f = c && typeof c == "object" ? jQuery.extend({}, c) : {
                complete: e || !e && d || jQuery.isFunction(c) && c,
                duration: c,
                easing: e && d || d && !jQuery.isFunction(d) && d
            };
            return a(this).each(function () {
                var d = a(this),
                    e, g;
                Modernizr.csstransitions && (d.hasClass("accordionPro") || d.hasClass("slide")) ? (e = f.easing || "ease-in-out", g = Modernizr.prefixed("transition").replace(/([A-Z])/g, function (a, b) {
                    return "-" + b.toLowerCase()
                }).replace(/^ms-/, "-ms-"), d.css(g, "all " + c / 1e3 + "s " + e).css(b), setTimeout(function () {
                    d.css(g), a.isFunction(f.complete) && f.complete()
                }, c)) : (f.easing = "swing", d.defaultAnimate(b, f))
            })
        }
    })
})(jQuery);
(function () {
    "use strict";

    function e() {}

    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1
    }
    var n = e.prototype;
    n.getListeners = function (e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        } else t = i[e] || (i[e] = []);
        return t
    }, n.flattenListeners = function (e) {
        var t, n = [];
        for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
        return n
    }, n.getListenersAsObject = function (e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, n.addListener = function (e, n) {
        var i, r = this.getListenersAsObject(e),
            o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
            listener: n,
            once: !1
        });
        return this
    }, n.on = n.addListener, n.addOnceListener = function (e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        })
    }, n.once = n.addOnceListener, n.defineEvent = function (e) {
        return this.getListeners(e), this
    }, n.defineEvents = function (e) {
        for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
        return this
    }, n.removeListener = function (e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this
    }, n.off = n.removeListener, n.addListeners = function (e, t) {
        return this.manipulateListeners(!1, e, t)
    }, n.removeListeners = function (e, t) {
        return this.manipulateListeners(!0, e, t)
    }, n.manipulateListeners = function (e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener,
            s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) o.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, n.removeEvent = function (e) {
        var t, n = typeof e,
            i = this._getEvents();
        if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events;
        return this
    }, n.emitEvent = function (e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s)
            if (s.hasOwnProperty(r))
                for (i = s[r].length; i--;) n = s[r][i], o = n.listener.apply(this, t || []), (o === this._getOnceReturnValue() || n.once === !0) && this.removeListener(e, s[r][i].listener);
        return this
    }, n.trigger = n.emitEvent, n.emit = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, n.setOnceReturnValue = function (e) {
        return this._onceReturnValue = e, this
    }, n._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, n._getEvents = function () {
        return this._events || (this._events = {})
    }, "function" == typeof define && define.amd ? define(function () {
        return e
    }) : "undefined" != typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this),
function (e) {
    "use strict";
    var t = document.documentElement,
        n = function () {};
    t.addEventListener ? n = function (e, t, n) {
        e.addEventListener(t, n, !1)
    } : t.attachEvent && (n = function (t, n, i) {
        t[n + i] = i.handleEvent ? function () {
            var t = e.event;
            t.target = t.target || t.srcElement, i.handleEvent.call(i, t)
        } : function () {
            var n = e.event;
            n.target = n.target || n.srcElement, i.call(t, n)
        }, t.attachEvent("on" + n, t[n + i])
    });
    var i = function () {};
    t.removeEventListener ? i = function (e, t, n) {
        e.removeEventListener(t, n, !1)
    } : t.detachEvent && (i = function (e, t, n) {
        e.detachEvent("on" + t, e[t + n]);
        try {
            delete e[t + n]
        } catch (i) {
            e[t + n] = void 0
        }
    });
    var r = {
        bind: n,
        unbind: i
    };
    "function" == typeof define && define.amd ? define(r) : e.eventie = r
}(this),
function (e) {
    "use strict";

    function t(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }

    function n(e) {
        return "[object Array]" === c.call(e)
    }

    function i(e) {
        var t = [];
        if (n(e)) t = e;
        else if ("number" == typeof e.length)
            for (var i = 0, r = e.length; r > i; i++) t.push(e[i]);
        else t.push(e);
        return t
    }

    function r(e, n) {
        function r(e, n, s) {
            if (!(this instanceof r)) return new r(e, n);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = i(e), this.options = t({}, this.options), "function" == typeof n ? s = n : t(this.options, n), s && this.on("always", s), this.getImages(), o && (this.jqDeferred = new o.Deferred);
            var a = this;
            setTimeout(function () {
                a.check()
            })
        }

        function c(e) {
            this.img = e
        }
        r.prototype = new e, r.prototype.options = {}, r.prototype.getImages = function () {
            this.images = [];
            for (var e = 0, t = this.elements.length; t > e; e++) {
                var n = this.elements[e];
                "IMG" === n.nodeName && this.addImage(n);
                for (var i = n.querySelectorAll("img"), r = 0, o = i.length; o > r; r++) {
                    var s = i[r];
                    this.addImage(s)
                }
            }
        }, r.prototype.addImage = function (e) {
            var t = new c(e);
            this.images.push(t)
        }, r.prototype.check = function () {
            function e(e, r) {
                return t.options.debug && a && s.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
            }
            var t = this,
                n = 0,
                i = this.images.length;
            if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
            for (var r = 0; i > r; r++) {
                var o = this.images[r];
                o.on("confirm", e), o.check()
            }
        }, r.prototype.progress = function (e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function () {
                t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify(t, e)
            })
        }, r.prototype.complete = function () {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var t = this;
            setTimeout(function () {
                if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                    var n = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[n](t)
                }
            })
        }, o && (o.fn.imagesLoaded = function (e, t) {
            var n = new r(this, e, t);
            return n.jqDeferred.promise(o(this))
        });
        var f = {};
        return c.prototype = new e, c.prototype.check = function () {
            var e = f[this.img.src];
            if (e) return this.useCached(e), void 0;
            if (f[this.img.src] = this, this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
            var t = this.proxyImage = new Image;
            n.bind(t, "load", this), n.bind(t, "error", this), t.src = this.img.src
        }, c.prototype.useCached = function (e) {
            if (e.isConfirmed) this.confirm(e.isLoaded, "cached was confirmed");
            else {
                var t = this;
                e.on("confirm", function (e) {
                    return t.confirm(e.isLoaded, "cache emitted confirmed"), !0
                })
            }
        }, c.prototype.confirm = function (e, t) {
            this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
        }, c.prototype.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, c.prototype.onload = function () {
            this.confirm(!0, "onload"), this.unbindProxyEvents()
        }, c.prototype.onerror = function () {
            this.confirm(!1, "onerror"), this.unbindProxyEvents()
        }, c.prototype.unbindProxyEvents = function () {
            n.unbind(this.proxyImage, "load", this), n.unbind(this.proxyImage, "error", this)
        }, r
    }
    var o = e.jQuery,
        s = e.console,
        a = s !== void 0,
        c = Object.prototype.toString;
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], r) : e.imagesLoaded = r(e.EventEmitter, e.eventie)
}(window);
(function (a) {
    var b = function (b, c) {
        var d = {}, e = {}, f = {}, g = {}, h = {};
        d = {
            orientation: "horizontal",
            startClosed: !1,
            firstSlide: 1,
            theme: "basic",
            rounded: !1,
            rtl: !1,
            showSlideNumbers: !0,
            responsive: !0,
            scaleImages: !0,
            horizontalWidth: 400,
            horizontalHeight: 600,
            verticalWidth: "94%",
            verticalHeight: 300,
            verticalSlideHeight: "fixed",
            activateOn: "click",
            touchEnabled: !0,
            onSlideOpen: function () {},
            onSlideClose: function () {},
            autoPlay: !1,
            cycleSpeed: 6e3,
            slideSpeed: 700,
            easing: "ease-in-out",
            pauseOnHover: !0,
            linkable: !1
        }, e = a.extend({}, d, c);
        var i = {
            w: 0,
            h: 0
        }, j = b.children("ol").children("li"),
            k = {
                w: 0,
                h: 0,
                l: 0
            }, l = j.children(":first-child"),
            m = {
                w: 0,
                h: 48
            }, n = 0,
            o = 0,
            p = 0,
            q = e.orientation === "horizontal" ? 1 : 0,
            r = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"],
            s = a.inArray(e.easing, r) >= 0 ? e.easing : d.easing,
            t = !q && e.verticalSlideHeight === "fitToContent" ? !0 : !1,
            u = e.theme === "transparent";
        return f.play = function (a) {
            var b;
            if (h.playing) return;
            b = h.nextSlide(a && a), h.playing = setTimeout(function () {
                l.eq(b()).trigger("click.accordionPro")
            }, e.cycleSpeed)
        }, f.stop = function () {
            clearTimeout(h.playing), h.playing = 0
        }, f.next = function () {
            f.stop(), l.eq(h.currentSlide === k.length - 1 ? 0 : h.currentSlide + 1).trigger("click.accordionPro")
        }, f.prev = function () {
            f.stop(), l.eq(h.currentSlide - 1).trigger("click.accordionPro")
        }, f.destroy = function () {
            f.stop(), a(window).off(".accordionPro"), b.off(".accordionPro").removeData("accordionPro").removeAttr("style").removeClass("accordionPro horizontal vertical basic dark light stitch transparent rounded rtl closed responsive fitToContent scaleImages").find("li > :first-child").off(".accordionPro").end().find("b").remove(), j.removeClass("slide selected").removeAttr("style").removeAttr("data-slide-name").children().removeAttr("style")
        }, f.debug = function () {
            return {
                elem: b,
                defaults: d,
                settings: e,
                methods: f,
                setup: g,
                core: h
            }
        }, g.styles = function () {
            b.outerWidth(q ? e.horizontalWidth : e.verticalWidth).outerHeight(q ? e.horizontalHeight : e.verticalHeight).addClass("accordionPro").addClass(q ? "horizontal" : "vertical").addClass(e.rounded && "rounded").addClass(e.theme).addClass(e.rtl && "rtl").addClass(e.startClosed && "closed").addClass(!q && t && "fitToContent").addClass(e.scaleImages && "scaleImages"), j.addClass("slide"), k.l = j.length
        }, g.dimensions = function () {
            var a = j.eq(0).children("div");
            i.w = b.width(), i.h = b.height(), o = b.outerHeight() - b.height(), p = parseInt(a.css("marginLeft"), 10) || parseInt(a.css("marginRight"), 10) || parseInt(a.css("marginBottom"), 10) || 0, q ? n = parseInt(b.css("paddingLeft"), 10) + parseInt(b.css("paddingRight"), 10) : n = parseInt(b.css("paddingTop"), 10) + parseInt(b.css("paddingBottom"), 10)
        }, g.getSlideCss = function (a, b) {
            var c = this,
                d = {
                    slide: {},
                    tab: {},
                    panel: {}
                };
				
            return q ? (k.w = i.w - k.l * m.h, k.h = i.h, d.slide = {
                width: k.w + m.h,
                height: "100%",
                position: {
					left: (a) * m.h,
                    top: 0
                }
            }, d.tab.width = k.h, d.panel = u ? {
                width: k.w + m.h,
                height: k.h,
                position: {
                    left: 0,
                    top: 0
                }
            } : {
                width: k.w - p,
                height: k.h,
                position: {
                    left: (m.h),
                    top: 0
                }
            }, e.rtl && (d.slide.position = {
                left: "auto",
                right: a * m.h,
                top: 0
            }, d.panel.position = u ? {
                left: "auto",
                right: 0 - p,
                top: 0
            } : {
                left: "auto",
                right: m.h - p,
                top: 0
            }), b.length && a > j.index(b) && (d.slide.position[e.rtl ? "right" : "left"] += k.w)) : (k.w = l.eq(0).width(), k.h = i.h - k.l * m.h, t ? (d.panel.height = c.children("div").height(), d.slide.height = u ? d.panel.height : d.panel.height + m.h) : (d.slide.height = k.h + m.h, d.panel.height = u ? d.slide.height : d.slide.height - m.h - p), d.panel.position = u ? {
                top: 0,
                left: 0
            } : {
                top: m.h,
                left: 0
            }, d.slide.position = {
                top: a * m.h,
                left: 0
            }, d.slide.width = d.tab.width = d.panel.width = "100%", b.length && a > j.index(b) && (t ? d.slide.position.top += b.height() - m.h : d.slide.position.top += k.h)), d
        }, g.slidePositions = function () {
            var c = j.filter(".selected");
            !c.length && !e.startClosed && (j.eq(e.firstSlide - 1).addClass("selected"), c = j.filter(".selected")), j.each(function (d) {
                var f = a(this),
                    h = g.getSlideCss.call(f, d, c),
                    i = f.children("h2"),
                    j = i.children("b");
					
					
                f.width(h.slide.width).height(h.slide.height).css(h.slide.position).attr("data-slide-name", b[0].id + "-slide-" + (d + 1)).children("h2").width(h.tab.width).height(m.h).next().width(h.panel.width).height(h.panel.height).css(h.panel.position);
                if (e.showSlideNumbers) {
                    if (j.length) return;
                    i.append("<b>" + (d + 1) + "</b>")
                } else j.length && j.hide();
                b.hasClass("ie8") && b.hasClass("horizontal") && b.hasClass("rtl") && f.children("h2").css("marginRight", -(k.h - m.h))
            }), t && h.fitToContent(c)
        }, g.startClosed = function () {
            q ? b.css("width", k.l * m.h + o / 2 + n * 2 - 1) : b.css("height", k.l * m.h + o)
        }, g.events = function () {
            var c = 0;
            e.activateOn === "click" ? (l.on("click.accordionPro touchstart.accordionPro", h.animationCycle), e.startClosed && l.on("click.accordionPro.closed touchstart.accordionPro.closed", h.startClosed)) : e.activateOn === "mouseover" && (l.on("click.accordionPro touchstart.accordionPro mouseover.accordionPro", h.animationCycle), e.startClosed && l.on("click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed", h.startClosed)), Modernizr.touch && e.touchEnabled && j.swipe({
                left: function () {
                    q && (e.rtl ? h.currentSlide && f.prev() : f.next())
                },
                right: function () {
                    q && (e.rtl ? f.next() : h.currentSlide && f.prev())
                },
                up: function () {
                    q || f.next()
                },
                down: function () {
                    !q && h.currentSlide && f.prev()
                },
                threshold: {
                    x: 80,
                    y: 80
                }
            }), e.pauseOnHover && e.autoPlay && b.on("mouseover.accordionPro", function () {
                b.hasClass("closed") || h.playing && f.stop()
            }).on("mouseout.accordionPro", function () {
                b.hasClass("closed") || !h.playing && f.play(h.currentSlide)
            }), e.linkable && a(window).on("load.accordionPro hashchange.accordionPro", function (b) {
                var c = j.filter(function () {
                    return a(this).attr("data-slide-name") === window.location.hash.split("#")[1]
                });
                c.length && h.animationCycle.call(c.children("h2")[0], b)
            }), q && e.responsive && (h.scale(), a(window).on("resize.accordionPro orientationchange.accordionPro", function () {
                clearTimeout(c), c = setTimeout(function () {
                    h.scale()
                }, 200)
            }))
        }, g.ie = function () {
            var c = navigator.userAgent,
                d = c.indexOf("MSIE");
            if (d < 0) return;
            if (d !== -1) {
                c = c.slice(d + 5, d + 7), c = +c, c <= 7 && f.destroy();
                if (c >= 10) return;
                c === 8 && (q && (e.startClosed ? b.children("ol").css({
                    "min-width": k.l * m.h,
                    "min-height": e.horizontalHeight - o
                }) : b.children("ol").css({
                    "min-width": e.horizontalWidth - o + n,
                    "min-height": e.horizontalHeight - o
                })), j.each(function (b) {
                    a(this).addClass("slide-" + b).css({
                        "min-height": e.horizontalHeight - o
                    })
                })), b.addClass("ie ie" + c)
            }
        }, h.startClosed = function () {
            b.hasClass("closed") && (q ? (b.css("width", e.horizontalWidth), b.hasClass("ie8") && b.children("ol").css({
                "min-width": e.horizontalWidth - o + n
            })) : b.animate({
                height: t ? (k.l - 1) * m.h + o + j.filter(".selected").height() : e.verticalHeight
            }, e.slideSpeed), b.removeClass("closed"), l.off("click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed"), q && e.responsive && h.scale(), !e.startClosed && e.autoPlay && f.play())
        }, h.fitToContent = function (a) {
            b.hasClass("closed") || (b.animate({
                height: (k.l - 1) * m.h + o + a.height()
            }, e.slideSpeed), b.height((k.l - 1) * m.h + a.height()))
        }, h.scale = function () {
            var a = Math.min(b.parent().outerWidth(!0) / e.horizontalWidth),
                c;
            a = Math.min(a, 1), b.hasClass("ie8") ? b.css("zoom", a) : (b.css(Modernizr.prefixed("transform"), "scale(1)"), q && b.css("margin-bottom1", -(e.horizontalHeight - e.horizontalHeight * a).toFixed(2)))
        }, h.currentSlide = e.firstSlide - 1, h.previousSlide = h.currentSlide, h.nextSlide = function (a) {
            var b = a + 1 || h.currentSlide + 1;
            return function () {
                return b++ % k.l
            }
        }, h.playing = 0, h.animationFlag = !1, h.getSlidePosition = function (a, b) {
            var c = {};
			//alert(b);
			if(h.currentSlide == 1)
			{
				if(a == 1)
				{
					a=a-1;
				}
			}
			else
			{
				
					a=a-1;
			}
			if(typeof b !="number")
			{
				a=a+1;
			}
			
			
			
			//alert(b + a * m.h);
			//alert(k.w + a * m.h);
            return typeof b == "number" ? q ? e.rtl ? c = {
                right: b + a * m.h
            } : c = {
                left: b + a * m.h
            } : c = {
                top: b + a * m.h
            } : q ? e.rtl ? c = {
                right: k.w + a * m.h
            } : c = {
                left: (k.w + a * m.h)
            } : c = {
                top: k.h + a * m.h
            }, c
        }, h.animationCycle = function (b) {
            var c = a(this),
                d = {
                    slide: c.parent(),
                    index: l.index(c)
                };
            d.next = d.slide.next(), d.prev = d.slide.prev(), h.previousSlide = h.currentSlide, h.currentSlide = d.index, h.animationFlag = !1, d.slide.hasClass("selected") ? (e.onSlideOpen.call(d.prev.children("div")[0]), q ? (e.rtl && d.slide.position().left > i.w / 2 || d.slide.position().left < i.w / 2) && h.animateSlide.call(d) : t && d.index ? (h.animateGroup(d, !0), h.fitToContent(d.prev)) : d.slide.position().top < i.h / 2 && h.animateSlide.call(d)) : (setTimeout(function () {
                e.onSlideOpen.call(d.slide.children("div")[0])
            }, e.slideSpeed), h.animateGroup(d), t && h.fitToContent(d.slide)), e.autoPlay && (f.stop(), f.play(l.index(j.filter(".selected"))))
        }, h.animateSlide = function (a) {
            var b;
            typeof this.position == "undefined" ? (this.position = h.getSlidePosition.call(this, this.index), this.index && j.removeClass("selected").filter(this.prev).addClass("selected")) : typeof this.position == "number" && (b = this.position, this.position = h.getSlidePosition(this.index, b)), this.index && h.transition.call(this, a)
        }, h.animateGroup = function (b, c) {
            var d = ["left", "right"];
            a.each(d, function (d, e) {
                var f, g;
                d ? (c ? f = ":gt(" + (b.index - 1) + ")" : f = ":gt(" + b.index + ")", q ? g = k.w : t ? c ? g = b.prev.height() - m.h : g = b.slide.height() - m.h : g = k.h) : (c ? f = ":lt(" + b.index + ")" : f = ":lt(" + (b.index + 1) + ")", g = 0), j.filter(f).each(function () {
                    var c = a(this),
                        d = {
                            slide: c,
                            index: j.index(c),
                            next: c.next(),
                            prev: c.prev(),
                            position: g
                        };
                    h.animateSlide.call(d, b)
                })
            }), j.removeClass("selected").filter(c ? b.prev : b.slide).addClass("selected")
        }, h.transition = function (a) {
            var b = this;
            this.slide.stop(!0).animate(this.position, e.slideSpeed, s, function () {
                h.animationFlag || (e.onSlideClose.call(j.eq(h.previousSlide).children("div")), h.animationFlag = !0)
            })
        }, h.init = function () {
            if (typeof e.horizontalWidth != "number" || typeof e.horizontalHeight != "number" || typeof e.verticalHeight != "number") throw new Error("horizontalWidth, horizontalHeight, and verticalHeight options must be integers.");
            b.hide(), t && (e.scaleImages = !1), e.linkable && (e.startClosed = !1), e.cycleSpeed < e.slideSpeed && (e.cycleSpeed = e.slideSpeed), g.styles(), imagesLoaded(b, function () {
                g.dimensions(), g.ie(), b.show(), g.slidePositions(), g.events(), e.startClosed && g.startClosed()
            }), !e.startClosed && e.autoPlay && f.play()
        }, h.init(), f
    };
    a.fn.accordionPro = function (a) {
        var c = this,
            d = c.data("accordionPro");
        if (typeof a == "object" || !a) return c.each(function () {
            var e;
            if (d) return;
            e = new b(c, a), c.data("accordionPro", e)
        });
        if (typeof a == "string" && d[a]) return a === "debug" ? d[a].call(c) : (d[a].call(c), c)
    }
})(jQuery);