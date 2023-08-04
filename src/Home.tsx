import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./components/Popup";
import { usePopupStore } from "./store/PopupStore";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// Initialization for ES Users
import { Modal, Ripple, initTE } from "tw-elements";
initTE({ Modal, Ripple });

interface ITodo {
  id: string;
  content: string;
  completed: boolean;
}

const inputStyle = {
  caretColor: "transparent",
};

function Home() {
  const [tasks, setTasks] = useState<ITodo[]>([]);
  const [task, setTask] = useState<ITodo>({} as ITodo);
  const [content, setContent] = useState("");
  const [showNotification, setShowNotification] = useState<ITodo>({} as ITodo);
  const { isPopupOpen, setIsPopupOpen } = usePopupStore();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const [listRef] = useAutoAnimate<HTMLTableSectionElement>();

  function handleAddTask() {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement;
    if (content === "") {
      return;
    }
    fetch("https://todoapi-uxe5.onrender.com/api/v2/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content }),
    }).then(async (res) => {
      const json = await res.json();
      if (res.status >= 400) {
        setIsPopupOpen(json.message);
      } else {
        handleGetTask();
        setContent("");
      }
      taskInput.value = "";
    });
  }

  // useEffect(() => {
  //   const taskInput = document.getElementById("taskInput") as HTMLInputElement;
  //   taskInput.addEventListener("keypress", (e) => {
  //     if (e.key === "Enter") {
  //       handleAddTask();
  //     }
  //   });
  // }, []);

  function handleGetTask() {
    fetch("https://todoapi-uxe5.onrender.com/api/v2/todos", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.status === 200 ? res.json() : navigate("/login");
      })
      .then((data) => {
        setTasks(data.todos);
      });
  }

  function handleDeleteTask(task: ITodo) {
    fetch("https://todoapi-uxe5.onrender.com/api/v2/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ todoIDs: [task.id] }),
    })
      .then((res) => res.json())
      .then(() => {
        handleGetTask();
      });
  }

  function handleUpdateTask(task: ITodo) {
    fetch("https://todoapi-uxe5.onrender.com/api/v2/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        todo: {
          id: task.id,
          content: task.content,
          completed: task.completed,
        },
      }),
    })
      .then((res) => res.json())
      .then(handleGetTask);
  }

  useEffect(() => {
    handleGetTask();
  }, []);

  return (
    <div id="home" className="">
      <form
        id="taskForm"
        className="flex justify-center items-center gap-4 pb-3 pt-10 mx-2"
      >
        <input
          type="text"
          id="taskInput"
          autoComplete="off"
          className="block bg-transparent relative z-10 box-border text-white rounded-3xl hover:outline-none focus:outline-none lg:text-2xl text-lg font-semibold lg:w-2/5 w-5/6 lg:p-5 lg:pl-5 pl-2 border-2 border-white focus:border-2 focus:border-red-300"
          placeholder="Enter New Task"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTask();
            }
          }}
        ></input>

        <button
          type="button"
          ref={buttonRef}
          style={inputStyle}
          onClick={handleAddTask}
          className="rounded-3xl lg:text-2xl text-lg lg:py-6 py-1 lg:px-14 px-7 text-white bg-red-300 
                   hover:bg-red-400"
        >
          Add
        </button>
      </form>
      {/* <hr className="ms-20 me-20 mt-10" /> */}
      <div
        className="relative mt-10 flex justify-center mx-auto"
        style={inputStyle}
      >
        <table className="text-left lg:w-4/6 w-full">
          <tbody
            className="overflow-y-scroll flex flex-col items-center"
            ref={listRef}
            style={{ height: "70vh" }}
          >
            {tasks.map((task) => {
              return (
                <tr
                  className="bg-transparent border-t dark:border-white text-white w-11/12"
                  key={task.id}
                >
                  <td className="md:px-4 md:pr-0 pr-4 relative" id={task.id}>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full md:p-3 p-0"
                        htmlFor="checkbox"
                        data-ripple-dark="true"
                      >
                        <input
                          type="checkbox"
                          style={inputStyle}
                          className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-400 before:opacity-0 before:transition-opacity checked:border-red-300 checked:bg-red-300 checked:before:bg-red-300 hover:before:opacity-30"
                          checked={task.completed}
                          onClick={() => {
                            task.completed = !task.completed;
                            handleUpdateTask(task);
                          }}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="1"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </label>
                    </div>
                  </td>
                  <td
                    scope="row"
                    style={inputStyle}
                    className="w-11/12 lg:pr-7 py-4 lg:text-xl text-lg font-medium text-white  dark:text-white lg:max-w-xs max-w-[100px] whitespace-normal break-words "
                  >
                    {task.content}
                  </td>

                  <td className="py-4 lg:pl-0 pl-5 pr-3 w-1 lg:text-3xl text-2xl whitespace-nowrap me-1">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      type="button"
                      className="cursor-pointer transition ease-linear hover:text-red-300"
                      onClick={() => {
                        setTask(task);
                        setContent(task.content);
                      }}
                    />
                  </td>

                  <td className="py-4 pl-3 lg:pr-9 pr-0 lg:text-3xl text-2xl whitespace-nowrap ">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="cursor-pointer transition ease-linear hover:text-red-300"
                      onClick={() => {
                        setShowNotification(task);
                        // handleDeleteTask(task);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {task.content || task.content == "" ? (
        <>
          <div className="justify-center mt-24 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white/[.60] outline-none focus:outline-none">
                {/*header*/}

                <div className="flex items-start justify-between  h-6 bg-red-300 bg-opacity-50 rounded-t-lg"></div>
                {/*body*/}
                <div className="relative m-3 px-3 flex-auto">
                  <input
                    type="text"
                    id="inputUpdate"
                    className="border w-full text-black  p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300 bg-white opacity-70"
                    defaultValue={task.content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  ></input>
                </div>
                {/*footer*/}
                <div className="flex  mx-6 my-3 rounded-b">
                  <button
                    className="text-white hover:text-red-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setTask({} as ITodo)}
                  >
                    Close
                  </button>
                  <button
                    disabled={content == ""}
                    className={`${
                      content == ""
                        ? "bg-gray-300"
                        : "bg-red-300 active:bg-red-400 "
                    }text-white  font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => {
                      task.content = content;
                      if (task.content == "") return;
                      handleUpdateTask(task);
                      setTask({} as ITodo);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showNotification.content || showNotification.content == "" ? (
        <>
          <div className="justify-center mt-24 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white/[.60] outline-none focus:outline-none">
                {/*header*/}

                <div className="relative flex items-start h-6 bg-red-300 bg-opacity-50 rounded-t-lg ">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="aspect-square absolute left-3 top-1 "
                  />
                </div>
                {/*body*/}
                <div className="relative m-3 px-3 flex-auto">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">
                    {showNotification.content}
                  </span>
                  ?
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end m-6  border-slate-200 rounded-b">
                  <button
                    className="text-white hover:text-red-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowNotification({} as ITodo)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-red-300 text-white active:bg-red-400 font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowNotification({} as ITodo);
                      handleDeleteTask(showNotification);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {isPopupOpen && <Popup message={isPopupOpen} />}
    </div>
  );
}

export default Home;
