# Running
Run `yarn start` to compile and run the file. It will take as its input `input.ts` and write the linted output to `output.ts`.

## Time Complexity
In this script, the text is parsed by babel to form an AST. Then, a traversal operation is done to get all the `TemplateLiteral` nodes and store them. An async operation runs all the `lint` operations on the nodes, which get modified in place. Then, the code is rebuilt from the AST and written out.

To build the AST at the start, the `babel.parse` function needs to tokenise `n` tokens, then parse them according to the specified grammar rules. As each grammar rule should be associated with at least 1 token, there will be `O(n)` vertices in the AST.

The traversal operation will run a DFS on the tree, which has `O(n-1)` edges, and thus takes `O(n)` time. The async operation ran on each node will concatenate all the static statements in the template, run the formatter, then separate them into the original static statements, which should take linear time in total. Rebuilding the code from the AST requires a traversal over all vertices and will take `O(n)` time.

## Space Complexity
We need to store:
- original code text
- AST 
- Array of `TemplateLiteral` nodes
- code from the modified AST

Overall, it will take up `O(n)` space

