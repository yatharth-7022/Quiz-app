function Questions({ question, dispatch, answer }) {
  console.log(question);
  const hasAnswered = answer !== null;
  console.log({ answer, hasAnswered, correctOption: question.correctOption });

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""}
             ${
               hasAnswered
                 ? index === question.correctOption
                   ? "correct"
                   : "wrong"
                 : ""
             }`}
            key={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next{" "}
      </button>
    </div>
  );
}

export default Questions;
