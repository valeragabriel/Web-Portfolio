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
    if (i <= 0 || i > length) {
        return null
    }
    
}