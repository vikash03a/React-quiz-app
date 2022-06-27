import React, { useState } from "react";

interface QuestionProps {
  id: number;
  question: string;
  correct_answer: string;
  quizz_answer: boolean;
  answerQuestion: (value: string, answer: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

function Question(props: QuestionProps) {
  const [activeQuestion, setActiveQuestion] = useState(
    props.quizz_answer == null ? true : false
  );
  const [visualFeedback, setVisualFeedback] = useState(
    props.quizz_answer == null ? "" : props.quizz_answer ? "correct" : "wrong"
  );

  const answerQuestion = (event) => {
    event.target.nextElementSibling.className =
      event.target.value == props.correct_answer ? "correct" : "wrong";
    setActiveQuestion(false);
    props.answerQuestion(event.target.value, props.correct_answer);
  };

  return (
    <>
      <div className={`question p-3 border-bottom bg-white`}>
        <div className="d-flex flex-row align-items-center question-title">
          <h3 className="text-danger">Q.{props.id + 1}</h3>
          <h5
            className="mt-1 ml-2"
            dangerouslySetInnerHTML={{ __html: props.question }}
          ></h5>
        </div>
        <div className="ans ml-2">
          <label className={`radio ${activeQuestion ? "active" : "disabled"}`}>
            {" "}
            <input
              type="radio"
              name={props.id}
              value="True"
              disabled={!activeQuestion}
              onChange={(event) => answerQuestion(event)}
            />{" "}
            <span
              className={
                props.quizz_answer != null &&
                ((props.correct_answer == "True" && props.quizz_answer) ||
                  (props.correct_answer == "False" && !props.quizz_answer))
                  ? visualFeedback
                  : ""
              }
            >
              True
            </span>
          </label>
        </div>
        <div className="ans ml-2">
          <label className={`radio ${activeQuestion ? "active" : "disabled"}`}>
            {" "}
            <input
              type="radio"
              name={props.id}
              value="False"
              disabled={!activeQuestion}
              onChange={(event) => answerQuestion(event)}
            />{" "}
            <span
              className={
                props.quizz_answer != null &&
                ((props.correct_answer == "False" && props.quizz_answer) ||
                  (props.correct_answer == "True" && !props.quizz_answer))
                  ? visualFeedback
                  : ""
              }
            >
              False
            </span>
          </label>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
        <button
          className={`btn btn-primary`}
          type="button"
          onClick={props.onPrev}
          disabled={props.id == "0"}
        >
          <i className="fa fa-angle-left mr-2"></i>Back
        </button>
        <button
          className="btn btn-success"
          type="button"
          onClick={props.onNext}
        >
          Next<i className="fa fa-angle-right ml-2"></i>
        </button>
      </div>
    </>
  );
}

export default Question;
