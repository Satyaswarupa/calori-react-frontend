import React from "react";

const Activity = ({
  date,
  name,
  activity,
  calorieBurned,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className="todo">
      <div>
        <h4>Date:</h4>
        <p>{date}</p>
        <h4>Name:</h4>
        <p>{name}</p>
        <h4>Activity:</h4>
        <p>{activity}</p>
        <h4>CalorieBurned:</h4>
        <p>{calorieBurned}</p>
      </div>
      <p>Target to achived for calorie burned: 2000</p>
      <div>
        <input
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
        />
        <button onClick={() => deleteHandler(id)} className="btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Activity;
