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

//list in bft order
const bft = (root) => {
  const queue = [root];
  while (queue.length > 0) {
    const curr = queue.shift();
    console.log(curr.val);
    if (curr.left != null) {
      queue.push(curr.left);
    }
    if (curr.right != null) {
      queue.push(curr.right);
    }
  }
};

bft(a);

//search
const bfs = (root, target) => {
  const queue = [root];
  while (queue.length > 0) {
    const curr = queue.shift();
    // console.log(curr.val);
    if (curr.val == target) {
      return true;
    }
    if (curr.left != null) {
      queue.push(curr.left);
    }
    if (curr.right != null) {
      queue.push(curr.right);
    }
  }
  return false;
};

console.log(bfs(a, "f")); //true
console.log(bfs(a, "z")); //false

const sumTree = (root) => {
  const queue = [root];
  let sum = 0;
  while (queue.length > 0) {
    const curr = queue.shift();
    sum += curr.val;

    if (curr.left != null) {
      queue.push(curr.left);
    }
    if (curr.right != null) {
      queue.push(curr.right);
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
