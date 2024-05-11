"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser = __importStar(require("@babel/parser"));
const traverse_1 = __importDefault(require("@babel/traverse"));
const generator_1 = __importDefault(require("@babel/generator"));
const prettier_1 = __importDefault(require("prettier"));
const fs_1 = __importDefault(require("fs"));
const options = {
    sourceType: "module",
    plugins: [
        "typescript",
    ],
};
function lint(code) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                const formattedCode = prettier_1.default.format(code);
                resolve(formattedCode);
            }, Math.random() * 1000); // random delay between 0 and 1 seconds
        });
    });
}
function lintNode(node) {
    return __awaiter(this, void 0, void 0, function* () {
        // combine all quasis with an indicator
        let quasis = [];
        for (let quasi of node.quasis) {
            quasis.push(quasi.value.raw);
        }
        let combinedString = quasis.join("__MY_STAND_IN_IDENTIFIER__");
        // format the string
        combinedString = yield lint(combinedString);
        // combinedString = prettier.format(combinedString);
        // place the formatted quasis back
        quasis = combinedString.split("__MY_STAND_IN_IDENTIFIER__");
        for (let i in node.quasis) {
            node.quasis[i].value.raw = quasis[i];
        }
        // console.log(node);
        return node;
    });
}
function getNodes(ast, nodes) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, traverse_1.default)(ast, {
            TemplateLiteral(path) {
                var _a;
                if ("leadingComments" in path.node) {
                    const isTSX = (_a = path.node.leadingComments) === null || _a === void 0 ? void 0 : _a.some(comment => comment.value === "tsx");
                    if (!isTSX) {
                        return;
                    } // if it doesn't have the tsx comment, skip
                    nodes.push(path.node);
                }
            }
        });
        return ast;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputPath = "./input.ts";
        let nodes = [];
        const code = fs_1.default.readFileSync(inputPath, 'utf8');
        var ast = parser.parse(code, options);
        getNodes(ast, nodes);
        yield Promise.all(nodes.map(lintNode));
        const lintedCode = (0, generator_1.default)(ast);
        fs_1.default.writeFileSync("output.ts", lintedCode.code);
    });
}
main();
