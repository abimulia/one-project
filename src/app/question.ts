export interface Question {
  question: string;
  choices: { [key: string]: string };
  // choice1: string;
  // choice2: string;
  // choice3: string;
  // choice4: string;
  answer: number;
}
