"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherOperation = exports.DriversOperation = exports.ShippersOperation = exports.ShipmentsOperation = exports.AgencyOperation = exports.AgencyType = exports.VehicleOperation = exports.TransportPartnerOperation = exports.TransportPartnerStaffOperation = exports.StaffOperation = exports.AdministrativeOperation = exports.InvoiceOperation = exports.OrdersOperation = exports.MapOperation = exports.CargoInsuranceOperation = exports.GiftOrderTopicOperation = exports.ShippingBillOperation = exports.CustomerOperation = exports.AccountOperation = exports.BusinessOperation = exports.AuthOperation = exports.LoginOption = exports.Role = void 0;
var FormData = require("form-data");
var axios_1 = require("axios");
var Role;
(function (Role) {
    Role[Role["CUSTOMER"] = 0] = "CUSTOMER";
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["MANAGER"] = 2] = "MANAGER";
    Role[Role["HUMAN_RESOURCE_MANAGER"] = 3] = "HUMAN_RESOURCE_MANAGER";
    Role[Role["TELLER"] = 4] = "TELLER";
    Role[Role["COMPLAINTS_SOLVER"] = 5] = "COMPLAINTS_SOLVER";
    Role[Role["AGENCY_MANAGER"] = 6] = "AGENCY_MANAGER";
    Role[Role["AGENCY_HUMAN_RESOURCE_MANAGER"] = 7] = "AGENCY_HUMAN_RESOURCE_MANAGER";
    Role[Role["AGENCY_TELLER"] = 8] = "AGENCY_TELLER";
    Role[Role["AGENCY_COMPLAINTS_SOLVER"] = 9] = "AGENCY_COMPLAINTS_SOLVER";
    Role[Role["SHIPPER"] = 10] = "SHIPPER";
    Role[Role["DRIVER"] = 11] = "DRIVER";
    Role[Role["TRANSPORT_PARTNER_REPRESENTOR"] = 12] = "TRANSPORT_PARTNER_REPRESENTOR";
})(Role || (exports.Role = Role = {}));
;
var LoginOption;
(function (LoginOption) {
    LoginOption["BUSINESS"] = "BUSINESS";
    LoginOption["STAFF"] = "STAFF";
    LoginOption["CUSTOMER"] = "CUSTOMER";
})(LoginOption || (exports.LoginOption = LoginOption = {}));
var host = "http://localhost:3000/v3";
// const host = "https://api.tdlogistics.net.vn/v3";
var AuthOperation = /** @class */ (function () {
    function AuthOperation() {
        this.baseUrl = host + "/auth";
    }
    AuthOperation.prototype.sendOtp = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/customer/login"), payload)];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_1 = _c.sent();
                        if (axios_1.default.isAxiosError(error_1)) {
                            console.log("Error sending otp: ", (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data);
                        }
                        else {
                            console.log("Error sending otp: ", error_1);
                        }
                        console.error("Request that caused the error: ", error_1 === null || error_1 === void 0 ? void 0 : error_1.request);
                        return [2 /*return*/, { error: (_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.data, request: error_1 === null || error_1 === void 0 ? void 0 : error_1.request, status: error_1.response ? error_1.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthOperation.prototype.verifyOtp = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/otp/verify"), payload, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_2 = _c.sent();
                        if (axios_1.default.isAxiosError(error_2)) {
                            console.log("Error sending otp: ", (_a = error_2.response) === null || _a === void 0 ? void 0 : _a.data);
                        }
                        else {
                            console.log("Error sending otp: ", error_2);
                        }
                        console.error("Request that caused the error: ", error_2 === null || error_2 === void 0 ? void 0 : error_2.request);
                        return [2 /*return*/, { error: (_b = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _b === void 0 ? void 0 : _b.data, request: error_2 === null || error_2 === void 0 ? void 0 : error_2.request, status: error_2.response ? error_2.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthOperation.prototype.register = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/basic/register"), payload, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_3 = _c.sent();
                        if (axios_1.default.isAxiosError(error_3)) {
                            console.log("Error sending otp: ", (_a = error_3.response) === null || _a === void 0 ? void 0 : _a.data);
                        }
                        else {
                            console.log("Error sending otp: ", error_3);
                        }
                        console.error("Request that caused the error: ", error_3 === null || error_3 === void 0 ? void 0 : error_3.request);
                        return [2 /*return*/, { error: (_b = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _b === void 0 ? void 0 : _b.data, request: error_3 === null || error_3 === void 0 ? void 0 : error_3.request, status: error_3.response ? error_3.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthOperation.prototype.login = function (payload, loginOption) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/basic/login?option=").concat(loginOption), payload, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_4 = _c.sent();
                        if (axios_1.default.isAxiosError(error_4)) {
                            console.log("Error sending otp: ", (_a = error_4.response) === null || _a === void 0 ? void 0 : _a.data);
                        }
                        else {
                            console.log("Error sending otp: ", error_4);
                        }
                        console.error("Request that caused the error: ", error_4 === null || error_4 === void 0 ? void 0 : error_4.request);
                        return [2 /*return*/, { error: (_b = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _b === void 0 ? void 0 : _b.data, request: error_4 === null || error_4 === void 0 ? void 0 : error_4.request, status: error_4.response ? error_4.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthOperation;
}());
exports.AuthOperation = AuthOperation;
var BusinessOperation = /** @class */ (function () {
    function BusinessOperation() {
        this.baseUrl = "".concat(host, "/business");
    }
    BusinessOperation.prototype.signUp = function (payload, imageFile, token) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append("data", JSON.stringify(payload));
                        formData.append("file", imageFile);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/signup"), formData, {
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer " + token,
                                    "Content-Type": "multipart/form-data"
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_5 = _a.sent();
                        console.error("Error signing up business:", error_5);
                        return [2 /*return*/, this.handleError(error_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BusinessOperation.prototype.update = function (id, payload, imageFile, token) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append("data", JSON.stringify(payload));
                        formData.append("file", imageFile);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/update/").concat(id), formData, {
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer " + token,
                                    "Content-Type": "multipart/form-data"
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_6 = _a.sent();
                        console.error("Error signing up business:", error_6);
                        return [2 /*return*/, this.handleError(error_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BusinessOperation.prototype.searchBusinesses = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer " + token
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_7 = _a.sent();
                        console.error("Error searching businesses:", error_7);
                        return [2 /*return*/, this.handleError(error_7)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BusinessOperation.prototype.assignToAgency = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/agency/assign"), payload, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_8 = _a.sent();
                        console.error("Error assigning business to agency:", error_8);
                        return [2 /*return*/, this.handleError(error_8)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BusinessOperation.prototype.getLicenseFile = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/license/download/").concat(payload.fileId), {
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer " + token
                                },
                                responseType: "blob"
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.data instanceof Blob) {
                            return [2 /*return*/, response.data];
                        }
                        else {
                            console.error("Response is not a Blob:", response.data);
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        console.error("Error getting business license:", error_9);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BusinessOperation.prototype.handleError = function (error) {
        var _a;
        return {
            error: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message,
            request: error.request,
            status: error.response ? error.response.status : null
        };
    };
    return BusinessOperation;
}());
exports.BusinessOperation = BusinessOperation;
var AccountOperation = /** @class */ (function () {
    function AccountOperation() {
        this.baseUrl = host + "/accounts";
    }
    AccountOperation.prototype.updateInfo = function (accountId, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_10;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?accountId=").concat(accountId), payload, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_10 = _c.sent();
                        if (axios_1.default.isAxiosError(error_10)) {
                            console.log("Error sending otp: ", (_a = error_10.response) === null || _a === void 0 ? void 0 : _a.data);
                        }
                        else {
                            console.log("Error sending otp: ", error_10);
                        }
                        console.error("Request that caused the error: ", error_10 === null || error_10 === void 0 ? void 0 : error_10.request);
                        return [2 /*return*/, { error: (_b = error_10 === null || error_10 === void 0 ? void 0 : error_10.response) === null || _b === void 0 ? void 0 : _b.data, request: error_10 === null || error_10 === void 0 ? void 0 : error_10.request, status: error_10.response ? error_10.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountOperation.prototype.updatePassword = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_11;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/password"), payload, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_11 = _c.sent();
                        if (axios_1.default.isAxiosError(error_11)) {
                            console.log("Error sending otp: ", (_a = error_11.response) === null || _a === void 0 ? void 0 : _a.data);
                        }
                        else {
                            console.log("Error sending otp: ", error_11);
                        }
                        console.error("Request that caused the error: ", error_11 === null || error_11 === void 0 ? void 0 : error_11.request);
                        return [2 /*return*/, { error: (_b = error_11 === null || error_11 === void 0 ? void 0 : error_11.response) === null || _b === void 0 ? void 0 : _b.data, request: error_11 === null || error_11 === void 0 ? void 0 : error_11.request, status: error_11.response ? error_11.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountOperation.prototype.search = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_12;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), criteria, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_12 = _c.sent();
                        if (axios_1.default.isAxiosError(error_12)) {
                            console.log("Error sending otp: ", (_a = error_12.response) === null || _a === void 0 ? void 0 : _a.data);
                        }
                        else {
                            console.log("Error sending otp: ", error_12);
                        }
                        console.error("Request that caused the error: ", error_12 === null || error_12 === void 0 ? void 0 : error_12.request);
                        return [2 /*return*/, { error: (_b = error_12 === null || error_12 === void 0 ? void 0 : error_12.response) === null || _b === void 0 ? void 0 : _b.data, request: error_12 === null || error_12 === void 0 ? void 0 : error_12.request, status: error_12.response ? error_12.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AccountOperation;
}());
exports.AccountOperation = AccountOperation;
var CustomerOperation = /** @class */ (function () {
    function CustomerOperation() {
        this.baseUrl = host + "/customer";
    }
    CustomerOperation.prototype.getAuthenticatedCustomerInfo = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_13;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/"), {
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_13 = _c.sent();
                        if (axios_1.default.isAxiosError(error_13)) {
                            console.log("Error getting authenticated customer info: ", (_a = error_13.response) === null || _a === void 0 ? void 0 : _a.data);
                            console.error("Request that caused the error: ", error_13.request);
                            return [2 /*return*/, { error: (_b = error_13.response) === null || _b === void 0 ? void 0 : _b.data, request: error_13.request, status: error_13.response ? error_13.response.status : null }];
                        }
                        else {
                            console.log("Error getting authenticated customer info: ", error_13);
                            return [2 /*return*/, { error: error_13, request: null, status: null }];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CustomerOperation.prototype.updateInfo = function (params, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_14;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?customerId=").concat(params.customerId), payload, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_14 = _c.sent();
                        if (axios_1.default.isAxiosError(error_14)) {
                            console.log("Error sending otp: ", (_a = error_14.response) === null || _a === void 0 ? void 0 : _a.data);
                        }
                        else {
                            console.log("Error sending otp: ", error_14);
                        }
                        console.error("Request that caused the error: ", error_14 === null || error_14 === void 0 ? void 0 : error_14.request);
                        return [2 /*return*/, { error: (_b = error_14 === null || error_14 === void 0 ? void 0 : error_14.response) === null || _b === void 0 ? void 0 : _b.data, request: error_14 === null || error_14 === void 0 ? void 0 : error_14.request, status: error_14.response ? error_14.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CustomerOperation.prototype.search = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_15;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_15 = _c.sent();
                        if (axios_1.default.isAxiosError(error_15)) {
                            console.log("Error sending otp: ", (_a = error_15.response) === null || _a === void 0 ? void 0 : _a.data);
                        }
                        else {
                            console.log("Error sending otp: ", error_15);
                        }
                        console.error("Request that caused the error: ", error_15 === null || error_15 === void 0 ? void 0 : error_15.request);
                        return [2 /*return*/, { error: (_b = error_15 === null || error_15 === void 0 ? void 0 : error_15.response) === null || _b === void 0 ? void 0 : _b.data, request: error_15 === null || error_15 === void 0 ? void 0 : error_15.request, status: error_15.response ? error_15.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CustomerOperation.prototype.updateAvatar = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_16;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('avatar', payload.avatar);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/avatar/update"), formData, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_16 = _c.sent();
                        if (axios_1.default.isAxiosError(error_16)) {
                            console.log("Error sending otp: ", (_a = error_16.response) === null || _a === void 0 ? void 0 : _a.data);
                        }
                        else {
                            console.log("Error sending otp: ", error_16);
                        }
                        console.error("Request that caused the error: ", error_16 === null || error_16 === void 0 ? void 0 : error_16.request);
                        return [2 /*return*/, { error: (_b = error_16 === null || error_16 === void 0 ? void 0 : error_16.response) === null || _b === void 0 ? void 0 : _b.data, request: error_16 === null || error_16 === void 0 ? void 0 : error_16.request, status: error_16.response ? error_16.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CustomerOperation.prototype.getAvatar = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_17;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/avatar/get?customerId=").concat(params.customerId), {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_17 = _c.sent();
                        if (axios_1.default.isAxiosError(error_17)) {
                            console.log("Error sending otp: ", (_a = error_17.response) === null || _a === void 0 ? void 0 : _a.data);
                        }
                        else {
                            console.log("Error sending otp: ", error_17);
                        }
                        console.error("Request that caused the error: ", error_17 === null || error_17 === void 0 ? void 0 : error_17.request);
                        return [2 /*return*/, { error: (_b = error_17 === null || error_17 === void 0 ? void 0 : error_17.response) === null || _b === void 0 ? void 0 : _b.data, request: error_17 === null || error_17 === void 0 ? void 0 : error_17.request, status: error_17.response ? error_17.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CustomerOperation;
}());
exports.CustomerOperation = CustomerOperation;
var ShippingBillOperation = /** @class */ (function () {
    function ShippingBillOperation() {
        this.baseUrl = host + '/shipping_bill';
    }
    ShippingBillOperation.prototype.create = function (dto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_18;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), dto, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_18 = _c.sent();
                        console.log("Error creating shipping bill: ", (_a = error_18 === null || error_18 === void 0 ? void 0 : error_18.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_18 === null || error_18 === void 0 ? void 0 : error_18.request);
                        return [2 /*return*/, {
                                success: (_b = error_18 === null || error_18 === void 0 ? void 0 : error_18.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_18 === null || error_18 === void 0 ? void 0 : error_18.request,
                                status: error_18.response ? error_18.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShippingBillOperation.prototype.getByCustomerId = function (customerId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_19;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/customer/get"), {
                                params: { customerId: customerId },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_19 = _c.sent();
                        console.log("Error fetching shipping bill by customer: ", (_a = error_19 === null || error_19 === void 0 ? void 0 : error_19.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_19 === null || error_19 === void 0 ? void 0 : error_19.request);
                        return [2 /*return*/, {
                                success: (_b = error_19 === null || error_19 === void 0 ? void 0 : error_19.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_19 === null || error_19 === void 0 ? void 0 : error_19.request,
                                status: error_19.response ? error_19.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShippingBillOperation.prototype.search = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_20;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_20 = _c.sent();
                        console.log("Error searching shipping bills: ", (_a = error_20 === null || error_20 === void 0 ? void 0 : error_20.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_20 === null || error_20 === void 0 ? void 0 : error_20.request);
                        return [2 /*return*/, {
                                success: (_b = error_20 === null || error_20 === void 0 ? void 0 : error_20.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_20 === null || error_20 === void 0 ? void 0 : error_20.request,
                                status: error_20.response ? error_20.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ShippingBillOperation;
}());
exports.ShippingBillOperation = ShippingBillOperation;
var GiftOrderTopicOperation = /** @class */ (function () {
    function GiftOrderTopicOperation() {
        this.baseUrl = host + '/gift_order_topic';
    }
    // ADMIN
    GiftOrderTopicOperation.prototype.create = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_21;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_21 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_21 === null || error_21 === void 0 ? void 0 : error_21.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_21 === null || error_21 === void 0 ? void 0 : error_21.request);
                        return [2 /*return*/, { success: (_b = error_21 === null || error_21 === void 0 ? void 0 : error_21.response) === null || _b === void 0 ? void 0 : _b.data, request: error_21 === null || error_21 === void 0 ? void 0 : error_21.request, status: error_21.response ? error_21.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GiftOrderTopicOperation.prototype.findAll = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_22;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get"), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_22 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_22 === null || error_22 === void 0 ? void 0 : error_22.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_22 === null || error_22 === void 0 ? void 0 : error_22.request);
                        return [2 /*return*/, { success: (_b = error_22 === null || error_22 === void 0 ? void 0 : error_22.response) === null || _b === void 0 ? void 0 : _b.data, request: error_22 === null || error_22 === void 0 ? void 0 : error_22.request, status: error_22.response ? error_22.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return GiftOrderTopicOperation;
}());
exports.GiftOrderTopicOperation = GiftOrderTopicOperation;
var CargoInsuranceOperation = /** @class */ (function () {
    function CargoInsuranceOperation() {
        this.baseUrl = host + '/cargo_insurance';
    }
    CargoInsuranceOperation.prototype.getByCustomerId = function (orderId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_23;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/order/get/").concat(orderId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_23 = _c.sent();
                        console.log("Error fetching cargo insurance: ", (_a = error_23 === null || error_23 === void 0 ? void 0 : error_23.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_23 === null || error_23 === void 0 ? void 0 : error_23.request);
                        return [2 /*return*/, {
                                success: (_b = error_23 === null || error_23 === void 0 ? void 0 : error_23.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_23 === null || error_23 === void 0 ? void 0 : error_23.request,
                                status: error_23.response ? error_23.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CargoInsuranceOperation.prototype.update = function (updateDto, id, token, files) {
        return __awaiter(this, void 0, void 0, function () {
            var formData_1, response, error_24;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData_1 = new FormData();
                        // Append all fields from updateDto to formData
                        Object.keys(updateDto).forEach(function (key) {
                            formData_1.append(key, updateDto[key]);
                        });
                        // If there are files, append them to formData
                        if (files && files.length > 0) {
                            files.forEach(function (file) { return formData_1.append("file", file); });
                        }
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), formData_1, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_24 = _c.sent();
                        console.log("Error updating cargo insurance: ", (_a = error_24 === null || error_24 === void 0 ? void 0 : error_24.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_24 === null || error_24 === void 0 ? void 0 : error_24.request);
                        return [2 /*return*/, {
                                success: (_b = error_24 === null || error_24 === void 0 ? void 0 : error_24.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_24 === null || error_24 === void 0 ? void 0 : error_24.request,
                                status: error_24.response ? error_24.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CargoInsuranceOperation.prototype.create = function (payload, orderId, token, files) {
        return __awaiter(this, void 0, void 0, function () {
            var formData_2, response, error_25;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData_2 = new FormData();
                        // Append all fields from payload to formData
                        Object.keys(payload).forEach(function (key) {
                            formData_2.append(key, payload[key]);
                        });
                        // If there are files, append them to formData
                        if (files && files.length > 0) {
                            files.forEach(function (file) { return formData_2.append("file", file); });
                        }
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create/").concat(orderId), formData_2, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_25 = _c.sent();
                        console.log("Error creating cargo insurance: ", (_a = error_25 === null || error_25 === void 0 ? void 0 : error_25.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_25 === null || error_25 === void 0 ? void 0 : error_25.request);
                        return [2 /*return*/, {
                                success: (_b = error_25 === null || error_25 === void 0 ? void 0 : error_25.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_25 === null || error_25 === void 0 ? void 0 : error_25.request,
                                status: error_25.response ? error_25.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CargoInsuranceOperation;
}());
exports.CargoInsuranceOperation = CargoInsuranceOperation;
var MapOperation = /** @class */ (function () {
    function MapOperation() {
    }
    MapOperation.prototype.getCoordinates = function (address, ggmapkey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, location_1, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("https://maps.googleapis.com/maps/api/geocode/json", {
                                params: {
                                    address: address,
                                    key: ggmapkey,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.data.status === "OK") {
                            location_1 = response.data.results[0].geometry.location;
                            return [2 /*return*/, { lat: location_1.lat, lng: location_1.lng }];
                        }
                        else {
                            console.error("Lỗi khi lấy tọa độ:", response.data.status);
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_26 = _a.sent();
                        console.error("Lỗi API Google Geocoding:", error_26);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MapOperation;
}());
exports.MapOperation = MapOperation;
var OrdersOperation = /** @class */ (function () {
    function OrdersOperation() {
        this.baseUrl = host + "/order";
    }
    OrdersOperation.prototype.create = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_27;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append("data", JSON.stringify(payload));
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), formData, {
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer " + token,
                                    "Content-Type": "multipart/form-data",
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_27 = _c.sent();
                        console.log("Error creating agency: ", (_a = error_27 === null || error_27 === void 0 ? void 0 : error_27.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_27 === null || error_27 === void 0 ? void 0 : error_27.request);
                        return [2 /*return*/, {
                                error: (_b = error_27 === null || error_27 === void 0 ? void 0 : error_27.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_27 === null || error_27 === void 0 ? void 0 : error_27.request,
                                status: error_27.response ? error_27.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.get = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_28;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer " + token
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, data: response.data.data, message: response.data.message }];
                    case 2:
                        error_28 = _c.sent();
                        console.log("Error getting orders: ", (_a = error_28 === null || error_28 === void 0 ? void 0 : error_28.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_28 === null || error_28 === void 0 ? void 0 : error_28.request);
                        return [2 /*return*/, { error: (_b = error_28 === null || error_28 === void 0 ? void 0 : error_28.response) === null || _b === void 0 ? void 0 : _b.data, request: error_28 === null || error_28 === void 0 ? void 0 : error_28.request, status: error_28.response ? error_28.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.checkExist = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_29;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/check?orderId=").concat(params.orderId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, exist: response.data.existed, message: response.data.message }];
                    case 2:
                        error_29 = _c.sent();
                        console.log("Error checking exist order: ", (_a = error_29 === null || error_29 === void 0 ? void 0 : error_29.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_29 === null || error_29 === void 0 ? void 0 : error_29.request);
                        return [2 /*return*/, { error: (_b = error_29 === null || error_29 === void 0 ? void 0 : error_29.response) === null || _b === void 0 ? void 0 : _b.data, request: error_29 === null || error_29 === void 0 ? void 0 : error_29.request, status: error_29.response ? error_29.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.update = function (payload, params) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_30;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?orderId=").concat(params.orderId), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, data: response.data.data, message: response.data.message }];
                    case 2:
                        error_30 = _c.sent();
                        console.log("Error updating order: ", (_a = error_30 === null || error_30 === void 0 ? void 0 : error_30.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_30 === null || error_30 === void 0 ? void 0 : error_30.request);
                        return [2 /*return*/, { error: (_b = error_30 === null || error_30 === void 0 ? void 0 : error_30.response) === null || _b === void 0 ? void 0 : _b.data, request: error_30 === null || error_30 === void 0 ? void 0 : error_30.request, status: error_30.response ? error_30.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.cancel = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_31;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/cancel?orderId=").concat(params.orderId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message }];
                    case 2:
                        error_31 = _c.sent();
                        console.log("Error canceling order: ", (_a = error_31 === null || error_31 === void 0 ? void 0 : error_31.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_31 === null || error_31 === void 0 ? void 0 : error_31.request);
                        return [2 /*return*/, { error: (_b = error_31 === null || error_31 === void 0 ? void 0 : error_31.response) === null || _b === void 0 ? void 0 : _b.data, request: error_31 === null || error_31 === void 0 ? void 0 : error_31.request, status: error_31.response ? error_31.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.getShipperWhoTakenOrder = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_32;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/get/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status,
                            }];
                    case 2:
                        error_32 = _c.sent();
                        console.log("Error getting shipper who taken order: ", (_a = error_32 === null || error_32 === void 0 ? void 0 : error_32.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_32 === null || error_32 === void 0 ? void 0 : error_32.request);
                        return [2 /*return*/, {
                                success: (_b = error_32 === null || error_32 === void 0 ? void 0 : error_32.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_32 === null || error_32 === void 0 ? void 0 : error_32.request,
                                status: error_32.response ? error_32.response.status : null,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.calculateFee = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_33;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/fee/calculate"), payload, {
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_33 = _c.sent();
                        console.log("Error calculating fee: ", (_a = error_33 === null || error_33 === void 0 ? void 0 : error_33.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_33 === null || error_33 === void 0 ? void 0 : error_33.request);
                        return [2 /*return*/, { error: (_b = error_33 === null || error_33 === void 0 ? void 0 : error_33.response) === null || _b === void 0 ? void 0 : _b.data, request: error_33 === null || error_33 === void 0 ? void 0 : error_33.request, status: error_33.response ? error_33.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.updateImages = function (payload, params) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, i, response, error_34;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        for (i = 0; i < payload.image.length; i++) {
                            formData.append("image", payload.image[i]);
                        }
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/image/update?orderId=").concat(params.orderId, "&taskId=").concat(params.taskId, "&type=").concat(params.type), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, data: response.data.data, message: response.data.message }];
                    case 2:
                        error_34 = _c.sent();
                        console.log("Error updating order images: ", (_a = error_34 === null || error_34 === void 0 ? void 0 : error_34.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_34 === null || error_34 === void 0 ? void 0 : error_34.request);
                        return [2 /*return*/, { error: (_b = error_34 === null || error_34 === void 0 ? void 0 : error_34.response) === null || _b === void 0 ? void 0 : _b.data, request: error_34 === null || error_34 === void 0 ? void 0 : error_34.request, status: error_34.response ? error_34.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.updateSignature = function (payload, params) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_35;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append("image", payload.image);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/signature/update?orderId=").concat(params.orderId, "&taskId=").concat(params.taskId, "&type=").concat(params.type), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, data: response.data.data, message: response.data.message }];
                    case 2:
                        error_35 = _c.sent();
                        console.log("Error updating order images: ", (_a = error_35 === null || error_35 === void 0 ? void 0 : error_35.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_35 === null || error_35 === void 0 ? void 0 : error_35.request);
                        return [2 /*return*/, { error: (_b = error_35 === null || error_35 === void 0 ? void 0 : error_35.response) === null || _b === void 0 ? void 0 : _b.data, request: error_35 === null || error_35 === void 0 ? void 0 : error_35.request, status: error_35.response ? error_35.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.getImages = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_36;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/image/download?").concat(orderId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_36 = _c.sent();
                        console.log("Error getting order image: ", (_a = error_36 === null || error_36 === void 0 ? void 0 : error_36.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_36 === null || error_36 === void 0 ? void 0 : error_36.request);
                        return [2 /*return*/, { error: (_b = error_36 === null || error_36 === void 0 ? void 0 : error_36.response) === null || _b === void 0 ? void 0 : _b.data, request: error_36 === null || error_36 === void 0 ? void 0 : error_36.request, status: error_36.response ? error_36.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.getSignature = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_37;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/signature/get?orderId=").concat(params.orderId, "&type=").concat(params.type), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_37 = _c.sent();
                        console.log("Error getting order signature: ", (_a = error_37 === null || error_37 === void 0 ? void 0 : error_37.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_37 === null || error_37 === void 0 ? void 0 : error_37.request);
                        return [2 /*return*/, { error: (_b = error_37 === null || error_37 === void 0 ? void 0 : error_37.response) === null || _b === void 0 ? void 0 : _b.data, request: error_37 === null || error_37 === void 0 ? void 0 : error_37.request, status: error_37.response ? error_37.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.getOrderJourney = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_38;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipper/current_journey/").concat(id), {
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, data: response.data.data, message: response.data.message }];
                    case 2:
                        error_38 = _c.sent();
                        console.log("Error getting order journey: ", (_a = error_38 === null || error_38 === void 0 ? void 0 : error_38.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_38 === null || error_38 === void 0 ? void 0 : error_38.request);
                        return [2 /*return*/, { error: (_b = error_38 === null || error_38 === void 0 ? void 0 : error_38.response) === null || _b === void 0 ? void 0 : _b.data, request: error_38 === null || error_38 === void 0 ? void 0 : error_38.request, status: error_38.response ? error_38.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrdersOperation;
}());
exports.OrdersOperation = OrdersOperation;
var InvoiceOperation = /** @class */ (function () {
    function InvoiceOperation() {
        this.baseUrl = host + "/invoices";
    }
    InvoiceOperation.prototype.getByOrderId = function (orderId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_39;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/order/").concat(orderId), {
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer " + token,
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_39 = _c.sent();
                        console.log("Error getting invoice: ", (_a = error_39 === null || error_39 === void 0 ? void 0 : error_39.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_39 === null || error_39 === void 0 ? void 0 : error_39.request);
                        return [2 /*return*/, {
                                error: (_b = error_39 === null || error_39 === void 0 ? void 0 : error_39.response) === null || _b === void 0 ? void 0 : _b.data,
                                request: error_39 === null || error_39 === void 0 ? void 0 : error_39.request,
                                status: error_39.response ? error_39.response.status : null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return InvoiceOperation;
}());
exports.InvoiceOperation = InvoiceOperation;
var AdministrativeOperation = /** @class */ (function () {
    function AdministrativeOperation() {
        // this.baseUrl = host + "/administrative";
        this.baseUrl = "https://api.tdlogistics.net.vn/v3/administrative";
    }
    AdministrativeOperation.prototype.get = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_40;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, data: response.data.data, message: response.data.message }];
                    case 2:
                        error_40 = _c.sent();
                        console.error("Error getting administrative: ", (_a = error_40 === null || error_40 === void 0 ? void 0 : error_40.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_40 === null || error_40 === void 0 ? void 0 : error_40.request);
                        return [2 /*return*/, { error: (_b = error_40 === null || error_40 === void 0 ? void 0 : error_40.response) === null || _b === void 0 ? void 0 : _b.data, request: error_40 === null || error_40 === void 0 ? void 0 : error_40.request, status: error_40.response ? error_40.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AdministrativeOperation;
}());
exports.AdministrativeOperation = AdministrativeOperation;
;
;
var StaffOperation = /** @class */ (function () {
    function StaffOperation() {
        this.baseUrl = host + "/staffs";
    }
    // ROLE: any
    StaffOperation.prototype.getAuthenticatedStaffInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_41;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, data: response.data.data, message: response.data.message }];
                    case 2:
                        error_41 = _c.sent();
                        console.log("Error get authenticated staff information: ", (_a = error_41 === null || error_41 === void 0 ? void 0 : error_41.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_41 === null || error_41 === void 0 ? void 0 : error_41.request);
                        return [2 /*return*/, { error: (_b = error_41 === null || error_41 === void 0 ? void 0 : error_41.response) === null || _b === void 0 ? void 0 : _b.data, request: error_41 === null || error_41 === void 0 ? void 0 : error_41.request, status: error_41.response ? error_41.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, TELLER, HUMAN_RESOURCE_MANAGER, COMPLAINTS_SOLVER
    StaffOperation.prototype.findByAdmin = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_42;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, data: response.data.data, message: response.data.message }];
                    case 2:
                        error_42 = _c.sent();
                        console.log("Error getting staffs: ", (_a = error_42 === null || error_42 === void 0 ? void 0 : error_42.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_42 === null || error_42 === void 0 ? void 0 : error_42.request);
                        return [2 /*return*/, { error: (_b = error_42 === null || error_42 === void 0 ? void 0 : error_42.response) === null || _b === void 0 ? void 0 : _b.data, request: error_42 === null || error_42 === void 0 ? void 0 : error_42.request, status: error_42.response ? error_42.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, TELLER, HUMAN_RESOURCE_MANAGER, COMPLAINTS_SOLVER
    StaffOperation.prototype.findByAgency = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_43;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, data: response.data.data, message: response.data.message }];
                    case 2:
                        error_43 = _c.sent();
                        console.log("Error getting staffs: ", (_a = error_43 === null || error_43 === void 0 ? void 0 : error_43.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_43 === null || error_43 === void 0 ? void 0 : error_43.request);
                        return [2 /*return*/, { error: (_b = error_43 === null || error_43 === void 0 ? void 0 : error_43.response) === null || _b === void 0 ? void 0 : _b.data, request: error_43 === null || error_43 === void 0 ? void 0 : error_43.request, status: error_43.response ? error_43.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER
    StaffOperation.prototype.createByAdmin = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_44;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_44 = _c.sent();
                        console.log("Error create new staff: ", (_a = error_44 === null || error_44 === void 0 ? void 0 : error_44.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_44 === null || error_44 === void 0 ? void 0 : error_44.request);
                        return [2 /*return*/, { error: (_b = error_44 === null || error_44 === void 0 ? void 0 : error_44.response) === null || _b === void 0 ? void 0 : _b.data, request: error_44 === null || error_44 === void 0 ? void 0 : error_44.request, status: error_44.response ? error_44.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffOperation.prototype.createByAgency = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_45;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message, data: response.data.data }];
                    case 2:
                        error_45 = _c.sent();
                        console.log("Error create new staff: ", (_a = error_45 === null || error_45 === void 0 ? void 0 : error_45.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_45 === null || error_45 === void 0 ? void 0 : error_45.request);
                        return [2 /*return*/, { error: (_b = error_45 === null || error_45 === void 0 ? void 0 : error_45.response) === null || _b === void 0 ? void 0 : _b.data, request: error_45 === null || error_45 === void 0 ? void 0 : error_45.request, status: error_45.response ? error_45.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffOperation.prototype.update = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_46;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?staffId=").concat(condition.staffId), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message, data: response.data.data }];
                    case 2:
                        error_46 = _c.sent();
                        console.log("Error create new staff: ", (_a = error_46 === null || error_46 === void 0 ? void 0 : error_46.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_46 === null || error_46 === void 0 ? void 0 : error_46.request);
                        return [2 /*return*/, { error: (_b = error_46 === null || error_46 === void 0 ? void 0 : error_46.response) === null || _b === void 0 ? void 0 : _b.data, request: error_46 === null || error_46 === void 0 ? void 0 : error_46.request, status: error_46.response ? error_46.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffOperation.prototype.getManagedWards = function (staffId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_47;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/managed_wards/get?staffId=").concat(staffId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message, data: response.data.data }];
                    case 2:
                        error_47 = _c.sent();
                        console.log("Error getting managed wards: ", (_a = error_47 === null || error_47 === void 0 ? void 0 : error_47.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_47 === null || error_47 === void 0 ? void 0 : error_47.request);
                        return [2 /*return*/, { error: (_b = error_47 === null || error_47 === void 0 ? void 0 : error_47.response) === null || _b === void 0 ? void 0 : _b.data, request: error_47 === null || error_47 === void 0 ? void 0 : error_47.request, status: error_47.response ? error_47.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffOperation.prototype.deleteStaff = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_48;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?staffId=").concat(condition.staffId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_48 = _c.sent();
                        console.log("Error deleting staff: ", (_a = error_48 === null || error_48 === void 0 ? void 0 : error_48.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_48 === null || error_48 === void 0 ? void 0 : error_48.request);
                        return [2 /*return*/, { error: (_b = error_48 === null || error_48 === void 0 ? void 0 : error_48.response) === null || _b === void 0 ? void 0 : _b.data, request: error_48 === null || error_48 === void 0 ? void 0 : error_48.request, status: error_48.response ? error_48.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffOperation.prototype.updateAvatar = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_49;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('avatar', info.avatar);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/avatar/update?staffId=").concat(condition.staffId), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_49 = _c.sent();
                        console.error('Error uploading image:', (_a = error_49 === null || error_49 === void 0 ? void 0 : error_49.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_49 === null || error_49 === void 0 ? void 0 : error_49.request);
                        return [2 /*return*/, { error: (_b = error_49 === null || error_49 === void 0 ? void 0 : error_49.response) === null || _b === void 0 ? void 0 : _b.data, request: error_49 === null || error_49 === void 0 ? void 0 : error_49.request, status: error_49.response ? error_49.response.status : null }]; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: any
    StaffOperation.prototype.getAvatar = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_50;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/avatar/get?staffId=").concat(condition.staffId), {
                                withCredentials: true,
                                responseType: 'arraybuffer',
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_50 = _a.sent();
                        console.error("Error getting avatar: ", error_50);
                        return [2 /*return*/, error_50.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return StaffOperation;
}());
exports.StaffOperation = StaffOperation;
var TransportPartnerStaffOperation = /** @class */ (function () {
    function TransportPartnerStaffOperation() {
        this.baseUrl = host + "/partner_staffs";
    }
    TransportPartnerStaffOperation.prototype.getAuthenticatedStaffInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_51;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, data: response.data.data, message: response.data.message }];
                    case 2:
                        error_51 = _c.sent();
                        console.log("Error get authenticated staff information: ", (_a = error_51 === null || error_51 === void 0 ? void 0 : error_51.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_51 === null || error_51 === void 0 ? void 0 : error_51.request);
                        return [2 /*return*/, { error: (_b = error_51 === null || error_51 === void 0 ? void 0 : error_51.response) === null || _b === void 0 ? void 0 : _b.data, request: error_51 === null || error_51 === void 0 ? void 0 : error_51.request, status: error_51.response ? error_51.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnerStaffOperation.prototype.createByAdmin = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_52;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_52 = _c.sent();
                        console.log("Error creating partner staff: ", (_a = error_52 === null || error_52 === void 0 ? void 0 : error_52.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_52 === null || error_52 === void 0 ? void 0 : error_52.request);
                        return [2 /*return*/, { error: (_b = error_52 === null || error_52 === void 0 ? void 0 : error_52.response) === null || _b === void 0 ? void 0 : _b.data, request: error_52 === null || error_52 === void 0 ? void 0 : error_52.request, status: error_52.response ? error_52.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnerStaffOperation.prototype.createByAgency = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_53;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_53 = _c.sent();
                        console.log("Error creating partner staff: ", (_a = error_53 === null || error_53 === void 0 ? void 0 : error_53.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_53 === null || error_53 === void 0 ? void 0 : error_53.request);
                        return [2 /*return*/, { error: (_b = error_53 === null || error_53 === void 0 ? void 0 : error_53.response) === null || _b === void 0 ? void 0 : _b.data, request: error_53 === null || error_53 === void 0 ? void 0 : error_53.request, status: error_53.response ? error_53.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnerStaffOperation.prototype.searchByAdmin = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_54;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), criteria, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_54 = _c.sent();
                        console.log("Error searching partner staff: ", (_a = error_54 === null || error_54 === void 0 ? void 0 : error_54.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_54 === null || error_54 === void 0 ? void 0 : error_54.request);
                        return [2 /*return*/, { error: (_b = error_54 === null || error_54 === void 0 ? void 0 : error_54.response) === null || _b === void 0 ? void 0 : _b.data, request: error_54 === null || error_54 === void 0 ? void 0 : error_54.request, status: error_54.response ? error_54.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnerStaffOperation.prototype.searchByAgency = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_55;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), criteria, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_55 = _c.sent();
                        console.log("Error searching partner staff: ", (_a = error_55 === null || error_55 === void 0 ? void 0 : error_55.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_55 === null || error_55 === void 0 ? void 0 : error_55.request);
                        return [2 /*return*/, { error: (_b = error_55 === null || error_55 === void 0 ? void 0 : error_55.response) === null || _b === void 0 ? void 0 : _b.data, request: error_55 === null || error_55 === void 0 ? void 0 : error_55.request, status: error_55.response ? error_55.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnerStaffOperation.prototype.update = function (params, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_56;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?staffId=").concat(params.staffId), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_56 = _c.sent();
                        console.log("Error updating partner staff: ", (_a = error_56 === null || error_56 === void 0 ? void 0 : error_56.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_56 === null || error_56 === void 0 ? void 0 : error_56.request);
                        return [2 /*return*/, { error: (_b = error_56 === null || error_56 === void 0 ? void 0 : error_56.response) === null || _b === void 0 ? void 0 : _b.data, request: error_56 === null || error_56 === void 0 ? void 0 : error_56.request, status: error_56.response ? error_56.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnerStaffOperation.prototype.deleteStaff = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_57;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?staffId=").concat(params.staffId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_57 = _c.sent();
                        console.log("Error deleting partner staff: ", (_a = error_57 === null || error_57 === void 0 ? void 0 : error_57.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_57 === null || error_57 === void 0 ? void 0 : error_57.request);
                        return [2 /*return*/, { error: (_b = error_57 === null || error_57 === void 0 ? void 0 : error_57.response) === null || _b === void 0 ? void 0 : _b.data, request: error_57 === null || error_57 === void 0 ? void 0 : error_57.request, status: error_57.response ? error_57.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TransportPartnerStaffOperation;
}());
exports.TransportPartnerStaffOperation = TransportPartnerStaffOperation;
var TransportPartnerOperation = /** @class */ (function () {
    function TransportPartnerOperation() {
        this.baseUrl = host + "/transport_partners";
    }
    TransportPartnerOperation.prototype.createByAdmin = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_58;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_58 = _c.sent();
                        console.log("Error creating transport partner: ", (_a = error_58 === null || error_58 === void 0 ? void 0 : error_58.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_58 === null || error_58 === void 0 ? void 0 : error_58.request);
                        return [2 /*return*/, { error: (_b = error_58 === null || error_58 === void 0 ? void 0 : error_58.response) === null || _b === void 0 ? void 0 : _b.data, request: error_58 === null || error_58 === void 0 ? void 0 : error_58.request, status: error_58.response ? error_58.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnerOperation.prototype.createByAgency = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_59;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_59 = _c.sent();
                        console.log("Error creating transport partner: ", (_a = error_59 === null || error_59 === void 0 ? void 0 : error_59.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_59 === null || error_59 === void 0 ? void 0 : error_59.request);
                        return [2 /*return*/, { error: (_b = error_59 === null || error_59 === void 0 ? void 0 : error_59.response) === null || _b === void 0 ? void 0 : _b.data, request: error_59 === null || error_59 === void 0 ? void 0 : error_59.request, status: error_59.response ? error_59.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnerOperation.prototype.searchByAdmin = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_60;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), criteria, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_60 = _c.sent();
                        console.log("Error searching transport partner: ", (_a = error_60 === null || error_60 === void 0 ? void 0 : error_60.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_60 === null || error_60 === void 0 ? void 0 : error_60.request);
                        return [2 /*return*/, { error: (_b = error_60 === null || error_60 === void 0 ? void 0 : error_60.response) === null || _b === void 0 ? void 0 : _b.data, request: error_60 === null || error_60 === void 0 ? void 0 : error_60.request, status: error_60.response ? error_60.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnerOperation.prototype.searchByAgency = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_61;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), criteria, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_61 = _c.sent();
                        console.log("Error searching transport partner: ", (_a = error_61 === null || error_61 === void 0 ? void 0 : error_61.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_61 === null || error_61 === void 0 ? void 0 : error_61.request);
                        return [2 /*return*/, { error: (_b = error_61 === null || error_61 === void 0 ? void 0 : error_61.response) === null || _b === void 0 ? void 0 : _b.data, request: error_61 === null || error_61 === void 0 ? void 0 : error_61.request, status: error_61.response ? error_61.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnerOperation.prototype.update = function (params, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_62;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?transportPartnerId=").concat(params.transportPartnerId), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_62 = _c.sent();
                        console.log("Error updating transport partner: ", (_a = error_62 === null || error_62 === void 0 ? void 0 : error_62.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_62 === null || error_62 === void 0 ? void 0 : error_62.request);
                        return [2 /*return*/, { error: (_b = error_62 === null || error_62 === void 0 ? void 0 : error_62.response) === null || _b === void 0 ? void 0 : _b.data, request: error_62 === null || error_62 === void 0 ? void 0 : error_62.request, status: error_62.response ? error_62.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnerOperation.prototype.deleteTransportPartner = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_63;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?transportPartnerId=").concat(params.transportPartnerId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_63 = _c.sent();
                        console.log("Error deleting transport partner: ", (_a = error_63 === null || error_63 === void 0 ? void 0 : error_63.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_63 === null || error_63 === void 0 ? void 0 : error_63.request);
                        return [2 /*return*/, { error: (_b = error_63 === null || error_63 === void 0 ? void 0 : error_63.response) === null || _b === void 0 ? void 0 : _b.data, request: error_63 === null || error_63 === void 0 ? void 0 : error_63.request, status: error_63.response ? error_63.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TransportPartnerOperation;
}());
exports.TransportPartnerOperation = TransportPartnerOperation;
var VehicleOperation = /** @class */ (function () {
    function VehicleOperation() {
        this.baseUrl = host + "/vehicles";
    }
    VehicleOperation.prototype.createByAdmin = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_64;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_64 = _c.sent();
                        console.log("Error creating vehicle: ", (_a = error_64 === null || error_64 === void 0 ? void 0 : error_64.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_64 === null || error_64 === void 0 ? void 0 : error_64.request);
                        return [2 /*return*/, { error: (_b = error_64 === null || error_64 === void 0 ? void 0 : error_64.response) === null || _b === void 0 ? void 0 : _b.data, request: error_64 === null || error_64 === void 0 ? void 0 : error_64.request, status: error_64.response ? error_64.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.createByAgency = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_65;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_65 = _c.sent();
                        console.log("Error creating vehicle: ", (_a = error_65 === null || error_65 === void 0 ? void 0 : error_65.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_65 === null || error_65 === void 0 ? void 0 : error_65.request);
                        return [2 /*return*/, { error: (_b = error_65 === null || error_65 === void 0 ? void 0 : error_65.response) === null || _b === void 0 ? void 0 : _b.data, request: error_65 === null || error_65 === void 0 ? void 0 : error_65.request, status: error_65.response ? error_65.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.searchByAdmin = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_66;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), criteria, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_66 = _c.sent();
                        console.log("Error searching vehicle: ", (_a = error_66 === null || error_66 === void 0 ? void 0 : error_66.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_66 === null || error_66 === void 0 ? void 0 : error_66.request);
                        return [2 /*return*/, { error: (_b = error_66 === null || error_66 === void 0 ? void 0 : error_66.response) === null || _b === void 0 ? void 0 : _b.data, request: error_66 === null || error_66 === void 0 ? void 0 : error_66.request, status: error_66.response ? error_66.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.searchByAgency = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_67;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), criteria, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_67 = _c.sent();
                        console.log("Error searching vehicle: ", (_a = error_67 === null || error_67 === void 0 ? void 0 : error_67.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_67 === null || error_67 === void 0 ? void 0 : error_67.request);
                        return [2 /*return*/, { error: (_b = error_67 === null || error_67 === void 0 ? void 0 : error_67.response) === null || _b === void 0 ? void 0 : _b.data, request: error_67 === null || error_67 === void 0 ? void 0 : error_67.request, status: error_67.response ? error_67.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.update = function (params, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_68;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/update?vehicleId=").concat(params.vehicleId), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_68 = _c.sent();
                        console.log("Error updating vehicle: ", (_a = error_68 === null || error_68 === void 0 ? void 0 : error_68.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_68 === null || error_68 === void 0 ? void 0 : error_68.request);
                        return [2 /*return*/, { error: (_b = error_68 === null || error_68 === void 0 ? void 0 : error_68.response) === null || _b === void 0 ? void 0 : _b.data, request: error_68 === null || error_68 === void 0 ? void 0 : error_68.request, status: error_68.response ? error_68.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.deleteVehicle = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_69;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?vehicleId=").concat(params.vehicleId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_69 = _c.sent();
                        console.log("Error deleting vehicle: ", (_a = error_69 === null || error_69 === void 0 ? void 0 : error_69.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_69 === null || error_69 === void 0 ? void 0 : error_69.request);
                        return [2 /*return*/, { error: (_b = error_69 === null || error_69 === void 0 ? void 0 : error_69.response) === null || _b === void 0 ? void 0 : _b.data, request: error_69 === null || error_69 === void 0 ? void 0 : error_69.request, status: error_69.response ? error_69.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.addShipments = function (vehicleId, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_70;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/shipments/add?vehicleId=").concat(vehicleId), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_70 = _c.sent();
                        console.log("Error adding shipments to vehicle: ", (_a = error_70 === null || error_70 === void 0 ? void 0 : error_70.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_70 === null || error_70 === void 0 ? void 0 : error_70.request);
                        return [2 /*return*/, { error: (_b = error_70 === null || error_70 === void 0 ? void 0 : error_70.response) === null || _b === void 0 ? void 0 : _b.data, request: error_70 === null || error_70 === void 0 ? void 0 : error_70.request, status: error_70.response ? error_70.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.removeShipments = function (vehicleId, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_71;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/shipments/delete?vehicleId=").concat(vehicleId), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_71 = _c.sent();
                        console.log("Error removing shipments from vehicle: ", (_a = error_71 === null || error_71 === void 0 ? void 0 : error_71.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_71 === null || error_71 === void 0 ? void 0 : error_71.request);
                        return [2 /*return*/, { error: (_b = error_71 === null || error_71 === void 0 ? void 0 : error_71.response) === null || _b === void 0 ? void 0 : _b.data, request: error_71 === null || error_71 === void 0 ? void 0 : error_71.request, status: error_71.response ? error_71.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.undertakeShiment = function (shipmentId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_72;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/shipments/undertake?shipmentId=").concat(shipmentId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_72 = _c.sent();
                        console.log("Error undertaking shipment: ", (_a = error_72 === null || error_72 === void 0 ? void 0 : error_72.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_72 === null || error_72 === void 0 ? void 0 : error_72.request);
                        return [2 /*return*/, { error: (_b = error_72 === null || error_72 === void 0 ? void 0 : error_72.response) === null || _b === void 0 ? void 0 : _b.data, request: error_72 === null || error_72 === void 0 ? void 0 : error_72.request, status: error_72.response ? error_72.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return VehicleOperation;
}());
exports.VehicleOperation = VehicleOperation;
var AgencyType;
(function (AgencyType) {
    AgencyType[AgencyType["BC"] = 0] = "BC";
    AgencyType[AgencyType["DL"] = 1] = "DL";
    AgencyType[AgencyType["TD"] = 2] = "TD";
})(AgencyType || (exports.AgencyType = AgencyType = {}));
var AgencyOperation = /** @class */ (function () {
    function AgencyOperation() {
        this.baseUrl = host + "/agencies";
    }
    AgencyOperation.prototype.create = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_73;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer " + token
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_73 = _c.sent();
                        console.log("Error creating agency: ", (_a = error_73 === null || error_73 === void 0 ? void 0 : error_73.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_73 === null || error_73 === void 0 ? void 0 : error_73.request);
                        return [2 /*return*/, { error: (_b = error_73 === null || error_73 === void 0 ? void 0 : error_73.response) === null || _b === void 0 ? void 0 : _b.data, request: error_73 === null || error_73 === void 0 ? void 0 : error_73.request, status: error_73.response ? error_73.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.search = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_74;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), criteria, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_74 = _c.sent();
                        console.log("Error searching agency: ", (_a = error_74 === null || error_74 === void 0 ? void 0 : error_74.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_74 === null || error_74 === void 0 ? void 0 : error_74.request);
                        return [2 /*return*/, { error: (_b = error_74 === null || error_74 === void 0 ? void 0 : error_74.response) === null || _b === void 0 ? void 0 : _b.data, request: error_74 === null || error_74 === void 0 ? void 0 : error_74.request, status: error_74.response ? error_74.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.update = function (agencyId, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_75;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?agencyId=").concat(agencyId), payload, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_75 = _c.sent();
                        console.log("Error updating agency: ", (_a = error_75 === null || error_75 === void 0 ? void 0 : error_75.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_75 === null || error_75 === void 0 ? void 0 : error_75.request);
                        return [2 /*return*/, { error: (_b = error_75 === null || error_75 === void 0 ? void 0 : error_75.response) === null || _b === void 0 ? void 0 : _b.data, request: error_75 === null || error_75 === void 0 ? void 0 : error_75.request, status: error_75.response ? error_75.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.deleteAgency = function (agencyId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_76;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?agencyId=").concat(agencyId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { error: response.data.error, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_76 = _c.sent();
                        console.log("Error deleting agency: ", (_a = error_76 === null || error_76 === void 0 ? void 0 : error_76.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_76 === null || error_76 === void 0 ? void 0 : error_76.request);
                        return [2 /*return*/, { error: (_b = error_76 === null || error_76 === void 0 ? void 0 : error_76.response) === null || _b === void 0 ? void 0 : _b.data, request: error_76 === null || error_76 === void 0 ? void 0 : error_76.request, status: error_76.response ? error_76.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AgencyOperation;
}());
exports.AgencyOperation = AgencyOperation;
var ShipmentsOperation = /** @class */ (function () {
    function ShipmentsOperation() {
        this.baseUrl = host + "/shipments";
    }
    ShipmentsOperation.prototype.check = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_77;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/check?shipmentId=").concat(condition.shipmentId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, existed: data.existed, message: data.message }];
                    case 2:
                        error_77 = _c.sent();
                        console.log("Error checking exist shipment: ", (_a = error_77 === null || error_77 === void 0 ? void 0 : error_77.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_77 === null || error_77 === void 0 ? void 0 : error_77.request);
                        return [2 /*return*/, { error: (_b = error_77 === null || error_77 === void 0 ? void 0 : error_77.response) === null || _b === void 0 ? void 0 : _b.data, request: error_77 === null || error_77 === void 0 ? void 0 : error_77.request, status: error_77.response ? error_77.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // async getAllAgencies() {
    //     try {
    // 		const response = await axios.get(`${this.baseUrl}/get_agencies`, {
    // 			withCredentials: true,
    // 		});
    // 		const data = response.data;
    // 		return { error: data.error, data: data.data, message: data.message };
    // 	} catch (error: any) {
    // 		console.log("Error getting all agencies: ", error?.response?.data);
    //         console.error("Request that caused the error: ", error?.request);
    //         return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
    // 	}
    // }
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.create = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_78;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_78 = _c.sent();
                        console.log("Error creating shipment: ", (_a = error_78 === null || error_78 === void 0 ? void 0 : error_78.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_78 === null || error_78 === void 0 ? void 0 : error_78.request);
                        return [2 /*return*/, { error: (_b = error_78 === null || error_78 === void 0 ? void 0 : error_78.response) === null || _b === void 0 ? void 0 : _b.data, request: error_78 === null || error_78 === void 0 ? void 0 : error_78.request, status: error_78.response ? error_78.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentsOperation.prototype.getOrdersFromShipment = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_79;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_orders?shipmentId=").concat(condition.shipmentId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_79 = _c.sent();
                        console.log("Error getting orders from shipment: ", (_a = error_79 === null || error_79 === void 0 ? void 0 : error_79.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_79 === null || error_79 === void 0 ? void 0 : error_79.request);
                        return [2 /*return*/, { error: (_b = error_79 === null || error_79 === void 0 ? void 0 : error_79.response) === null || _b === void 0 ? void 0 : _b.data, request: error_79 === null || error_79 === void 0 ? void 0 : error_79.request, status: error_79.response ? error_79.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.addOrdersToShipment = function (condition, info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_80;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/add_orders?shipmentId=").concat(condition.shipmentId), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_80 = _c.sent();
                        console.log("Error adding orders to shipment: ", (_a = error_80 === null || error_80 === void 0 ? void 0 : error_80.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_80 === null || error_80 === void 0 ? void 0 : error_80.request);
                        return [2 /*return*/, { error: (_b = error_80 === null || error_80 === void 0 ? void 0 : error_80.response) === null || _b === void 0 ? void 0 : _b.data, request: error_80 === null || error_80 === void 0 ? void 0 : error_80.request, status: error_80.response ? error_80.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.deleteOrderFromShipment = function (condition, info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_81;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/remove_orders?shipmentId=").concat(condition.shipmentId), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_81 = _c.sent();
                        console.log("Error deleting order from shipment: ", (_a = error_81 === null || error_81 === void 0 ? void 0 : error_81.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_81 === null || error_81 === void 0 ? void 0 : error_81.request);
                        return [2 /*return*/, { error: (_b = error_81 === null || error_81 === void 0 ? void 0 : error_81.response) === null || _b === void 0 ? void 0 : _b.data, request: error_81 === null || error_81 === void 0 ? void 0 : error_81.request, status: error_81.response ? error_81.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.confirmCreate = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_82;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/confirm_create"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_82 = _c.sent();
                        console.log("Error confirming creat shipment: ", (_a = error_82 === null || error_82 === void 0 ? void 0 : error_82.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_82 === null || error_82 === void 0 ? void 0 : error_82.request);
                        return [2 /*return*/, { error: (_b = error_82 === null || error_82 === void 0 ? void 0 : error_82.response) === null || _b === void 0 ? void 0 : _b.data, request: error_82 === null || error_82 === void 0 ? void 0 : error_82.request, status: error_82.response ? error_82.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.get = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_83;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_83 = _c.sent();
                        console.log("Error getting shipments: ", (_a = error_83 === null || error_83 === void 0 ? void 0 : error_83.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_83 === null || error_83 === void 0 ? void 0 : error_83.request);
                        return [2 /*return*/, { error: (_b = error_83 === null || error_83 === void 0 ? void 0 : error_83.response) === null || _b === void 0 ? void 0 : _b.data, request: error_83 === null || error_83 === void 0 ? void 0 : error_83.request, status: error_83.response ? error_83.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.delete = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_84;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?shipmentId=").concat(condition.shipmentId), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_84 = _c.sent();
                        console.log("Error deleting shipment: ", (_a = error_84 === null || error_84 === void 0 ? void 0 : error_84.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_84 === null || error_84 === void 0 ? void 0 : error_84.request);
                        return [2 /*return*/, { error: (_b = error_84 === null || error_84 === void 0 ? void 0 : error_84.response) === null || _b === void 0 ? void 0 : _b.data, request: error_84 === null || error_84 === void 0 ? void 0 : error_84.request, status: error_84.response ? error_84.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.decompose = function (condition, info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_85;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/decompose?shipmentId=").concat(condition.shipmentId), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_85 = _c.sent();
                        console.log("Error decomposing shipment: ", (_a = error_85 === null || error_85 === void 0 ? void 0 : error_85.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_85 === null || error_85 === void 0 ? void 0 : error_85.request);
                        return [2 /*return*/, { error: (_b = error_85 === null || error_85 === void 0 ? void 0 : error_85.response) === null || _b === void 0 ? void 0 : _b.data, request: error_85 === null || error_85 === void 0 ? void 0 : error_85.request, status: error_85.response ? error_85.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.receive = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_86;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/receive"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_86 = _c.sent();
                        console.log("Error receiving shipment: ", (_a = error_86 === null || error_86 === void 0 ? void 0 : error_86.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_86 === null || error_86 === void 0 ? void 0 : error_86.request);
                        return [2 /*return*/, { error: (_b = error_86 === null || error_86 === void 0 ? void 0 : error_86.response) === null || _b === void 0 ? void 0 : _b.data, request: error_86 === null || error_86 === void 0 ? void 0 : error_86.request, status: error_86.response ? error_86.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: SHIPPER, AGENCY_SHIPPER, PARTNER_SHIPPER
    ShipmentsOperation.prototype.undertake = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_87;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/undertake"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_87 = _c.sent();
                        console.log("Error undertaking shipment: ", (_a = error_87 === null || error_87 === void 0 ? void 0 : error_87.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_87 === null || error_87 === void 0 ? void 0 : error_87.request);
                        return [2 /*return*/, { error: (_b = error_87 === null || error_87 === void 0 ? void 0 : error_87.response) === null || _b === void 0 ? void 0 : _b.data, request: error_87 === null || error_87 === void 0 ? void 0 : error_87.request, status: error_87.response ? error_87.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER
    ShipmentsOperation.prototype.approve = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_88;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/accept?shipmentId=").concat(condition.shipmentId), null, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_88 = _c.sent();
                        console.log("Error approve shipment: ", (_a = error_88 === null || error_88 === void 0 ? void 0 : error_88.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_88 === null || error_88 === void 0 ? void 0 : error_88.request);
                        return [2 /*return*/, { error: (_b = error_88 === null || error_88 === void 0 ? void 0 : error_88.response) === null || _b === void 0 ? void 0 : _b.data, request: error_88 === null || error_88 === void 0 ? void 0 : error_88.request, status: error_88.response ? error_88.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ShipmentsOperation;
}());
exports.ShipmentsOperation = ShipmentsOperation;
var ShippersOperation = /** @class */ (function () {
    function ShippersOperation() {
        this.baseUrl = host + "/tasks/shippers";
    }
    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    ShippersOperation.prototype.getObjectsCanHandleTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_89;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_objects"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_89 = _c.sent();
                        console.log("Error getting object can handle task: ", (_a = error_89 === null || error_89 === void 0 ? void 0 : error_89.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_89 === null || error_89 === void 0 ? void 0 : error_89.request);
                        return [2 /*return*/, { error: (_b = error_89 === null || error_89 === void 0 ? void 0 : error_89.response) === null || _b === void 0 ? void 0 : _b.data, request: error_89 === null || error_89 === void 0 ? void 0 : error_89.request, status: error_89.response ? error_89.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    ShippersOperation.prototype.createNewTasks = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_90;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_90 = _c.sent();
                        console.log("Error creating new tasks: ", (_a = error_90 === null || error_90 === void 0 ? void 0 : error_90.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_90 === null || error_90 === void 0 ? void 0 : error_90.request);
                        return [2 /*return*/, { error: (_b = error_90 === null || error_90 === void 0 ? void 0 : error_90.response) === null || _b === void 0 ? void 0 : _b.data, request: error_90 === null || error_90 === void 0 ? void 0 : error_90.request, status: error_90.response ? error_90.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, AGENCY_SHIPPER
    ShippersOperation.prototype.getTask = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_91;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/get"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_91 = _c.sent();
                        console.log("Error getting tasks: ", (_a = error_91 === null || error_91 === void 0 ? void 0 : error_91.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_91 === null || error_91 === void 0 ? void 0 : error_91.request);
                        return [2 /*return*/, { error: (_b = error_91 === null || error_91 === void 0 ? void 0 : error_91.response) === null || _b === void 0 ? void 0 : _b.data, request: error_91 === null || error_91 === void 0 ? void 0 : error_91.request, status: error_91.response ? error_91.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_SHIPPER
    ShippersOperation.prototype.confirmCompletedTask = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_92;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/complete?id=").concat(condition.id), null, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_92 = _c.sent();
                        console.log("Error confirming completed task: ", (_a = error_92 === null || error_92 === void 0 ? void 0 : error_92.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_92 === null || error_92 === void 0 ? void 0 : error_92.request);
                        return [2 /*return*/, { error: (_b = error_92 === null || error_92 === void 0 ? void 0 : error_92.response) === null || _b === void 0 ? void 0 : _b.data, request: error_92 === null || error_92 === void 0 ? void 0 : error_92.request, status: error_92.response ? error_92.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, AGENCY_SHIPPER 
    ShippersOperation.prototype.getHistory = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_93;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/history/get"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_93 = _c.sent();
                        console.log("Error getting history: ", (_a = error_93 === null || error_93 === void 0 ? void 0 : error_93.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_93 === null || error_93 === void 0 ? void 0 : error_93.request);
                        return [2 /*return*/, { error: (_b = error_93 === null || error_93 === void 0 ? void 0 : error_93.response) === null || _b === void 0 ? void 0 : _b.data, request: error_93 === null || error_93 === void 0 ? void 0 : error_93.request, status: error_93.response ? error_93.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    ShippersOperation.prototype.deleteTask = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_94;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/delete"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_94 = _c.sent();
                        console.log("Error deleting task: ", (_a = error_94 === null || error_94 === void 0 ? void 0 : error_94.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_94 === null || error_94 === void 0 ? void 0 : error_94.request);
                        return [2 /*return*/, { error: (_b = error_94 === null || error_94 === void 0 ? void 0 : error_94.response) === null || _b === void 0 ? void 0 : _b.data, request: error_94 === null || error_94 === void 0 ? void 0 : error_94.request, status: error_94.response ? error_94.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ShippersOperation;
}());
exports.ShippersOperation = ShippersOperation;
var DriversOperation = /** @class */ (function () {
    function DriversOperation() {
        this.baseUrl = host + "/tasks/drivers";
    }
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    DriversOperation.prototype.getObjectsCanHandleTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_95;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_objects"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_95 = _c.sent();
                        console.log("Error getting object can handle task: ", (_a = error_95 === null || error_95 === void 0 ? void 0 : error_95.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_95 === null || error_95 === void 0 ? void 0 : error_95.request);
                        return [2 /*return*/, { error: (_b = error_95 === null || error_95 === void 0 ? void 0 : error_95.response) === null || _b === void 0 ? void 0 : _b.data, request: error_95 === null || error_95 === void 0 ? void 0 : error_95.request, status: error_95.response ? error_95.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    DriversOperation.prototype.createNewTasks = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_96;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_96 = _c.sent();
                        console.log("Error creating new tasks: ", (_a = error_96 === null || error_96 === void 0 ? void 0 : error_96.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_96 === null || error_96 === void 0 ? void 0 : error_96.request);
                        return [2 /*return*/, { error: (_b = error_96 === null || error_96 === void 0 ? void 0 : error_96.response) === null || _b === void 0 ? void 0 : _b.data, request: error_96 === null || error_96 === void 0 ? void 0 : error_96.request, status: error_96.response ? error_96.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, PARTNER_DRIVER
    DriversOperation.prototype.getTask = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_97;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/get"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_97 = _c.sent();
                        console.log("Error getting tasks: ", (_a = error_97 === null || error_97 === void 0 ? void 0 : error_97.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_97 === null || error_97 === void 0 ? void 0 : error_97.request);
                        return [2 /*return*/, { error: (_b = error_97 === null || error_97 === void 0 ? void 0 : error_97.response) === null || _b === void 0 ? void 0 : _b.data, request: error_97 === null || error_97 === void 0 ? void 0 : error_97.request, status: error_97.response ? error_97.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: PARTNER_DRIVER
    DriversOperation.prototype.confirmCompletedTask = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_98;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/complete?id=").concat(condition.id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_98 = _c.sent();
                        console.log("Error confirming completed task: ", (_a = error_98 === null || error_98 === void 0 ? void 0 : error_98.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_98 === null || error_98 === void 0 ? void 0 : error_98.request);
                        return [2 /*return*/, { error: (_b = error_98 === null || error_98 === void 0 ? void 0 : error_98.response) === null || _b === void 0 ? void 0 : _b.data, request: error_98 === null || error_98 === void 0 ? void 0 : error_98.request, status: error_98.response ? error_98.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    DriversOperation.prototype.deleteTask = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_99;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/delete"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_99 = _c.sent();
                        console.log("Error deleting task: ", (_a = error_99 === null || error_99 === void 0 ? void 0 : error_99.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_99 === null || error_99 === void 0 ? void 0 : error_99.request);
                        return [2 /*return*/, { error: (_b = error_99 === null || error_99 === void 0 ? void 0 : error_99.response) === null || _b === void 0 ? void 0 : _b.data, request: error_99 === null || error_99 === void 0 ? void 0 : error_99.request, status: error_99.response ? error_99.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DriversOperation;
}());
exports.DriversOperation = DriversOperation;
//Business
var VoucherOperation = /** @class */ (function () {
    function VoucherOperation() {
        this.baseUrl = host + '/voucher';
    }
    VoucherOperation.prototype.getVouchersByCustomer = function (page, size, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_100;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get"), {
                                params: {
                                    page: page,
                                    size: size
                                },
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_100 = _c.sent();
                        console.log("Error fetching vouchers: ", (_a = error_100 === null || error_100 === void 0 ? void 0 : error_100.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_100 === null || error_100 === void 0 ? void 0 : error_100.request);
                        return [2 /*return*/, { success: (_b = error_100 === null || error_100 === void 0 ? void 0 : error_100.response) === null || _b === void 0 ? void 0 : _b.data, request: error_100 === null || error_100 === void 0 ? void 0 : error_100.request, status: error_100.response ? error_100.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VoucherOperation.prototype.search = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_101;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: response.data.success,
                                message: response.data.message,
                                data: response.data.data,
                                status: response.status
                            }];
                    case 2:
                        error_101 = _c.sent();
                        console.log("Error searching vouchers: ", (_a = error_101 === null || error_101 === void 0 ? void 0 : error_101.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_101 === null || error_101 === void 0 ? void 0 : error_101.request);
                        return [2 /*return*/, { success: (_b = error_101 === null || error_101 === void 0 ? void 0 : error_101.response) === null || _b === void 0 ? void 0 : _b.data, request: error_101 === null || error_101 === void 0 ? void 0 : error_101.request, status: error_101.response ? error_101.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return VoucherOperation;
}());
exports.VoucherOperation = VoucherOperation;
