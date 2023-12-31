import React from "react";

const TodoItem = ({
  date,
  name,
  foodName,
  calorie,
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
        <h4>FoodName:</h4>
        <p>{foodName}</p>
        <h4>Calorie:</h4>
        <p>{calorie}</p>
      </div>
      <p>Target to achived calorie: 2500</p>
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

export default TodoItem;
