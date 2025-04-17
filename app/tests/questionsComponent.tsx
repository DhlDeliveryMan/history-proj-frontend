import React from "react";
import type { IQuestion } from "~/lib/types";
import { cn } from "~/lib/utils";

const QuestionsComponent: React.FC<{
  question: IQuestion | { title: string; content: string };
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  answerResults: {
    isCorrect: boolean;
    correctAnswer: string;
    explination: string;
  } | null;
  setAnswerResults: React.Dispatch<
    React.SetStateAction<{
      isCorrect: boolean;
      correctAnswer: string;
      explination: string;
    } | null>
  >;
  userAnswerRef: React.RefObject<string>;
}> = ({
  question,
  setAnswer,
  answerResults,
  setAnswerResults,
  userAnswerRef,
}) => {
  let answer = userAnswerRef.current;
  return (
    <div className="w-full h-full px-4 sm:p-4 text-center flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold text-emerald-950">{question.title}</h1>
      <h3 className="text-2xl font-bold text-emerald-950">
        {question.content}
      </h3>
      {"answerType" in question && question.answerType === "select" && (
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 sm:w-8/12 gap-4 mt-4 pb-4">
          {question.options?.map((option, index) => (
            <label
              key={index}
              className={cn(
                "border rounded-lg p-2 h-24 flex flex-col items-center justify-center cursor-pointer hover:shadow-md relative",
                answerResults
                  ? option === answerResults.correctAnswer
                    ? "border-green-500"
                    : option !== answerResults.correctAnswer &&
                      option === answer
                    ? "border-red-500"
                    : "border-gray-300"
                  : "border-gray-300"
              )}
            >
              <input
                type="radio"
                name="questionOption"
                value={option}
                className="absolute top-2 right-2"
                onChange={(e) => {
                  setAnswer(e.target.value);
                  userAnswerRef.current = e.target.value;
                }}
                disabled={!!answerResults}
              />
              <span className="text-lg">{option}</span>
            </label>
          ))}
        </div>
      )}
      {"answerType" in question && question.answerType === "boolean" && (
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 sm:w-8/12 gap-4 mt-4 pb-4">
          {["true", "false"].map((option, index) => (
            <label
              key={index}
              className={cn(
                "border rounded-lg p-2 h-24 flex flex-col items-center justify-center cursor-pointer hover:shadow-md relative",
                answerResults
                  ? option === answerResults.correctAnswer
                    ? "border-green-500"
                    : option !== answerResults.correctAnswer &&
                      option === answer
                    ? "border-red-500"
                    : "border-gray-300"
                  : "border-gray-300"
              )}
            >
              <input
                type="radio"
                name="booleanOption"
                value={option}
                className="absolute top-2 right-2"
                onChange={(e) => {
                  setAnswer(e.target.value);
                  userAnswerRef.current = e.target.value;
                }}
                disabled={!!answerResults}
              />
              <span className="text-lg">
                {option === "true" ? "Patiesība" : "Aplami"}
              </span>
            </label>
          ))}
        </div>
      )}
      {answerResults && (
        <div className="w-full sm:w-8/12 mt-6 p-4 border rounded-lg shadow-md bg-white border-emerald-900">
          <h2 className="text-xl font-semibold text-gray-800">Paskaidrojums</h2>
          <p className="text-gray-600 mt-2">{answerResults?.explination}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionsComponent;
