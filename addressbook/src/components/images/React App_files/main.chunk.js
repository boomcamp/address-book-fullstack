(this["webpackJsonpaddressbook"] = this["webpackJsonpaddressbook"] || []).push([["main"],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/App.css":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/App.css ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "body {\n  display: flex;\n  font-family: \"Roboto\", sans-serif;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n}\n@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2)\n    format(\"woff2\");\n}\n.material-icons {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-feature-settings: \"liga\";\n  -webkit-font-smoothing: antialiased;\n}\n\n.MuiTableRow-root:hover {\n  background: #cacaca;\n}\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/index.css ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n", ""]);


/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./App.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/App.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./App.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/App.css",
      function () {
        var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./App.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/App.css");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_routes_Routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/routes/Routes */ "./src/components/routes/Routes.js");
/* harmony import */ var _components_customHooks_useLocalStorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/customHooks/useLocalStorage */ "./src/components/customHooks/useLocalStorage.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/esm/react-toastify.js");
/* harmony import */ var _node_modules_react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../node_modules/react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");
/* harmony import */ var _node_modules_react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_node_modules_react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8__);


var _jsxFileName = "/home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/src/App.js";








function App() {
  const _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
        _useState2 = Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
        loginData = _useState2[0],
        setloginData = _useState2[1];

  const _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
        _useState4 = Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
        registrationData = _useState4[0],
        setRegistrationData = _useState4[1];

  const _useLocalStorage = Object(_components_customHooks_useLocalStorage__WEBPACK_IMPORTED_MODULE_6__["useLocalStorage"])("user", {}),
        _useLocalStorage2 = Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useLocalStorage, 2),
        user = _useLocalStorage2[0],
        setUser = _useLocalStorage2[1];

  const _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    confirmPassword: false,
    confirmPasswordMsg: ""
  }),
        _useState6 = Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState5, 2),
        validation = _useState6[0],
        setValidation = _useState6[1];

  const _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
        _useState8 = Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState7, 2),
        redirect = _useState8[0],
        setRedirect = _useState8[1];

  const handleOnChange = (key, data, action) => {
    key === "login" ? setloginData(Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, loginData, {
      [data.name]: data.value
    })) : setRegistrationData(Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, registrationData, {
      [data.name]: data.value
    }));

    if (action && action === "confirmPassword") {
      registrationData.password !== data.value ? setValidation(Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, validation, {
        password: true,
        passwordMsg: "Password don't match!"
      })) : setValidation(Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, validation, {
        confirmPassword: false,
        confirmPasswordMsg: ""
      }));
    }
  };

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["HashRouter"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_7__["ToastContainer"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_routes_Routes__WEBPACK_IMPORTED_MODULE_5__["Routes"], {
    handleOnChange: handleOnChange,
    loginData: loginData,
    setloginData: setloginData,
    user: user,
    setUser: setUser,
    validation: validation,
    registrationData: registrationData,
    setRegistrationData: setRegistrationData,
    redirect: redirect,
    setRedirect: setRedirect,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/components/SideNav/SideNav.js":
/*!*******************************************!*\
  !*** ./src/components/SideNav/SideNav.js ***!
  \*******************************************/
/*! exports provided: SideNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideNav", function() { return SideNav; });
/* harmony import */ var _home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/AppBar */ "./node_modules/@material-ui/core/esm/AppBar/index.js");
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ "./node_modules/@material-ui/core/esm/CssBaseline/index.js");
/* harmony import */ var _material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Drawer */ "./node_modules/@material-ui/core/esm/Drawer/index.js");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Hidden */ "./node_modules/@material-ui/core/esm/Hidden/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Menu */ "./node_modules/@material-ui/icons/Menu.js");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "./node_modules/@material-ui/core/esm/Toolbar/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _useStyles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./useStyles */ "./src/components/SideNav/useStyles.js");
/* harmony import */ var _routes_NestedRoutes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../routes/NestedRoutes */ "./src/components/routes/NestedRoutes.js");

var _jsxFileName = "/home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/src/components/SideNav/SideNav.js";












