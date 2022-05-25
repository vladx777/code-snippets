class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

//      a
//     / \
//    b   c
//   / \   \
//  d   e   f

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//list in depthFirst order
const depthFirstPrint = (root) => {
  const stack = [root];
  while (stack.length > 0) {
    const curr = stack.pop();
    console.log(curr.val);

    //swap right and left to go from left to right and vice versa
    if (curr.right != null) {
      stack.push(curr.right);
    }
    if (curr.left != null) {
      stack.push(curr.left);
    }
  }
};

depthFirstPrint(a);

//search
const depthFirstSearch = (root, target) => {
  const stack = [root];
  while (stack.length > 0) {
    const curr = stack.pop();
    console.log(curr.val);
    if (curr.val == target) {
      return true;
    }
    if (curr.right != null) {
      stack.push(curr.right);
    }
    if (curr.left != null) {
      stack.push(curr.left);
    }
  }
  return false;
};

console.log(depthFirstSearch(a, "f")); //true
console.log(depthFirstSearch(a, "z")); //false

const sumTree = (root) => {
  const stack = [root];
  let sum = 0;
  while (stack.length > 0) {
    const curr = stack.pop();
    sum += curr.val;
    if (curr.right != null) {
      stack.push(curr.right);
    }
    if (curr.left != null) {
      stack.push(curr.left);
    }
  }
  return sum;
};

const q = new Node(1);
const r = new Node(14);
const s = new Node(-5);
const t = new Node(19);
const u = new Node(33);
const v = new Node(21);
console.log(1 + 14 - 5 + 19 + 33 + 21);
q.left = r;
q.right = s;
r.left = t;
r.right = u;
s.right = v;

console.log(sumTree(q));

//recursively
const preOrder = (root) => {
  if (root === null) return;
  console.log(root.val);
  preOrder(root.left);
  preOrder(root.right);
};

//self, left, right
//      a
//     / \
//    b   c
//   / \   \
//  d   e   f

console.log("preOrder");
preOrder(a);

//recursively
const postOrder = (root) => {
  if (root === null) return;

  postOrder(root.left);
  postOrder(root.right);
  console.log(root.val); //comes last
};

//left, right, self
//      a
//     / \
//    b   c
//   / \   \
//  d   e   f

console.log("postOrder");
postOrder(a);

//recursively
const inOrder = (root) => {
  if (root === null) return;

  inOrder(root.left);
  console.log(root.val); //comes in the middle
  inOrder(root.right);
};

//left, self, right
//      a
//     / \
//    b   c
//   / \   \
//  d   e   f

console.log("inOrder");
inOrder(a);

//recursive sums

const sumTreeRec = (root) => {
  if (root === null) return 0;
  return sumTreeRec(root.left) + root.val + sumTreeRec(root.right);
};
console.log("sumTreeRec", sumTreeRec(q));
