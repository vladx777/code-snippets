class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
//determine if a linked list has a cycle or not
function hasCycle(head) {
  let slowPointer = head,
    fastPointer = head;

  //while the fastPointer is still in the linked list
  while (fastPointer !== null && fastPointer.next !== null) {
    //2x speed
    fastPointer = fastPointer.next.next;
    //1x speed
    slowPointer = slowPointer.next;

    if (slowPointer === fastPointer) {
      return true;
    }
  }

  return false;
}

const node6 = new Node(6);
const node5 = new Node(5, node6);
const node4 = new Node(4, node5);
const node3 = new Node(3, node4);
const node2 = new Node(2, node3);
const head1 = new Node(1, node2);
//add the cycle
node6.next = node3;

console.log(hasCycle(head1)); //true

const nodeF = new Node("f");
const nodeE = new Node("e", nodeF);
const nodeD = new Node("d", nodeE);
const nodeC = new Node("c", nodeD);
const nodeB = new Node("b", nodeC);
const headA = new Node("a", nodeB);
// nodeF.next = nodeB;

console.log(hasCycle(headA)); //false

//if numbers distill to one
const findUltimateOne = (num) => {
  let slowPointer = num,
    fastPointer = num;

  while (true) {
    slowPointer = findSquareSum(slowPointer);
    fastPointer = findSquareSum(findSquareSum(fastPointer));

    if (slowPointer === fastPointer) return false;
    if (slowPointer === 1 || fastPointer === 1) {
      return true;
    }
  }
};

const findSquareSum = (num) => {
  let sum = 0;
  while (num > 0) {
    digit = num % 10;
    sum += digit * digit;
    num = Math.floor(num / 10);
  }
  return sum;
};
console.log("findSquareSum");
console.log(findUltimateOne(23)); //true
console.log(findUltimateOne(12)); //false

const isCircularArr = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let slowPointer = i,
      fastPointer = i;
    const isForward = arr[i] > 0;

    while (true) {
      //move our pointers forwards
      //slow by 1 move
      //fast by 2 moves
      slowPointer = findNextIndex(arr, isForward, slowPointer);
      fastPointer = findNextIndex(arr, isForward, fastPointer);
      if (fastPointer !== -1) {
        fastPointer = findNextIndex(arr, isForward, fastPointer);
      }
      //what are our break cases?
      //fastPointer === -1 || slowPointer === -1
      if (fastPointer === -1 || slowPointer === -1 || fastPointer === slowPointer) {
        break;
      }
    }
    if (fastPointer !== -1 && slowPointer !== -1 && fastPointer === slowPointer) {
      return true;
    }
  }
  return false;
};

const findNextIndex = (arr, isForward, currIdx) => {
  const currIsForward = arr[currIdx] > 0;

  //if next direction is different from current direction == no cycle
  if (currIsForward !== isForward) {
    return -1;
  }

  const nextIdx = (currIdx + arr[currIdx]) % arr.length;

  if (nextIdx < 0) {
    nextIdx += arr.length;
  }

  //we didn't go anywhere, can't have 1 element in a cycle
  if (nextIdx === currIdx) {
    return -1;
  }
  return nextIdx;
};

console.log(isCircularArr([1, 2, -1, 2, 2])); //true
console.log(isCircularArr([2, 2, -1, 2])); //true
console.log(isCircularArr([2, 1, -1, 2])); //false
