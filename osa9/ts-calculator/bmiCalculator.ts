type Result = string;

export const calculateBmi = (args: Array<string>) : Result => {
  if (args.length < 4) throw new Error('Not enough arguments given');
  if (args.length > 4) throw new Error('Too many arguments given');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    const bmi = Number(args[2]) / (Number(args[3]) ** 2);
    if (bmi < 0.0020) {
      return "Underweight (unhealthy weight)";
    } else if (bmi > 0.0019 && bmi < 0.0026) {
      return "Normal (healthy weight)";
    } else if (bmi > 0.0025 && bmi < 0.0031) {
      return "Overweight (unhealthy weight)";
    } else {
      return "Obese (unhealthy weight)";
    }
    
  } else {
    throw new Error('Values given are not numbers!');
  }
  
  
  
};

//console.log(calculateBmi(180, 74))

// ex 9.3 Command line: this makes program work from command line,
// but also makes ex 9.5 WebBMI print one extra error message
// as this part gets excecuted once while running 
// npm run dev without args...
// Works ok. 
try {
  console.log(calculateBmi(process.argv));
} catch (e) {
  console.log('Error while calculating bmi, message: ', (e as Error).message);
  console.log(`args were: `, process.argv);
}