import Layout from "./Layout";
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/outline";
import CardItem from "./CardItem";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState, useRef } from "react";

function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [showForm, setShowForm] = useState({
    todo: false,
    inProgress: false,
    done: false,
  });
  const [tasks, setTasks] = useState([]);
  const formRef = useRef(null);

  //filtering tasks by status
  const toDoTasks = tasks.filter((task) => task && task.status === "todo");
  const inProgressTasks = tasks.filter(
    (task) => task && task.status === "inProgress"
  );
  const doneTasks = tasks.filter((task) => task && task.status === "done");

  //updating tasks from CardItem
  const handleTaskUpdate = (updatedTask) => {
    if (updatedTask && updatedTask._id) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    //check if browser-rendering
    if (process.browser) {
      setReady(true);
    }

    //get tasks
    axios
      .get("http://localhost:8000/api/tasks/" + userId)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log("errori " + err);
      });

    //add new task textarea off, if clicking outside the box
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm({ todo: false, inProgress: false, done: false });
      }
    };

    //handleClickOutside called by mouse clicking
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      //remove event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleTaskUpdate]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }

    //updating task status when drag and dropping
    const newStatus = destination.droppableId;
    const taskId = draggableId;

    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);

    // send update request to backend
    axios
      .patch(`http://localhost:8000/api/task/edit/${taskId}`, {
        status: newStatus,
      })
      .then((response) => {
        console.log("Task updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  //add task
  const addTask = (title, status) => {
    const userId = localStorage.getItem("userId");
    axios
      .post(`http://localhost:8000/api/task/${userId}`, {
        title,
        status,
      })
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data.task]);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const onTextAreaKeyPress = (e, status) => {
    if (e.keyCode === 13) {
      // enter key
      const title = e.target.value.trim();
      if (title) {
        addTask(title, status);
        setShowForm({ ...showForm, [status]: false }); // close the textarea
        e.target.value = ""; // clear the textarea
      }
    }
  };

  return (
    <Layout>
      <div className="p-10 flex flex-col h-screen ">
        <div className="flex flex-initial justify-between">
          <div className="flex items-center">
            <h4 className="text-4xl font-bold text-gray-600">To-Do List</h4>
          </div>
        </div>

        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="agendaContainer flex flex-1 justify-between my-5 flex-wrap">
              {/* To Do Column */}
              <Droppable droppableId="todo">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`bg-gray-100 kanban-column rounded-md shadow-md
                    flex flex-col relative flex-1 ${
                      snapshot.isDraggingOver && "bg-green-100"
                    }`}
                  >
                    <span
                      className="w-full h-1 bg-black
                          absolute inset-x-0 top-0"
                    ></span>
                    <h4 className=" p-3 flex justify-between items-center mb-2">
                      <span className="text-2xl text-gray-600">To Do</span>
                    </h4>
                    {toDoTasks.map((task, index) => (
                      <CardItem
                        key={task._id}
                        task={task}
                        index={index}
                        onUpdate={handleTaskUpdate}
                      />
                    ))}
                    {provided.placeholder}
                    {showForm.todo ? (
                      <div ref={formRef} className="p-3">
                        <textarea
                          className="border-gray-300 rounded focus:ring-purple-400 w-full"
                          rows={3}
                          placeholder="Task info"
                          onKeyDown={(e) => onTextAreaKeyPress(e, "todo")}
                        />
                      </div>
                    ) : (
                      <button
                        className="flex justify-center items-center my-3 space-x-2 text-lg"
                        onClick={() => setShowForm({ ...showForm, todo: true })}
                      >
                        <span>Add task</span>
                        <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                      </button>
                    )}
                  </div>
                )}
              </Droppable>

              {/* In Progress Column */}
              <Droppable droppableId="inProgress">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`bg-gray-100 kanban-column rounded-md shadow-md
                    flex flex-col relative flex-1 ml-20  ${
                      snapshot.isDraggingOver && "bg-green-100"
                    }`}
                  >
                    <span
                      className="w-full h-1 bg-black
                          absolute inset-x-0 top-0"
                    ></span>
                    <h4 className=" p-3 flex justify-between items-center mb-2">
                      <span className="text-2xl text-gray-600">
                        In Progress
                      </span>
                    </h4>
                    {inProgressTasks.map((task, index) => (
                      <CardItem
                        key={task._id}
                        task={task}
                        index={index}
                        onUpdate={handleTaskUpdate}
                      />
                    ))}
                    {provided.placeholder}
                    {showForm.inProgress ? (
                      <div ref={formRef} className="p-3">
                        <textarea
                          className="border-gray-300 rounded focus:ring-purple-400 w-full"
                          rows={3}
                          placeholder="Task info"
                          onKeyDown={(e) => onTextAreaKeyPress(e, "inProgress")}
                        />
                      </div>
                    ) : (
                      <button
                        className="flex justify-center items-center my-3 space-x-2 text-lg"
                        onClick={() =>
                          setShowForm({ ...showForm, inProgress: true })
                        }
                      >
                        <span>Add task</span>
                        <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                      </button>
                    )}
                  </div>
                )}
              </Droppable>

              {/* Done Column */}
              <Droppable droppableId="done">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`bg-gray-100 kanban-column rounded-md shadow-md
                    flex flex-col relative flex-1 ml-20 ${
                      snapshot.isDraggingOver && "bg-green-100"
                    }`}
                  >
                    <span
                      className="w-full h-1 bg-black
                          absolute inset-x-0 top-0"
                    ></span>
                    <h4 className=" p-3 flex justify-between items-center mb-2">
                      <span className="text-2xl text-gray-600">Done</span>
                    </h4>
                    {doneTasks.map((task, index) => (
                      <CardItem
                        key={task._id}
                        task={task}
                        index={index}
                        onUpdate={handleTaskUpdate}
                      />
                    ))}
                    {provided.placeholder}
                    {showForm.done ? (
                      <div ref={formRef} className="p-3">
                        <textarea
                          className="border-gray-300 rounded focus:ring-purple-400 w-full"
                          rows={3}
                          placeholder="Task info"
                          onKeyDown={(e) => onTextAreaKeyPress(e, "done")}
                        />
                      </div>
                    ) : (
                      <button
                        className="flex justify-center items-center my-3 space-x-2 text-lg"
                        onClick={() => setShowForm({ ...showForm, done: true })}
                      >
                        <span>Add task</span>
                        <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                      </button>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  );
}
