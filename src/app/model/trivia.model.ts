export class Trivia {
    category: string | undefined;
    type: string | undefined;
    difficulty: string | undefined;
    question: string | undefined;
    correct_answer: string | undefined;
    incorrect_answers: string | undefined;
  }
  
  export class Answer {
    answer: string | undefined;
    correctAnswer: boolean | undefined;
  }

