!(function(e) {
  var n = {};
  function o(i) {
    if (n[i]) return n[i].exports;
    var t = (n[i] = { i: i, l: !1, exports: {} });
    return e[i].call(t.exports, t, t.exports, o), (t.l = !0), t.exports;
  }
  (o.m = e),
    (o.c = n),
    (o.d = function(e, n, i) {
      o.o(e, n) ||
        Object.defineProperty(e, n, {
          configurable: !1,
          enumerable: !0,
          get: i
        });
    }),
    (o.r = function(e) {
      Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return o.d(n, "a", n), n;
    }),
    (o.o = function(e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (o.p = ""),
    o((o.s = 6));
})([
  function(e, n, o) {
    "use strict";
    var i,
      t =
        (this && this.__awaiter) ||
        function(e, n, o, i) {
          return new (o || (o = Promise))(function(t, s) {
            function a(e) {
              try {
                c(i.next(e));
              } catch (e) {
                s(e);
              }
            }
            function r(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                s(e);
              }
            }
            function c(e) {
              e.done
                ? t(e.value)
                : new o(function(n) {
                    n(e.value);
                  }).then(a, r);
            }
            c((i = i.apply(e, n || [])).next());
          });
        },
      s =
        (this && this.__generator) ||
        function(e, n) {
          var o,
            i,
            t,
            s,
            a = {
              label: 0,
              sent: function() {
                if (1 & t[0]) throw t[1];
                return t[1];
              },
              trys: [],
              ops: []
            };
          return (
            (s = { next: r(0), throw: r(1), return: r(2) }),
            "function" == typeof Symbol &&
              (s[Symbol.iterator] = function() {
                return this;
              }),
            s
          );
          function r(s) {
            return function(r) {
              return (function(s) {
                if (o) throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (
                      ((o = 1),
                      i &&
                        (t =
                          i[2 & s[0] ? "return" : s[0] ? "throw" : "next"]) &&
                        !(t = t.call(i, s[1])).done)
                    )
                      return t;
                    switch (((i = 0), t && (s = [0, t.value]), s[0])) {
                      case 0:
                      case 1:
                        t = s;
                        break;
                      case 4:
                        return a.label++, { value: s[1], done: !1 };
                      case 5:
                        a.label++, (i = s[1]), (s = [0]);
                        continue;
                      case 7:
                        (s = a.ops.pop()), a.trys.pop();
                        continue;
                      default:
                        if (
                          !(t = (t = a.trys).length > 0 && t[t.length - 1]) &&
                          (6 === s[0] || 2 === s[0])
                        ) {
                          a = 0;
                          continue;
                        }
                        if (
                          3 === s[0] &&
                          (!t || (s[1] > t[0] && s[1] < t[3]))
                        ) {
                          a.label = s[1];
                          break;
                        }
                        if (6 === s[0] && a.label < t[1]) {
                          (a.label = t[1]), (t = s);
                          break;
                        }
                        if (t && a.label < t[2]) {
                          (a.label = t[2]), a.ops.push(s);
                          break;
                        }
                        t[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    s = n.call(e, a);
                  } catch (e) {
                    (s = [6, e]), (i = 0);
                  } finally {
                    o = t = 0;
                  }
                if (5 & s[0]) throw s[1];
                return { value: s[0] ? s[1] : void 0, done: !0 };
              })([s, r]);
            };
          }
        },
      a = this;
    (n.__esModule = !0),
      (n.fetchEmojis = function() {
        return t(a, void 0, void 0, function() {
          var e = this;
          return s(this, function(n) {
            return (
              i ||
                (i = new Promise(function(n, o) {
                  return t(e, void 0, void 0, function() {
                    var e, i;
                    return s(this, function(t) {
                      switch (t.label) {
                        case 0:
                          return (
                            t.trys.push([0, 2, , 3]),
                            [
                              4,
                              fetch(
                                "https://cdn.emojidex.com/static/utf_emoji.json"
                              )
                            ]
                          );
                        case 1:
                          return (e = t.sent()), n(e.json()), [3, 3];
                        case 2:
                          return (i = t.sent()), o(i), [3, 3];
                        case 3:
                          return [2];
                      }
                    });
                  });
                })),
              [2, i]
            );
          });
        });
      });
    var r = function(e, n) {
      return e.code === n;
    };
    (n.getTheMoji = function(e) {
      return e.moji;
    }),
      (n.getEmoji = function(e) {
        return t(this, void 0, void 0, function() {
          var o, i;
          return s(this, function(t) {
            switch (t.label) {
              case 0:
                return [4, n.fetchEmojis()];
              case 1:
                return (
                  (o = t.sent()),
                  (i = o.find(function(n) {
                    return r(n, e);
                  }))
                    ? [2, n.getTheMoji(i)]
                    : [2, ""]
                );
            }
          });
        });
      }),
      (n.allYourBase = function(e) {
        return t(a, void 0, void 0, function() {
          return s(this, function(o) {
            switch (o.label) {
              case 0:
                return [4, n.fetchEmojis()];
              case 1:
                return [
                  2,
                  o
                    .sent()
                    .filter(function(n) {
                      return n.base === e;
                    })
                    .reduce(function(e, o) {
                      return e + n.getTheMoji(o);
                    }, "")
                ];
            }
          });
        });
      }),
      (n.insertEmoji = function(e) {
        document.getElementById("heading").innerHTML = e;
      });
  },
  function(e, n, o) {
    "use strict";
    var i =
        (this && this.__awaiter) ||
        function(e, n, o, i) {
          return new (o || (o = Promise))(function(t, s) {
            function a(e) {
              try {
                c(i.next(e));
              } catch (e) {
                s(e);
              }
            }
            function r(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                s(e);
              }
            }
            function c(e) {
              e.done
                ? t(e.value)
                : new o(function(n) {
                    n(e.value);
                  }).then(a, r);
            }
            c((i = i.apply(e, n || [])).next());
          });
        },
      t =
        (this && this.__generator) ||
        function(e, n) {
          var o,
            i,
            t,
            s,
            a = {
              label: 0,
              sent: function() {
                if (1 & t[0]) throw t[1];
                return t[1];
              },
              trys: [],
              ops: []
            };
          return (
            (s = { next: r(0), throw: r(1), return: r(2) }),
            "function" == typeof Symbol &&
              (s[Symbol.iterator] = function() {
                return this;
              }),
            s
          );
          function r(s) {
            return function(r) {
              return (function(s) {
                if (o) throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (
                      ((o = 1),
                      i &&
                        (t =
                          i[2 & s[0] ? "return" : s[0] ? "throw" : "next"]) &&
                        !(t = t.call(i, s[1])).done)
                    )
                      return t;
                    switch (((i = 0), t && (s = [0, t.value]), s[0])) {
                      case 0:
                      case 1:
                        t = s;
                        break;
                      case 4:
                        return a.label++, { value: s[1], done: !1 };
                      case 5:
                        a.label++, (i = s[1]), (s = [0]);
                        continue;
                      case 7:
                        (s = a.ops.pop()), a.trys.pop();
                        continue;
                      default:
                        if (
                          !(t = (t = a.trys).length > 0 && t[t.length - 1]) &&
                          (6 === s[0] || 2 === s[0])
                        ) {
                          a = 0;
                          continue;
                        }
                        if (
                          3 === s[0] &&
                          (!t || (s[1] > t[0] && s[1] < t[3]))
                        ) {
                          a.label = s[1];
                          break;
                        }
                        if (6 === s[0] && a.label < t[1]) {
                          (a.label = t[1]), (t = s);
                          break;
                        }
                        if (t && a.label < t[2]) {
                          (a.label = t[2]), a.ops.push(s);
                          break;
                        }
                        t[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    s = n.call(e, a);
                  } catch (e) {
                    (s = [6, e]), (i = 0);
                  } finally {
                    o = t = 0;
                  }
                if (5 & s[0]) throw s[1];
                return { value: s[0] ? s[1] : void 0, done: !0 };
              })([s, r]);
            };
          }
        },
      s = this;
    n.__esModule = !0;
    var a = o(0);
    (n.defaultHeading = "I don't know how I feel!"),
      (n.labelText = "Select your favourite emoji"),
      (n.emojitronValues = [
        "sign of the horns",
        "guardsman",
        "joy",
        "raised hand with part between middle and ring fingers"
      ]),
      (n.setHeadingText = function(e) {
        document.getElementById("heading").textContent = e;
      }),
      (n.createEmojiOptionElements = function(e) {
        return i(s, void 0, void 0, function() {
          var n;
          return t(this, function(o) {
            switch (o.label) {
              case 0:
                return [4, Promise.all(e.map(a.getEmoji))];
              case 1:
                return (
                  (n = o.sent()),
                  [
                    2,
                    "<option>Select an emoji</option>\n    " +
                      n
                        .map(function(e) {
                          return '<option value="' + e + '">' + e + "</option>";
                        })
                        .join()
                  ]
                );
            }
          });
        });
      }),
      (n.createEmojiSelect = function(e) {
        return i(s, void 0, void 0, function() {
          var o, i;
          return t(this, function(t) {
            switch (t.label) {
              case 0:
                return (
                  ((o = document.createElement("select")).id = "emoji-select"),
                  (i = o),
                  [4, n.createEmojiOptionElements(e)]
                );
              case 1:
                return (i.innerHTML = t.sent()), [2, o];
            }
          });
        });
      }),
      (n.createLabel = function(e, n) {
        var o = document.createElement("label");
        return o.setAttribute("for", e), (o.textContent = n), o;
      }),
      (n.handleFocus = function(e) {
        e.currentTarget.classList.toggle("focussed");
      }),
      (n.setupEmojitronEvents = function(e) {
        (e.onchange = function() {
          n.setHeadingText(e.value), e.blur();
        }),
          e.addEventListener("focus", n.handleFocus, !1),
          e.addEventListener("blur", n.handleFocus, !1);
      }),
      (n.setupEmojitron = function() {
        return i(s, void 0, void 0, function() {
          var e, o, i, s;
          return t(this, function(t) {
            switch (t.label) {
              case 0:
                return (
                  ((e = document.createElement("form")).id = "emojitron"),
                  (e.innerHTML = "<div class='uninitialised'></div>"),
                  e.children[0].classList.add("input-wrap", "input-select"),
                  (o = e.querySelector("div")).classList.remove(
                    "uninitialised"
                  ),
                  [4, n.createEmojiSelect(n.emojitronValues)]
                );
              case 1:
                return (
                  (i = t.sent()),
                  (s = n.createLabel(i.id, n.labelText)),
                  o.append(i),
                  o.prepend(s),
                  document.body.append(e),
                  n.setupEmojitronEvents(i),
                  [2]
                );
            }
          });
        });
      }),
      (n.run = function() {
        return i(s, void 0, void 0, function() {
          return t(this, function(e) {
            return [2, n.setupEmojitron()];
          });
        });
      }),
      (n.default = n.run);
  },
  function(e, n, o) {
    "use strict";
    var i =
        (this && this.__awaiter) ||
        function(e, n, o, i) {
          return new (o || (o = Promise))(function(t, s) {
            function a(e) {
              try {
                c(i.next(e));
              } catch (e) {
                s(e);
              }
            }
            function r(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                s(e);
              }
            }
            function c(e) {
              e.done
                ? t(e.value)
                : new o(function(n) {
                    n(e.value);
                  }).then(a, r);
            }
            c((i = i.apply(e, n || [])).next());
          });
        },
      t =
        (this && this.__generator) ||
        function(e, n) {
          var o,
            i,
            t,
            s,
            a = {
              label: 0,
              sent: function() {
                if (1 & t[0]) throw t[1];
                return t[1];
              },
              trys: [],
              ops: []
            };
          return (
            (s = { next: r(0), throw: r(1), return: r(2) }),
            "function" == typeof Symbol &&
              (s[Symbol.iterator] = function() {
                return this;
              }),
            s
          );
          function r(s) {
            return function(r) {
              return (function(s) {
                if (o) throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (
                      ((o = 1),
                      i &&
                        (t =
                          i[2 & s[0] ? "return" : s[0] ? "throw" : "next"]) &&
                        !(t = t.call(i, s[1])).done)
                    )
                      return t;
                    switch (((i = 0), t && (s = [0, t.value]), s[0])) {
                      case 0:
                      case 1:
                        t = s;
                        break;
                      case 4:
                        return a.label++, { value: s[1], done: !1 };
                      case 5:
                        a.label++, (i = s[1]), (s = [0]);
                        continue;
                      case 7:
                        (s = a.ops.pop()), a.trys.pop();
                        continue;
                      default:
                        if (
                          !(t = (t = a.trys).length > 0 && t[t.length - 1]) &&
                          (6 === s[0] || 2 === s[0])
                        ) {
                          a = 0;
                          continue;
                        }
                        if (
                          3 === s[0] &&
                          (!t || (s[1] > t[0] && s[1] < t[3]))
                        ) {
                          a.label = s[1];
                          break;
                        }
                        if (6 === s[0] && a.label < t[1]) {
                          (a.label = t[1]), (t = s);
                          break;
                        }
                        if (t && a.label < t[2]) {
                          (a.label = t[2]), a.ops.push(s);
                          break;
                        }
                        t[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    s = n.call(e, a);
                  } catch (e) {
                    (s = [6, e]), (i = 0);
                  } finally {
                    o = t = 0;
                  }
                if (5 & s[0]) throw s[1];
                return { value: s[0] ? s[1] : void 0, done: !0 };
              })([s, r]);
            };
          }
        };
    n.__esModule = !0;
    var s = o(0);
    n.default = function() {
      return i(this, void 0, void 0, function() {
        var e;
        return t(this, function(n) {
          switch (n.label) {
            case 0:
              return (e = s.insertEmoji), [4, s.allYourBase("guardsman")];
            case 1:
              return e.apply(void 0, [n.sent()]), [2];
          }
        });
      });
    };
  },
  function(e, n, o) {
    "use strict";
    var i =
        (this && this.__awaiter) ||
        function(e, n, o, i) {
          return new (o || (o = Promise))(function(t, s) {
            function a(e) {
              try {
                c(i.next(e));
              } catch (e) {
                s(e);
              }
            }
            function r(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                s(e);
              }
            }
            function c(e) {
              e.done
                ? t(e.value)
                : new o(function(n) {
                    n(e.value);
                  }).then(a, r);
            }
            c((i = i.apply(e, n || [])).next());
          });
        },
      t =
        (this && this.__generator) ||
        function(e, n) {
          var o,
            i,
            t,
            s,
            a = {
              label: 0,
              sent: function() {
                if (1 & t[0]) throw t[1];
                return t[1];
              },
              trys: [],
              ops: []
            };
          return (
            (s = { next: r(0), throw: r(1), return: r(2) }),
            "function" == typeof Symbol &&
              (s[Symbol.iterator] = function() {
                return this;
              }),
            s
          );
          function r(s) {
            return function(r) {
              return (function(s) {
                if (o) throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (
                      ((o = 1),
                      i &&
                        (t =
                          i[2 & s[0] ? "return" : s[0] ? "throw" : "next"]) &&
                        !(t = t.call(i, s[1])).done)
                    )
                      return t;
                    switch (((i = 0), t && (s = [0, t.value]), s[0])) {
                      case 0:
                      case 1:
                        t = s;
                        break;
                      case 4:
                        return a.label++, { value: s[1], done: !1 };
                      case 5:
                        a.label++, (i = s[1]), (s = [0]);
                        continue;
                      case 7:
                        (s = a.ops.pop()), a.trys.pop();
                        continue;
                      default:
                        if (
                          !(t = (t = a.trys).length > 0 && t[t.length - 1]) &&
                          (6 === s[0] || 2 === s[0])
                        ) {
                          a = 0;
                          continue;
                        }
                        if (
                          3 === s[0] &&
                          (!t || (s[1] > t[0] && s[1] < t[3]))
                        ) {
                          a.label = s[1];
                          break;
                        }
                        if (6 === s[0] && a.label < t[1]) {
                          (a.label = t[1]), (t = s);
                          break;
                        }
                        if (t && a.label < t[2]) {
                          (a.label = t[2]), a.ops.push(s);
                          break;
                        }
                        t[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    s = n.call(e, a);
                  } catch (e) {
                    (s = [6, e]), (i = 0);
                  } finally {
                    o = t = 0;
                  }
                if (5 & s[0]) throw s[1];
                return { value: s[0] ? s[1] : void 0, done: !0 };
              })([s, r]);
            };
          }
        };
    n.__esModule = !0;
    var s = o(0);
    n.default = function() {
      return i(this, void 0, void 0, function() {
        var e, n;
        return t(this, function(o) {
          switch (o.label) {
            case 0:
              return (
                (n = (e = console).log), [4, s.allYourBase("sign_of_the_horns")]
              );
            case 1:
              return n.apply(e, [o.sent()]), [2];
          }
        });
      });
    };
  },
  function(e, n, o) {
    "use strict";
    (n.__esModule = !0),
      (n.default = [
        {
          code: "ski",
          moji: "🎿",
          unicode: "1f3bf",
          category: "objects",
          tags: [],
          link: null,
          base: "ski",
          variants: ["ski"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "heart eyes cat",
          moji: "😻",
          unicode: "1f63b",
          category: "faces",
          tags: [],
          link: null,
          base: "heart_eyes_cat",
          variants: ["heart_eyes_cat"],
          score: 17,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "crying cat face",
          moji: "😿",
          unicode: "1f63f",
          category: "faces",
          tags: [],
          link: null,
          base: "crying_cat_face",
          variants: ["crying_cat_face"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "raising hand",
          moji: "🙋",
          unicode: "1f64b",
          category: "gestures",
          tags: [],
          link: null,
          base: "raising_hand",
          variants: [
            "raising_hand(wh)",
            "raising_hand(p)",
            "raising_hand(ye)",
            "raising_hand(br)",
            "raising_hand(bk)",
            "raising_hand"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "raised hands",
          moji: "🙌",
          unicode: "1f64c",
          category: "gestures",
          tags: [],
          link: null,
          base: "raised_hands",
          variants: [
            "raised_hands(wh)",
            "raised_hands(p)",
            "raised_hands(ye)",
            "raised_hands(br)",
            "raised_hands(bk)",
            "raised_hands"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "helicopter",
          moji: "🚁",
          unicode: "1f681",
          category: "transportation",
          tags: [],
          link: null,
          base: "helicopter",
          variants: ["helicopter"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "runner",
          moji: "🏃",
          unicode: "1f3c3",
          category: "people",
          tags: [],
          link: null,
          base: "runner",
          variants: [
            "runner(wh)",
            "runner(ye)",
            "runner(br)",
            "runner(bk)",
            "runner",
            "runner(p)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "label",
          moji: "🏷",
          unicode: "1f3f7",
          category: "objects",
          tags: [],
          link: null,
          base: "label",
          variants: ["label"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "nose",
          moji: "👃",
          unicode: "1f443",
          category: "people",
          tags: [],
          link: null,
          base: "nose",
          variants: [
            "nose",
            "nose(wh)",
            "nose(ye)",
            "nose(br)",
            "nose(bk)",
            "nose(p)"
          ],
          score: 1,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "lips",
          moji: "🗢",
          unicode: "1f5e2",
          category: "people",
          tags: [],
          link: null,
          base: "lips",
          variants: ["lips"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "crown",
          moji: "👑",
          unicode: "1f451",
          category: "objects",
          tags: [],
          link: null,
          base: "crown",
          variants: ["crown"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "shirt",
          moji: "👕",
          unicode: "1f455",
          category: "objects",
          tags: [],
          link: null,
          base: "shirt",
          variants: ["shirt"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "jeans",
          moji: "👖",
          unicode: "1f456",
          category: "objects",
          tags: [],
          link: null,
          base: "jeans",
          variants: ["jeans"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "dress",
          moji: "👗",
          unicode: "1f457",
          category: "objects",
          tags: [],
          link: null,
          base: "dress",
          variants: ["dress"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "purse",
          moji: "👛",
          unicode: "1f45b",
          category: "objects",
          tags: [],
          link: null,
          base: "purse",
          variants: ["purse"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "pouch",
          moji: "👝",
          unicode: "1f45d",
          category: "objects",
          tags: [],
          link: null,
          base: "pouch",
          variants: ["pouch"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "boot",
          moji: "👢",
          unicode: "1f462",
          category: "objects",
          tags: [],
          link: null,
          base: "boot",
          variants: ["boot"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "boy",
          moji: "👦",
          unicode: "1f466",
          category: "people",
          tags: [],
          link: null,
          base: "boy",
          variants: [
            "boy(wh)",
            "boy(p)",
            "boy(ye)",
            "boy(br)",
            "boy(bk)",
            "boy"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "girl",
          moji: "👧",
          unicode: "1f467",
          category: "people",
          tags: [],
          link: null,
          base: "girl",
          variants: [
            "girl(wh)",
            "girl(p)",
            "girl(ye)",
            "girl(br)",
            "girl(bk)",
            "girl"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "baby",
          moji: "👶",
          unicode: "1f476",
          category: "people",
          tags: [],
          link: null,
          base: "baby",
          variants: [
            "baby(wh)",
            "baby(p)",
            "baby(ye)",
            "baby(br)",
            "baby(bk)",
            "baby"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "ghost",
          moji: "👻",
          unicode: "1f47b",
          category: "people",
          tags: [],
          link: null,
          base: "ghost",
          variants: ["ghost"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "angel",
          moji: "👼",
          unicode: "1f47c",
          category: "people",
          tags: [],
          link: null,
          base: "angel",
          variants: [
            "angel(wh)",
            "angel(p)",
            "angel(ye)",
            "angel(br)",
            "angel(bk)",
            "angel"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "alien",
          moji: "👽",
          unicode: "1f47d",
          category: "people",
          tags: [],
          link: null,
          base: "alien",
          variants: ["alien"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "skull",
          moji: "💀",
          unicode: "1f480",
          category: "people",
          tags: [],
          link: null,
          base: "skull",
          variants: ["skull"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "pill",
          moji: "💊",
          unicode: "1f48a",
          category: "objects",
          tags: [],
          link: null,
          base: "pill",
          variants: ["pill"],
          score: 116,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "ring",
          moji: "💍",
          unicode: "1f48d",
          category: "objects",
          tags: [],
          link: null,
          base: "ring",
          variants: ["ring"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "gem",
          moji: "💎",
          unicode: "1f48e",
          category: "objects",
          tags: [],
          link: null,
          base: "gem",
          variants: ["gem(gr)", "gem(bl)", "gem"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "yen",
          moji: "💴",
          unicode: "1f4b4",
          category: "objects",
          tags: [],
          link: null,
          base: "yen",
          variants: ["yen"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "euro",
          moji: "💶",
          unicode: "1f4b6",
          category: "objects",
          tags: [],
          link: null,
          base: "euro",
          variants: ["euro"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "pound",
          moji: "💷",
          unicode: "1f4b7",
          category: "objects",
          tags: [],
          link: null,
          base: "pound",
          variants: ["pound"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "seat",
          moji: "💺",
          unicode: "1f4ba",
          category: "objects",
          tags: [],
          link: null,
          base: "seat",
          variants: ["seat"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "dvd",
          moji: "📀",
          unicode: "1f4c0",
          category: "objects",
          tags: [],
          link: null,
          base: "dvd",
          variants: ["dvd"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "date",
          moji: "📅",
          unicode: "1f4c5",
          category: "objects",
          tags: [],
          link: null,
          base: "date",
          variants: ["date"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "notebook with decorative cover",
          moji: "📔",
          unicode: "1f4d4",
          category: "objects",
          tags: [],
          link: null,
          base: "notebook_with_decorative_cover",
          variants: ["notebook_with_decorative_cover"],
          score: 1,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "book",
          moji: "📖",
          unicode: "1f4d6",
          category: "objects",
          tags: [],
          link: null,
          base: "book",
          variants: ["book"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "books",
          moji: "📚",
          unicode: "1f4da",
          category: "objects",
          tags: [],
          link: null,
          base: "books",
          variants: ["books"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "pager",
          moji: "📟",
          unicode: "1f4df",
          category: "objects",
          tags: [],
          link: null,
          base: "pager",
          variants: ["pager"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "fax",
          moji: "📠",
          unicode: "1f4e0",
          category: "objects",
          tags: [],
          link: null,
          base: "fax",
          variants: ["fax"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "mega",
          moji: "📣",
          unicode: "1f4e3",
          category: "objects",
          tags: [],
          link: null,
          base: "mega",
          variants: ["mega"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "radio",
          moji: "📻",
          unicode: "1f4fb",
          category: "objects",
          tags: [],
          link: null,
          base: "radio",
          variants: ["radio"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "vhs",
          moji: "📼",
          unicode: "1f4fc",
          category: "objects",
          tags: [],
          link: null,
          base: "vhs",
          variants: ["vhs"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "key",
          moji: "🔑",
          unicode: "1f511",
          category: "objects",
          tags: [],
          link: null,
          base: "key",
          variants: ["key"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "lock",
          moji: "🔒",
          unicode: "1f512",
          category: "objects",
          tags: [],
          link: null,
          base: "lock",
          variants: ["lock"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "bell",
          moji: "🔔",
          unicode: "1f514",
          category: "objects",
          tags: [],
          link: null,
          base: "bell",
          variants: ["bell"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "hole",
          moji: "🕳",
          unicode: "1f573",
          category: "objects",
          tags: [],
          link: null,
          base: "hole",
          variants: ["hole"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "black hard shell floppy disk",
          moji: "🖪",
          unicode: "1f5aa",
          category: "objects",
          tags: [],
          link: null,
          base: "black_hard_shell_floppy_disk",
          variants: ["black_hard_shell_floppy_disk"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "white hard shell floppy disk",
          moji: "🖫",
          unicode: "1f5ab",
          category: "objects",
          tags: [],
          link: null,
          base: "white_hard_shell_floppy_disk",
          variants: ["white_hard_shell_floppy_disk"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "document with text and picture",
          moji: "🖺",
          unicode: "1f5ba",
          category: "objects",
          tags: [],
          link: null,
          base: "document_with_text_and_picture",
          variants: ["document_with_text_and_picture"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "note",
          moji: "🗈",
          unicode: "1f5c8",
          category: "objects",
          tags: [],
          link: null,
          base: "note",
          variants: ["note"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "page",
          moji: "🗏",
          unicode: "1f5cf",
          category: "objects",
          tags: [],
          link: null,
          base: "page",
          variants: ["page"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "pages",
          moji: "🗐",
          unicode: "1f5d0",
          category: "objects",
          tags: [],
          link: null,
          base: "pages",
          variants: ["pages"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "moyai",
          moji: "🗿",
          unicode: "1f5ff",
          category: "objects",
          tags: [],
          link: null,
          base: "moyai",
          variants: ["moyai"],
          score: 117,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "grin",
          moji: "😁",
          unicode: "1f601",
          category: "faces",
          tags: [],
          link: null,
          base: "grin",
          variants: [
            "grin(p)",
            "grin(smiley)",
            "grin(wh)",
            "grin(dumpling)",
            "grin",
            "grin(ye)",
            "grin(br)",
            "grin(bk)",
            "grin(poop)",
            "grin(slime)",
            "grin(pudding)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "smiley",
          moji: "😃",
          unicode: "1f603",
          category: "faces",
          tags: [],
          link: null,
          base: "smiley",
          variants: [
            "smiley(smiley)",
            "smiley(wh)",
            "smiley(ye)",
            "smiley(br)",
            "smiley",
            "smiley(p)",
            "smiley(bk)",
            "smiley(poop)",
            "smiley(slime)",
            "smiley(pudding)",
            "smiley(dumpling)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "smile",
          moji: "😄",
          unicode: "1f604",
          category: "faces",
          tags: [],
          link: null,
          base: "smile",
          variants: [
            "smile(smiley)",
            "smile(wh)",
            "smile(ye)",
            "smile",
            "smile(p)",
            "smile(br)",
            "smile(bk)",
            "smile(poop)",
            "smile(slime)",
            "smile(pudding)",
            "smile(dumpling)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "wink",
          moji: "😉",
          unicode: "1f609",
          category: "faces",
          tags: [],
          link: null,
          base: "wink",
          variants: [
            "wink(smiley)",
            "wink(wh)",
            "wink",
            "wink(ye)",
            "wink(p)",
            "wink(br)",
            "wink(bk)",
            "wink(poop)",
            "wink(slime)",
            "wink(pudding)",
            "wink(dumpling)"
          ],
          score: 1,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "smirk",
          moji: "😏",
          unicode: "1f60f",
          category: "faces",
          tags: [],
          link: null,
          base: "smirk",
          variants: [
            "smirk(smiley)",
            "smirk(wh)",
            "smirk",
            "smirk(ye)",
            "smirk(p)",
            "smirk(br)",
            "smirk(bk)",
            "smirk(poop)",
            "smirk(slime)",
            "smirk(pudding)",
            "smirk(dumpling)"
          ],
          score: 1,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "sweat",
          moji: "😓",
          unicode: "1f613",
          category: "faces",
          tags: [],
          link: null,
          base: "sweat",
          variants: [
            "sweat(smiley)",
            "sweat(wh)",
            "sweat",
            "sweat(ye)",
            "sweat(p)",
            "sweat(br)",
            "sweat(bk)",
            "sweat(poop)",
            "sweat(slime)",
            "sweat(pudding)",
            "sweat(dumpling)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "angry",
          moji: "😠",
          unicode: "1f620",
          category: "faces",
          tags: [],
          link: null,
          base: "angry",
          variants: [
            "angry(smiley)",
            "angry(wh)",
            "angry(br)",
            "angry(bk)",
            "angry",
            "angry(ye)",
            "angry(p)",
            "angry(slime)",
            "angry(pudding)",
            "angry(poop)",
            "angry(dumpling)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "rage",
          moji: "😡",
          unicode: "1f621",
          category: "faces",
          tags: [],
          link: null,
          base: "rage",
          variants: [
            "rage(wh)",
            "rage(ye)",
            "rage(p)",
            "rage(br)",
            "rage",
            "rage(poop)",
            "rage(slime)",
            "rage(pudding)",
            "rage(smiley)",
            "rage(dumpling)",
            "rage(bk)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "weary",
          moji: "😩",
          unicode: "1f629",
          category: "faces",
          tags: [],
          link: null,
          base: "weary",
          variants: [
            "weary(ye)",
            "weary(wh)",
            "weary(br)",
            "weary(bk)",
            "weary",
            "weary(p)",
            "weary(poop)",
            "weary(slime)",
            "weary(pudding)",
            "weary(dumpling)",
            "weary(smiley)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "sleepy",
          moji: "😪",
          unicode: "1f62a",
          category: "faces",
          tags: [],
          link: null,
          base: "sleepy",
          variants: [
            "sleepy(ye)",
            "sleepy(wh)",
            "sleepy(br)",
            "sleepy(bk)",
            "sleepy",
            "sleepy(p)",
            "sleepy(poop)",
            "sleepy(slime)",
            "sleepy(pudding)",
            "sleepy(smiley)",
            "sleepy(dumpling)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "hushed",
          moji: "😯",
          unicode: "1f62f",
          category: "faces",
          tags: [],
          link: null,
          base: "hushed",
          variants: [
            "hushed(ye)",
            "hushed(smiley)",
            "hushed(wh)",
            "hushed(br)",
            "hushed(bk)",
            "hushed",
            "hushed(p)",
            "hushed(poop)",
            "hushed(slime)",
            "hushed(pudding)",
            "hushed(dumpling)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "scream",
          moji: "😱",
          unicode: "1f631",
          category: "faces",
          tags: [],
          link: null,
          base: "scream",
          variants: [
            "scream(ye)",
            "scream(wh)",
            "scream(br)",
            "scream(bk)",
            "scream",
            "scream(p)",
            "scream(poop)",
            "scream(slime)",
            "scream(pudding)",
            "scream(smiley)",
            "scream(dumpling)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "mask",
          moji: "😷",
          unicode: "1f637",
          category: "faces",
          tags: [],
          link: null,
          base: "mask",
          variants: [
            "mask(smiley)",
            "mask(ye)",
            "mask(wh)",
            "mask(br)",
            "mask(bk)",
            "mask(p)",
            "mask",
            "mask(poop)",
            "mask(slime)",
            "mask(pudding)",
            "mask(dumpling)"
          ],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "door",
          moji: "🚪",
          unicode: "1f6aa",
          category: "objects",
          tags: [],
          link: null,
          base: "door",
          variants: ["door"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "bath",
          moji: "🛀",
          unicode: "1f6c0",
          category: "objects",
          tags: [],
          link: null,
          base: "bath",
          variants: ["bath"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        },
        {
          code: "watch",
          moji: "⌚️",
          unicode: "231a",
          category: "objects",
          tags: [],
          link: null,
          base: "watch",
          variants: ["watch"],
          score: 0,
          r18: !1,
          customizations: [],
          combinations: []
        }
      ]);
  },
  function(e, n, o) {
    "use strict";
    n.__esModule = !0;
    var i = o(4),
      t = function(e, n) {
        return e.code === n;
      };
    function s(e) {
      var n = i.default.find(function(n) {
        return t(n, e);
      });
      return !!n && n.moji;
    }
    (n.getEmoji = s),
      (n.default = function() {
        console.log(s("heart eyes cat"));
      });
  },
  function(e, n, o) {
    "use strict";
    n.__esModule = !0;
    var i = o(5),
      t = o(3),
      s = o(2),
      a = o(1);
    i.default(), t.default(), s.default(), a.default();
  }
]);
