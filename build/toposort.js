/****
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Gustavo Henke and Aaron Trent
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 ****/
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("Toposort", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Toposort = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var Toposort = /*#__PURE__*/function () {
    function Toposort() {
      _classCallCheck(this, Toposort);
      _defineProperty(this, "edges", []);
      _defineProperty(this, "Toposort", Toposort);
    }
    _createClass(Toposort, [{
      key: "add",
      value:
      /**
       * Adds dependency edges.
       *
       * @since   0.1.0
       * @param   {String} item               An dependent name. Must be an string and not empty
       * @param   {String[]|String} [deps]    An dependency or array of dependencies
       * @returns {Toposort}                  The Toposort instance
       */
      function add(item, deps) {
        if (typeof item !== "string" || !item) {
          throw new TypeError("Dependent name must be given as a not empty string");
        }
        deps = Array.isArray(deps) ? deps : [deps];
        if (deps.length > 0) {
          var _iterator = _createForOfIteratorHelper(deps),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var dep = _step.value;
              if (typeof dep !== "string" || !dep) {
                throw new TypeError("Dependency name must be given as a not empty string");
              }
              this.edges.push([item, dep]);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          this.edges.push([item]);
        }
        return this;
      }

      /**
       * Runs the toposorting and return an ordered array of strings
       *
       * @since   0.1.0
       * @returns {String[]}  The list of items topologically sorted.
       */
    }, {
      key: "sort",
      value: function sort() {
        var _this = this;
        var nodes = [];

        //accumulate unique nodes into a large list
        var _iterator2 = _createForOfIteratorHelper(this.edges),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _edge = _step2.value;
            var _iterator5 = _createForOfIteratorHelper(_edge),
              _step5;
            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var _node = _step5.value;
                if (nodes.indexOf(_node) === -1) {
                  nodes.push(_node);
                }
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }

          //initialize the placement of nodes into the sorted array at the end
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        var place = nodes.length;

        //initialize the sorted array with the same length as the unique nodes array
        var sorted = new Array(nodes.length);

        //define a visitor function that recursively traverses dependencies.
        var visit = function visit(node, predecessors) {
          //check if a node is dependent of itself
          if (predecessors.length !== 0 && predecessors.indexOf(node) !== -1) {
            throw new Error("Cyclic dependency found. ".concat(node, " is dependent of itself.\nDependency chain: ").concat(predecessors.join(" -> "), " => ").concat(node));
          }
          var index = nodes.indexOf(node);

          //if the node still exists, traverse its dependencies
          if (index !== -1) {
            var copy = false;

            //mark the node as false to exclude it from future iterations
            nodes[index] = false;

            //loop through all edges and follow dependencies of the current node
            var _iterator3 = _createForOfIteratorHelper(_this.edges),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var edge = _step3.value;
                if (edge[0] === node) {
                  //lazily create a copy of predecessors with the current node concatenated onto it
                  copy = copy || predecessors.concat([node]);

                  //recurse to node dependencies
                  visit(edge[1], copy);
                }
              }

              //add the node to the next place in the sorted array
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            sorted[--place] = node;
          }
        };
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];

          //ignore nodes that have been excluded
          if (node !== false) {
            //mark the node as false to exclude it from future iterations
            nodes[i] = false;

            //loop through all edges and follow dependencies of the current node
            var _iterator4 = _createForOfIteratorHelper(this.edges),
              _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var edge = _step4.value;
                if (edge[0] === node) {
                  //recurse to node dependencies
                  visit(edge[1], [node]);
                }
              }

              //add the node to the next place in the sorted array
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
            sorted[--place] = node;
          }
        }
        return sorted;
      }

      /**
       * Clears edges
       *
       * @since   0.4.0
       * @returns {Toposort}                  The Toposort instance
       */
    }, {
      key: "clear",
      value: function clear() {
        this.edges = [];
        return this;
      }
    }]);
    return Toposort;
  }();
  _exports["default"] = Toposort;
  module.exports = exports.default;
});
