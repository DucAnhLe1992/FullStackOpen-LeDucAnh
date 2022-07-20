type Rating = 1 | 2 | 3;

interface exerciseValues {
  hours: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseValues = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (isNaN(Number(args[2]))) {
    throw new Error("target must be a number");
  }

  let target = Number(args[2]);
  let hours: number[] = [];

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("all hours must be numbers");
    }
    hours.push(Number(args[i]));
  }

  return {
    hours,
    target,
  };
};

const exerciseCalculator = (hours: number[], target: number): Result => {
  let trainingDays = 0;
  let success = false;
  let rating: Rating;
  let ratingDescription: string;

  let sum = 0;

  hours.forEach((hour) => {
    sum += hour;
    if (hour > 0) {
      ++trainingDays;
    }
  });

  const average = sum / hours.length;

  if (average >= target * 0.75) {
    rating = 3;
    ratingDescription = "good job, keep up the good work!";
    success = true;
  } else if (average > target / 2 && average < target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "not satisfatory, should've improved much more";
  }

  return {
    periodLength: hours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { hours, target } = parseValues(process.argv);
  console.log(exerciseCalculator(hours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Error: ", error.message);
  }
}
