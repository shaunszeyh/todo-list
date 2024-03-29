(() => {
  "use strict";
  const t = JSON.parse(localStorage.getItem("todoList")) || [];
  function e(t, e, n, a, r) {
    (this.name = t),
      (this.dueDate = e),
      (this.completed = n),
      (this.id = a),
      (this.project = r);
  }
  function n(t, e) {
    const n = document.getElementsByClassName("taskbar")[0];
    n.innerHTML = "";
    for (const r of t)
      if (r.project == e || 0 == e.length || "Inbox" == e) {
        const t = document.createElement("div");
        t.classList.add("bar");
        const i = document.createElement("div");
        i.classList.add("bar-left");
        const o = document.createElement("div");
        o.classList.add("bar-right");
        const s = (r.name + r.dueDate).replace(/\s+/g, "").toLowerCase();
        t.classList.add(s);
        const u = document.createElement("input"),
          c = document.createElement("p"),
          d = document.createElement("p");
        u.setAttribute("type", "image"),
          u.setAttribute("src", "images/checkbox.png"),
          u.setAttribute("width", "20px"),
          u.setAttribute("height", "20px"),
          u.classList.add(s),
          u.addEventListener("click", a, !1),
          "Inbox" == e || 0 == e.length
            ? (c.textContent = `${r.name} (${r.project})`)
            : (c.textContent = r.name),
          (d.textContent = r.dueDate),
          i.appendChild(u),
          i.appendChild(c),
          o.appendChild(d),
          t.appendChild(i),
          t.appendChild(o),
          n.appendChild(t);
      }
  }
  function a(e) {
    const n = document.getElementsByClassName("taskbar")[0],
      a = e.target.classList[0],
      r = document.getElementsByClassName(a)[0];
    n.removeChild(r);
    for (let e = 0; e < t.length; e++)
      if (t[e].id === a) {
        t.splice(e, 1), localStorage.setItem("todoList", JSON.stringify(t));
        break;
      }
  }
  function r(t, e) {
    if (e.length < t)
      throw new TypeError(
        t +
          " argument" +
          (t > 1 ? "s" : "") +
          " required, but only " +
          e.length +
          " present"
      );
  }
  function i(t) {
    return (
      r(1, arguments),
      t instanceof Date ||
        ("object" == typeof t &&
          "[object Date]" === Object.prototype.toString.call(t))
    );
  }
  function o(t) {
    r(1, arguments);
    var e = Object.prototype.toString.call(t);
    return t instanceof Date || ("object" == typeof t && "[object Date]" === e)
      ? new Date(t.getTime())
      : "number" == typeof t || "[object Number]" === e
      ? new Date(t)
      : (("string" != typeof t && "[object String]" !== e) ||
          "undefined" == typeof console ||
          (console.warn(
            "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"
          ),
          console.warn(new Error().stack)),
        new Date(NaN));
  }
  function s(t) {
    if ((r(1, arguments), !i(t) && "number" != typeof t)) return !1;
    var e = o(t);
    return !isNaN(Number(e));
  }
  var u = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds",
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes",
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  };
  function c(t) {
    return function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        n = e.width ? String(e.width) : t.defaultWidth,
        a = t.formats[n] || t.formats[t.defaultWidth];
      return a;
    };
  }
  var d,
    l = {
      date: c({
        formats: {
          full: "EEEE, MMMM do, y",
          long: "MMMM do, y",
          medium: "MMM d, y",
          short: "MM/dd/yyyy",
        },
        defaultWidth: "full",
      }),
      time: c({
        formats: {
          full: "h:mm:ss a zzzz",
          long: "h:mm:ss a z",
          medium: "h:mm:ss a",
          short: "h:mm a",
        },
        defaultWidth: "full",
      }),
      dateTime: c({
        formats: {
          full: "{{date}} 'at' {{time}}",
          long: "{{date}} 'at' {{time}}",
          medium: "{{date}}, {{time}}",
          short: "{{date}}, {{time}}",
        },
        defaultWidth: "full",
      }),
    },
    m = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P",
    };
  function h(t) {
    return function (e, n) {
      var a,
        r = n || {};
      if (
        "formatting" === (r.context ? String(r.context) : "standalone") &&
        t.formattingValues
      ) {
        var i = t.defaultFormattingWidth || t.defaultWidth,
          o = r.width ? String(r.width) : i;
        a = t.formattingValues[o] || t.formattingValues[i];
      } else {
        var s = t.defaultWidth,
          u = r.width ? String(r.width) : t.defaultWidth;
        a = t.values[u] || t.values[s];
      }
      return a[t.argumentCallback ? t.argumentCallback(e) : e];
    };
  }
  function f(t) {
    return function (e) {
      var n =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        a = n.width,
        r = (a && t.matchPatterns[a]) || t.matchPatterns[t.defaultMatchWidth],
        i = e.match(r);
      if (!i) return null;
      var o,
        s = i[0],
        u = (a && t.parsePatterns[a]) || t.parsePatterns[t.defaultParseWidth],
        c = Array.isArray(u)
          ? p(u, function (t) {
              return t.test(s);
            })
          : g(u, function (t) {
              return t.test(s);
            });
      (o = t.valueCallback ? t.valueCallback(c) : c),
        (o = n.valueCallback ? n.valueCallback(o) : o);
      var d = e.slice(s.length);
      return { value: o, rest: d };
    };
  }
  function g(t, e) {
    for (var n in t) if (t.hasOwnProperty(n) && e(t[n])) return n;
  }
  function p(t, e) {
    for (var n = 0; n < t.length; n++) if (e(t[n])) return n;
  }
  const b = {
    code: "en-US",
    formatDistance: function (t, e, n) {
      var a,
        r = u[t];
      return (
        (a =
          "string" == typeof r
            ? r
            : 1 === e
            ? r.one
            : r.other.replace("{{count}}", e.toString())),
        null != n && n.addSuffix
          ? n.comparison && n.comparison > 0
            ? "in " + a
            : a + " ago"
          : a
      );
    },
    formatLong: l,
    formatRelative: function (t, e, n, a) {
      return m[t];
    },
    localize: {
      ordinalNumber: function (t, e) {
        var n = Number(t),
          a = n % 100;
        if (a > 20 || a < 10)
          switch (a % 10) {
            case 1:
              return n + "st";
            case 2:
              return n + "nd";
            case 3:
              return n + "rd";
          }
        return n + "th";
      },
      era: h({
        values: {
          narrow: ["B", "A"],
          abbreviated: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        defaultWidth: "wide",
      }),
      quarter: h({
        values: {
          narrow: ["1", "2", "3", "4"],
          abbreviated: ["Q1", "Q2", "Q3", "Q4"],
          wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
        },
        defaultWidth: "wide",
        argumentCallback: function (t) {
          return t - 1;
        },
      }),
      month: h({
        values: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        defaultWidth: "wide",
      }),
      day: h({
        values: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        defaultWidth: "wide",
      }),
      dayPeriod: h({
        values: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
        },
        defaultWidth: "wide",
        formattingValues: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
        },
        defaultFormattingWidth: "wide",
      }),
    },
    match: {
      ordinalNumber:
        ((d = {
          matchPattern: /^(\d+)(th|st|nd|rd)?/i,
          parsePattern: /\d+/i,
          valueCallback: function (t) {
            return parseInt(t, 10);
          },
        }),
        function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = t.match(d.matchPattern);
          if (!n) return null;
          var a = n[0],
            r = t.match(d.parsePattern);
          if (!r) return null;
          var i = d.valueCallback ? d.valueCallback(r[0]) : r[0];
          i = e.valueCallback ? e.valueCallback(i) : i;
          var o = t.slice(a.length);
          return { value: i, rest: o };
        }),
      era: f({
        matchPatterns: {
          narrow: /^(b|a)/i,
          abbreviated:
            /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
          wide: /^(before christ|before common era|anno domini|common era)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/^b/i, /^(a|c)/i] },
        defaultParseWidth: "any",
      }),
      quarter: f({
        matchPatterns: {
          narrow: /^[1234]/i,
          abbreviated: /^q[1234]/i,
          wide: /^[1234](th|st|nd|rd)? quarter/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
        defaultParseWidth: "any",
        valueCallback: function (t) {
          return t + 1;
        },
      }),
      month: f({
        matchPatterns: {
          narrow: /^[jfmasond]/i,
          abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
          any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
        },
        defaultParseWidth: "any",
      }),
      day: f({
        matchPatterns: {
          narrow: /^[smtwf]/i,
          short: /^(su|mo|tu|we|th|fr|sa)/i,
          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
          any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
        },
        defaultParseWidth: "any",
      }),
      dayPeriod: f({
        matchPatterns: {
          narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
        },
        defaultMatchWidth: "any",
        parsePatterns: {
          any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i,
          },
        },
        defaultParseWidth: "any",
      }),
    },
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  };
  function w(t) {
    if (null === t || !0 === t || !1 === t) return NaN;
    var e = Number(t);
    return isNaN(e) ? e : e < 0 ? Math.ceil(e) : Math.floor(e);
  }
  function v(t, e) {
    r(2, arguments);
    var n = o(t).getTime(),
      a = w(e);
    return new Date(n + a);
  }
  function y(t, e) {
    r(2, arguments);
    var n = w(e);
    return v(t, -n);
  }
  function C(t, e) {
    for (var n = t < 0 ? "-" : "", a = Math.abs(t).toString(); a.length < e; )
      a = "0" + a;
    return n + a;
  }
  const E = function (t, e) {
      var n = t.getUTCFullYear(),
        a = n > 0 ? n : 1 - n;
      return C("yy" === e ? a % 100 : a, e.length);
    },
    T = function (t, e) {
      var n = t.getUTCMonth();
      return "M" === e ? String(n + 1) : C(n + 1, 2);
    },
    k = function (t, e) {
      return C(t.getUTCDate(), e.length);
    },
    M = function (t, e) {
      return C(t.getUTCHours() % 12 || 12, e.length);
    },
    x = function (t, e) {
      return C(t.getUTCHours(), e.length);
    },
    D = function (t, e) {
      return C(t.getUTCMinutes(), e.length);
    },
    L = function (t, e) {
      return C(t.getUTCSeconds(), e.length);
    },
    S = function (t, e) {
      var n = e.length,
        a = t.getUTCMilliseconds();
      return C(Math.floor(a * Math.pow(10, n - 3)), e.length);
    };
  var N = 864e5;
  function P(t) {
    r(1, arguments);
    var e = 1,
      n = o(t),
      a = n.getUTCDay(),
      i = (a < e ? 7 : 0) + a - e;
    return n.setUTCDate(n.getUTCDate() - i), n.setUTCHours(0, 0, 0, 0), n;
  }
  function U(t) {
    r(1, arguments);
    var e = o(t),
      n = e.getUTCFullYear(),
      a = new Date(0);
    a.setUTCFullYear(n + 1, 0, 4), a.setUTCHours(0, 0, 0, 0);
    var i = P(a),
      s = new Date(0);
    s.setUTCFullYear(n, 0, 4), s.setUTCHours(0, 0, 0, 0);
    var u = P(s);
    return e.getTime() >= i.getTime()
      ? n + 1
      : e.getTime() >= u.getTime()
      ? n
      : n - 1;
  }
  function A(t) {
    r(1, arguments);
    var e = U(t),
      n = new Date(0);
    n.setUTCFullYear(e, 0, 4), n.setUTCHours(0, 0, 0, 0);
    var a = P(n);
    return a;
  }
  var W = 6048e5;
  function j(t, e) {
    r(1, arguments);
    var n = e || {},
      a = n.locale,
      i = a && a.options && a.options.weekStartsOn,
      s = null == i ? 0 : w(i),
      u = null == n.weekStartsOn ? s : w(n.weekStartsOn);
    if (!(u >= 0 && u <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var c = o(t),
      d = c.getUTCDay(),
      l = (d < u ? 7 : 0) + d - u;
    return c.setUTCDate(c.getUTCDate() - l), c.setUTCHours(0, 0, 0, 0), c;
  }
  function B(t, e) {
    r(1, arguments);
    var n = o(t),
      a = n.getUTCFullYear(),
      i = e || {},
      s = i.locale,
      u = s && s.options && s.options.firstWeekContainsDate,
      c = null == u ? 1 : w(u),
      d = null == i.firstWeekContainsDate ? c : w(i.firstWeekContainsDate);
    if (!(d >= 1 && d <= 7))
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var l = new Date(0);
    l.setUTCFullYear(a + 1, 0, d), l.setUTCHours(0, 0, 0, 0);
    var m = j(l, e),
      h = new Date(0);
    h.setUTCFullYear(a, 0, d), h.setUTCHours(0, 0, 0, 0);
    var f = j(h, e);
    return n.getTime() >= m.getTime()
      ? a + 1
      : n.getTime() >= f.getTime()
      ? a
      : a - 1;
  }
  function Y(t, e) {
    r(1, arguments);
    var n = e || {},
      a = n.locale,
      i = a && a.options && a.options.firstWeekContainsDate,
      o = null == i ? 1 : w(i),
      s = null == n.firstWeekContainsDate ? o : w(n.firstWeekContainsDate),
      u = B(t, e),
      c = new Date(0);
    c.setUTCFullYear(u, 0, s), c.setUTCHours(0, 0, 0, 0);
    var d = j(c, e);
    return d;
  }
  var O = 6048e5;
  function q(t, e) {
    var n = t > 0 ? "-" : "+",
      a = Math.abs(t),
      r = Math.floor(a / 60),
      i = a % 60;
    return 0 === i ? n + String(r) : n + String(r) + e + C(i, 2);
  }
  function F(t, e) {
    return t % 60 == 0 ? (t > 0 ? "-" : "+") + C(Math.abs(t) / 60, 2) : H(t, e);
  }
  function H(t, e) {
    var n = e || "",
      a = t > 0 ? "-" : "+",
      r = Math.abs(t);
    return a + C(Math.floor(r / 60), 2) + n + C(r % 60, 2);
  }
  const I = {
    G: function (t, e, n) {
      var a = t.getUTCFullYear() > 0 ? 1 : 0;
      switch (e) {
        case "G":
        case "GG":
        case "GGG":
          return n.era(a, { width: "abbreviated" });
        case "GGGGG":
          return n.era(a, { width: "narrow" });
        default:
          return n.era(a, { width: "wide" });
      }
    },
    y: function (t, e, n) {
      if ("yo" === e) {
        var a = t.getUTCFullYear(),
          r = a > 0 ? a : 1 - a;
        return n.ordinalNumber(r, { unit: "year" });
      }
      return E(t, e);
    },
    Y: function (t, e, n, a) {
      var r = B(t, a),
        i = r > 0 ? r : 1 - r;
      return "YY" === e
        ? C(i % 100, 2)
        : "Yo" === e
        ? n.ordinalNumber(i, { unit: "year" })
        : C(i, e.length);
    },
    R: function (t, e) {
      return C(U(t), e.length);
    },
    u: function (t, e) {
      return C(t.getUTCFullYear(), e.length);
    },
    Q: function (t, e, n) {
      var a = Math.ceil((t.getUTCMonth() + 1) / 3);
      switch (e) {
        case "Q":
          return String(a);
        case "QQ":
          return C(a, 2);
        case "Qo":
          return n.ordinalNumber(a, { unit: "quarter" });
        case "QQQ":
          return n.quarter(a, { width: "abbreviated", context: "formatting" });
        case "QQQQQ":
          return n.quarter(a, { width: "narrow", context: "formatting" });
        default:
          return n.quarter(a, { width: "wide", context: "formatting" });
      }
    },
    q: function (t, e, n) {
      var a = Math.ceil((t.getUTCMonth() + 1) / 3);
      switch (e) {
        case "q":
          return String(a);
        case "qq":
          return C(a, 2);
        case "qo":
          return n.ordinalNumber(a, { unit: "quarter" });
        case "qqq":
          return n.quarter(a, { width: "abbreviated", context: "standalone" });
        case "qqqqq":
          return n.quarter(a, { width: "narrow", context: "standalone" });
        default:
          return n.quarter(a, { width: "wide", context: "standalone" });
      }
    },
    M: function (t, e, n) {
      var a = t.getUTCMonth();
      switch (e) {
        case "M":
        case "MM":
          return T(t, e);
        case "Mo":
          return n.ordinalNumber(a + 1, { unit: "month" });
        case "MMM":
          return n.month(a, { width: "abbreviated", context: "formatting" });
        case "MMMMM":
          return n.month(a, { width: "narrow", context: "formatting" });
        default:
          return n.month(a, { width: "wide", context: "formatting" });
      }
    },
    L: function (t, e, n) {
      var a = t.getUTCMonth();
      switch (e) {
        case "L":
          return String(a + 1);
        case "LL":
          return C(a + 1, 2);
        case "Lo":
          return n.ordinalNumber(a + 1, { unit: "month" });
        case "LLL":
          return n.month(a, { width: "abbreviated", context: "standalone" });
        case "LLLLL":
          return n.month(a, { width: "narrow", context: "standalone" });
        default:
          return n.month(a, { width: "wide", context: "standalone" });
      }
    },
    w: function (t, e, n, a) {
      var i = (function (t, e) {
        r(1, arguments);
        var n = o(t),
          a = j(n, e).getTime() - Y(n, e).getTime();
        return Math.round(a / O) + 1;
      })(t, a);
      return "wo" === e ? n.ordinalNumber(i, { unit: "week" }) : C(i, e.length);
    },
    I: function (t, e, n) {
      var a = (function (t) {
        r(1, arguments);
        var e = o(t),
          n = P(e).getTime() - A(e).getTime();
        return Math.round(n / W) + 1;
      })(t);
      return "Io" === e ? n.ordinalNumber(a, { unit: "week" }) : C(a, e.length);
    },
    d: function (t, e, n) {
      return "do" === e
        ? n.ordinalNumber(t.getUTCDate(), { unit: "date" })
        : k(t, e);
    },
    D: function (t, e, n) {
      var a = (function (t) {
        r(1, arguments);
        var e = o(t),
          n = e.getTime();
        e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
        var a = e.getTime(),
          i = n - a;
        return Math.floor(i / N) + 1;
      })(t);
      return "Do" === e
        ? n.ordinalNumber(a, { unit: "dayOfYear" })
        : C(a, e.length);
    },
    E: function (t, e, n) {
      var a = t.getUTCDay();
      switch (e) {
        case "E":
        case "EE":
        case "EEE":
          return n.day(a, { width: "abbreviated", context: "formatting" });
        case "EEEEE":
          return n.day(a, { width: "narrow", context: "formatting" });
        case "EEEEEE":
          return n.day(a, { width: "short", context: "formatting" });
        default:
          return n.day(a, { width: "wide", context: "formatting" });
      }
    },
    e: function (t, e, n, a) {
      var r = t.getUTCDay(),
        i = (r - a.weekStartsOn + 8) % 7 || 7;
      switch (e) {
        case "e":
          return String(i);
        case "ee":
          return C(i, 2);
        case "eo":
          return n.ordinalNumber(i, { unit: "day" });
        case "eee":
          return n.day(r, { width: "abbreviated", context: "formatting" });
        case "eeeee":
          return n.day(r, { width: "narrow", context: "formatting" });
        case "eeeeee":
          return n.day(r, { width: "short", context: "formatting" });
        default:
          return n.day(r, { width: "wide", context: "formatting" });
      }
    },
    c: function (t, e, n, a) {
      var r = t.getUTCDay(),
        i = (r - a.weekStartsOn + 8) % 7 || 7;
      switch (e) {
        case "c":
          return String(i);
        case "cc":
          return C(i, e.length);
        case "co":
          return n.ordinalNumber(i, { unit: "day" });
        case "ccc":
          return n.day(r, { width: "abbreviated", context: "standalone" });
        case "ccccc":
          return n.day(r, { width: "narrow", context: "standalone" });
        case "cccccc":
          return n.day(r, { width: "short", context: "standalone" });
        default:
          return n.day(r, { width: "wide", context: "standalone" });
      }
    },
    i: function (t, e, n) {
      var a = t.getUTCDay(),
        r = 0 === a ? 7 : a;
      switch (e) {
        case "i":
          return String(r);
        case "ii":
          return C(r, e.length);
        case "io":
          return n.ordinalNumber(r, { unit: "day" });
        case "iii":
          return n.day(a, { width: "abbreviated", context: "formatting" });
        case "iiiii":
          return n.day(a, { width: "narrow", context: "formatting" });
        case "iiiiii":
          return n.day(a, { width: "short", context: "formatting" });
        default:
          return n.day(a, { width: "wide", context: "formatting" });
      }
    },
    a: function (t, e, n) {
      var a = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
      switch (e) {
        case "a":
        case "aa":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "aaa":
          return n
            .dayPeriod(a, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "aaaaa":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    b: function (t, e, n) {
      var a,
        r = t.getUTCHours();
      switch (
        ((a =
          12 === r ? "noon" : 0 === r ? "midnight" : r / 12 >= 1 ? "pm" : "am"),
        e)
      ) {
        case "b":
        case "bb":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "bbb":
          return n
            .dayPeriod(a, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "bbbbb":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    B: function (t, e, n) {
      var a,
        r = t.getUTCHours();
      switch (
        ((a =
          r >= 17
            ? "evening"
            : r >= 12
            ? "afternoon"
            : r >= 4
            ? "morning"
            : "night"),
        e)
      ) {
        case "B":
        case "BB":
        case "BBB":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "BBBBB":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    h: function (t, e, n) {
      if ("ho" === e) {
        var a = t.getUTCHours() % 12;
        return 0 === a && (a = 12), n.ordinalNumber(a, { unit: "hour" });
      }
      return M(t, e);
    },
    H: function (t, e, n) {
      return "Ho" === e
        ? n.ordinalNumber(t.getUTCHours(), { unit: "hour" })
        : x(t, e);
    },
    K: function (t, e, n) {
      var a = t.getUTCHours() % 12;
      return "Ko" === e ? n.ordinalNumber(a, { unit: "hour" }) : C(a, e.length);
    },
    k: function (t, e, n) {
      var a = t.getUTCHours();
      return (
        0 === a && (a = 24),
        "ko" === e ? n.ordinalNumber(a, { unit: "hour" }) : C(a, e.length)
      );
    },
    m: function (t, e, n) {
      return "mo" === e
        ? n.ordinalNumber(t.getUTCMinutes(), { unit: "minute" })
        : D(t, e);
    },
    s: function (t, e, n) {
      return "so" === e
        ? n.ordinalNumber(t.getUTCSeconds(), { unit: "second" })
        : L(t, e);
    },
    S: function (t, e) {
      return S(t, e);
    },
    X: function (t, e, n, a) {
      var r = (a._originalDate || t).getTimezoneOffset();
      if (0 === r) return "Z";
      switch (e) {
        case "X":
          return F(r);
        case "XXXX":
        case "XX":
          return H(r);
        default:
          return H(r, ":");
      }
    },
    x: function (t, e, n, a) {
      var r = (a._originalDate || t).getTimezoneOffset();
      switch (e) {
        case "x":
          return F(r);
        case "xxxx":
        case "xx":
          return H(r);
        default:
          return H(r, ":");
      }
    },
    O: function (t, e, n, a) {
      var r = (a._originalDate || t).getTimezoneOffset();
      switch (e) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + q(r, ":");
        default:
          return "GMT" + H(r, ":");
      }
    },
    z: function (t, e, n, a) {
      var r = (a._originalDate || t).getTimezoneOffset();
      switch (e) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + q(r, ":");
        default:
          return "GMT" + H(r, ":");
      }
    },
    t: function (t, e, n, a) {
      var r = a._originalDate || t;
      return C(Math.floor(r.getTime() / 1e3), e.length);
    },
    T: function (t, e, n, a) {
      return C((a._originalDate || t).getTime(), e.length);
    },
  };
  function z(t, e) {
    switch (t) {
      case "P":
        return e.date({ width: "short" });
      case "PP":
        return e.date({ width: "medium" });
      case "PPP":
        return e.date({ width: "long" });
      default:
        return e.date({ width: "full" });
    }
  }
  function Q(t, e) {
    switch (t) {
      case "p":
        return e.time({ width: "short" });
      case "pp":
        return e.time({ width: "medium" });
      case "ppp":
        return e.time({ width: "long" });
      default:
        return e.time({ width: "full" });
    }
  }
  var X = {
    p: Q,
    P: function (t, e) {
      var n,
        a = t.match(/(P+)(p+)?/) || [],
        r = a[1],
        i = a[2];
      if (!i) return z(t, e);
      switch (r) {
        case "P":
          n = e.dateTime({ width: "short" });
          break;
        case "PP":
          n = e.dateTime({ width: "medium" });
          break;
        case "PPP":
          n = e.dateTime({ width: "long" });
          break;
        default:
          n = e.dateTime({ width: "full" });
      }
      return n.replace("{{date}}", z(r, e)).replace("{{time}}", Q(i, e));
    },
  };
  const G = X;
  function J(t) {
    var e = new Date(
      Date.UTC(
        t.getFullYear(),
        t.getMonth(),
        t.getDate(),
        t.getHours(),
        t.getMinutes(),
        t.getSeconds(),
        t.getMilliseconds()
      )
    );
    return e.setUTCFullYear(t.getFullYear()), t.getTime() - e.getTime();
  }
  var R = ["D", "DD"],
    $ = ["YY", "YYYY"];
  function _(t) {
    return -1 !== R.indexOf(t);
  }
  function V(t) {
    return -1 !== $.indexOf(t);
  }
  function K(t, e, n) {
    if ("YYYY" === t)
      throw new RangeError(
        "Use `yyyy` instead of `YYYY` (in `"
          .concat(e, "`) for formatting years to the input `")
          .concat(n, "`; see: https://git.io/fxCyr")
      );
    if ("YY" === t)
      throw new RangeError(
        "Use `yy` instead of `YY` (in `"
          .concat(e, "`) for formatting years to the input `")
          .concat(n, "`; see: https://git.io/fxCyr")
      );
    if ("D" === t)
      throw new RangeError(
        "Use `d` instead of `D` (in `"
          .concat(e, "`) for formatting days of the month to the input `")
          .concat(n, "`; see: https://git.io/fxCyr")
      );
    if ("DD" === t)
      throw new RangeError(
        "Use `dd` instead of `DD` (in `"
          .concat(e, "`) for formatting days of the month to the input `")
          .concat(n, "`; see: https://git.io/fxCyr")
      );
  }
  var Z = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    tt = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    et = /^'([^]*?)'?$/,
    nt = /''/g,
    at = /[a-zA-Z]/;
  function rt(t) {
    return t.match(et)[1].replace(nt, "'");
  }
  function it(t) {
    const e = document.createElement("div"),
      n = document.createElement("h2"),
      a = document.createElement("div"),
      r = t.replace(/\s+/g, "").toLowerCase();
    return (
      a.classList.add("taskbar"),
      (n.textContent = t),
      e.classList.add(r, "main"),
      e.appendChild(n),
      e.appendChild(a),
      e.appendChild(ot(t)),
      e
    );
  }
  function ot(a) {
    const i = document.createElement("input");
    return (
      i.setAttribute("type", "button"),
      i.setAttribute("value", "+ Add Task"),
      i.setAttribute("class", "addTaskBtn"),
      i.addEventListener(
        "click",
        function () {
          !(function (a) {
            const i = document.getElementsByClassName("main")[0],
              u = document.getElementsByClassName("addTaskBtn")[0],
              c = document.createElement("div");
            c.classList.add("addTask");
            const d = document.createElement("input"),
              l = document.createElement("input"),
              m = document.createElement("input"),
              h = document.createElement("input");
            d.setAttribute("class", "input"),
              l.setAttribute("class", "date"),
              d.setAttribute("type", "input"),
              l.setAttribute("type", "date"),
              m.setAttribute("type", "button"),
              h.setAttribute("type", "button"),
              d.setAttribute("placeholder", "e.g. Wash dishes"),
              m.setAttribute("value", "Add"),
              h.setAttribute("value", "Cancel"),
              m.addEventListener(
                "click",
                function () {
                  !(function (a) {
                    const i = document.getElementsByClassName("input")[0],
                      u = document.getElementsByClassName("date")[0],
                      c = i.value,
                      d = (function (t, e, n) {
                        r(2, arguments);
                        var a = String(e),
                          i = n || {},
                          u = i.locale || b,
                          c = u.options && u.options.firstWeekContainsDate,
                          d = null == c ? 1 : w(c),
                          l =
                            null == i.firstWeekContainsDate
                              ? d
                              : w(i.firstWeekContainsDate);
                        if (!(l >= 1 && l <= 7))
                          throw new RangeError(
                            "firstWeekContainsDate must be between 1 and 7 inclusively"
                          );
                        var m = u.options && u.options.weekStartsOn,
                          h = null == m ? 0 : w(m),
                          f = null == i.weekStartsOn ? h : w(i.weekStartsOn);
                        if (!(f >= 0 && f <= 6))
                          throw new RangeError(
                            "weekStartsOn must be between 0 and 6 inclusively"
                          );
                        if (!u.localize)
                          throw new RangeError(
                            "locale must contain localize property"
                          );
                        if (!u.formatLong)
                          throw new RangeError(
                            "locale must contain formatLong property"
                          );
                        var g = o(t);
                        if (!s(g)) throw new RangeError("Invalid time value");
                        var p = J(g),
                          v = y(g, p),
                          C = {
                            firstWeekContainsDate: l,
                            weekStartsOn: f,
                            locale: u,
                            _originalDate: g,
                          };
                        return a
                          .match(tt)
                          .map(function (t) {
                            var e = t[0];
                            return "p" === e || "P" === e
                              ? (0, G[e])(t, u.formatLong, C)
                              : t;
                          })
                          .join("")
                          .match(Z)
                          .map(function (n) {
                            if ("''" === n) return "'";
                            var a = n[0];
                            if ("'" === a) return rt(n);
                            var r = I[a];
                            if (r)
                              return (
                                !i.useAdditionalWeekYearTokens &&
                                  V(n) &&
                                  K(n, e, t),
                                !i.useAdditionalDayOfYearTokens &&
                                  _(n) &&
                                  K(n, e, t),
                                r(v, n, u.localize, C)
                              );
                            if (a.match(at))
                              throw new RangeError(
                                "Format string contains an unescaped latin alphabet character `" +
                                  a +
                                  "`"
                              );
                            return n;
                          })
                          .join("");
                      })(new Date(u.value), "dd/MM/yyyy"),
                      l = new e(
                        c,
                        d,
                        !1,
                        (c + d).replace(/\s+/g, "").toLowerCase(),
                        a
                      );
                    var m;
                    c &&
                      u &&
                      ((m = l),
                      t.push(m),
                      localStorage.setItem("todoList", JSON.stringify(t)),
                      n(t, a),
                      st(a));
                  })(a);
                },
                !1
              ),
              h.addEventListener(
                "click",
                function () {
                  st(a);
                },
                !1
              ),
              c.appendChild(d),
              c.appendChild(l),
              c.appendChild(m),
              c.appendChild(h),
              i.replaceChild(c, u);
          })(a);
        },
        !1
      ),
      i
    );
  }
  function st(t) {
    const e = document.getElementsByClassName("main")[0],
      n = document.querySelector(".addTask");
    console.log(n), e.replaceChild(ot(t), n);
  }
  const ut = function (e) {
    const a = document.getElementsByClassName("body")[0],
      r = document.getElementsByClassName("main")[0];
    r ? a.replaceChild(it(e), r) : a.appendChild(it(e)), n(t, e);
  };
  function ct() {
    const t = document.createElement("div"),
      e = document.createElement("h2"),
      n = document.createElement("div");
    return (
      t.classList.add("today", "main"),
      n.classList.add("taskbar"),
      (e.textContent = "Today"),
      t.appendChild(e),
      t.appendChild(n),
      t
    );
  }
  function dt(t) {
    const e = new Date();
    return `${e.getDate()}/${e.getMonth() + 1}/${e.getFullYear()}` == t.dueDate;
  }
  const lt = function () {
    const e = document.getElementsByClassName("body")[0],
      a = document.getElementsByClassName("main")[0];
    a ? e.replaceChild(ct(), a) : e.appendChild(ct()), n(t.filter(dt), "");
  };
  function mt(t, e) {
    r(1, arguments);
    var n = e || {},
      a = n.locale,
      i = a && a.options && a.options.weekStartsOn,
      s = null == i ? 0 : w(i),
      u = null == n.weekStartsOn ? s : w(n.weekStartsOn);
    if (!(u >= 0 && u <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var c = o(t),
      d = c.getDay(),
      l = (d < u ? 7 : 0) + d - u;
    return c.setDate(c.getDate() - l), c.setHours(0, 0, 0, 0), c;
  }
  function ht() {
    const t = document.createElement("div"),
      e = document.createElement("h2"),
      n = document.createElement("div");
    return (
      t.classList.add("upcoming", "main"),
      n.classList.add("taskbar"),
      (e.textContent = "This Week"),
      t.appendChild(e),
      t.appendChild(n),
      t
    );
  }
  function ft(t) {
    const e = new Date(),
      n = t.dueDate.split("/")[0],
      a = t.dueDate.split("/")[1],
      i = t.dueDate.split("/")[2];
    return (function (t, e, n) {
      r(2, arguments);
      var a = mt(t, n),
        i = mt(e, n);
      return a.getTime() === i.getTime();
    })(e, new Date(i, a - 1, n));
  }
  const gt = function () {
      const e = document.getElementsByClassName("body")[0],
        a = document.getElementsByClassName("main")[0];
      a ? e.replaceChild(ht(), a) : e.appendChild(ht()), n(t.filter(ft), "");
    },
    pt = JSON.parse(localStorage.getItem("projectsList")) || [];
  function bt() {
    const t = document.getElementsByClassName("projects")[0],
      e = document.getElementsByClassName("addProjects")[0],
      n = document.createElement("div");
    n.classList.add("projectInput");
    const a = document.createElement("input");
    a.id = "projectName";
    const r = document.createElement("input"),
      i = document.createElement("input");
    a.classList.add("remove-from-change-colour"),
      r.classList.add("remove-from-change-colour"),
      i.classList.add("remove-from-change-colour"),
      a.setAttribute("type", "input"),
      r.setAttribute("type", "button"),
      i.setAttribute("type", "button"),
      a.setAttribute("placeholder", "e.g. School"),
      r.setAttribute("value", "Add"),
      i.setAttribute("value", "Cancel"),
      a.setAttribute("maxlength", 8),
      r.addEventListener("click", wt, !1),
      i.addEventListener("click", vt, !1),
      n.appendChild(a),
      n.appendChild(r),
      n.appendChild(i),
      t.replaceChild(n, e);
  }
  function wt() {
    const t = document.getElementsByClassName("projects")[0],
      e = document.getElementsByClassName("projectInput")[0],
      n = document.createElement("div"),
      a = document.getElementById("projectName").value,
      r = a.replace(/\s+/g, "").toLowerCase(),
      i = Et();
    pt.push(a),
      localStorage.setItem("projectsList", JSON.stringify(pt)),
      a &&
        (n.classList.add(r, "to-highlight", "project"),
        (n.textContent = `- ${a}`),
        n.addEventListener("click", Ct, !1),
        n.addEventListener(
          "click",
          function () {
            ut(a);
          },
          !1
        ),
        i.classList.add(r),
        n.appendChild(i),
        t.insertBefore(n, e),
        vt());
  }
  function vt() {
    const t = document.getElementsByClassName("projects")[0],
      e = document.getElementsByClassName("projectInput")[0];
    t.replaceChild(yt(), e);
  }
  function yt() {
    const t = document.createElement("input");
    return (
      t.classList.add("addProjects", "to-highlight"),
      t.setAttribute("type", "button"),
      t.setAttribute("value", "+ Add Project"),
      t.addEventListener("click", bt, !1),
      t
    );
  }
  function Ct(t) {
    const e = document.querySelectorAll(".to-highlight");
    for (const t of e) t.style.background = "#bbbbbb";
    t.target.style.background = "#aaaaaa";
  }
  function Et() {
    const t = document.createElement("input");
    return (
      t.classList.add("remove-project"),
      t.setAttribute("type", "button"),
      t.setAttribute("value", "X"),
      t.addEventListener("click", Tt, !1),
      t
    );
  }
  function Tt(t) {
    const e = document.getElementsByClassName("projects")[0],
      n = t.target.classList[1],
      a = document.getElementsByClassName(n)[0];
    console.log(a), e.removeChild(a);
    for (let t = 0; t < pt.length; t++)
      if (pt[t].replace(/\s+/g, "").toLowerCase() === n) {
        pt.splice(t, 1),
          localStorage.setItem("projectsList", JSON.stringify(pt));
        break;
      }
  }
  function kt(t) {
    const e = document.querySelectorAll(".to-highlight");
    for (const t of e) t.style.background = "#bbbbbb";
    t.target.style.background = "#aaaaaa";
  }
  !(function () {
    const t = document.getElementById("content"),
      e = document.getElementsByClassName("body")[0];
    t.insertBefore(
      (function () {
        const t = document.createElement("div"),
          e = document.createElement("h1");
        return (
          t.classList.add("header"),
          (e.textContent = "To-do List"),
          t.appendChild(e),
          t
        );
      })(),
      e
    ),
      e.appendChild(
        (function () {
          const t = document.createElement("div"),
            e = document.createElement("input"),
            n = document.createElement("input"),
            a = document.createElement("input"),
            r = document.createElement("h2"),
            i = document.createElement("div");
          return (
            t.classList.add("sidebar"),
            i.classList.add("projects"),
            e.classList.add("to-highlight"),
            n.classList.add("to-highlight"),
            a.classList.add("to-highlight"),
            e.setAttribute("type", "button"),
            n.setAttribute("type", "button"),
            a.setAttribute("type", "button"),
            e.setAttribute("value", "- Inbox"),
            n.setAttribute("value", "- Today"),
            a.setAttribute("value", "- This Week"),
            (e.style.background = "#aaaaaa"),
            (r.textContent = "Projects"),
            e.addEventListener(
              "click",
              function () {
                ut("Inbox");
              },
              !1
            ),
            n.addEventListener("click", lt, !1),
            a.addEventListener("click", gt, !1),
            e.addEventListener("click", kt, !1),
            a.addEventListener("click", kt, !1),
            n.addEventListener("click", kt, !1),
            i.appendChild(r),
            i.appendChild(yt()),
            t.appendChild(e),
            t.appendChild(n),
            t.appendChild(a),
            t.appendChild(i),
            t
          );
        })()
      ),
      t.appendChild(
        (function () {
          const t = document.createElement("div");
          return (
            t.classList.add("footer"),
            (t.textContent = "Made by SquishyFishy69 © 2021"),
            t
          );
        })()
      ),
      ut("Inbox"),
      (function () {
        const t = document.getElementsByClassName("projects")[0],
          e = document.getElementsByClassName("addProjects")[0];
        for (const n of pt) {
          const a = n.replace(/\s+/g, "").toLowerCase(),
            r = document.createElement("div"),
            i = Et();
          r.classList.add(a, "to-highlight", "project"),
            (r.textContent = `- ${n}`),
            r.addEventListener("click", Ct, !1),
            r.addEventListener(
              "click",
              function () {
                ut(n);
              },
              !1
            ),
            i.classList.add(a),
            r.appendChild(i),
            t.insertBefore(r, e);
        }
      })();
  })();
})();
