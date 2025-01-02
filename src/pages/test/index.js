"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
//import { Assignments } from "../models/assignment";
import connectDB from "../../lib/mongodb";

const questions = [
  {
    Question: "What is the capital of France?",
    Answers: ["Berlin", "Madrid", "Paris", "Rome"],
    CorrectAnswer: 2,
  },
  {
    Question: "What is 2 + 2?",
    Answers: ["3", "4", "5", "6"],
    CorrectAnswer: 1,
  },
  {
    Question: "Which is the largest planet in our solar system?",
    Answers: ["Earth", "Mars", "Jupiter", "Venus"],
    CorrectAnswer: 2,
  },
];

export default function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const Project = searchParams.get("project");
  const Assignment = searchParams.get("assignment");
  const userEmail = searchParams.get("email");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const ass = Assignment.substring(1, Assignment.length);
        const res = await fetch(
          `/api/getQuestions?project=${Project}&assignment=${ass}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log("Response data:", data.message);
          // Log the JSON data to the console
          setQuestions(data.message);
          //questions = data.message;
          //console.log(questions[0].Question);
          setLoading(false);
        } else {
          console.error("Error fetching data:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = async () => {
    if (selectedOption == questions[currentQuestion].CorrectAnswer) {
      setScore(score + 1);
    }

    setSelectedOption(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const total = questions.length;
      const Score =
        score +
        (selectedOption == questions[currentQuestion].CorrectAnswer ? 1 : 0);

      const res = await fetch("/api/submitAssignment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          Project,
          Assignment,
          Score,
          total,
        }),
      });
      console.log(res);
      if (res.status == 200) {
        router.push(
          `/result?score=${
            score +
            (selectedOption == questions[currentQuestion].CorrectAnswer ? 1 : 0)
          }&total=${
            questions.length
          }&project=${Project}&assignment=${Assignment}`
        );
      } else {
        router.push("/");
      }
    }
  };

  return (
    <>
      {!loading ? (
        <>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <p>Project: {Project}</p>
            <p>Assignment: {Assignment}</p>
            <br />
            <h1>
              Question {currentQuestion + 1} / {questions.length}
            </h1>
            <p>{questions[currentQuestion].Question}</p>

            <div>
              {questions[currentQuestion].Answers.map((option, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="radio"
                      name="option"
                      value={index}
                      checked={selectedOption === index}
                      onChange={() => setSelectedOption(index)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
              }}
            >
              {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </>
      ) : (
        <div>...loading</div>
      )}
    </>
  );
}
