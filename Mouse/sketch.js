var Sketch = (function () {
   function e(e) {
      e = n(e || {}, l);
      var t = 'sketch-' + r++,
         o = e.hasOwnProperty('canvas'),
         u = o ? e.canvas : document.createElement('canvas');
      switch (e.type) {
         case m:
            try {
               s = u.getContext('webgl', e);
            } catch (d) {}
            try {
               s = s || u.getContext('experimental-webgl', e);
            } catch (d) {}
            if (!s) throw 'WebGL not supported';
            break;
         case c:
            try {
               s = u.getContext('2d', e);
            } catch (d) {}
            if (!s) throw 'Canvas not supported';
            break;
         default:
            u = s = document.createElement('div');
      }
      return (
         (s.canvas = u),
         (u.className = 'sketch'),
         o
            ? (e.autoresize = !1)
            : (e.container.appendChild(u),
              e.hasOwnProperty('autoresize') || (e.autoresize = l.autoresize),
              (u.id = t)),
         n(self, g),
         n(s, e),
         n(s, p),
         a(),
         e.autoresize && i(),
         w.push(s),
         s.autostart && setTimeout(s.start, 0),
         s
      );
   }
   function n(e, n) {
      for (var t in n) e.hasOwnProperty(t) || (e[t] = n[t]);
      return e;
   }
   function t(e) {
      function n(e, n) {
         return function () {
            e.call(n, arguments);
         };
      }
      var t = {};
      for (var o in e) t[o] = 'function' == typeof e[o] ? n(e[o], e) : e[o];
      return t;
   }
   function o(e, n) {
      e.length = 0;
      for (var t = 0, o = n.length; o > t; t++) e[t] = n[t];
      return e;
   }
   function a() {
      function e(e) {
         return M[e] || String.fromCharCode(e);
      }
      function n(e) {
         (s.mouse.ox = s.mouse.x),
            (s.mouse.oy = s.mouse.y),
            (s.mouse.x = e.x),
            (s.mouse.y = e.y),
            (s.mouse.dx = s.mouse.x - s.mouse.ox),
            (s.mouse.dy = s.mouse.y - s.mouse.oy);
      }
      function a(e) {
         var n,
            o = t(e);
         o.original = e;
         for (var a = s.canvas, u = 0, i = 0; a; a = a.offsetParent)
            (u += a.offsetLeft), (i += a.offsetTop);
         if (o.touches && o.touches.length)
            for (var r, c = o.touches.length - 1; c >= 0; c--)
               (r = o.touches[c]),
                  (r.x = r.pageX - u),
                  (r.y = r.pageY - i),
                  (n = A[c] || r),
                  (r.dx = r.x - n.x),
                  (r.dy = r.y - n.x),
                  (r.ox = n.x),
                  (r.oy = n.y),
                  (A[c] = t(r));
         else
            (o.x = o.pageX - u),
               (o.y = o.pageY - i),
               (n = A.mouse || o),
               (o.dx = o.x - n.x),
               (o.dy = o.y - n.y),
               (o.ox = n.x),
               (o.oy = n.y),
               (A.mouse = o);
         return o;
      }
      function u(e) {
         e.preventDefault(),
            (e = a(e)),
            o(s.touches, e.touches),
            n(s.touches[0]),
            s.touchstart && s.touchstart(e),
            s.mousedown && s.mousedown(e);
      }
      function r(e) {
         (e = a(e)),
            o(s.touches, e.touches),
            n(s.touches[0]),
            s.touchmove && s.touchmove(e),
            s.mousemove && s.mousemove(e);
      }
      function c(e) {
         if (((e = a(e)), e.touches.length))
            for (var n in A) e.touches[n] || delete A[n];
         else A = {};
         s.touchend && s.touchend(e), s.mouseup && s.mouseup(e);
      }
      function m(e) {
         (e = a(e)), s.mouseover && s.mouseover(e);
      }
      function d(e) {
         (e = a(e)),
            s.dragging ||
               (x(s.canvas, 'mousemove', h),
               x(s.canvas, 'mouseup', v),
               y(document, 'mousemove', h),
               y(document, 'mouseup', v),
               (s.dragging = !0)),
            o(s.touches, [e]),
            s.touchstart && s.touchstart(e),
            s.mousedown && s.mousedown(e);
      }
      function h(e) {
         (e = a(e)),
            n(e),
            o(s.touches, [e]),
            s.touchmove && s.touchmove(e),
            s.mousemove && s.mousemove(e);
      }
      function f(e) {
         (e = a(e)), s.mouseout && s.mouseout(e);
      }
      function v(e) {
         (e = a(e)),
            s.dragging &&
               (x(document, 'mousemove', h),
               x(document, 'mouseup', v),
               y(s.canvas, 'mousemove', h),
               y(s.canvas, 'mouseup', v),
               (s.dragging = !1)),
            delete A.mouse,
            s.touchend && s.touchend(e),
            s.mouseup && s.mouseup(e);
      }
      function w(e) {
         (e = a(e)), s.click && s.click(e);
      }
      function l(n) {
         (s.keys[e(n.keyCode)] = !0),
            (s.keys[n.keyCode] = !0),
            s.keydown && s.keydown(n);
      }
      function g(n) {
         (s.keys[e(n.keyCode)] = !1),
            (s.keys[n.keyCode] = !1),
            s.keyup && s.keyup(n);
      }
      var M = {
         8: 'BACKSPACE',
         9: 'TAB',
         13: 'ENTER',
         16: 'SHIFT',
         27: 'ESCAPE',
         32: 'SPACE',
         37: 'LEFT',
         38: 'UP',
         39: 'RIGHT',
         40: 'DOWN',
      };
      for (var k in M) p.keys[M[k]] = !1;
      var A = {};
      y(s.canvas, 'touchstart', u),
         y(s.canvas, 'touchmove', r),
         y(s.canvas, 'touchend', c),
         y(s.canvas, 'mouseover', m),
         y(s.canvas, 'mousedown', d),
         y(s.canvas, 'mousemove', h),
         y(s.canvas, 'mouseout', f),
         y(s.canvas, 'mouseup', v),
         y(s.canvas, 'click', w),
         y(document, 'keydown', l),
         y(document, 'keyup', g),
         y(window, 'resize', i);
   }
   function u() {
      if (!h) {
         var e = Date.now();
         (s.dt = e - s.now),
            (s.millis += s.dt),
            (s.now = e),
            s.update && s.update(s.dt),
            s.autoclear && s.clear(),
            s.draw && s.draw(s);
      }
      (h = ++h % s.interval), (f = requestAnimationFrame(u));
   }
   function i() {
      if (s.autoresize) {
         var e = s.type === d ? s.style : s.canvas;
         s.fullscreen
            ? ((s.height = e.height = window.innerHeight),
              (s.width = e.width = window.innerWidth))
            : ((e.height = s.height), (e.width = s.width)),
            s.resize && s.resize();
      }
   }
   var s,
      r = 0,
      c = 'canvas',
      m = 'web-gl',
      d = 'dom',
      h = 0,
      f = -1,
      v = {},
      w = [],
      l = {
         fullscreen: !0,
         autostart: !0,
         autoclear: !0,
         autopause: !0,
         autoresize: !0,
         container: document.body,
         interval: 1,
         type: c,
      },
      g = {
         PI: Math.PI,
         TWO_PI: 2 * Math.PI,
         HALF_PI: Math.PI / 2,
         QUARTER_PI: Math.PI / 4,
         abs: Math.abs,
         acos: Math.acos,
         asin: Math.asin,
         atan2: Math.atan2,
         atan: Math.atan,
         ceil: Math.ceil,
         cos: Math.cos,
         exp: Math.exp,
         floor: Math.floor,
         log: Math.log,
         max: Math.max,
         min: Math.min,
         pow: Math.pow,
         round: Math.round,
         sin: Math.sin,
         sqrt: Math.sqrt,
         tan: Math.tan,
         random: function (e, n) {
            return e && 'number' == typeof e.length && e.length
               ? e[Math.floor(Math.random() * e.length)]
               : ('number' != typeof n && ((n = e || 1), (e = 0)),
                 e + Math.random() * (n - e));
         },
      },
      p = {
         millis: 0,
         now: 0 / 0,
         dt: 0 / 0,
         keys: {},
         mouse: { x: 0, y: 0, ox: 0, oy: 0, dx: 0, dy: 0 },
         touches: [],
         initialized: !1,
         dragging: !1,
         running: !1,
         start: function () {
            s.running ||
               (s.setup &&
                  !s.initialized &&
                  (s.autopause &&
                     (y(window, 'focus', s.start), y(window, 'blur', s.stop)),
                  s.setup()),
               (s.initialized = !0),
               (s.running = !0),
               (s.now = Date.now()),
               u());
         },
         stop: function () {
            cancelAnimationFrame(f), (s.running = !1);
         },
         toggle: function () {
            (s.running ? s.stop : s.start)();
         },
         clear: function () {
            s.canvas && (s.canvas.width = s.canvas.width);
         },
         destroy: function () {
            var e, n, t, o, a, u;
            w.splice(w.indexOf(s), 1), s.stop();
            for (n in v) {
               for (t = v[n], a = 0, u = t.length; u > a; a++)
                  (e = t[a]), x(e.el, n, e.fn);
               delete v[n];
            }
            s.container.removeChild(s.canvas);
            for (o in s) s.hasOwnProperty(o) && delete s[o];
         },
      },
      y = (function () {
         function e(e, n, t) {
            v[n] || (v[n] = []), v[n].push({ el: e, fn: t });
         }
         return window.addEventListener
            ? function (n, t, o) {
                 n.addEventListener(t, o, !1), e(n, t, o);
              }
            : window.attachEvent
            ? function (n, t, o) {
                 n.attachEvent('on' + t, o), e(n, t, o);
              }
            : function (n, t, o) {
                 (n['on' + t] = o), e(n, t, o);
              };
      })(),
      x = (function () {
         function e(e, n, t) {
            if (v[n])
               for (var o, a = v[n].length - 1; a >= 0; a--)
                  (o = v[n][a]), o.el === e && o.fn === t && v[n].splice(a, 1);
         }
         return window.removeEventListener
            ? function (n, t, o) {
                 n.removeEventListener(t, o, !1), e(n, t, o);
              }
            : window.detachEvent
            ? function (n, t, o) {
                 n.detachEvent('on' + t, o), e(n, t, o);
              }
            : ((el['on' + ev] = null), e(el, ev, fn), void 0);
      })();
   return { CANVAS: c, WEB_GL: m, DOM: d, instances: w, create: e };
})();
Date.now ||
   (Date.now = function () {
      return +new Date();
   }),
   (function () {
      for (
         var e = 0, n = ['ms', 'moz', 'webkit', 'o'], t = 0;
         n.length > t && !window.requestAnimationFrame;
         ++t
      )
         (window.requestAnimationFrame =
            window[n[t] + 'RequestAnimationFrame']),
            (window.cancelAnimationFrame =
               window[n[t] + 'CancelAnimationFrame'] ||
               window[n[t] + 'CancelRequestAnimationFrame']);
      window.requestAnimationFrame ||
         (window.requestAnimationFrame = function (n) {
            var t = Date.now(),
               o = Math.max(0, 16 - (t - e)),
               a = window.setTimeout(function () {
                  n(t + o);
               }, o);
            return (e = t + o), a;
         }),
         window.cancelAnimationFrame ||
            (window.cancelAnimationFrame = function (e) {
               clearTimeout(e);
            });
   })();
