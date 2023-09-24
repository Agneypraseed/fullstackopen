import { useState } from "react";

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
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
    <>
      {calcTotal() == 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <h1>statistics</h1>
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={calcTotal()} />
              <StatisticLine text="average" value={calcAvg()} />
              <StatisticLine text="positive" value={calcPositive()} />
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

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

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={() => handleGood()} />
      <Button name="neutral" handleClick={() => handleNeutral()} />
      <Button name="bad" handleClick={() => handleBad()} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
