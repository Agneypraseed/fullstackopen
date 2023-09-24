import { useState } from "react";

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = (newValue) => {
    setGood(good + 1);
  };

  const handleNeutral = (newValue) => {
    setNeutral(neutral + 1);
  };

  const handleBad = (newValue) => {
    setBad(bad + 1);
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
    </div>
  );
};

export default App;
