import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Initialization for ES Users
import { Modal, Ripple, initTE } from "tw-elements";
initTE({ Modal, Ripple });

interface ITodo {
  id: string;
  content: string;
  completed: boolean;
}

function Home() {
  const [tasks, setTasks] = useState<ITodo[]>([]);
  const [task, setTask] = useState<ITodo>({} as ITodo);
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  function handleAddTask() {
    fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
      .then((res) => res.json())
      .then(() => {
        handleGetTask();
      });
  }

  function handleGetTask() {
    fetch("/api/todos", {
      method: "GET",
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
    fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoIDs: [task.id] }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleGetTask();
        alert(data.message);
      });
  }

  function handleUpdateTask(task: ITodo) {
    fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
    <>
      <form className="flex justify-center items-center gap-4 pb-3 pt-10">
        <input
          type="text"
          className="block bg-transparent text-white rounded-3xl hover:outline-none focus:outline-none text-2xl font-semibold w-2/5 p-5 border-2 border-white focus:border-2 focus:border-red-300"
          placeholder="Enter New Task"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></input>

        <button
          type="button"
          className="rounded-3xl  py-6 px-14  text-white bg-red-300 
                   hover:bg-red-400"
          onClick={() => {
            if (content === "") {
              return;
            }
            handleAddTask();
          }}
        >
          Add
        </button>
      </form>
      {/* <hr className="ms-20 me-20 mt-10" /> */}

      <div className="relative overflow-x-auto mt-10 flex justify-center">
        <table className="w-4/6 text-left">
          <tbody>
            {tasks.map((task) => {
              return (
                <tr
                  className="bg-transparent border-t dark:border-white  text-white"
                  key={task.id}
                >
                  <td className="w-10 px-4 relative" id={task.id}>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="checkbox"
                        data-ripple-dark="true"
                      >
                        <input
                          type="checkbox"
                          className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-400 before:opacity-0 before:transition-opacity checked:border-red-300 checked:bg-red-300 checked:before:bg-red-300 hover:before:opacity-30"
                          checked={task.completed}
                          onChange={() => {
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
                  <th
                    scope="row"
                    className=" pr-96 py-4 text-2xl font-medium text-white whitespace-nowrap dark:text-white"
                  >
                    {task.content}
                  </th>

                  <td className="py-4 pr-3 w-1 text-3xl whitespace-nowrap ">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      type="button"
                      className="cursor-pointer  hover:text-red-300"
                      onClick={() => {
                        setTask(task);
                      }}
                    />
                  </td>

                  <td className="py-4 pl-3 text-3xl whitespace-nowrap ">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="cursor-pointer  hover:text-red-300"
                      onClick={() => {
                        handleDeleteTask(task);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {task.content ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setTask({} as ITodo)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input
                    type="text"
                    className="border w-full text-black mb-4 p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300"
                    defaultValue={task.content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  ></input>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setTask({} as ITodo)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setTask({} as ITodo);
                      task.content = content;
                      handleUpdateTask(task);
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
    </>
  );
}

export default Home;
