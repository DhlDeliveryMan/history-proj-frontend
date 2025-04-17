export interface IQuestion {
  id: number;
  title: string;
  content: string;
  answerType: "select" | "boolean";
  options: string[];
  baseTime: number;
  levels: string[];
  correctAnswer: string | string[] | null;
}

export interface IRecentTests {
  id: string;
  date: string;
  questions: string;
  level: string;
  time: string;
  totalTime: string;
  score: string;
}

export interface ITest {
  testId: string;
  questions: {
    question: IQuestion;
    userAnswer: string | string[];
    isCorrect: boolean;
    timeTaken: number;
  }[];
  statistics: {
    correctAnswers: number;
    wrongAnswers: number;
    totalQuestions: number;
    percentageCorrect: number;
    totalTime: number;
    totalTimeTaken: number;
  };
  userId: number;
  createdAt: string;
}
