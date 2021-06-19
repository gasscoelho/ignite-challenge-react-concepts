import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

const MESSAGE_TASK_NOT_FOUND =
  "Não foi possivel completar a ação por que a task não foi encontrada.";

const MESSAGE_TASK_TITLE_EMPTY =
  "Por favor, informe um título para a sua task.";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function isEmptyTitle() {
    return !newTaskTitle;
  }

  function isTaskNotFound(index: number) {
    return index === -1;
  }

  function findTaskIndex(id: number) {
    return tasks.findIndex((task) => task.id === id);
  }

  function clearTaskTitle() {
    setNewTaskTitle("");
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (isEmptyTitle()) {
      return alert(MESSAGE_TASK_TITLE_EMPTY);
    }

    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);

    clearTaskTitle();
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const index = findTaskIndex(id);

    if (isTaskNotFound(index)) {
      return alert(MESSAGE_TASK_NOT_FOUND);
    }

    tasks[index].isComplete = !tasks[index].isComplete;

    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const index = findTaskIndex(id);

    if (isTaskNotFound(index)) {
      return alert(MESSAGE_TASK_NOT_FOUND);
    }

    tasks.splice(index, 1);

    setTasks([...tasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
