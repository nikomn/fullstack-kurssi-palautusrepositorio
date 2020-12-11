type Result = string;

const calculateBmi = (height: number, weight: number) : Result => {
  const bmi = weight / (height ** 2);
  if (bmi < 0.0020) {
    return "Underweight (unhealthy weight)";
  } else if (bmi > 0.0019 && bmi < 0.0026) {
    return "Normal (healthy weight)";
  } else if (bmi > 0.0025 && bmi < 0.0031) {
    return "Overweight (unhealthy weight)";
  } else {
    return "Obese (unhealthy weight)";
  }
  
}

console.log(calculateBmi(180, 74))