const SideNav = props => {
  const container = props.container;
  const classes = Object(_useStyles__WEBPACK_IMPORTED_MODULE_11__["useStyles"])();
  const theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__["useTheme"])();

  const _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(false),
        _React$useState2 = Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState, 2),
        mobileOpen = _React$useState2[0],
        setMobileOpen = _React$useState2[1];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: classes.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    position: "fixed",
    className: classes.appBar,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
    color: "inherit",
    "aria-label": "open drawer",
    edge: "start",
    onClick: handleDrawerToggle,
    className: classes.menuButton,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__["default"], {
    variant: "h6",
    noWrap: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: undefined
  }, "Address Book"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("nav", {
    className: classes.drawer,
    "aria-label": "mailbox folders",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_5__["default"], {
    smUp: true,
    implementation: "css",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_4__["default"], {
    container: container,
    variant: "temporary",
    anchor: theme.direction === "rtl" ? "right" : "left",
    open: mobileOpen,
    onClose: handleDrawerToggle,
    classes: {
      paper: classes.drawerPaper
    },
    ModalProps: {
      keepMounted: true
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_useStyles__WEBPACK_IMPORTED_MODULE_11__["DrawerCont"], {
    data: props.data,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: undefined
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_5__["default"], {
    xsDown: true,
    implementation: "css",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_4__["default"], {
    classes: {
      paper: classes.drawerPaper
    },
    variant: "permanent",
    open: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_useStyles__WEBPACK_IMPORTED_MODULE_11__["DrawerCont"], {
    data: props.data,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: undefined
  })))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("main", {
    className: classes.content,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: classes.toolbar,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_routes_NestedRoutes__WEBPACK_IMPORTED_MODULE_12__["NestedRoutes"], {
    data: props.data,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__["default"], {
    paragraph: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: undefined
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.")));
};

/***/ }),

/***/ "./src/components/SideNav/useStyles.js":
/*!*********************************************!*\
  !*** ./src/components/SideNav/useStyles.js ***!
  \*********************************************/
/*! exports provided: useStyles, DrawerCont */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useStyles", function() { return useStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawerCont", function() { return DrawerCont; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_icons_MoveToInbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/icons/MoveToInbox */ "./node_modules/@material-ui/icons/MoveToInbox.js");
/* harmony import */ var _material_ui_icons_MoveToInbox__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MoveToInbox__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_icons_ExitToApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/icons/ExitToApp */ "./node_modules/@material-ui/icons/ExitToApp.js");
/* harmony import */ var _material_ui_icons_ExitToApp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExitToApp__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/List */ "./node_modules/@material-ui/core/esm/List/index.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/esm/ListItem/index.js");
/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ "./node_modules/@material-ui/core/esm/ListItemIcon/index.js");
/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/ListItemText */ "./node_modules/@material-ui/core/esm/ListItemText/index.js");
/* harmony import */ var _material_ui_icons_Mail__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Mail */ "./node_modules/@material-ui/icons/Mail.js");
/* harmony import */ var _material_ui_icons_Mail__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Mail__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Divider */ "./node_modules/@material-ui/core/esm/Divider/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/esm/react-toastify.js");
/* harmony import */ var _groups_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../groups/list */ "./src/components/groups/list.js");
var _jsxFileName = "/home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/src/components/SideNav/useStyles.js";












const drawerWidth = 240;
const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__["makeStyles"])(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "100%"
  }
}));
const DrawerCont = props => {
  const setUser = props.data.setUser;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_groups_list__WEBPACK_IMPORTED_MODULE_11__["NestedList"], {
    data: props.data,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
    button: true,
    onClick: () => {
      setUser({});
      react_toastify__WEBPACK_IMPORTED_MODULE_10__["toast"].info("Successfully logged out!", {
        position: react_toastify__WEBPACK_IMPORTED_MODULE_10__["toast"].POSITION.TOP_CENTER
      });
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExitToApp__WEBPACK_IMPORTED_MODULE_2___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_6__["default"], {
    primary: "Log Out",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: undefined
  }))));
};

/***/ }),

/***/ "./src/components/contacts/contacts.js":
/*!*********************************************!*\
  !*** ./src/components/contacts/contacts.js ***!
  \*********************************************/
/*! exports provided: Contacts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Contacts", function() { return Contacts; });
/* harmony import */ var _home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var material_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! material-table */ "../node_modules/material-table/dist/index.js");
/* harmony import */ var material_table__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(material_table__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_addressbook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/addressbook */ "./src/components/styles/addressbook.js");
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../data/data */ "./src/components/data/data.js");

var _jsxFileName = "/home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/src/components/contacts/contacts.js";




