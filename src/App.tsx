import React, { useEffect, useState } from "react";
import Quizz from "./Components/Quizz";
import FinishQuizz from "./Components/FinishQuizz";
import FormUserDetails from "./Components/FormUserDetails";
import { User } from "./Types/User";
import "./styles.css";

export default function App() {
  const [startQuizz, setStartQuizz] = useState(false);
  const [submitQuizz, setSubmitQuizz] = useState(false);
  const [quizzData, setQuizzData] = useState({
    category: "",
    quizzScore: 0,
    numberOfQuestions: 0
  });

  const [user, setUser] = useState({
    firstName: "user",
    lastName: "",
    email: "",
    occupation: "",
    city: "",
    bio: ""
  });
  const [showUserForm, setShowUserForm] = useState(false);
  const [completeUserForm, setCompleteUserForm] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="App container mt-5">
      {!completeUserForm && (
        <>
          <h1>Hello, first you'll have to tell us smth about yourself ☺️</h1>
          {!showUserForm && (
            <button
              type="button"
              className="btn btn-primary mt-5"
              onClick={() => setShowUserForm(true)}
            >
              Enter your details
            </button>
          )}
        </>
      )}
      {showUserForm && (
        <FormUserDetails
          user={user}
          onSubmitForm={(data) => {
            let newUser = {
              ...user,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              occupation: data.occupation,
              city: data.city,
              bio: data.bio
            };
            setUser(newUser);
            setShowUserForm(false);
            setCompleteUserForm(true);
          }}
        />
      )}
      {!startQuizz && completeUserForm && (
        <>
          <h1>
            Hello {user.firstName}, are you ready to test your knowledge with a
            quizz?
          </h1>
          <button
            type="button"
            className="btn btn-primary mt-5"
            onClick={() => setStartQuizz(true)}
          >
            Start Quizz
          </button>
        </>
      )}
      {startQuizz && !submitQuizz && (
        <Quizz
          onSubmitQuizz={(data) => {
            setQuizzData(data);
            setSubmitQuizz(true);
          }}
        />
      )}
      {submitQuizz && (
        <FinishQuizz
          user={user}
          quizzData={quizzData}
          onRetry={() => setSubmitQuizz(false)}
        />
      )}
    </div>
  );
}
