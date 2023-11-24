import React, { useState, useRef } from "react";
import axios from "axios";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

function CardItem({ task, index, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const formRef = useRef(null);

  const toggleEditMode = () => {
    setTitle(task.title);
    setEditMode((prevEditMode) => !prevEditMode);
  };

  //edit task
  const handleSave = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/api/task/edit/${task._id}`, {
        title: title,
      })
      .then((res) => {
        console.log(res);
        //edit mode off
        setEditMode((prevEditMode) => !prevEditMode);
        //send the update in parent
        onUpdate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete task
  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:8000/api/task/${taskId}`)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <Draggable index={index} draggableId={task._id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          {editMode ? (
            <div className="d-flex flex-col">
              <div ref={formRef} className="p-3">
                <textarea
                  className="border-gray-300 rounded focus:ring-purple-400 w-full"
                  rows={3}
                  placeholder="Task info"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <FontAwesomeIcon
                icon={faSquareCheck}
                onClick={handleSave}
                className="icon-pointer"
              />
            </div>
          ) : (
            <div className="d-flex justify-between">
              <h5 className="text-md my-3 text-lg leading-6">{task.title}</h5>
              <div className="d-flex flex-col justify-between">
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={toggleEditMode}
                  className="icon-pointer"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="icon-pointer"
                  onClick={() => deleteTask(task._id)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;
