const avg_sub_arrays_naive = (arr, k) => {
  const averages = [];
  for (let i = 0; i <= arr.length - k; i++) {
    let sum = 0;
    for (let j = 0; j < k; j++) {
      sum += arr[i + j];
    }
    averages.push(sum / k);
  }

  return averages;
};

console.log(avg_sub_arrays_naive([1, 2, 3, 4, 5], 3));
console.log(avg_sub_arrays_naive([1, 3, 2, 7, -1, 4, 1, 8, 2, 5], 5));

const avg_sub_arrays_sliding = (arr, k) => {
  const averages = [];
  let windowStart = 0,
    windowSum = 0;
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    //add the windowEnd element
    windowSum += arr[windowEnd];
    if (windowEnd >= k - 1) {
      //add the average to the averages array
      averages.push(windowSum / k);
      //subtract the beginning element
      windowSum -= arr[windowStart];
      //move the window one spot forward
      windowStart++;
    }
  }
  return averages;
};

console.log(avg_sub_arrays_sliding([1, 2, 3, 4, 5], 3));
console.log(avg_sub_arrays_sliding([1, 3, 2, 7, -1, 4, 1, 8, 2, 5], 5));

const smallestContiguousSubArray = (arr, s) => {
  let windowStart = 0,
    windowSum = 0,
    minLengthSoFar = Infinity;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd];
    while (windowSum >= s) {
      let currentWindowLength = windowEnd - windowStart + 1;
      if (currentWindowLength < minLengthSoFar) {
        minLengthSoFar = currentWindowLength;
      }
      windowSum -= arr[windowStart];
      windowStart++;
    }
  }
  if (minLengthSoFar === Infinity) {
    return 0;
  }
  return minLengthSoFar;
};

console.log(smallestContiguousSubArray([1, 2, 3, 4, 5], 6));
console.log(smallestContiguousSubArray([1, 3, 2, 7, -1, 4, 1, 8, 2, 5], 5));

const longestKDistinctSubstr = (str, k) => {
  let windowStart = 0,
    seenChars = {},
    maxLengthSoFar = 0;

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    let windowEndChar = str[windowEnd];
    if (!seenChars[windowEndChar]) {
      seenChars[windowEndChar] = 0;
    }
    seenChars[windowEndChar]++;
    while (Object.keys(seenChars).length > k) {
      let windowStartChar = str[windowStart];
      seenChars[windowStartChar]--;
      if (seenChars[windowStartChar] === 0) {
        delete seenChars[windowStartChar];
      }
      windowStart++;
    }
    maxLengthSoFar = Math.max(maxLengthSoFar, windowEnd - windowStart + 1);
  }

  return maxLengthSoFar;
};

console.log(longestKDistinctSubstr("acccpbbebi", 3));
console.log(longestKDistinctSubstr("aaaabbcccd", 1));
console.log(longestKDistinctSubstr("abcdefg", 10));
