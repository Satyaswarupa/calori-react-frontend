import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Activity from "../components/Activity";

const Burned = () => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [activity, setActivity] = useState("");
  const [calorieBurned, setCalorieBurned] = useState("");
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  // Fetch activities from the server
  useEffect(() => {
    axios
      .get(`${server}/activity/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setActivities(res.data.activity);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/activity/${id}`,
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
      const { data } = await axios.delete(`${server}/activity/${id}`, {
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
        `${server}/activity/new`,
        {
          date,
          name,
          activity,
          calorieBurned,
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
      setActivity("");
      setCalorieBurned("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [open, setOpen] = useState(false);

  const activityCalories = {
    walking: 115,
    Running: 100,
    swimming: 200,
    yoga: 230,
    pushup: 42,
    skipping: 250,
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setOpen(true);
  };

  const handleActivitySelect = (activity) => {
    setActivity(activity);
    setCalorieBurned(activityCalories[activity]);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <div className="login">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Select Activity</DialogTitle>
          <DialogContent>
            <ul>
              {Object.keys(activityCalories).map((activity) => (
                <li key={activity} onClick={() => handleActivitySelect(activity)}>
                  {activity}
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
              placeholder="Activity Name"
              required
              value={activity || ""}
              onClick={() => setOpen(true)}
              readOnly
            />

            <input
              type="number"
              placeholder="CalorieBurned"
              required
              value={calorieBurned}
              onChange={(e) => setCalorieBurned(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
      {activities && activities.map((activity) => (
        <Activity
          name={activity.name}
          date={activity.date}
          activity={activity.activity}
          calorieBurned={activity.calorieBurned}
          isCompleted={activity.isCompleted}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          id={activity._id}
          key={activity._id}
        />
      ))}
    </section>
    </div>
  );
};

export default Burned;


