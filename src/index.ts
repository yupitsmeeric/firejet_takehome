import * as parser from "@babel/parser";
import traverse, { Node } from "@babel/traverse";
import generate from "@babel/generator";
import prettier from "prettier";
import fs from "fs";
import { TemplateLiteral } from "@babel/types";


const options: parser.ParserOptions =  {
  sourceType: "module",
  plugins: [
    "typescript",
  ],
};

async function lint(code: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const formattedCode = prettier.format(code);
      resolve(formattedCode);
    }, Math.random() * 1000); // random delay between 0 and 1 seconds
  });
}

async function lintNode(node: TemplateLiteral): Promise<TemplateLiteral> {
  // combine all quasis with an indicator
  let quasis: Array<string> = [];
  for (let quasi of node.quasis){
      quasis.push(quasi.value.raw);
  }
  let combinedString: string = quasis.join("__MY_STAND_IN_IDENTIFIER__");
  // format the string
  combinedString = await lint(combinedString);
  // combinedString = prettier.format(combinedString);
  // place the formatted quasis back
  quasis = combinedString.split("__MY_STAND_IN_IDENTIFIER__");
  for (let i in node.quasis){
      node.quasis[i].value.raw = quasis[i];
  }
  // console.log(node);
  return node;
}

async function getNodes(ast: Node, nodes: Array<TemplateLiteral>) {
  traverse(ast, {
    TemplateLiteral(path){
        if ("leadingComments" in path.node){
        const isTSX = path.node.leadingComments?.some(comment => comment.value === "tsx");
        if (!isTSX){ return; } // if it doesn't have the tsx comment, skip
        
        nodes.push(path.node);
        
        }
    }   
});
return ast;
}

async function main(){
  const inputPath: string = "./input.ts";
  let nodes: Array<TemplateLiteral> = [];
  const code: string = fs.readFileSync(inputPath, 'utf8');
  
  var ast: Node = parser.parse(code, options);

  getNodes(ast, nodes);
  await Promise.all(nodes.map(lintNode));
  const lintedCode = generate(ast);
  fs.writeFileSync("output.ts", lintedCode.code);

}
main();



