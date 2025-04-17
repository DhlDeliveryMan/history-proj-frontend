import React from "react";
import { Button } from "~/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Footer from "~/components/global/footer";
import { cn, connectSocket, formatSecondsToMinutes } from "~/lib/utils";
import { getLevelColor, getScoreColor } from "~/welcome/recentTestTable";
import { useUser } from "~/contexts/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { socket } from "~/lib/socket";
import type { IQuestion, IRecentTests, ITest } from "~/lib/types";
import QuestionsComponent from "./questionsComponent";
import axios from "axios";

const TestsComponent: React.FC = () => {
  const { user, fetchUser } = useUser();
  let navigate = useNavigate();

  const [startedTest, setStartedTest] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState<
    IQuestion | { title: string; content: string }
  >({
    title: "Tests nav uzsākts",
    content: "Lūdzu, uzsāciet testu, lai redzētu jautājumus.",
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(1);
  const [currentTime, setCurrentTime] = React.useState({
    totalTime: 900,
    questionTime: 900,
  });
  const [quizInfo, setQuizInfo] = React.useState({
    quizId: "N/A",
    questionLenght: 0,
  });

  const [userAnswer, setAnswer] = React.useState<string>("");
  const userAnswerRef = React.useRef<string>("");
  const [userAnswered, setUserAnswered] = React.useState<boolean>(false);
  const [answerResults, setAnswerResults] = React.useState<{
    isCorrect: boolean;
    correctAnswer: string;
    explination: string;
  } | null>(null);

  const [quizEnded, setQuizEnded] = React.useState(false);

  const [questions, setQuestions] = React.useState<IQuestion[]>([]);

  const [oldTests, setOldTests] = React.useState([
    {
      id: "7oet_d9Z",
      date: "15.04.2025",
      questions: "15/20",
      level: "easy",
      time: "11:00",
      totalTime: "15:00",
      score: "85%",
    },
    {
      id: "nYrnfYEv",
      date: "10.04.2025",
      questions: "10/25",
      level: "medium",
      time: "12:00",
      totalTime: "20:00",
      score: "55%",
    },
    {
      id: "2WEKaVNO",
      date: "05.04.2025",
      questions: "2/30",
      level: "hard",
      time: "30:00",
      totalTime: "30:00",
      score: "10%",
    },
    {
      id: "8JkLqPzX",
      date: "01.04.2025",
      questions: "20/20",
      level: "easy",
      time: "10:00",
      totalTime: "15:00",
      score: "100%",
    },
    {
      id: "4MnOpQrS",
      date: "28.03.2025",
      questions: "18/25",
      level: "medium",
      time: "18:00",
      totalTime: "20:00",
      score: "72%",
    },
    {
      id: "9TuVwXyZ",
      date: "25.03.2025",
      questions: "5/30",
      level: "hard",
      time: "25:00",
      totalTime: "30:00",
      score: "17%",
    },
    {
      id: "3AbCdEfG",
      date: "20.03.2025",
      questions: "15/20",
      level: "easy",
      time: "12:00",
      totalTime: "15:00",
      score: "75%",
    },
    {
      id: "6HiJkLmN",
      date: "15.03.2025",
      questions: "12/25",
      level: "medium",
      time: "19:00",
      totalTime: "20:00",
      score: "48%",
    },
    {
      id: "2OpQrStU",
      date: "10.03.2025",
      questions: "8/30",
      level: "hard",
      time: "28:00",
      totalTime: "30:00",
      score: "27%",
    },
    {
      id: "5VwXyZaB",
      date: "05.03.2025",
      questions: "25/25",
      level: "easy",
      time: "10:00",
      totalTime: "15:00",
      score: "100%",
    },
  ]);

  React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/tests`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          const unparsedData = response.data.data.recentTests as ITest[];
          const parsedData: IRecentTests[] = unparsedData.map((test) => ({
            id: test.testId,
            level: "easy",
            questions:
              test.statistics.correctAnswers.toString() +
              "/" +
              test.statistics.totalQuestions.toString(),
            time: test.statistics.totalTimeTaken.toString(),
            totalTime: test.statistics.totalTime.toString(),
            date: new Date(test.createdAt).toLocaleDateString(),
            score: test.statistics.percentageCorrect.toString() + "%",
          }));

          setOldTests(parsedData);
        }
      })
      .catch((error) => {
        console.log("Error fetching recent tests:", error);
      });
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    fetchUser().then((authenticated) => {
      if (isMounted && !authenticated) {
        toast.error("Jūs nēsat autentificēts!", {});
        navigate("/auth");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    socket.disconnect();
  }, []);

  const startTest = async () => {
    const connection = connectSocket();
    toast.promise(connection, {
      pending: "Savienojas ar serveri",
      success: "Tests uzsākts!",
      error: "Kļūda, mēģiniet vēlreiz",
    });

    socket.emit("start_quiz", {
      difficulty: "easy",
    });

    setStartedTest(true);
  };

  const submitAnswer = () => {
    socket.emit("answer_question", { answer: userAnswerRef.current });
    setUserAnswered(true);
    setAnswer("");
  };

  const requestNextQuestion = () => {
    if (currentQuestionIndex === quizInfo.questionLenght) return;
    socket.emit("next_question");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setUserAnswered(false);
    setAnswerResults(null);
    setAnswer("");
  };

  const end = () => {
    socket.emit("end_quiz");

    setQuizEnded(false);
    setStartedTest(false);
    setCurrentQuestionIndex(1);
    setCurrentTime({ totalTime: 900, questionTime: 900 });
    setQuizInfo({ quizId: "N/A", questionLenght: 0 });
    setAnswerResults(null);
    setAnswer("");
    setUserAnswered(false);
    setCurrentQuestion({
      title: "Tests nav uzsākts",
      content: "Lūdzu, uzsāciet testu, lai redzētu jautājumus.",
    });
    setQuestions([]);
  };

  React.useEffect(() => {
    socket.on("quiz_start", (data: { id: string; questionLenght: number }) => {
      console.log("Quiz info data:", data);
      setQuizInfo({ ...data, quizId: data.id });
      setQuizEnded(false);
    });

    socket.on("quiz_question", (data) => {
      setCurrentQuestion(data);
    });

    socket.on(
      "answer_result",
      (data: {
        isCorrect: boolean;
        correctAnswer: string;
        explination: string;
      }) => {
        setAnswerResults(data);
      }
    );

    socket.on("quiz_complete", (data) => {
      console.log("Quiz complete data:", data);
      toast.success("Tests pabeigts!", {});
      setQuizEnded(true);
    });

    socket.on(
      "timer_update",
      (data: { totalTime: number; questionTime: number }) => {
        setCurrentTime(data);
      }
    );

    socket.on("question_timeout", () => {
      submitAnswer();
      toast.error("Jautājuma laiks ir beidzies!", {
        autoClose: 3000,
      });
    });

    return () => {
      socket.off("timer_update");
      socket.off("quiz_start");
      socket.off("quiz_question");
      socket.off("quiz_complete");
      socket.off("question_timeout");
      socket.off("answer_result");
    };
  }, []);

  function getAllTestCount(): React.ReactNode {
    return oldTests.length;
  }

  function getAverageResult(): React.ReactNode {
    if (oldTests.length === 0) return "N/A";

    const totalScore = oldTests.reduce((sum, test) => {
      const score = parseFloat(test.score.replace("%", ""));
      return sum + score;
    }, 0);

    const averageScore = totalScore / oldTests.length;
    return `${averageScore.toFixed(0)}%`;
  }
  return (
    <main className="flex flex-col items-center justify-start min-h-screen  w-full h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_6fr_1.5fr] w-full h-full">
        <aside className="bg-emerald-800 text-white p-4 h-full">
          {/* Left Sidebar */}

          <p className="font-semibold uppercase">Jūsu pārskats</p>

          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-end  bg-slate-800 text-white p-4 rounded-lg shadow-md">
              <FontAwesomeIcon icon={faUser} className="text-2xl mr-auto" />
              <div className="text-right ">
                <p className="text-sm font-semibold">Jūsu vārds</p>
                <p className="text-md font-bold">{user?.username || ""}</p>
              </div>
            </div>

            <div className="flex items-center justify-end  bg-slate-800 text-white p-4 rounded-lg shadow-md">
              <FontAwesomeIcon icon={faUser} className="text-2xl mr-auto" />
              <div className="text-right ">
                <p className="text-sm font-semibold">Izspildīti testi</p>
                <p className="text-md font-bold">{getAllTestCount()}</p>
              </div>
            </div>

            <div
              className={cn(
                "flex items-center justify-end text-white p-4 rounded-lg shadow-md",
                parseFloat(
                  getAverageResult()?.toString().replace("%", "") || "0"
                ) >= 50
                  ? parseFloat(
                      getAverageResult()?.toString().replace("%", "") || "0"
                    ) <= 70
                    ? "bg-amber-600"
                    : "bg-green-800"
                  : "bg-red-800"
              )}
            >
              <FontAwesomeIcon icon={faUser} className="text-2xl mr-auto" />
              <div className="text-right ">
                <p className="text-sm font-semibold">Vidējais rezultāts</p>
                <p className="text-md font-bold">{getAverageResult()}</p>
              </div>
            </div>
          </div>
        </aside>
        <section className="bg-white h-full">
          {/* Main Content */}
          <div className="w-full p-4 bg-neutral-200 text-white flex justify-between items-center">
            <h1 className="text-lg font-bold"></h1>
            <nav className="w-full overflow-x-scroll">
              {!startedTest ? (
                <ul className="flex space-x-4 justify-end">
                  <Button
                    className="bg-emerald-800 hover:bg-emerald-950"
                    onClick={() => {
                      startTest();
                    }}
                  >
                    Sākt testu
                  </Button>
                </ul>
              ) : (
                <ul className="flex space-x-4 w-full">
                  <li className="">
                    <Button className="bg-slate-800 mr-3 disabled hover:bg-slate-800">
                      {formatSecondsToMinutes(currentTime.totalTime)}
                    </Button>
                    <Button className="bg-slate-800 mr-1 disabled hover:bg-slate-800">
                      {formatSecondsToMinutes(currentTime.questionTime)}
                    </Button>
                  </li>
                  <li className="">
                    <Button className="bg-slate-800 mr-1 disabled hover:bg-slate-800">
                      {quizInfo.quizId}
                    </Button>
                  </li>
                  <li className="ml-auto flex space-x-2">
                    {/* {quizEnded && (
                      <Button className="bg-slate-800 mr-1 hover:bg-slate-600">
                        {"<"}
                      </Button>
                    )}
                    <Button className="bg-slate-800 mr-1 disabled hover:bg-slate-800">
                      {currentQuestionIndex}
                    </Button>
                    {quizEnded && (
                      <Button className="bg-slate-800 mr-3 hover:bg-slate-600">
                        {">"}
                      </Button>
                    )} */}
                    {quizEnded === false && (
                      <>
                        {!userAnswered ? (
                          <Button
                            className="bg-green-800 hover:bg-green-950"
                            onClick={() => submitAnswer()}
                          >
                            Iesniegt atbildi
                          </Button>
                        ) : (
                          <Button
                            className="bg-amber-800 hover:bg-amber-950"
                            onClick={() => requestNextQuestion()}
                          >
                            Nākamais jautājums
                          </Button>
                        )}
                      </>
                    )}
                    <Button
                      className="bg-red-800 hover:bg-red-950"
                      onClick={() => end()}
                    >
                      Beigt testu
                    </Button>
                  </li>
                </ul>
              )}
            </nav>
          </div>
          <QuestionsComponent
            question={currentQuestion}
            setAnswer={setAnswer}
            answer={userAnswer}
            answerResults={answerResults}
            setAnswerResults={setAnswerResults}
            userAnswerRef={userAnswerRef}
          />
        </section>
        <aside className="p-4 bg-neutral-200 h-full">
          {/* Right Sidebar */}
          <p className="font-semibold uppercase">Izpildītie testi</p>
          <div className="space-y-4 mt-7">
            {oldTests.map((test) => {
              return (
                <div
                  key={test.id}
                  className="border border-gray-300 rounded-lg shadow-sm p-4 bg-white"
                >
                  <div className="flex gap-3 items-center flex-row">
                    <div className="flex gap-3 items-start flex-col">
                      <p className="font-semibold">{test.date}</p>
                      <p className={cn(getLevelColor(test.level), "uppercase")}>
                        {test.level}
                      </p>
                    </div>

                    <div className="flex gap-3 items-end ml-auto flex-row">
                      <p className={cn(getScoreColor(test.score))}>
                        {test.score}
                      </p>

                      {/* <button
                        className="text-zinc-800 hover:underline "
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? (
                          <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronDown} />
                        )}
                      </button> */}
                    </div>
                  </div>
                  {/* {isExpanded && (
                    <div className="mt-4">
                      <div className="flex space-x-2 mt-2">
                        <Button className="bg-slate-800 hover:bg-slate-950">
                          Apskatīt testu
                        </Button>
                        <Button className="bg-amber-500 hover:bg-amber-800">
                          Mēģināt vēlreiz
                        </Button>
                      </div>
                    </div>
                  )} */}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default TestsComponent;
