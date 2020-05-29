
// 单项链表
function LinkedList(){
    let Node = function(element){
        this.element = element;
        this.next = null;
    }
    let length = 0;
    let head = null; // head就是链表的第一项，不要割裂的看待。
    this.append = function (element){
        let node = new Node(element),
        current;
        // 如果head为null,则当前append的是列表第一个元素
        if(head === null){
            head = node;
        } else {
            // 非第一项，则找最后一项插入
            current = head;
            while (current.next){
                current = current.next;
            }
            current.next = node;
        }
        // 长度加一
        length++;
    }
    // 插入
    this.insert = function (position,element){
        if(position > -1 && position <= length) {
            let node = new Node(element),
                current = head,
                previous,
                index = 0;
                if(position === 0){
                    node.next = current;
                    head = node;
                } else {
                    while (index++ <position){
                        console.log(current,index,'indexxxxxxxxx')
                        previous = current;
                        current = current.next;
                    }
                    previous.next = node;
                    node.next = current;
                }
                length++;
                return true;
        } else {
            return false;
        }
    }
    // 删除特定位置的节点
    this.removeAt = function(position){
        // 判断边界条件
        if(position > -1 && position < length){
            let current = head,
                previous,
                index = 0;
            // 删除第一个、其他情况
            if(position == 0){
                head = current.next;
            } else {
                // postion 1 
                while (index++ < position){
                    previous = current;
                    current = current.next;
                }
                // 把上一项和当前下一项连接
                previous.next = current.next;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    }
    this.remove = function(element){
        let index = this.indexOf(element);
        this.removeAt(index)
    }

    this.indexOf = function(element){
        let current = head;
        index = -1;
        while(current){
            index ++;
            if(current.element == element){
                return index;
            }
            current = current.next
        }
        return -1;
    }
    this.isEmpty = function(){
        return length === 0;
    }
    this.size = function(){
        return length;
    }
    this.getHead = function(){
        return head;
    }
    this.toString = function(){
        let current = head,
        str = '';
        while(current){
            str += current.element + (current.next ? ' ':'');
            current = current.next;
        }
        return str;
    }
    this.print = function(){

    }
}
let list = new LinkedList();
list.append('v');
list.append('v');
list.append('v');

list.insert(1,'a');



console.log(list.toString());

// 双向链表
function DoublyLinkedList(){
    let Node = function(element){
        this.element = element;
        this.next = null;
        this.prev = null; //新增
    }
    let length = 0;
    let head = null;
    let tail = null //新增
    this.insert = function(position,element){
        // 检测越界值
        if (position > -1 && position<=length) {
            let node = new Node(element),
                current = head,
                previous,
                index = 0;
                if(position === 0){
                    // 这儿还需要判断下head是否存在，不存在则设置Node的prev为null
                    if(!head){
                        head = node;
                        tail = node;
                    } else {
                        node.next = current;
                        current.prev = node;
                        head = node;
                    }
                  
                } else if (position === length){ //如果插入在最后一项则需要处理tail
                    // while(current){
                    //     current = current.next;
                    // }
                    // current.next = node;
                    // tail = node.next;
                    current = tail; // {3} //这儿必然先走position=0的分支，tail不会为null;
                    current.next = node;
                    node.prev = current;
                    tail = node; 

                } else {
                    while (index++ <position){
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                    current.prev = node;
                    node.prev = previous;
                }
                length++;
                return true;
        } else {
            return false;
        }
    }
    this.removeAt = function(position){
        if(position > -1 && position < length){
            let current = head,
                previous,
                index = 0;
            if(position === 0){
                head = current.next;
                if(length == 1){
                    tail = null;
                } else {
                    head.prev = null;
                }
            } else if (position === length-1) {
                current = tail;
                tail = current.prev;
                tail.next = null;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
                current.next.prev = previous;
            }
            length--;
            return current.element

        } else {
            return null;
        }
    }
}
let doublyLinkedList = new DoublyLinkedList();
// doublyLinkedList.insert(0,'a');
// doublyLinkedList.insert(0,'b')
// console.log(doublyLinkedList.insert(0,'c'))

// 循环链表
// 最后一个元素指向下一个元素的指针不是null,而是head
// 双向循环链表有指向head元素的tail.next,指向tail的head.prev;