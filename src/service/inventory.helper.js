const { InvenoryTree } = require("./inventory.tree");

class InventoryHelper {
  addToSearchTree = (inventory) => {
    const tree = new InvenoryTree();
    inventory.forEach((data) => {
      tree.insert(this.trimAndLower(data.coinId), data);

      tree.insert(this.trimAndLower(data.name), data);
      tree.insert(this.trimAndLower(data.currency), data);
      tree.insert(this.trimAndLower(data.price), data);
    });
    return tree;
  };

  getPaginatedData = (node, search, page, range) => {
    const output = this.getDataFromNode(node, search);

    const curentPage = (page - 1) * range;

    const pagindatedData = output.slice(curentPage, curentPage + range);
    const response = {
      success: true,
      pagindatedData,
      pageTotal: pagindatedData.length,
      totalPage: Math.ceil(output.length / range),
      totalRecord: output.length,
    };
    return response;
  };

  getDataFromNode = (node, searchKey) => {
    if (searchKey) return this.getSearchTreeData(node.searchNode, searchKey);
    return node.data;
  };

  getSearchTreeData = (searchNode, searchKey) => {
    return searchNode.search(this.trimAndLower(searchKey));
  };

  trimAndLower = (key) => {
    if(!isNaN(key))
    return key;
    return key.toLowerCase().trim();
  };
}

module.exports.InventoryHelper = InventoryHelper;
