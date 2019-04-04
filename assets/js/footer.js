"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Footer =
    /*#__PURE__*/
    function (_React$Component) {
        _inherits(Footer, _React$Component);

        function Footer() {
            var _getPrototypeOf2;

            var _this;

            _classCallCheck(this, Footer);

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Footer)).call.apply(_getPrototypeOf2, [this].concat(args)));

            _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
                $('.fixed-action-btn').floatingActionButton({
                    direction: 'left'
                });
            });

            return _this;
        }

        _createClass(Footer, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                return React.createElement("footer", {
                    className: "page-footer"
                }, React.createElement("div", {
                    className: "fixed-action-btn"
                }, React.createElement("a", {
                    className: "btn-floating btn-large waves-green"
                }, React.createElement("i", {
                    className: "large material-icons"
                }, "mode_edit")), React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
                    className: "btn-floating blue",
                    onClick: function onClick() {
                        _this2.props.refreshProfile();

                        defaults.showToast("profile updated");
                    }
                }, React.createElement("i", {
                    className: "material-icons"
                }, "refresh"))))), React.createElement("div", {
                    className: "footer-copyright"
                }, React.createElement("div", {
                    className: "container"
                }, "\xA9 Copyright ", new Date().getFullYear(), " Product of ", defaults.siteName, React.createElement("a", {
                    className: "grey-text text-lighten-4 right no-underline",
                    href: "#"
                }, this.props.accountType, " account"))));
            }
        }]);

        return Footer;
    }(React.Component);