const Contacts = props => {
  const _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    columns: _data_data__WEBPACK_IMPORTED_MODULE_4__["columnData"]
  }),
        _useState2 = Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
        tableData = _useState2[0],
        setTableData = _useState2[1];

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_addressbook__WEBPACK_IMPORTED_MODULE_3__["Div"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(material_table__WEBPACK_IMPORTED_MODULE_2___default.a, {
    title: "Contact List",
    columns: tableData.columns,
    options: {
      pageSizeOptions: [10, 15, 20],
      pageSize: 10,
      actionsColumnIndex: -1,
      selection: false,
      grouping: false
    },
    actions: [{
      icon: "add",
      tooltip: "add",
      isFreeAction: true,
      onClick: () => alert("try")
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: undefined
  }));
};

/***/ }),

/***/ "./src/components/customHooks/useLocalStorage.js":
/*!*******************************************************!*\
  !*** ./src/components/customHooks/useLocalStorage.js ***!
  \*******************************************************/
/*! exports provided: useLocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocalStorage", function() { return useLocalStorage; });
/* harmony import */ var _home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const useLocalStorage = (key, initialValue) => {
  const _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(() => {
    try {
      const fromStorage = localStorage.getItem(key);
      return fromStorage ? JSON.parse(fromStorage) : initialValue;
    } catch (err) {
      console.error(err);
    }
  }),
        _useState2 = Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
        data = _useState2[0],
        setData = _useState2[1];

  const setAllData = newData => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, setAllData];
};

/***/ }),

/***/ "./src/components/data/data.js":
/*!*************************************!*\
  !*** ./src/components/data/data.js ***!
  \*************************************/
/*! exports provided: columnData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnData", function() { return columnData; });
const columnData = [{
  title: "First Name",
  field: "firstName"
}, {
  title: "Last Name",
  field: "lastName"
}, {
  title: "Mobile Phone",
  field: "mobile_phone"
}, {
  title: "Email Address",
  field: "email"
}, {
  title: "City",
  field: "city"
}, {
  title: "Postal Code",
  field: "postalCode"
}, {
  title: "Country",
  field: "country"
}, {
  title: "Group",
  field: "groupId"
}];

/***/ }),

/***/ "./src/components/groups/list.js":
/*!***************************************!*\
  !*** ./src/components/groups/list.js ***!
  \***************************************/
/*! exports provided: NestedList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NestedList", function() { return NestedList; });
/* harmony import */ var _home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_ListSubheader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/ListSubheader */ "./node_modules/@material-ui/core/esm/ListSubheader/index.js");
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/List */ "./node_modules/@material-ui/core/esm/List/index.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/esm/ListItem/index.js");
/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ "./node_modules/@material-ui/core/esm/ListItemIcon/index.js");
/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/ListItemText */ "./node_modules/@material-ui/core/esm/ListItemText/index.js");
/* harmony import */ var _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Collapse */ "./node_modules/@material-ui/core/esm/Collapse/index.js");
/* harmony import */ var _material_ui_icons_Queue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/icons/Queue */ "./node_modules/@material-ui/icons/Queue.js");
/* harmony import */ var _material_ui_icons_Queue__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Queue__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_Group__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/Group */ "./node_modules/@material-ui/icons/Group.js");
/* harmony import */ var _material_ui_icons_Group__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Group__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/GroupAdd */ "./node_modules/@material-ui/icons/GroupAdd.js");
/* harmony import */ var _material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_Contacts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/Contacts */ "./node_modules/@material-ui/icons/Contacts.js");
/* harmony import */ var _material_ui_icons_Contacts__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Contacts__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_icons_ExpandLess__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/ExpandLess */ "./node_modules/@material-ui/icons/ExpandLess.js");
/* harmony import */ var _material_ui_icons_ExpandLess__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandLess__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/icons/ExpandMore */ "./node_modules/@material-ui/icons/ExpandMore.js");
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

var _jsxFileName = "/home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/src/components/groups/list.js";
















