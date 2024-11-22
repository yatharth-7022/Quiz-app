function Questions({ question, dispatch, answer, index, numQuestion }) {
  console.log(question);
  const hasAnswered = answer !== null;
  console.log({ answer, hasAnswered, correctOption: question.correctOption });
  if (index === null) return null;
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

      {index < numQuestion - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
      {index === numQuestion - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      )}
    </div>
  );
}

export default Questions;
