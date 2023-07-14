"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlanes = exports.getAllplanes = exports.generarPdfPlan = exports.generarExcelPlan = exports.disablePlan = exports.createPlanes = void 0;
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _axios = _interopRequireDefault(require("axios"));
var _pdfkitTable = _interopRequireDefault(require("pdfkit-table"));
var _exceljs = _interopRequireDefault(require("exceljs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/*
export const createPlanes = (req, res) => {
    try {
      let data = {
        NOMBRE: req.body.NOMBRE,
        DESCRIPCION: req.body.DESCRIPCION
    }
      let ruta = "http://localhost:3000/plan/createPlan";
      let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      const resultado = fetch(ruta, option)
        .then(response => response.json())
        .then(data => {
          console.log("plan creadro");
          //planes = data[0];
        })
        .catch(err => console.error("Error en peticion: " + err));
  
      res.render("createPlan", {
        "plans": planes
      });
    } catch (error) {
      console.log(error);
    }
};
 */

var createPlanes = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var data, metodo, url, option, respuesta;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          data = {
            NOMBRE: req.body.NOMBRE,
            DESCRIPCION: req.body.DESCRIPCION,
            TELEFONO: req.body.TELEFONO
          };
          metodo = "POST";
          url = process.env.URL_BACKEND + '/plan/createPlan';
          option = {
            method: metodo,
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          };
          _context.prev = 4;
          _context.next = 7;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            return (
              //data:data
              console.log("Plan Creado")
            );
          });
        case 7:
          respuesta = _context.sent;
          res.redirect("createPlan")["catch"](function (err) {
            return console.log("Error: ".concat(err));
          });
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          console.log("error en ".concat(_context.t0));
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 11]]);
  }));
  return function createPlanes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.createPlanes = createPlanes;
