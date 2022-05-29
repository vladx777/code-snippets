const sum = (arr) => {
  if (arr.length == 0) return 0;
  const rest = arr.slice(1); //taking the first element out
  return arr[0] + sum(rest);
};
// time complexity: O(n*n) //because of the slice which is also n
//space: O(n)
console.log(sum([1, 5, 7, -2]));

// more efficient solution:

const sumOneN = (arr) => {
  return _sum(arr, 0); //new function introduced to preserve the function signature of only one parameter
};

const _sum = (arr, idx) => {
  if (idx === arr.length) return 0;
  return arr[idx] + _sum(arr, idx + 1);
};
// time complexity: O(n) //because no slice which is also n //handled by idx
//space: O(n)

console.log(sumOneN([1, 5, 7, -2]));

const fib = (n) => {
  if (n === 1 || n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
};

console.log(fib(5));
console.log(fib(6));

//Time: O(2^n)
//Space: O(n)