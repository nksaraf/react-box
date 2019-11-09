"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importStar(require("styled-components"));
exports.ThemeProvider = styled_components_1.ThemeProvider;
var react_svg_1 = __importDefault(require("react-svg"));
var framer_motion_1 = require("framer-motion");
var color_1 = __importDefault(require("color"));
var styled_system_1 = require("styled-system");
var react_1 = __importDefault(require("react"));
var fromEntries = function (l) { return l.reduce(function (a, _a) {
    var _b;
    var k = _a[0], v = _a[1];
    return (__assign({}, a, (_b = {}, _b[k] = v, _b)));
}, {}); };
var transform = styled_system_1.system({
    transform: true,
    transformBox: true,
    transformOrigin: true,
    transformStyle: true,
    translate: true,
    scale: true,
    rotate: true,
    perspective: true,
    perspectiveOrigin: true,
    overflow: true,
    boxSizing: true,
    cursor: true,
    textDecoration: true
});
var frGetter = function (value) {
    return typeof value === 'number' ? "repeat(" + value + ", 1fr)" : value;
};
var formatAreas = function (areas) { return areas; };
// ? areas.map(area => `"${area}"`).join(' ') : "";
var gridStyle = styled_system_1.system({
    flow: {
        property: 'gridAutoFlow'
    },
    minRowHeight: {
        property: 'gridAutoRows',
        transform: function (value) { return "minmax(" + (value || '20px') + ", auto)"; }
    },
    areas: {
        property: 'gridTemplateAreas',
        transform: function (value) { return formatAreas(value); }
    },
    columns: {
        property: 'gridTemplateColumns',
        transform: function (value) { return frGetter(value); }
    },
    rows: {
        property: 'gridTemplateRows',
        transform: function (value) { return frGetter(value); }
    }
});
var cellStyle = styled_system_1.system({
    colSpan: {
        property: 'gridColumnEnd',
        transform: function (value) { return "" + (value !== undefined ? "span " + (value || 1) : ''); }
    },
    rowSpan: {
        property: 'gridRowEnd',
        transform: function (value) { return "" + (value !== undefined ? "span " + (value || 1) : ''); }
    },
    colIndex: {
        property: 'gridColumnStart',
        transform: function (value) {
            return "" + (value !== undefined ? (typeof value === 'number' ? value + 1 : value) : '');
        }
    },
    rowIndex: {
        property: 'gridRowStart',
        transform: function (value) {
            return "" + (value !== undefined ? (typeof value === 'number' ? value + 1 : value) : '');
        }
    }
});
var textVariant = styled_system_1.variant({
    prop: 'textVariant',
    variants: {
        none: {},
        body: {
            fontSize: 1,
            fontWeight: 'normal'
        },
        h1: {
            as: 'h1',
            fontWeight: 'bolder',
            fontSize: 6
        },
        h2: {
            as: 'h2',
            fontWeight: 'bolder',
            fontSize: 5
        },
        h3: {
            as: 'h3',
            fontWeight: 'bolder',
            fontSize: 4
        },
        h4: {
            as: 'h4',
            fontWeight: 'bold',
            fontSize: 3
        },
        h5: {
            as: 'h5',
            fontWeight: 'bold',
            fontSize: 2
        },
        h6: {
            as: 'h6',
            fontWeight: 'bold',
            fontSize: 1
        },
        subhead: {
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontSize: 3
        }
    }
});
var applyTheme = function (data, theme) {
    if (data === undefined || typeof data === 'string' || Array.isArray(data)) {
        return data;
    }
    else if (typeof data === 'object') {
        return fromEntries(Object.entries(data).map(function (_a) {
            var k = _a[0], v = _a[1];
            return [
                k,
                typeof v === 'string' ? v.replace(/\{([^}]+)\}/, function (_, p1) { return styled_system_1.get(theme, p1); }) : v
            ];
        }));
    }
};
var applyThemeToVariants = function (variants, theme) {
    if (variants === undefined || typeof variants === 'string' || Array.isArray(variants)) {
        return variants;
    }
    return fromEntries(Object.entries(variants).map(function (_a) {
        var k = _a[0], v = _a[1];
        return [k, applyTheme(v, theme)];
    }));
};
function withThemedMotion(WrappedComponent) {
    return react_1.default.forwardRef(function (_a, ref) {
        var animate = _a.animate, whileHover = _a.whileHover, variants = _a.variants, _b = _a.skipTheme, skipTheme = _b === void 0 ? false : _b, whileTap = _a.whileTap, props = __rest(_a, ["animate", "whileHover", "variants", "skipTheme", "whileTap"]);
        var theme = exports.useTheme();
        return (react_1.default.createElement(WrappedComponent, __assign({ ref: ref, animate: skipTheme ? animate : applyTheme(animate, theme), whileHover: skipTheme ? whileHover : applyTheme(whileHover, theme), whileTap: skipTheme ? whileTap : applyTheme(whileTap, theme), variants: skipTheme ? variants : applyThemeToVariants(variants, theme) }, props)));
    });
}
exports.withThemedMotion = withThemedMotion;
exports.Box = styled_components_1.default(withThemedMotion(framer_motion_1.motion.div)).attrs(function (props) { return ({
    height: props.fullHeight ? '100%' : props.height,
    width: props.fullWidth ? '100%' : props.width,
    colIndex: props.gridPosition !== undefined ? props.gridPosition.column : props.colIndex,
    rowIndex: props.gridPosition !== undefined ? props.gridPosition.row : props.rowIndex,
    rowSpan: props.gridPosition !== undefined ? props.gridPosition.rowSpan : props.rowSpan,
    colSpan: props.gridPosition !== undefined ? props.gridPosition.colSpan : props.colSpan
}); })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"], ["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"])), styled_system_1.space, styled_system_1.color, styled_system_1.display, styled_system_1.layout, styled_system_1.border, styled_system_1.shadow, styled_system_1.flexbox, styled_system_1.grid, styled_system_1.background, styled_system_1.border, styled_system_1.position, transform, styled_system_1.typography, cellStyle, gridStyle, textVariant);
exports.Box.defaultProps = {
    boxSizing: 'border-box',
    fontSize: 1
};
exports.default = exports.Box;
exports.Flex = styled_components_1.default(exports.Box)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
exports.Column = styled_components_1.default(exports.Flex)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex-direction: column;\n"], ["\n  flex-direction: column;\n"])));
exports.Row = styled_components_1.default(exports.Flex)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  flex-direction: row;\n"], ["\n  flex-direction: row;\n"])));
exports.Grid = styled_components_1.default(exports.Box)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: grid;\n"], ["\n  display: grid;\n"])));
exports.Grid.defaultProps = {
    columns: 12,
    flow: 'row',
    gridGap: 2,
    minRowHeight: '20px'
};
exports.Cell = styled_components_1.default(exports.Box)(templateObject_6 || (templateObject_6 = __makeTemplateObject([""], [""])));
exports.Span = exports.Box.withComponent(withThemedMotion(framer_motion_1.motion.span));
exports.Image = exports.Box.withComponent(withThemedMotion(framer_motion_1.motion.img));
exports.Button = exports.Box.withComponent(withThemedMotion(framer_motion_1.motion.button));
exports.Button.defaultProps = {
    cursor: 'pointer'
};
exports.Text = styled_components_1.default(exports.Box.withComponent(withThemedMotion(framer_motion_1.motion.p))).attrs(function (_a) {
    var center = _a.center, variant = _a.variant;
    return ({
        textAlign: center ? 'center' : 'inherit',
        textVariant: variant
    });
})(templateObject_7 || (templateObject_7 = __makeTemplateObject([""], [""])));
exports.Text.defaultProps = {
    margin: 0,
    display: 'inline-block',
    variant: 'none'
};
exports.Link = exports.Box.withComponent(withThemedMotion(framer_motion_1.motion.a));
exports.Link.defaultProps = {
    display: 'inline-block',
    textDecoration: 'none',
    cursor: 'pointer'
};
exports.Input = exports.Box.withComponent(withThemedMotion(framer_motion_1.motion.input));
exports.Input.defaultProps = {
    display: 'inline-block',
    verticalAlign: 'middle',
    type: 'text'
};
var StyledSVG = exports.Box.withComponent(withThemedMotion(framer_motion_1.motion.svg));
function SVG(_a) {
    var _b = _a.src, src = _b === void 0 ? '' : _b, _c = _a.children, children = _c === void 0 ? undefined : _c, props = __rest(_a, ["src", "children"]);
    if (src && src.length > 0) {
        return react_1.default.createElement(react_svg_1.default, { style: __assign({ stroke: 'currentColor' }, props), src: src });
    }
    else {
        return react_1.default.createElement(StyledSVG, __assign({}, props), children);
    }
}
exports.SVG = SVG;
SVG.defaultProps = {
    stroke: 'currentColor'
    // fill: 'currentColor'
};
exports.useTheme = function () {
    var base = react_1.default.useContext(styled_components_1.ThemeContext);
    var theme = Object.assign(base, {
        get: function () {
            var keys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                keys[_i] = arguments[_i];
            }
            return styled_system_1.get.apply(void 0, [base].concat(keys));
        },
        color: function (val) { return color_1.default(styled_system_1.get(base, "colors." + val)); }
    });
    return theme;
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=index.js.map