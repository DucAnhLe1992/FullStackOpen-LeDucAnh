interface bmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height * height) / 10000);

  if (bmi < 16) return "Underweight (Severe thinness)";
  if (bmi < 16.9) return "Underweight (Moderate thinness)";
  if (bmi < 18.4) return "Underweight (Mild thinness)";
  if (bmi < 24.9) return "Normal (healthy weight)";
  if (bmi < 29.9) return "Overweight (Pre-obese)";
  if (bmi < 34.9) return "Obese (Class I)";
  if (bmi < 39.9) return "Obese (Class II) ";
  return "Obese (Class III)";
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Error: ", error.message);
  }
}
