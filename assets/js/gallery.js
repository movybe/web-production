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

var Gallery =
    /*#__PURE__*/
    function (_React$Component) {
        _inherits(Gallery, _React$Component);

        function Gallery() {
            var _getPrototypeOf2;

            var _this;

            _classCallCheck(this, Gallery);

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Gallery)).call.apply(_getPrototypeOf2, [this].concat(args)));

            _defineProperty(_assertThisInitialized(_this), "defaultAction", function () {
                $('.gallery-2 span.gallery-images-link').lightbox();
            });

            return _this;
        }

        _createClass(Gallery, [{
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                this.defaultAction();
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.defaultAction();
            }
        }, {
            key: "render",
            value: function render() {
                var gallery = this.props.gallery;
                var images = gallery.map(function (image, index) {
                    return index < gallery.length - 1 ? React.createElement("span", {
                        key: Math.random(),
                        className: "gallery-images-link",
                        href: image.src,
                        "data-caption": "<a href = '".concat(image.link, "'>").concat(image.alt, "</a>")
                    }) : null;
                });
                return React.createElement("div", {
                    className: "gallery-2"
                }, images);
            }
        }]);

        return Gallery;
    }(React.Component);

var mapPropsToState = function mapPropsToState(state) {
    return state;
};

var _ReactRedux = ReactRedux,
    connect = _ReactRedux.connect;
Gallery = connect(mapPropsToState)(Gallery);