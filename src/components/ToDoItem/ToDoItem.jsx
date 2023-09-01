
import { useEffect, useRef, useState } from "react";
import styles from "./ToDoItem.module.css";
import classNames from "classnames";
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { BiSolidDownload } from 'react-icons/bi';
import { BsFillPencilFill } from 'react-icons/bs';
import ToolTipEdit from '../ToolTipEdit/ToolTipEdit';
import ToolTipDelete from "../ToolTipDelete/ToolTipDelete";

const ToDoItem = ({allTasks,
     setAllTasks, 
     activeTasks, 
     finishedTasks,
      activeButton,
       finishedButton,
       setActiveTasks,
    setFinishedTasks
    }) => {
   
    const [selected, setSelected] = useState([]);
    const [showToolTip, setShowToolTip] = useState(false);

    const onMouseEnterHandler = () => {
        setShowToolTip(true);
      };
    
      const onMouseLeaveHandler = () => {
        setShowToolTip(false);
      };


    const handleToggle = (e, elem, index) => {
            setAllTasks((prev) => prev.map(item => {
                return elem.id === item.id ? {...item, isActive : !item.isActive} : item //создали новый объект, скопировав старые сво-ва и поменяли isActive
            }))
           
            if (e.target.checked) {
                setSelected([...selected, elem]);
             } else {
                setSelected(selected.filter((item) => item.id !== elem.id));
             }
             
    }

   
    let tasks = activeButton ? activeTasks : finishedButton ? finishedTasks : allTasks;

    const handlerDelete = (elem) => {
        setAllTasks(tasks.filter(item => item.id !== elem.id))
        setActiveTasks(tasks.filter(item => item.id !== elem.id))
        setFinishedTasks(tasks.filter(item => item.id !== elem.id))
    }

    const handleClick = (elem) => {
        setAllTasks((prev) => prev.map(item => {
            return elem.id === item.id ? {...item, name: prompt("введите значение") ?? "задача" } : item 
        }))
      }

   
    return (
        (tasks.length === 0) ? (<div>Этот список пуст</div>) :

        (<div className={styles.tasks}>
             
            {tasks.map((task, index) => {
                return  <div key={task.id}  className={classNames(!task.isActive  ? styles.task_checked : null, styles.task)}> <input  onChange={(e) => handleToggle(e, task, index)} type="checkbox"></input>{task.name}
                <h2 className={styles.task_edit} onClick={() => handleClick(task)} ><BsFillPencilFill/></h2>
                <h2  className={styles.task_load}><input className={styles.task_input_img} id="image-input" type="file" accept=".png,.jpg,.jpeg,.gif"></input><BiSolidDownload/></h2>
                <h2 onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={styles.task_delete} onClick={() => handlerDelete(task)}>< RiDeleteBin2Fill/></h2> </div>
            })}

{showToolTip && <ToolTipDelete/>}
            
        </div>  )
        
    );
}

export default ToDoItem;