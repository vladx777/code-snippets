const findPair = (arr, targetSum) => {
  let leftPointer = 0,
    rightPointer = arr.length - 1,
    pair = null;
  // pairSum = 0;

  //get element at each pointer and add to get a sum
  //if sam == targetSum ? yes - return it
  // if sum < targetSum ? yes - increment leftPointer
  // if sum > targetSum ? yes - increment rightPointer

  while (leftPointer != rightPointer) {
    pairSum = arr[leftPointer] + arr[rightPointer];
    if (pairSum === targetSum) {
      pair = [arr[leftPointer], arr[rightPointer]];
      break;
    } else if (pairSum < targetSum) {
      leftPointer++;
    } else if (pairSum > targetSum) {
      rightPointer--;
    }
  }
  return pair;
};

//only sorted arrays work with this!
console.log(findPair([1, 2, 3, 4, 5], 7));
console.log(findPair([1, 6, 8, 9, 10], 14));
console.log(findPair([1, 3, 4, 8, 10], 12));
console.log(findPair([1, 2, 3, 4, 5], 10)); //null

//all unique triplets that add up to zero
// 1) sort the array
// 2) loop over the array
//    a. take the negative of array[i] as targetSum
//    b. look for the pair that add to the targetSum as above

const allUniqueTripletsEqualToZero = (arr) => {
  arr.sort((a, b) => a - b);
  const triplets = [];

  for (let i = 0; i < arr.length; i++) {
    let targetSum = -arr[i];

    //we want to avoid duplicate triplets
    //if the element is the same as the one before we skip it
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }
    searchPair(arr, targetSum, i + 1, triplets);
  }
  return triplets;
};

const searchPair = (arr, targetSum, leftPointer, triplets) => {
  let rightPointer = arr.length - 1;
  while (leftPointer < rightPointer) {
    const currentSum = arr[leftPointer] + arr[rightPointer];
    if (currentSum === targetSum) {
      triplets.push([-targetSum, arr[leftPointer], arr[rightPointer]]);
      leftPointer++;
      rightPointer--;
      //move the left pointer up until we get a different integer
      while (leftPointer < rightPointer && arr[leftPointer] === arr[leftPointer - 1]) {
        leftPointer++;
      }
      while (leftPointer < rightPointer && arr[rightPointer] === arr[rightPointer + 1]) {
        rightPointer--;
      }
    } else if (targetSum > currentSum) {
      leftPointer++;
    } else if (targetSum < currentSum) {
      rightPointer--;
    }
  }
};

console.log(allUniqueTripletsEqualToZero([-3, 0, 1, 2, -1, 1, 1, 1, -2]));
console.log(allUniqueTripletsEqualToZero([-5, 2, -1, -2, 3]));

//given an array of unsorted numbers find the length of the smallest subarray that when sorted will sort the whole array
//
//1. Initialize a left pointer at the start of the array and the right pointer at the end of the array
//2. walk the left pointer forward until you get to an element that is less than its previous so continue to increment that left pointer until you get something that is out of order
//3. walk the right pointer backwards until you get to an element that is greater than its prev so until you get something from the right that's also out of order in terms
//4. find the maximum and minimum of this sub-array
//5. extend the subarray from the beginning to include any number greater than the minimum of the subarray
//6. extend  the subarray from the end to include any number less than the maximum

const findMinWindow = (arr) => {
  let leftPointer = 0,
    rightPointer = arr.length - 1;

  //increment leftPointer until we get to an element that is greater than its next number
  while (arr[leftPointer] < arr[leftPointer + 1] && leftPointer < arr.length - 1) {
    leftPointer++;
  }

  //in case array fully sorted:
  if (leftPointer === arr.length - 1) return 0;

  //decrement rightPointer until we get to an element that is less than its next number
  while (arr[rightPointer] > arr[rightPointer - 1] && rightPointer > -1) {
    rightPointer--;
  }

  const subArr = arr.slice(leftPointer, rightPointer + 1);
  const subArrMin = Math.min(...subArr);
  const subArrMax = Math.max(...subArr);

  //extend the subarray from the beginning to include any number greater than the minimum of the subarray
  while (arr[leftPointer - 1] > subArrMin && leftPointer > 0) {
    leftPointer--;
  }

  //extend  the subarray from the end to include any number less than the maximum
  while (arr[rightPointer + 1] < subArrMax && rightPointer < arr.length - 1) {
    rightPointer++;
  }
  return rightPointer - leftPointer + 1;
};

console.log(findMinWindow([1, 3, 2, 0, -1, 7, 10]));
console.log(findMinWindow([1, 2, 5, 7, 3, 10, 11, 12]));
console.log(findMinWindow([1, 2, 3]));
console.log(findMinWindow([4, 3, 2, 1]));
console.log(findMinWindow([12, 7, 8, 1, 2, 0, 10, 11]));
