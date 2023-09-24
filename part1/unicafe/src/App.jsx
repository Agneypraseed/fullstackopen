import { useState } from "react";

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  const calcTotal = () => good + neutral + bad;

  const calcAvg = () => {
    if (calcTotal() === 0) return 0;
    else return (good * 1 + bad * -1) / calcTotal();
  };

  const calcPositive = () => {
    if (calcTotal() === 0) return 0;
    else return (good / calcTotal()) * 100;
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={() => handleGood()} />
      <Button name="neutral" handleClick={() => handleNeutral()} />
      <Button name="bad" handleClick={() => handleBad()} />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {calcTotal()}</p>
      <p>average {calcAvg()}</p>
      <p>positive {calcPositive()} %</p>
    </div>
  );
};

export default App;
