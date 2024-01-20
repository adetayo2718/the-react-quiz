function StartQuiz({ numQuestions, despatch }) {
  return (
    <div className="start">
      <h2> Welcome to the react Quiz</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => despatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartQuiz;
