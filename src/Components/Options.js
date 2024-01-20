function Options({ question, despatch, answer }) {
  console.log(question);
  const answered = !(answer === null);
  return (
    <div>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : null
          }`}
          key={option}
          onClick={() => despatch({ type: "newAnswer", payload: index })}
          disabled={answered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
