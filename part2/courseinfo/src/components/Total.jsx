const Total = ({ parts }) => {
  let sum = 0;
  return (
    <>
      {parts.forEach((part) => {
        sum += part.exercises;
      })}
      <b>Total of {sum} exercises</b>
    </>
  );
};
export default Total;
