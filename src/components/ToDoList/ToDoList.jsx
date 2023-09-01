import { useRef } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import styles from "./ToDoList.module.css";

const ToDoList = ({ onChange, 
    onSubmit, 
    allTasks, 
    newTask, 
    setAllTasks, 
    activeTasks, 
    finishedTasks, 
    activeButton, 
    finishedButton,
    setActiveTasks,
    setFinishedTasks

}) => {

    const ref = useRef(); //отслеживаем инпут для очистки формы

    const handleTaskChange = (event) => {
       onChange(event.target.value);
    }

    const handleTaskSubmit = (event) => {
        event.preventDefault();
        ref.current.value = ''; //очищаем форму после отправки
        onSubmit(newTask);
    }

    return (
        <div className={styles.list}>

            <form onSubmit={handleTaskSubmit}>
                <input
                ref={ref}
                className={styles.list__new__task}
                type="text"
                placeholder="Что нужно сделать?"
                onChange={handleTaskChange}
                pattern="^[А-Яа-яЁёa-zA-Z\s]+$"
                required
                title="Используйте только буквы"
                >
                </input>
            </form>
            
            <ToDoItem allTasks={allTasks}
             setAllTasks={setAllTasks} 
             activeTasks={activeTasks}
              finishedTasks={finishedTasks}
               activeButton={activeButton} 
               finishedButton={finishedButton}
               setActiveTasks={setActiveTasks}
                setFinishedTasks={setFinishedTasks}/>
        </div>
    );
}

export default ToDoList;