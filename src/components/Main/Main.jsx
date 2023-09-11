import styles from "./Main.module.css";
import ToDoList from "../ToDoList/ToDoList"
import { useState } from "react";
import classNames from "classnames";

const Main = () => {

    const [newTask, setNewTask] = useState('');
    const [activeTasks, setActiveTasks] = useState([]);
    const [finishedTasks, setFinishedTasks] = useState([]);
    const [activeButton, setActiveButton] = useState(false);
    const [finishedButton, setFinishedButton] = useState(false);
    const [allTasks, setAllTasks] = 
    useState([
    {name: 'Создать проект',
    id: Math.random() * 100,
    isActive: true,
    haveImg: false,
    fullImage: false,
    time: new Date().toLocaleString("ru", {
        year: "2-digit",
        month: "2-digit",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
},
    {name: 'Выпить кофе',
    id: Math.random() * 100,
    isActive: true,
    haveImg: false,
    fullImage: false,
    time: new Date().toLocaleString("ru", {
        year: "2-digit",
        month: "2-digit",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
},
    {name: 'Закончить проект',
    id: Math.random() * 100,
    isActive: true,
    haveImg: false,
    fullImage: false,
    time: new Date().toLocaleString("ru", {
        year: "2-digit",
        month: "2-digit",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    }
]);

    const createnewTaskOnChange = (newTask) => {
        setNewTask(newTask);

    }

    const createNewTaskOnSubmit = (newTask) => {
        setAllTasks((prev) => {
           return [
                ...prev, 
                {name: newTask,
                id: Math.random() * 100,
                isActive: true,
                time: new Date().toLocaleString("ru", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                }    
            ]});
    }

    const doneButtonToggle = () => {
        setFinishedTasks(allTasks.filter(elem => elem.isActive === false))
        setFinishedButton(true);
        setActiveButton(false);
    }

    const activeButtonToggle = () => {
        setActiveTasks(allTasks.filter(elem => elem.isActive))
        setActiveButton(true);
        setFinishedButton(false);
    }

    const allButtonToggle = () => {
        setActiveButton(false);
        setFinishedButton(false);
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Задачи</h1>
            <div className={styles.main_block}>
                <ToDoList  onChange={createnewTaskOnChange} onSubmit={createNewTaskOnSubmit} allTasks={allTasks} newTask={newTask} setAllTasks={setAllTasks} activeTasks={activeTasks}
                 finishedTasks={finishedTasks} activeButton={activeButton} finishedButton={finishedButton}
                 setActiveTasks={setActiveTasks} setFinishedTasks={setFinishedTasks}/>
                <div className={styles.main_block_buttons}>
                    <button className={classNames(styles.main_button, !activeButton && !finishedButton ? styles.button_active : null )} onClick={allButtonToggle}>Все</button>
                    <button className={classNames(styles.main_button, activeButton  ? styles.button_active : null)} onClick={activeButtonToggle}>Активные</button>
                    <button className={classNames(styles.main_button, finishedButton  ? styles.button_active : null)} onClick={doneButtonToggle}>Завершённые</button>
                </div>
            </div>
            
        </main>
    );
}
export default Main;