const AddButton = styled_components__WEBPACK_IMPORTED_MODULE_15__["default"].div`
  border: 1px solid black;
  background: none;
  border-radius: 5px;
  width: 90%;
  text-align: center;
  padding: 8px 0 0 0;
  font-size: 22px;
`;
const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["makeStyles"])(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));
const NestedList = props => {
  const user = props.data.user;
  const classes = useStyles();

  const _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(true),
        _React$useState2 = Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState, 2),
        open = _React$useState2[0],
        setOpen = _React$useState2[1];

  const handleClick = () => {
    setOpen(!open);
  };

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_4__["default"], {
    component: "nav",
    "aria-labelledby": "nested-list-subheader",
    subheader: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ListSubheader__WEBPACK_IMPORTED_MODULE_3__["default"], {
      component: "div",
      id: "nested-list-subheader",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: undefined
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      style: {
        textTransform: "capitalize"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: undefined
    }, "Hello ", user.firstName + " " + user.lastName, "!")),
    className: classes.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_16__["Link"], {
    to: "/",
    style: link,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
    button: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Contacts__WEBPACK_IMPORTED_MODULE_12___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_7__["default"], {
    primary: "Contacts",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: undefined
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
    button: true,
    onClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Queue__WEBPACK_IMPORTED_MODULE_9___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_7__["default"], {
    primary: "Groups",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: undefined
  }), open ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_ExpandLess__WEBPACK_IMPORTED_MODULE_13___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: undefined
  }) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_14___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_8__["default"], {
    in: open,
    timeout: "auto",
    unmountOnExit: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_4__["default"], {
    component: "div",
    disablePadding: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
    button: true,
    className: classes.nested,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Group__WEBPACK_IMPORTED_MODULE_10___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_7__["default"], {
    primary: "#Alawinatics",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
    button: true,
    className: classes.nested,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(AddButton, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_11___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: undefined
  }))))));
};
const link = {
  textDecoration: "none",
  color: "black"
};

/***/ }),

/***/ "./src/components/login/Login.js":
/*!***************************************!*\
  !*** ./src/components/login/Login.js ***!
  \***************************************/
/*! exports provided: Login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony import */ var _home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/login */ "./src/components/styles/login.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _port__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../port */ "./src/port.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/esm/react-toastify.js");

var _jsxFileName = "/home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/src/components/login/Login.js";







const Login = props => {
  const _props$data = props.data,
        handleOnChange = _props$data.handleOnChange,
        setUser = _props$data.setUser,
        loginData = _props$data.loginData,
        setRedirect = _props$data.setRedirect,
        validation = _props$data.validation;

  const _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
        _useState2 = Object(_home_dev_65_Desktop_boomcamp_address_book_fullstack_addressbook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
        error = _useState2[0],
        setError = _useState2[1];

  const handleLogin = e => {
    e.preventDefault();
    axios__WEBPACK_IMPORTED_MODULE_5___default.a.post(`http://localhost:${_port__WEBPACK_IMPORTED_MODULE_6__["port"]}/api/login`, loginData).then(res => {
      setUser(res.data);
      react_toastify__WEBPACK_IMPORTED_MODULE_7__["toast"].info("Login sucessful!", {
        position: react_toastify__WEBPACK_IMPORTED_MODULE_7__["toast"].POSITION.TOP_CENTER
      });
    }).catch(err => {
      setError(true);
    });
  };

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_login__WEBPACK_IMPORTED_MODULE_2__["Div"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_login__WEBPACK_IMPORTED_MODULE_2__["LoginCont"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: e => handleLogin(e),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_login__WEBPACK_IMPORTED_MODULE_2__["ContTitle"], {
    style: _styles_login__WEBPACK_IMPORTED_MODULE_2__["blue"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: undefined
  }, "Address Book"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_login__WEBPACK_IMPORTED_MODULE_2__["ContTitle"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: undefined
  }, "Sign In"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_login__WEBPACK_IMPORTED_MODULE_2__["Text"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: undefined
  }, "Sign in using your Email"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TextField"], {
    error: error,
    onChange: e => handleOnChange("login", e.target),
    style: _styles_login__WEBPACK_IMPORTED_MODULE_2__["marginBot"],
    name: "username",
    variant: "outlined",
    type: "username",
    label: "Username",
    fullWidth: true,
    required: true,
    helperText: error ? "Invalid username!" : "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["TextField"], {
    error: error,
    onChange: e => handleOnChange("login", e.target),
    style: _styles_login__WEBPACK_IMPORTED_MODULE_2__["marginBot"],
    variant: "outlined",
    name: "password",
    type: "password",
    label: "Password",
    fullWidth: true,
    required: true,
    helperText: error ? "Incorrect password!" : "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_login__WEBPACK_IMPORTED_MODULE_2__["Box"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
    to: "/register",
    style: _styles_login__WEBPACK_IMPORTED_MODULE_2__["decoration"],
    onClick: () => setRedirect(false),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: undefined
  }, "Create Account")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_login__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    type: "submit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: undefined
  }, "Sign In")))));
};

