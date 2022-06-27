import React, { useState, useEffect } from "react";
import { QuizzResponse } from "../Types/Quizz";
import Question from "./Question";

interface QuizzProps {
  onSubmitQuizz: (data: QuizzResponse) => void;
}

function Quizz(props: QuizzProps) {
  const [questions, setQuestions] = useState([]);
  const [quizzScore, setQuizzScore] = useState([]);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("https://opentdb.com/api.php?amount=10&category=19&type=boolean")
      .then((response) => response.json())
      .then((data) => {
        data.results.map((question) => {
          question.quizz_answer = null;
        });
        setQuestions(data.results);
      });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const [step, setStep] = useState(0);

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const nextStep = () => {
    if (step < 9) {
      setStep(step + 1);
    } else {
      props.onSubmitQuizz({
        category: questions[0]?.category,
        quizzScore: quizzScore.length,
        numberOfQuestions: 10
      });
    }
  };

  return (
    <>
      <h2>Trivia Game </h2>
      <h4 className="mt-5">Quizz from {questions[0]?.category}</h4>
      <div className="d-flex justify-content-center row">
        <div className="col-md-10 col-lg-10 mt-5">
          <div className="border">
            <div className="question bg-white p-3 border-bottom">
              <div className="d-flex flex-row justify-content-center align-items-center mcq">
                <h4>
                  Your score:{" "}
                  {((quizzScore.length || 0) / questions.length) * 100}%
                </h4>
              </div>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped bg-info"
                  role="progressbar"
                  style={{ width: ((step + 1) / 10) * 100 + "%" }}
                  aria-valuenow={50}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
            <Question
              key={step}
              id={step}
              question={questions[step]?.question}
              correct_answer={questions[step]?.correct_answer}
              quizz_answer={questions[step]?.quizz_answer}
              answerQuestion={(value, answer) => {
                questions[step].quizz_answer = value == answer;
                setQuestions(questions);
                setQuizzScore(
                  questions.filter((question) => question.quizz_answer)
                );
              }}
              onNext={nextStep}
              onPrev={prevStep}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Quizz;
