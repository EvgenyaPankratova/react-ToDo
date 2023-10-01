import { useRef, FC } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem.tsx';
import styles from "./ToDoList.module.css";
import type {ITask} from "../Main/Main.tsx";

interface ToDoListProps {
    onChange: (newTask: string) => void,
    onSubmit: (newTask: string) => void,
    allTasks: ITask[],
    newTask: string,
    setAllTasks: any, 
    activeTasks: ITask[], 
    finishedTasks: ITask[],
    activeButton: boolean,
    finishedButton: boolean,
    setActiveTasks: any,
    setFinishedTasks: any
  }

const ToDoList: FC <ToDoListProps> = ({ onChange, 
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

    const ref: React.MutableRefObject<HTMLInputElement> = useRef(); //отслеживаем инпут для очистки формы

    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       onChange(event.target.value);
    }

    const handleTaskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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