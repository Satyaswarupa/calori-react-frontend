import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"


const Home = () => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [calorie, setCalorie] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          date,
          name,
          foodName,
          calorie,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setDate("");
      setName("");
      setFoodName("");
      setCalorie("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  const [selectedFood, setSelectedFood] = useState(null);
  const [open, setOpen] = useState(false);

  const foodCalories = {
    Roti: 297,
    Rice: 130,
    Chicken: 239,
    Apple: 52,
    Banana: 89,
    Dal: 90,
    Egg: 155,
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setOpen(true);
  };

  const handleFoodSelect = (food) => {
    setFoodName(food);
    setCalorie(foodCalories[food]);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <div className="login">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Select Food</DialogTitle>
          <DialogContent>
            <ul>
              {Object.keys(foodCalories).map((food) => (
                <li key={food} onClick={() => handleFoodSelect(food)}>
                  {food}
                </li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="text"
              placeholder="Food Name"
              required
              value={foodName}
              onClick={() => setOpen(true)}
              readOnly
            />

            <input
              type="number"
              placeholder="Calorie"
              required
              value={calorie}
              onChange={(e) => setCalorie(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            name={i.name}
            date={i.date}
            foodName={i.foodName}
            calorie={i.calorie}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
