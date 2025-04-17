import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { cn } from "~/lib/utils";
import type { IRecentTests } from "~/lib/types";

const recentTests = [
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
];

export const getQuestionColor = (questionsAnswered: string): string => {
  const [answered, total] = questionsAnswered.split("/").map(Number);
  const percentage = (answered / total) * 100;

  if (percentage >= 75) {
    return "text-green-500";
  } else if (percentage >= 50) {
    return "text-yellow-500";
  } else {
    return "text-red-500";
  }
};

export const getTimeColor = (time: string, totalTime: string): string => {
  const [timeHours, timeMinutes] = time.split(":").map(Number);
  const [totalHours, totalMinutes] = totalTime.split(":").map(Number);

  const totalTimeInMinutes = totalHours * 60 + totalMinutes;
  const timeInMinutes = timeHours * 60 + timeMinutes;

  const percentage = (timeInMinutes / totalTimeInMinutes) * 100;

  if (percentage <= 60) {
    return "text-green-500";
  } else if (percentage <= 99.9) {
    return "text-yellow-500";
  } else {
    return "text-red-500";
  }
};

export const getScoreColor = (score: string): string => {
  const percentage = parseFloat(score.replace("%", ""));

  if (percentage >= 75) {
    return "text-green-500";
  } else if (percentage >= 50) {
    return "text-yellow-500";
  } else {
    return "text-red-500";
  }
};

export const getLevelColor = (level: string): string => {
  switch (level) {
    case "easy":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "hard":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

function RecentTestTable({
  recentTests,
  className,
  ...props
}: React.ComponentProps<"table"> & { recentTests: IRecentTests[] }) {
  function getAverageScore(recentTests: IRecentTests[]): string {
    const totalScore = recentTests.reduce((sum, test) => {
      const score = parseFloat(test.score.replace("%", ""));
      return sum + score;
    }, 0);

    const averageScore = totalScore / recentTests.length;
    return `${averageScore.toFixed(2)}%`;
  }
  return (
    <Card className={cn("w-full max-w-3xl", className)}>
      <CardHeader>
        <CardTitle>Pēdējie testi</CardTitle>
        <CardDescription>Pēdējo 10 testu rezultāti.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Tiek uzrādīti pēdējie 10 testi, kas veikti ar šo kontu.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Datutms</TableHead>
              <TableHead>Atbildēti jaut.</TableHead>
              <TableHead>Līmenis</TableHead>
              <TableHead className="text-right">Rezultāts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell className="font-medium">{test.id}</TableCell>
                <TableCell>{test.date}</TableCell>
                <TableCell className={getQuestionColor(test.questions)}>
                  {test.questions}
                </TableCell>
                <TableCell
                  className={cn(getLevelColor(test.level), "uppercase")}
                >
                  {test.level}
                </TableCell>
                <TableCell
                  className={`text-right ${getScoreColor(test.score)}`}
                >
                  {test.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Vidējais rezultāts</TableCell>
              <TableCell
                className={`text-right ${getScoreColor(
                  getAverageScore(recentTests)
                )}`}
              >
                {getAverageScore(recentTests)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RecentTestTable;