/***/ }),

/***/ "./src/components/register/Register.js":
/*!*********************************************!*\
  !*** ./src/components/register/Register.js ***!
  \*********************************************/
/*! exports provided: Register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return Register; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/register */ "./src/components/styles/register.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _port__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../port */ "./src/port.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/esm/react-toastify.js");
var _jsxFileName = "/home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/src/components/register/Register.js";







const Register = props => {
  const _props$data = props.data,
        handleOnChange = _props$data.handleOnChange,
        validation = _props$data.validation,
        registrationData = _props$data.registrationData,
        setRedirect = _props$data.setRedirect;

  const handleRegister = e => {
    e.preventDefault();
    const data = registrationData;
    delete data.confirmPassword;
    axios__WEBPACK_IMPORTED_MODULE_4___default.a.post(`http://localhost:${_port__WEBPACK_IMPORTED_MODULE_5__["port"]}/api/register`, data).then(res => {
      console.log(res);
      react_toastify__WEBPACK_IMPORTED_MODULE_6__["toast"].info("registration sucessful!", {
        position: react_toastify__WEBPACK_IMPORTED_MODULE_6__["toast"].POSITION.TOP_CENTER
      });
    }).catch(err => {
      react_toastify__WEBPACK_IMPORTED_MODULE_6__["toast"].info(err.response.data.error, {
        position: react_toastify__WEBPACK_IMPORTED_MODULE_6__["toast"].POSITION.TOP_CENTER
      });
    });
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_register__WEBPACK_IMPORTED_MODULE_1__["Div"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_register__WEBPACK_IMPORTED_MODULE_1__["RegisterCont"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: e => handleRegister(e),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_register__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    style: {
      margin: "20px 0 0 0"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: undefined
  }, "Address Book"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_register__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: undefined
  }, "Create your Address Book Account"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_register__WEBPACK_IMPORTED_MODULE_1__["Name"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], {
    style: {
      margin: "3px 6px 3px 0"
    },
    onChange: e => handleOnChange("register", e.target),
    name: "firstName",
    variant: "outlined",
    type: "firstName",
    label: "First Name",
    fullWidth: true,
    required: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], {
    style: {
      margin: "3px 0 3px 0"
    },
    onChange: e => handleOnChange("register", e.target),
    name: "lastName",
    variant: "outlined",
    type: "lastName",
    label: "Last Name",
    fullWidth: true,
    required: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], {
    style: {
      margin: "3px 0 3px 0"
    },
    onChange: e => handleOnChange("register", e.target),
    name: "username",
    variant: "outlined",
    type: "username",
    label: "Username",
    fullWidth: true,
    required: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], {
    style: {
      margin: "3px 0 3px 0"
    },
    onChange: e => handleOnChange("register", e.target),
    name: "email",
    variant: "outlined",
    type: "email",
    label: "Email",
    fullWidth: true,
    required: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], {
    style: {
      margin: "3px 0 3px 0"
    },
    onChange: e => handleOnChange("register", e.target),
    name: "password",
    variant: "outlined",
    type: "password",
    label: "Password",
    fullWidth: true,
    required: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], {
    error: validation.confirmPassword,
    style: {
      margin: "3px 0 3px 0"
    },
    onChange: e => handleOnChange("register", e.target, "confirmPassword"),
    name: "confirmPassword",
    variant: "outlined",
    type: "password",
    label: "Confirm Password",
    fullWidth: true,
    required: true,
    helperText: validation.confirmPasswordMsg,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_register__WEBPACK_IMPORTED_MODULE_1__["Box"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/",
    style: _styles_register__WEBPACK_IMPORTED_MODULE_1__["decoration"],
    onClick: () => setRedirect(true),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117
    },
    __self: undefined
  }, "Sign in instead")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_register__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    type: "submit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119
    },
    __self: undefined
  }, "Sign Up")))));
};

/***/ }),

/***/ "./src/components/routes/NestedRoutes.js":
/*!***********************************************!*\
  !*** ./src/components/routes/NestedRoutes.js ***!
  \***********************************************/
/*! exports provided: NestedRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NestedRoutes", function() { return NestedRoutes; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _contacts_contacts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contacts/contacts */ "./src/components/contacts/contacts.js");
var _jsxFileName = "/home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/src/components/routes/NestedRoutes.js";



