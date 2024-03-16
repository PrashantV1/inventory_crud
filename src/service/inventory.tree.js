class SearchNode {
    constructor() {
      this.children = {};
      this.data = new Set();
    }
  }
    
  class InvenoryTree {
    constructor() {
      this.root = new SearchNode();
    }
    
    insert(key, data) {
      let currentRoot = this.root;
      for (let i = 0; i < key.length; i++) {
        const index = key[i];
        if (!currentRoot.children[index]) {
          currentRoot.children[index] = new SearchNode();
        }
        currentRoot = currentRoot.children[index];
        currentRoot.data.add(data);
      }
    }
  
    search(searchKey) {
      let currentRoot = this.root;
      for (let i = 0; i < searchKey.length; i++) {
        const key = searchKey[i];
        if (!currentRoot.children[key]) {
          return [];
        }
        currentRoot = currentRoot.children[key];
      }
      return Array.from(currentRoot.data);
    }
  }
  
  module.exports.InvenoryTree = InvenoryTree;
  