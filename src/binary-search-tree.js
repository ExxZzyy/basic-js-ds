const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor() {
    this.tree = null
  }
  root() {
    return this.tree
  }

  add(data) {
    this.tree = addNode(this.tree, data);
    function addNode(node, data) {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      if (data > node.data) node.right = addNode(node.right, data);
      else node.left = addNode(node.left, data);
      return node;
    }
  }

  has(data) {
      function hasNode(node, data) {
        if (!node) return false;
        if (node.data === data) return true;
        if (data > node.data) return hasNode(node.right, data);
        else return hasNode(node.left, data);
      }
    return hasNode(this.tree, data);
  }

  find(data) {
    function findNode(node, data) {
      if (!node) return null;
      if (node.data === data) return node;
      if (data > node.data) return findNode(node.right, data);
      else return findNode(node.left, data);
    }
    return findNode(this.tree, data);
  }

  remove(data) {
    this.root = removeNode(this.tree, data)
    function removeNode(node, data) {
      if (!node) return null;
      if (data > node.data) {
        node.right = removeNode(node.right, data)
        return node
      } else if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      } else {
        if (!node.left && !node.right) {
          return null
        }
        if (!node.left) {
          node = node.right
          return node
        }
        if (!node.right) {
          node = node.left
          return node
        }
        let rightMin = node.right
        while (rightMin.left) {
          rightMin = rightMin.left
        }
        node.data = rightMin.data
        node.right = removeNode(node.right, rightMin.data)
        return node
      }
    }
  }

  min() {
    let node = this.tree;
    if (!node) return;
    while (node.left) {
      node = node.left
    }
    return node.data
  }

  max() {
    let node = this.tree;
    if (!node) return;
    while (node.right) {
      node = node.right
    }
    return node.data
  }

}