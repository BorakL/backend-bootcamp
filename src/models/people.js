"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var personSchema = new mongoose_1.default.Schema({}, { strict: false });
var People = mongoose_1.default.model("People", personSchema);
exports.default = People;
