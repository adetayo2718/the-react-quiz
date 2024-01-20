function Next({ despatch, answer }) {
  if (answer === null) return;
  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => despatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    </div>
  );
}

export default Next;