const NestedRoutes = props => {
  const _useRouteMatch = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useRouteMatch"])(),
        path = _useRouteMatch.path;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: `${path}/`,
    render: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_contacts_contacts__WEBPACK_IMPORTED_MODULE_2__["Contacts"], {
      data: props.data,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: undefined
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: `${path}/groups`,
    render: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_contacts_contacts__WEBPACK_IMPORTED_MODULE_2__["Contacts"], {
      data: props.data,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: undefined
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: undefined
  }));
};

/***/ }),

/***/ "./src/components/routes/Routes.js":
/*!*****************************************!*\
  !*** ./src/components/routes/Routes.js ***!
  \*****************************************/
/*! exports provided: Routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Routes", function() { return Routes; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../style */ "./src/style.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _login_Login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../login/Login */ "./src/components/login/Login.js");
/* harmony import */ var _register_Register__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../register/Register */ "./src/components/register/Register.js");
/* harmony import */ var _SideNav_SideNav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SideNav/SideNav */ "./src/components/SideNav/SideNav.js");
var _jsxFileName = "/home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/src/components/routes/Routes.js";






const Routes = props => {
  const user = props.user,
        redirect = props.redirect;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_style__WEBPACK_IMPORTED_MODULE_1__["Div"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: undefined
  }, user.token ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    exact: true,
    path: "/",
    render: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SideNav_SideNav__WEBPACK_IMPORTED_MODULE_5__["SideNav"], {
      data: props,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: undefined
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: undefined
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    exact: true,
    path: "/",
    render: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_login_Login__WEBPACK_IMPORTED_MODULE_3__["Login"], {
      data: props,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: undefined
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: undefined
  }), redirect ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"], {
    from: "*",
    to: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/register",
    render: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_register_Register__WEBPACK_IMPORTED_MODULE_4__["Register"], {
      data: props,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: undefined
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  })));
};

/***/ }),

/***/ "./src/components/styles/addressbook.js":
/*!**********************************************!*\
  !*** ./src/components/styles/addressbook.js ***!
  \**********************************************/
/*! exports provided: Div */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Div", function() { return Div; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");

const Div = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div``;

/***/ }),

/***/ "./src/components/styles/login.js":
/*!****************************************!*\
  !*** ./src/components/styles/login.js ***!
  \****************************************/
/*! exports provided: Div, LoginCont, marginBot, ContTitle, Button, Text, blue, Box, decoration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Div", function() { return Div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginCont", function() { return LoginCont; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "marginBot", function() { return marginBot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContTitle", function() { return ContTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return Text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blue", function() { return blue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return Box; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decoration", function() { return decoration; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");

const Div = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  padding-top: 218px;
  @media screen and (max-width: 600px) {
    padding: 15px;
  }
`;
const LoginCont = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  width: 405px;
  background: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 8px;
  padding: 30px 20px 50px 20px;
  border: 1px solid #dadce0;
  @media screen and (max-width: 600px) {
    border: none;
    width: 100%;
    padding: 0;
  }
`;
const marginBot = {
  margin: "4px 0 6px 0"
};
const ContTitle = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  font-size: 23px;
  margin: 20px 0 5px 0;
`;
const Button = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].button`
  text-align: center;
  border-radius: 4px;
  padding: 10px 30px 10px 30px;
  background: #1a73e8;
  font-size: 15px;
  color: white;
  border: none;
  margin: 5px 0 5px 0;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    padding: 7px 15px 7px 15px;
  }
`;
const Text = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  padding: 5px 0 30px 0;
`;
const blue = {
  color: "#1a73e8"
};
const Box = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  padding: 15px 3px 0 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 15px;
    font-weight: bold;
  }
`;
const decoration = {
  textDecoration: "none",
  color: "#1a73e8"
};

/***/ }),

/***/ "./src/components/styles/register.js":
/*!*******************************************!*\
  !*** ./src/components/styles/register.js ***!
  \*******************************************/
