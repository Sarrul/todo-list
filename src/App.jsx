import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [array, setArray] = useState([]);
  const [Active, SetActive] = useState("All");
  const [filtered, setFiltered] = useState(array);
  const completedTasks = array.filter((cur) => cur.done).length;

  useEffect(() => {
    if (Active === "All") {
      setFiltered(array);
    } else if (Active === "Active") {
      setFiltered(array.filter((cur) => cur.done === false));
    } else if (Active === "Completed") {
      setFiltered(array.filter((cur) => cur.done === true));
    }
  }, [array, Active]);

  function handleAdd() {
    if (text !== "") {
      setArray([...array, { id: Date.now(), text: text, done: false }]);
      setText("");
    }
  }
  function handleDelete(id) {
    const filtered = array.filter((item) => item.id !== id);
    setArray(filtered);
  }
  function handleClear() {
    const clear = array.filter((cur) => !cur.done);
    setArray(clear);
  }

  return (
    <>
      <h2 className="todoWriting">To do list</h2>
      <div className="newBtns">
        <input
          className="input"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Add a new task..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
        />

        <button className="Addbtn inter" onClick={handleAdd}>
          add
        </button>
      </div>
      <div className="sortbtns btn">
        <button
          className={Active === "All" ? "button active" : "button"}
          onClick={function () {
            SetActive("All");
          }}
        >
          All
        </button>
        <button
          className={Active === "Active" ? "button active" : "button"}
          onClick={function () {
            SetActive("Active");
          }}
        >
          Active
        </button>
        <button
          className={Active === "Completed" ? "button active" : "button"}
          onClick={function () {
            SetActive("Completed");
          }}
        >
          Completed
        </button>
      </div>
      {filtered.length === 0 && (
        <div className="NotaskWriting">No tasks yet. Add one above!</div>
      )}
      {filtered.map((cur) => {
        return (
          <div key={cur.id}>
            <div className="todo row">
              <input
                type="checkbox"
                checked={cur.done}
                onChange={() => {
                  const newArray = array.map((item) =>
                    item.id === cur.id ? { ...item, done: !item.done } : item
                  );
                  setArray(newArray);
                }}
              />
              <div className={cur.done ? "strikethrough" : ""}>{cur.text}</div>
              <button
                className="deleteBtn"
                onClick={() => handleDelete(cur.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      {array.length > 0 && (
        <div className="footer">
          <div>
            {completedTasks} of {array.length} tasks completed{" "}
          </div>
          <button className="clearbtn" onClick={handleClear}>
            Clear Completed
          </button>
        </div>
      )}
    </>
  );
}

export default App;