var getPlanes = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var ruta, option, planes, resultado;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          ruta = process.env.URL_BACKEND + '/plan/AllPlans';
          option = {
            method: "GET"
          };
          planes = {};
          _context2.next = 6;
          return (0, _nodeFetch["default"])(ruta, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            planes = data[0];
          })["catch"](function (err) {
            return console.error("Error en peticion: " + err);
          });
        case 6:
          resultado = _context2.sent;
          res.render("admin-plan", {
            "plans": planes
          });
          console.log("hola");
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function getPlanes(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getPlanes = getPlanes;
var getAllplanes = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var ruta, option, plan, resultado;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          ruta = process.env.URL_BACKEND + '/plan/AllPlans';
          option = {
            method: "GET"
          };
          plan = {};
          _context3.next = 6;
          return (0, _nodeFetch["default"])(ruta, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            plan = data[0];
          })["catch"](function (err) {
            return console.error("Error en peticion: " + err);
          });
        case 6:
          resultado = _context3.sent;
          res.render("createPlan", {
            "planes": plan
          });
          console.log(plan);
          _context3.next = 14;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function getAllplanes(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getAllplanes = getAllplanes;
var disablePlan = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var estado, data, ruta, option, estad, resultado;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          estado = req.query.estado;
          if (estado == 1) {
            estado = 0;
          } else {
            estado = 1;
          }
          _context4.prev = 2;
          data = {
            ESTADO: estado
          };
          console.log(data);
          ruta = "".concat(process.env.URL_BACKEND, "/plan/disable/").concat(req.query.id);
          option = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          };
          console.log(data);
          estad = {};
          _context4.next = 11;
          return (0, _nodeFetch["default"])(ruta, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            console.log(data);
          })["catch"](function (err) {
            return console.error("Error en peticion: " + err);
          });
        case 11:
          resultado = _context4.sent;
          res.redirect("planes");
          _context4.next = 18;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](2);
          console.log(_context4.t0);
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 15]]);
  }));
  return function disablePlan(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.disablePlan = disablePlan;
var generarPdfPlan = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var response, usuarioslData, doc, logoHeight, logoWidth, __dirname, imagePath, pageWidth, logoX, logoY, pageHeight, table, generador, fechaImpresion;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _axios["default"].get(process.env.URL_BACKEND + '/plan/AllPlans');
        case 3:
          response = _context5.sent;
          usuarioslData = response.data[0]; // Obtener el primer elemento del arreglo
          // Crear un nuevo documento PDF
          doc = new _pdfkitTable["default"]({
            margin: 30,
            size: 'A4'
          }); // Stream el contenido PDF a la respuesta HTTP
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=planes.pdf');
          doc.pipe(res);

          // Agregar el logo del proyecto
          logoHeight = 50;
          logoWidth = 50;
          __dirname = _path["default"].resolve();
          imagePath = _path["default"].resolve(_path["default"].join(__dirname, 'public', 'img', 'Logo.png'));
          console.log(imagePath);
          pageWidth = doc.page.width;
          logoX = (pageWidth - logoWidth) / 2;
          logoY = 30;
          pageHeight = doc.page.height;
          doc.image(imagePath, logoX, logoY, {
            width: logoWidth,
            height: logoHeight
          });

          // Agregar espacio después de la imagen
          doc.moveDown(2);

          // Agregar el encabezado
          doc.fontSize(24).text('Registro de planes', {
            align: 'center'
          });

          // Agregar espacio después del encabezado
          doc.moveDown();

          // Crear la tabla
          table = {
            headers: ['ID', 'NOMBRE', 'DESCRIPCION', 'TELEFONO', 'ESTADO'],
            rows: usuarioslData.map(function (planes) {
              return [planes.COD_PLAN, planes.NOMBRE, planes.DESCRIPCION, planes.TELEFONO, planes.ESTADO];
            })
          }; // Agregar la tabla al documento con un tamaño de letra más pequeño
          _context5.next = 25;
          return doc.table(table, {
            width: 500,
            prepareHeader: function prepareHeader() {
              return doc.font('Helvetica-Bold').fontSize(10);
            },
            prepareRow: function prepareRow() {
              return doc.font('Helvetica').fontSize(10);
            }
          });
        case 25:
          // Agregar el pie de página
          generador = 'StreetWise';
          fechaImpresion = new Date().toLocaleString();
          doc.fontSize(10).text("Generado por: ".concat(generador));
          doc.fontSize(10).text("Fecha y hora de impresi\xF3n: ".concat(fechaImpresion), {
            align: 'right'
          });

          // Finalizar el PDF
          doc.end();
          _context5.next = 36;
          break;
        case 32:
          _context5.prev = 32;
          _context5.t0 = _context5["catch"](0);
          // Manejar errores de solicitud o cualquier otro error
          console.error(_context5.t0);
          res.status(500).send('Error al generar el PDF');
        case 36:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 32]]);
  }));
  return function generarPdfPlan(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.generarPdfPlan = generarPdfPlan;
var generarExcelPlan = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var response, usuarioData, workbook, worksheet;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _axios["default"].get(process.env.URL_BACKEND + '/plan/AllPlans');
        case 3:
          response = _context6.sent;
          usuarioData = response.data[0]; // Obtener el primer elemento del arreglo
          // Crear un nuevo libro de Excel
          workbook = new _exceljs["default"].Workbook();
          worksheet = workbook.addWorksheet('Usuarios'); // Mostrar información por consola
          console.log('Información del Plan:');
          usuarioData.forEach(function (planes) {
            console.log("ID: ".concat(planes.COD_PLAN));
            console.log("NOMBRE: ".concat(planes.NOMBRE));
            console.log("DESCRIPCION: ".concat(planes.DESCRIPCION));
            console.log("TELEFONO: ".concat(planes.TELEFONO));
            console.log("ESTADO: ".concat(planes.ESTADO));
          });

          // Agregar encabezados de columna
          worksheet.columns = [{
            header: 'ID',
            key: 'COD_PLAN',
            width: 10
          }, {
            header: 'NOMBRE ',
            key: 'NOMBRE',
            width: 20
          }, {
            header: 'DESCRIPCION',
            key: 'DESCRIPCION',
            width: 15
          }, {
            header: 'TELEFONO',
            key: 'TELEFONO',
            width: 15
          }, {
            header: 'ESTADO',
            key: 'ESTADO',
            width: 10
          }];

          // Agregar filas con datos
          usuarioData.forEach(function (planes) {
            worksheet.addRow({
              COD_PLAN: planes.COD_PLAN,
              NOMBRE: planes.NOMBRE,
              DESCRIPCION: planes.DESCRIPCION,
              TELEFONO: planes.TELEFONO,
              ESTADO: planes.ESTADO
            });
          });

          // Stream el contenido Excel a la respuesta HTTP
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.setHeader('Content-Disposition', 'attachment; filename=planes.xlsx');
          _context6.next = 15;
          return workbook.xlsx.write(res);
        case 15:
          // Finalizar la escritura del libro de Excel
          res.end();
          _context6.next = 22;
          break;
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](0);
          // Manejar errores de solicitud o cualquier otro error
          console.error(_context6.t0);
          res.status(500).send('Error al generar el archivo Excel');
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 18]]);
  }));
  return function generarExcelPlan(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.generarExcelPlan = generarExcelPlan;