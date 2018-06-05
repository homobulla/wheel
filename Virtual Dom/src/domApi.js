/**
 * DOM 操作 API
 * 包括元素 创建／删除／插入／... 等等
 */

function createElement(tagName) {
    return document.createElement(tagName)
}

// createElementNS() 方法与 createElement() 方法相似，只是它创建的 Element 节点除了具有指定的名称外，还具有指定的命名空间。只有使用命名空间的 XML 文档才会使用该方法

function createElementNS(namespaceURI, qualifiedName) {
    return document.createAttributeNS(namespaceURI, qualifiedName)
}


function createTextNode(text) {
    return document.createTextNode(text)
}

function createComment(text) {
    return document.createComment(text)
}

function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode)
}

function removeChild(node, child) {
    node.removeChild(child)
}

function appendChild(node, child) {
    node.appendChild(child)
}

function parentNode(node) {
    return node.parentNode
}

function nextSibling(node) {
    return node.nextSibling
}

function tagName(elm) {
    return elm.tagName
}

function setTextContent(node, text) {
    node.textContent = text
}

function getTextContent(node) {
    return node.textContent
}

function isElement(node) {
    return node.nodeType === 1
}

function isText(node) {
    return node.nodeType === 3
}

function isComment(node) {
    return node.nodeType === 8
}

export const htmlDomApi = {
    createElement,
    createElementNS,
    createTextNode,
    createComment,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
    getTextContent,
    isElement,
    isText,
    isComment,
}

export default htmlDomApi