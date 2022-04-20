function Outcome({ outcome, show, onClickReset, score }) {
  return (
    <div>
      {show && (
        <div>
          {outcome === 1 && <div className="outcome">✔️</div>}
          {outcome === 0 && (
            <div>
              <div className="outcome">❌</div>
              <div className="play-again-container">
                <div className="gameover">
                  Game over, your score is {score}!{' '}
                </div>
                <button className="btn btn-success" onClick={onClickReset}>
                  Play again
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {outcome === 2 && <div className="outcome">😐</div>}
    </div>
  );
}

export default Outcome;
