import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
//components
import QuestionCard from "./components/QuestionCard";
//Types
import { QuestionState, Difficulty } from "./API";
//Styles
import { GlobalStyle, Wrapper } from './App.styles'

export type AnswerObject = {
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

  //정답을 확인하는 함수
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      //유저가 선택한 답
      const answer = e.currentTarget.value;
      //정답과 일치하는지 확인
      const correct = questions[number].correct_answer === answer;
      //점수 매기기
      if(correct) setScore((prev: number) => prev + 1);
      //답을 배열에 저장하기
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject])
      nextQuestion();
    }
  };
  //다음 질문으로 넘어가기 함수
  const nextQuestion = () => {
    //마지막 질문이 아니라면 다음 질문으로 넘어가기
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>퀴즈를 풀어봐 👀</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTriviat}>
            시작하기
          </button>
        ) : null}

        {!gameOver ? <p className="score">점수: {score} </p> : null}
        {loading && <p>질문을 로딩중...🤔</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            다음 질문
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
