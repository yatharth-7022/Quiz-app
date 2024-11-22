function InitalScreen({ numQuestion, dispatch }) {
  return (
    <div className="start-container">
      <div className="start">
        <h2>Welcome to The react Quiz</h2>
        <h3>{numQuestion} question to test you React mastery</h3>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Let's start!
        </button>
      </div>
    </div>
  );
}

export default InitalScreen;
