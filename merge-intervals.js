const _ = require("lodash");

const mergeIntervals = (intervals) => {
  //sort the intervals
  const sortedIntervals = intervals.sort((a, b) => {
    return a[0] - b[0];
  });
  const mergedIntervals = [sortedIntervals.shift()]; //the first interval

  while (sortedIntervals.length) {
    //always want to compare the last interval seen which will be the last element in the mergedIntervals stack
    //to the next available interval in the sorted array

    const a = mergedIntervals.pop();
    const b = sortedIntervals.shift();
    const [aStart, aEnd] = a,
      [bStart, bEnd] = b;

    //our scenarios
    //a & b don't overlap
    if (bStart > aEnd) {
      mergedIntervals.push(a);
      mergedIntervals.push(b);
    } else {
      const c = [];
      c[0] = aStart;
      c[1] = Math.max(aEnd, bEnd);
      mergedIntervals.push(c);
    }
  }
  return mergedIntervals;
};

console.log(
  mergeIntervals([
    [1, 4],
    [7, 9],
    [2, 5],
  ])
);
console.log(
  mergeIntervals([
    [6, 7],
    [2, 4],
    [5, 9],
  ])
);
console.log(
  mergeIntervals([
    [1, 4],
    [2, 6],
    [3, 5],
  ])
);

const maxCPULoad = (jobs) => {
  const sortedJobs = jobs.sort((a, b) => a.start - b.start);
  const firstJob = sortedJobs.shift();

  const mergedIntervals = [firstJob];
  let maxCPUSoFar = firstJob.load;

  while (sortedJobs.length) {
    const a = mergedIntervals.pop();
    const b = sortedJobs.shift();

    //no overlap
    if (b.start > a.end) {
      //we need both
      mergedIntervals.push(a);
      mergedIntervals.push(b);
      maxCPUSoFar = Math.max(maxCPUSoFar, b.load);
    } else {
      //merge
      const c = { start: a.start, end: Math.max(a.end, b.end), load: a.load + b.load };
      mergedIntervals.push(c);
      maxCPUSoFar = Math.max(maxCPUSoFar, c.load);
    }
  }

  return maxCPUSoFar;
};

console.log(
  maxCPULoad([
    { start: 1, end: 4, load: 3 },
    { start: 2, end: 5, load: 4 },
    { start: 7, end: 9, load: 6 },
  ])
); // 7

console.log(
  maxCPULoad([
    { start: 6, end: 7, load: 10 },
    { start: 2, end: 4, load: 11 },
    { start: 8, end: 12, load: 15 },
    { start: 5, end: 10, load: 15 },
  ])
); // 15

console.log(
  maxCPULoad([
    { start: 1, end: 4, load: 2 },
    { start: 2, end: 4, load: 1 },
    { start: 3, end: 6, load: 5 },
  ])
); //8

//find a free time of employees

//1. flatten all intervals of different employees
//2. sort by start time
//3. merge the intervals
//4. find the empty space

console.log("findFreeTime");
const findFreeTime = (employeeHours) => {
  const flattened = _.flatten(employeeHours);
  const sorted = _.sortBy(flattened, (interval) => interval[0]);

  const mergedIntervals = [sorted.shift()];

  while (sorted.length) {
    const a = mergedIntervals.pop();
    const b = sorted.shift();

    const [aStart, aEnd] = a;
    const [bStart, bEnd] = b;

    //if they don't overlap
    if (bStart > aEnd) {
      mergedIntervals.push(a);
      mergedIntervals.push(b);
    } else {
      const c = [aStart, Math.max(aEnd, bEnd)];
      mergedIntervals.push(c);
    }
  }

  const freeTime = [];

  _.forEach(mergedIntervals, (interval, idx) => {
    //if we haven't reached the end of our intervals
    if (mergedIntervals[idx + 1]) {
      //end of the first interval
      const endOfInterval1 = interval[1];
      //start of the next interval
      const startOfInterval2 = mergedIntervals[idx + 1][0];
      freeTime.push([endOfInterval1, startOfInterval2]);
    }
  });

  return freeTime;
};

console.log(
  findFreeTime([
    [
      [1, 3],
      [5, 6],
    ],
    [
      [2, 3],
      [6, 8],
    ],
  ])
); // [[3,5]]

console.log(
  findFreeTime([
    [
      [1, 3],
      [9, 12],
    ],
    [
      [2, 4],
      [6, 8],
    ],
  ])
); // [[4,6], [8,9]]

console.log(
  findFreeTime([
    [
      [1, 3],
      [9, 12],
    ],
    [
      [3, 9],
      [6, 8],
    ],
  ])
);
