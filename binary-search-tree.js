class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    let currVal = this.root;
    while (true) {
      if (val < currVal.val) {
        if (currVal.left === null) {
          currVal.left = new Node(val);
          return this;
        } else {
          currVal = currVal.left;
        }
      } else if (val > currVal.val) {
        if (currVal.right === null) {
          currVal.right = new Node(val);
          return this;
        } else {
          currVal = currVal.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currVal = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < currVal.val) {
      if (currVal.left === null) {
        currVal.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, currVal.left);
    } else {
      if (currVal.right === null) {
        currVal.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, currVal.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currNode = this.root;
    let found = false;

    if (val === currNode.val) return currNode;

    while (currNode && !found) {
      if (val < currNode.val) {
        currNode = currNode.left;
      } else if (val > currNode.val) {
        currNode = currNode.right;
      } else {
        found = true;
      }
    }

    if (!found) return undefined;
    return currNode;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currNode = this.root) {
    if (this.root === null) return undefined;

    if (val < currNode.val) {
      if (currNode.left === null) return undefined;
      return this.findRecursively(val, currNode.left);
    } else if (val > currNode.val) {
      if (currNode.right === null) return undefined;
      return this.findRecursively(val, currNode.right);
    }
    return currNode;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let values = [];
    let currNode = this.root;

    function traverse(node) {
      values.push(node.val);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }
    traverse(currNode);
    return values;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let values = [];
    let currNode = this.root;

    function traverse(node) {
      node.left && traverse(node.left);
      values.push(node.val);
      node.right && traverse(node.right);
    }
    traverse(currNode);
    return values;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let values = [];
    let currNode = this.root;

    function traverse(node) {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      values.push(node.val);
    }
    traverse(currNode);
    return values;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let currNode = this.root;
    let queue = [];
    let values = [];

    queue.push(currNode);

    while (queue.length) {
      currNode = queue.shift();
      values.push(currNode.val);
      if (currNode.left) {
        queue.push(currNode.left);
      }
      if (currNode.right) {
        queue.push(currNode.right);
      }
    }
    return values;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let remNode = this.root;
    let parent;

    while (remNode.val !== val) {
      parent = remNode;
      if (val < remNode.val) {
        remNode = remNode.left;
      } else {
        remNode = remNode.right;
      }
    }

    if (remNode !== this.root) {
      if (remNode.left === null && remNode.right === null) {
        if (parent.left === remNode) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (remNode.left !== null && remNode.right !== null) {
        let rightParent = remNode;
        let right = remNode.right;
        if (right.left === null) {
          right.left = remNode.left;
          if (parent.left === remNode) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === remNode) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === remNode) {
          if (remNode.right === null) {
            parent.left = remNode.left;
          } else {
            parent.left = remNode.right;
          }
        } else {
          if (remNode.right === null) {
            parent.right = remNode.left;
          } else {
            parent.right = remNode.right;
          }
        }
      }
    }
    return remNode;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(currNode = this.root) {
    if (currNode === null) return;
    return maxDepth(currNode) - minDepth(currNode) <= 1;

    function minDepth(currNode) {
      if (currNode === null) return 0;
      return 1 + Math.min(minDepth(currNode.left), minDepth(currNode.right));
    }

    function maxDepth(currNode) {
      if (currNode === null) return 0;
      return 1 + Math.max(maxDepth(currNode.left), maxDepth(currNode.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(currNode = this.root) {
    if(!currNode || (!currNode.left && !currNode.right)) return;

    while(currNode){
      if(currNode.left && !currNode.right){
        return this.findSecondHighest(currNode.left);
      }
      if(currNode.right && (!currNode.right.left && !currNode.right.right)){
        return currNode.val;
      }
      currNode = currNode.right;
    }

  }
}

module.exports = BinarySearchTree;
