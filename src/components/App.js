import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import InitalScreen from "./InitalScreen";
import "../index.css";
import Questions from "./Questions";
function App() {
  const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataRecieved":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataNotRecieved":
        return { ...state, status: "Failed" };
      case "start":
        return { ...state, status: "active" };
      default:
        throw new Error("action not found");
      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "nextQuestion":
        return { ...state, index: state.index + 1, answer: null };
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  let { questions, status, index, answer } = state;
  const numQuestion = questions.length;
  useEffect(() => {
    const result = async () => {
      try {
        const response = await fetch("http://localhost:8000/questions");
        if (!response.ok) {
          throw new Error("not found");
        }
        const data = await response.json();

        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataNotRecieved" });
      }
    };
    result();
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "ready" && (
          <InitalScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Questions
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
