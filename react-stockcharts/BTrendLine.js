"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../utils");

var _utils2 = require("./utils");

var _BEachTrendLine = require("./wrapper/BEachTrendLine");

var _BEachTrendLine2 = _interopRequireDefault(_BEachTrendLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BTrendLine = function (_Component) {
	_inherits(BTrendLine, _Component);

	function BTrendLine(props) {
		_classCallCheck(this, BTrendLine);

		var _this = _possibleConstructorReturn(this, (BTrendLine.__proto__ || Object.getPrototypeOf(BTrendLine)).call(this, props));

		_this.state = {};
		_this.nodes = [];
		return _this;
	}

	_createClass(BTrendLine, [{
		key: "render",
		value: function render() {
			var _this5 = this;

			var appearance = this.props.appearance;
			var _props2 = this.props,
			    enabled = _props2.enabled,
			    snap = _props2.snap,
			    shouldDisableSnap = _props2.shouldDisableSnap,
			    snapTo = _props2.snapTo,
			    type = _props2.type;
			var _props5 = this.props,
			    trends = _props5.trends;
			var _state = this.state,
			    override = _state.override;

			var tempLine = null
			return _react2.default.createElement(
				"g",
				null,
				trends.map(function (each, idx) {
					var eachAppearance = (0, _utils.isDefined)(each.appearance) ? _extends({}, appearance, each.appearance) : appearance;

					return _react2.default.createElement(_BEachTrendLine2.default, { key: idx,
						index: idx,
						type: each.type,
						selected: false,
						x1Value: (0, _utils2.getValueFromOverride)(override, idx, "x1Value", each.start[0]),
						y1Value: (0, _utils2.getValueFromOverride)(override, idx, "y1Value", each.start[1]),
						x2Value: (0, _utils2.getValueFromOverride)(override, idx, "x2Value", each.end[0]),
						y2Value: (0, _utils2.getValueFromOverride)(override, idx, "y2Value", each.end[1]),
						stroke: eachAppearance.stroke,
						strokeWidth: eachAppearance.strokeWidth,
						strokeOpacity: eachAppearance.strokeOpacity,
						strokeDasharray: eachAppearance.strokeDasharray,
					});
				})
			);
		}
	}]);

	return BTrendLine;
}(_react.Component);

BTrendLine.propTypes = {
	snap: _propTypes2.default.bool.isRequired,
	snapTo: _propTypes2.default.func,
	shouldDisableSnap: _propTypes2.default.func.isRequired,

	onStart: _propTypes2.default.func.isRequired,
	onComplete: _propTypes2.default.func.isRequired,
	
	type: _propTypes2.default.oneOf(["XLINE", // extends from -Infinity to +Infinity
	"RAY", // extends to +/-Infinity in one direction
	"LINE"] // extends between the set bounds
	),
	hoverText: _propTypes2.default.object.isRequired,

	trends: _propTypes2.default.array.isRequired,

	appearance: _propTypes2.default.shape({
		stroke: _propTypes2.default.string.isRequired,
		strokeOpacity: _propTypes2.default.number.isRequired,
		strokeWidth: _propTypes2.default.number.isRequired,
		strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),
		edgeStrokeWidth: _propTypes2.default.number.isRequired,
		edgeFill: _propTypes2.default.string.isRequired,
		edgeStroke: _propTypes2.default.string.isRequired
	}).isRequired
};

BTrendLine.defaultProps = {
	type: "XLINE",

	shouldDisableSnap: function shouldDisableSnap(e) {
		return e.button === 2 || e.shiftKey;
	},
	trends: [],

	appearance: {
		stroke: "#000000",
		strokeOpacity: 1,
		strokeWidth: 1,
		strokeDasharray: "Solid",
		edgeStrokeWidth: 1,
		edgeFill: "#FFFFFF",
		edgeStroke: "#000000",
	}
};

exports.default = BTrendLine;
