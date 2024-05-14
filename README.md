# Problem Analysis

## Inputs and Outputs
**Input:** Trees of the nodes of the Figma IR. The root node will contain information about the overall size of the frame

Assume that each node will contain rearrangable DOM elements either in TS code or html templates

## Solution

**Analysis:** Reading in the 'code meta' files, take all the top level keys (except for `components`) and store them as global settings for that layout. Then, create a tree to represent the html elements. Start at the node specified by the `components` key, then traverse through all of the `children` to form a tree with `n` html elements. For the root node, the children is in `layout.children` while for other nodes, the children are in the `children` key. Assign each node a unique identifier using the `nameCml` key. Each node will store information about the element itself along with pointers to its children and parent. Each layout will have one tree and multiple layouts may share trees with 

**Choosing the Layout Based On Screen Size:** 
- For every design, find the 'center' by center = (x + width/2, y + height/2)
- Find the 'center' of the user's screen size by center = (width/2, height/2)
- Iterate against all centers to find the layout that is the 'closest' to the center of the screen size. 
- If there is a need to choose which layout to serve in real time eg. according to the client's size in real time, then use Fortune's Algorithm (O(n lg(n))) to create a voronoi map and determine which layout's 'region' a certain screen size belongs to eg. using CSS breakpoints. 
- Use the previously obtained boundaries to choose which layout to serve to the user

**Grouping Nodes/Subtrees together:** To reduce the amount of redundancy, group repeated subtrees into separate components, then rearrange the components back into a tree based on the layouts whenever there is a need to view a specific layout. 

For analysis/editing, the common subtrees can be treated as common components across the layouts, which can be modified to produce changes across all layouts. 

**Pseudocode:** 

When comparing 2 nodes, they will be 'equal' if they have the same names and all of their children are equal.



checkDuplicate(node1, node2, candidates)
- check if node1 is in the `candidates` array
- compare children of the 2 nodes
- compare parents of the 2 nodes
- for any siblings, run checkDuplicate on all of the leaves
- If any of the above fail, remove node1 from the `candidates` list, and remove all ancestors of node1 from `candidates`
- Else, run checkDuplicate(node1.parent, node2.parent)

createDuplicateSubtrees(tree1, tree2, candidates)
- for tree2, traverse through all of the nodes and store all of them into a `nodes2` hashmap, keyed by the name
- for each node `node` in `leaves1`, run checkDuplicate(candidates[node], nodes2[node])


mergeLayouts(trees: array of trees formed by different layouts)
- for trees[1], traverse through all of the nodes and store all the nodes into a `candidates` hashmap, keyed by the name of the node, and store all of the leaves into a `leaves1` array, as node names
- create a duplicateTrees array
- do a dfs traversal on trees[1] to find the top level nodes which are still in `candidates` to be roots of the duplicate subtrees. 
- when such a root is found, copy the root to the duplicateTrees array
- for all other trees in `trees`, run a dfs traversal where every time it encounters a tree in `candidates`, stop the traversal and update the entry of that subtree in duplicateTrees with the data from that tree


**Edge cases:** 
If 2 trees have no overlap in terms of subtrees, then the resulting document will basically be a concatenation of the 2 documents

It is assumed that names of nodes uniquely identify them within a layout and that if 2 nodes in 2 different layouts share a name, they represent the same component, though they may have different style properties etc. 




