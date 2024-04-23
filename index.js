class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    // this.root = this.buildTree(array);
    this.root = null;
  }

  sortedArray(array) {
    array.sort((a, b) => a - b); // Sort The Array
    let sortedArray = Array.from(new Set(array)); // remove Duplicates

    return sortedArray;
  }

  sortedArrayToBST(array, l, r) {
    if (l > r) return null;
    let m = Math.floor((l + r) / 2);
    let node = new Node(array[m]);

    node.left = this.sortedArrayToBST(array, l, m - 1);
    node.right = this.sortedArrayToBST(array, m + 1, r);
    return node;
  }
  buildTree(array) {
    if (array === null) {
      return;
    }
    let sortedArray = this.sortedArray(array);
    let newRoot = this.sortedArrayToBST(sortedArray, 0, sortedArray.length - 1);
    console.log(sortedArray.length);
    console.log(sortedArray);
    this.root = newRoot;
    return;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root == null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  min(root) {
    console.log(root);
    if (!root.left) {
      return root.value;
    } else {
      return this.min(root.left);
    }
  }
  max(root) {
    if (!root.right) {
      return root.value;
    } else {
      return this.max(root.right);
    }
  }
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    } else {
      if (value < root.value) {
        root.left = this.deleteNode(root.left, value);
      } else if (value > root.value) {
        root.right = this.deleteNode(root.right, value);
      } else {
        if (!root.left && !root.right) {
          return null;
        }
        if (!root.left) {
          return root.right;
        } else if (!root.right) {
          return root.left;
        }
        root.value = this.min(root.right);
        root.right = this.deleteNode(root.right, root.value);
      }
      return root;
    }
  }

  find(value, root = this.root) {
    if (!root) {
      return false;
    } else {
      if (value === root.value) {
        return root;
      } else if (value < root.value) {
        return this.find(value, root.left);
      } else {
        return this.find(value, root.right);
      }
    }
  }

  preOrder(root) {
    if (!root) {
      return [];
    }
    let result = [root.value];
    let leftValues = this.preOrder(root.left);
    let rightValues = this.preOrder(root.right);
    return result.concat(leftValues, rightValues);
  }
  inOrder(root) {
    if (!root) {
      return [];
    }
    let result = [root.value];
    let leftValues = this.inOrder(root.left);
    let rightValues = this.inOrder(root.right);
    return leftValues.concat(result, rightValues);
  }
  postOrder(root) {
    if (!root) {
      return [];
    }
    let result = [root.value];
    let leftValues = this.postOrder(root.left);
    let rightValues = this.postOrder(root.right);
    return leftValues.concat(rightValues, result);
  }

  height(node) {
    if (node == null) {
      return -1;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(node) {
    return this.calculateDepth(this.root, node, 0);
  }

  calculateDepth(currentNode, targetNode, depth) {
    if (currentNode === null) {
      return -1; // Node not found, return -1
    }

    if (currentNode === targetNode) {
      return depth; // Node found, return current depth
    }

    // Recursively search left and right subtrees

    if (targetNode.value < currentNode.value) {
      let leftDepth = this.calculateDepth(
        currentNode.left,
        targetNode,
        depth + 1
      );
      if (leftDepth !== -1) {
        return leftDepth; // Node found in the left subtree
      }
    } else {
      let rightDepth = this.calculateDepth(
        currentNode.right,
        targetNode,
        depth + 1
      );
      return rightDepth; // Node found in the right subtree, or not found at all
    }
  }
  isBalanced(root) {
    let leftSubTreeHeight = this.height(root.left);

    let rightSubTreeHeight = this.height(root.right);
    if (Math.abs(leftSubTreeHeight - rightSubTreeHeight) <= 1) {
      return true;
    } else {
      return false;
    }
  }

  rebalance(root) {
    let newSortedArr = this.preOrder(root);
    this.buildTree(newSortedArr);
    return;
  }
}

///////////////////////
// Print the Tree for an overview in the Console
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

////////////////////////

// a function that returns an array of random numbers every time you call it
const randomArray = function generateArrayContainsRandomNumbers(length) {
  arr = [];
  for (let i = 0; i < length; i++) {
    let num = Math.floor(Math.random() * 100);
    if (num < 100) {
      arr.push(num);
    }
  }
  return arr;
};

// Create a binary search tree from an array of random numbers < 100
let tree = new Tree();
let randomNumbers = randomArray(10); // Generate an array of 10 random numbers
randomNumbers.forEach((num) => tree.insert(num)); // Insert each random number into the tree

prettyPrint(tree.root);
// Confirm that the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced(tree.root));

// Print out all elements in level, pre, post, and in order
// console.log("Level order traversal:", tree.levelOrder(tree.root));s
console.log("Preorder traversal:", tree.preOrder(tree.root));
console.log("Inorder traversal:", tree.inOrder(tree.root));
console.log("Postorder traversal:", tree.postOrder(tree.root));

// Unbalance the tree by adding several numbers > 100
tree.insert(222);
tree.insert(212);
tree.insert(121);

// Confirm that the tree is unbalanced
console.log(
  "Is the tree balanced after adding numbers > 100?",
  tree.isBalanced(tree.root)
);

// Balance the tree
tree.rebalance(tree.root);

// Confirm that the tree is balanced after rebalancing
console.log(
  "Is the tree balanced after rebalancing?",
  tree.isBalanced(tree.root)
);

// Print out all elements in level, pre, post, and in order after rebalancing
// console.log(
//   "Level order traversal after rebalancing:",
//   tree.levelOrder(tree.root)
// );
console.log("Preorder traversal after rebalancing:", tree.preOrder(tree.root));
console.log("Inorder traversal after rebalancing:", tree.inOrder(tree.root));
console.log(
  "Postorder traversal after rebalancing:",
  tree.postOrder(tree.root)
);
