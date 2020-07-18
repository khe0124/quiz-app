import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
//components
import QuestionCard from "./components/QuestionCard";
//Types
import { QuestionState, Difficulty } from "./API";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10;

const App = () => {
  //초기 설정을 세팅한다, [상태, 상태를 세팅해주기]
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM));

  //시작버튼을 누르면 상태가 초기화 되고 새로운 질문을 API요청해서 받아온다.
  const startTriviat = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.MEDIUM
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  console.log(questions);
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>퀴즈를 풀어봐👀</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTriviat}>
          시작하기
        </button>
      ) : null}

      <p className="score">점수: </p>
      <p>질문을 로딩중...🤔</p>
      {/* <QuestionCard
        questionNum= {number + 1}
        totalQuestions= {TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}></button>
    </div>
  );
};

export default App;
