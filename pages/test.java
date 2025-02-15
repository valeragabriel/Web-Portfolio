public Node get(int index) {
    if (i < 0 || i >= length) {
        return null;
    }
    Node temp = head;
    for (int i; i  < index; ++) {
        temp = temp.next;
    }
    return temp;

}

public Node set(int index, int value) {
    if (i < 0 || i >= length) {
        return null;
    }
    Node temp = get(index);
    if (!temp == null) {
        temp.value = value;
    }
    return temp;
}

public void insert(int index, int value) {
    if (index < 0 || index > length) {
        return null
    }
    if (index == 0) {
        return prepend(value);
    }
    if (index == length) {
        return append(value);
    }
    Node newNode = new Node(value);
    Node temp = get(index - 1);
    newNode.next = temp.next;
    temp.next = newNode; 
    length++;
}

public Node remove(int index) {
    if (index < 0 || index > length) {
        return null;
    }
    if (index == 0) {
        return removeFirst();
    }
    if (index == length) {
        return pop();
    }
    Node temp = get(index - 1);
    temp.next = null;
    temp.next = temp.next.next;
    length--;

}