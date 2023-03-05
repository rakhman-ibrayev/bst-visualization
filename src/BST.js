class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
    }

    put(value) {
        this.root = this.#putHelper(this.root, value)
    }

    #putHelper(node, value) {
        if (!node) return new Node(value)

        const cmp = value - node.value
        if (cmp < 0) node.left = this.#putHelper(node.left, value)
        else if (cmp > 0) node.right = this.#putHelper(node.right, value)
        else node.value = value

        return node
    }
}

export default BST