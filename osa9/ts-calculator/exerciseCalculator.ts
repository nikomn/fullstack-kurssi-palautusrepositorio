interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExerciseData {
  targetValue: number;
  hours: Array<number>;
}

export const parseArgs = (args: Array<string>): ExerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments given');
  let targetVal = 0;
  if (!isNaN(Number(args[2]))) {
    targetVal = Number(args[2]);
  } else {
    throw new Error('Values given are not numbers!');
  }

  const dataArray = [];

  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      dataArray.push(Number(args[i]));
    } else {
      throw new Error('Values given are not numbers!');
    }

  }

  return {
    targetValue: targetVal,
    hours: dataArray
  };

};

export const calculateExercises = (dailyExerciseHours: Array<number>, targetValue: number) : ExercisesResult => {
  
  const numberOfDays = dailyExerciseHours.length;
  
  const numberOfTrainingDays = dailyExerciseHours.filter(h => h > 0).length;
  const totalTime = dailyExerciseHours.reduce((a, b) => a + b, 0);
  let calculatedAverageTime = 0;
  if (numberOfDays > 0) {
    calculatedAverageTime = totalTime / dailyExerciseHours.length;
  }

  const targetReached =  calculatedAverageTime >= targetValue;

  const fromTarget = calculatedAverageTime / targetValue;

  let ratingValue = 0;
  let ratingDescriptionText = "";

  if (fromTarget >= 1) {
    ratingValue = 1;
    ratingDescriptionText = "excelent!";
  } else if (fromTarget > 0.5 && fromTarget < 1) {
    ratingValue = 2;
    ratingDescriptionText = "not bad, but could be beter than this";
  } else {
    ratingValue = 3;
    ratingDescriptionText = "not too good";
  }

  
  return {
    periodLength: numberOfDays,
    trainingDays: numberOfTrainingDays,
    success: targetReached,
    rating: ratingValue,
    ratingDescription: ratingDescriptionText,
    target: targetValue,
    average: calculatedAverageTime
  };
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
  const { targetValue, hours } = parseArgs(process.argv);
  console.log(calculateExercises(hours, targetValue));
} catch (e) {
  console.log('Error, message: ', (e as Error).message);
  console.log(`args were: `, process.argv);
}
