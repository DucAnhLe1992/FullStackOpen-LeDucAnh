import React, { useState } from "react";
import "./App.css";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={good + neutral + bad} />
          <Statistic
            text="Average"
            value={(good - bad) / (good + neutral + bad)}
          />
          <Statistic
            text="Positive"
            value={(good / (good + neutral + bad)) * 100 + " %"}
          />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
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
      <h2>Give feedback</h2>

      <Button text="Good" handleClick={handleGood} />
      <Button text="Neutral" handleClick={handleNeutral} />
      <Button text="Bad" handleClick={handleBad} />

      <h2>Statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
