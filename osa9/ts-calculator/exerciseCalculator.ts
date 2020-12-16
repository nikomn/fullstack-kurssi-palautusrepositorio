interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: Array<number>, targetValue: number) : ExercisesResult => {
  
  const numberOfDays = dailyExerciseHours.length;
  
  const numberOfTrainingDays = dailyExerciseHours.filter(h => h > 0).length;
  const totalTime = dailyExerciseHours.reduce((a, b) => a + b, 0);
  var calculatedAverageTime = 0
  if (numberOfDays > 0) {
    calculatedAverageTime = totalTime / dailyExerciseHours.length;
  }

  const targetReached =  calculatedAverageTime >= targetValue;

  const fromTarget = calculatedAverageTime / targetValue;

  var ratingValue = 0;
  var ratingDescriptionText = "";

  if (fromTarget >= 1) {
    ratingValue = 1;
    ratingDescriptionText = "excelent!";
  } else if (fromTarget > 0.5 && fromTarget < 1) {
    ratingValue = 2;
    ratingDescriptionText = "not bad, but could be beter than this";
  } else {
    ratingValue = 3;
    ratingDescriptionText = "not too good";;
  }

  
  return {
    periodLength: numberOfDays,
    trainingDays: numberOfTrainingDays,
    success: targetReached,
    rating: ratingValue,
    ratingDescription: ratingDescriptionText,
    target: targetValue,
    average: calculatedAverageTime
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))