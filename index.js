const { parse } = require("@babel/parser");
const traverse= require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");
const fs = require('fs');
const prettier = require("prettier");


const options = {
    plugins: [
        "typescript"
    ],
    sourceType: "unambiguous"
  }

const inputPath = './min_input.ts';

const code = fs.readFileSync(inputPath, 'utf8');

ast = parse(code, options);
// console.log(ast.program.body);

traverse(ast, {
    TemplateLiteral(path){
        if ("leadingComments" in path.node){
        const isTSX = path.node.leadingComments.some(comment => comment.value === "tsx");
        if (!isTSX){ return; } // if it doesn't have the tsx comment, skip
        
        // combine all quasis with an indicator
        quasis = []
        for (quasi of path.node.quasis){
            // console.log(quasi.value.raw);
            quasis.push(quasi.value.raw);
        }
        combinedString = quasis.join("__MY_STAND_IN_IDENTIFIER__");
        // format the string
        combinedString = prettier.format(combinedString);
        // place the formatted quasis back
        quasis = combinedString.split("__MY_STAND_IN_IDENTIFIER__");
        for (i in path.node.quasis){
            path.node.quasis[i].value.raw = quasis[i];
        }
        }
    }   
}
)

const lintedCode = generate(ast);
fs.writeFileSync("output.ts", lintedCode.code);





