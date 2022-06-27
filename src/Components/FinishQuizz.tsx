import React, { useState } from "react";
import { QuizzResponse } from "../Types/Quizz";
import { User } from "../Types/User";

interface FinishQuizzProps {
  user: User;
  quizzData: QuizzResponse;
  onRetry: () => void;
}

function FinishQuizz(props: FinishQuizzProps) {
  let greeting,
    emoji = "";
  switch (true) {
    case props.quizzData.quizzScore < 50:
      greeting = "Sorry ";
      emoji = "😢";
      break;
    case 50 <= props.quizzData.quizzScore && props.quizzData.quizzScore < 75:
      greeting = "Good job ";
      emoji = "😉";
      break;
    case 75 <= props.quizzData.quizzScore:
      greeting = "Great job ";
      emoji = "🥳";
      break;
  }

  return (
    <div>
      <h1>
        {greeting} {props.user.firstName} {emoji}{" "}
      </h1>
      <h2>
        You tested your knowledge with this awesome quizz and this are your
        results:
      </h2>

      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Quizz Score</th>
            <th scope="col">Number Of Questions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{props.quizzData.category}</th>
            <td>{props.quizzData.quizzScore}</td>
            <td>{props.quizzData.numberOfQuestions}</td>
          </tr>
        </tbody>
      </table>
      <h3 className="mt-5">Would you like to try it again?</h3>
      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={props.onRetry}
      >
        Restart Quizz
      </button>
    </div>
  );
}

export default FinishQuizz;