/*! exports provided: Div, RegisterCont, Title, Name, Button, Box, decoration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Div", function() { return Div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterCont", function() { return RegisterCont; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Title", function() { return Title; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Name", function() { return Name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return Box; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decoration", function() { return decoration; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");

const Div = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  padding-top: 206px;
  @media screen and (max-width: 600px) {
    padding: 15px;
  }
`;
const RegisterCont = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  width: 405px;
  background: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 8px;
  padding: 45px 30px 50px 30px;
  border: 1px solid #dadce0;
  @media screen and (max-width: 600px) {
    border: none;
    width: 100%;
    padding: 0;
  }
`;
const Title = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  font-size: 20px;
  text-align: left;
  padding: 0 0 15px 0;
`;
const Name = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
const Button = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].button`
  text-align: center;
  border-radius: 4px;
  padding: 10px 30px 10px 30px;
  background: #1a73e8;
  font-size: 15px;
  color: white;
  border: none;
  margin: 5px 0 5px 0;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    padding: 7px 15px 7px 15px;
  }
`;
const Box = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  padding: 15px 3px 0 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 15px;
    font-weight: bold;
  }
`;
const decoration = {
  textDecoration: "none",
  color: "#1a73e8"
};

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css",
      function () {
        var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var _serviceWorker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./serviceWorker */ "./src/serviceWorker.js");
var _jsxFileName = "/home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/src/index.js";





react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_3__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7
  },
  __self: undefined
}), document.getElementById("root")); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

_serviceWorker__WEBPACK_IMPORTED_MODULE_4__["unregister"]();

/***/ }),

/***/ "./src/port.js":
/*!*********************!*\
  !*** ./src/port.js ***!
  \*********************/
/*! exports provided: port */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "port", function() { return port; });
const port = 4000;

/***/ }),

/***/ "./src/serviceWorker.js":
/*!******************************!*\
  !*** ./src/serviceWorker.js ***!
  \******************************/
/*! exports provided: register, unregister */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unregister", function() { return unregister; });
// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
const isLocalhost = Boolean(window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.
window.location.hostname === '[::1]' || // 127.0.0.0/8 are considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
function register(config) {
  if (false) {}
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker.register(swUrl).then(registration => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;

      if (installingWorker == null) {
        return;
      }

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // At this point, the updated precached content has been fetched,
            // but the previous service worker will still serve the older
            // content until all client tabs are closed.
            console.log('New content is available and will be used when all ' + 'tabs for this page are closed. See https://bit.ly/CRA-PWA.'); // Execute callback

            if (config && config.onUpdate) {
              config.onUpdate(registration);
            }
          } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.
            console.log('Content is cached for offline use.'); // Execute callback

            if (config && config.onSuccess) {
              config.onSuccess(registration);
            }
          }
        }
      };
    };
  }).catch(error => {
    console.error('Error during service worker registration:', error);
  });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: {
      'Service-Worker': 'script'
    }
  }).then(response => {
    // Ensure service worker exists, and that we really are getting a JS file.
    const contentType = response.headers.get('content-type');

    if (response.status === 404 || contentType != null && contentType.indexOf('javascript') === -1) {
      // No service worker found. Probably a different app. Reload the page.
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister().then(() => {
          window.location.reload();
        });
      });
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(swUrl, config);
    }
  }).catch(() => {
    console.log('No internet connection found. App is running in offline mode.');
  });
}

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

/***/ }),

/***/ "./src/style.js":
/*!**********************!*\
  !*** ./src/style.js ***!
  \**********************/
/*! exports provided: Div, TitleDiv, white, Span, font */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Div", function() { return Div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TitleDiv", function() { return TitleDiv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "white", function() { return white; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Span", function() { return Span; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "font", function() { return font; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");

const Div = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  display: flex;
  justify-content: center;
`;
const TitleDiv = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const white = {
  color: "white"
};
const Span = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].span`
  padding: 10px 0 0 15px;
  font-size: 18px;
  color: white;
`;
const font = {
  fontSize: "25px"
};

/***/ }),

/***/ 1:
/*!**************************************************************************************************************!*\
  !*** multi (webpack)/hot/dev-server.js ./node_modules/react-dev-utils/webpackHotDevClient.js ./src/index.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/node_modules/webpack/hot/dev-server.js */"./node_modules/webpack/hot/dev-server.js");
__webpack_require__(/*! /home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/node_modules/react-dev-utils/webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
module.exports = __webpack_require__(/*! /home/dev-65/Desktop/boomcamp/address-book-fullstack/addressbook/src/index.js */"./src/index.js");


/***/ })

},[[1,"runtime-main",1]]]);
//# sourceMappingURL=main.chunk.js.map