import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartQuiz from "./StartQuiz";
import Question from "./Question";
import Options from "./Options";
import Next from "./Next";

const initialState = {
  questions: [],

  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === state.questions.at(state.index).correctOption
            ? state.point + state.questions.at(state.index).points
            : state.point,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    default: {
      throw new Error("Action is Unknown");
    }
  }
}

function App() {
  const [{ status, questions, index, answer }, despatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        despatch({ type: "dataRecieved", payload: data });
      } catch (error) {
        despatch({ type: "error" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartQuiz numQuestions={numQuestions} despatch={despatch} />
        )}
        {status === "active" && (
          <>
            <Question question={questions.at(index)} answer={answer}>
              <Options question={questions.at(index)} despatch={despatch} />
            </Question>

            <Next despatch={despatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
