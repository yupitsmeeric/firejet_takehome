# Problem Analysis

## Inputs and Outputs
**Input:** Trees of the nodes of the Figma IR. The root node will contain information about the overall size of the frame

Assume that each node will contain rearrangable DOM elements either in TS code or html templates

## Solution

**Analysis:** Reading in the 'code meta' files, take all the top level keys (except for `components`) and store them as global settings for that layout. Then, create a tree to represent the html elements. Start at the node specified by the `components` key, then traverse through all of the `children` to form a tree with `n` html elements. For the root node, the children is in `layout.children` while for other nodes, the children are in the `children` key. Assign each node a unique identifier using the `nameCml` key. Each node will store information about the element itself along with pointers to its children.  

**Choosing the Layout Based On Screen Size:** 
- For every design, find the 'center' by center = (x + width/2, y + height/2)
- Find the 'center' of the user's screen size by center = (width/2, height/2)
- Iterate against all centers to find the layout that is the 'closest' to the center of the screen size. 
- If there is a need to choose which layout to serve in real time eg. according to the client's size in real time, then use Fortune's Algorithm to create a voronoi map and determine which layout's 'region' a certain screen size belongs to. 
- Use the previously obtained boundaries to choose which layout to serve to the user

**Grouping Nodes/Subtrees together:** To reduce the amount of redundancy, group repeated subtrees into separate components, then rearrange the components back into a tree based on the layouts whenever there is a need to view a specific layout. 

**Pseudocode:** 



