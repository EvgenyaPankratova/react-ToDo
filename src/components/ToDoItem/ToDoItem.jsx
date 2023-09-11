
import { useEffect, useRef, useState } from "react";
import styles from "./ToDoItem.module.css";
import classNames from "classnames";
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { BiSolidDownload } from 'react-icons/bi';
import { BsFillPencilFill } from 'react-icons/bs';
import ToolTip from "../ToolTip/ToolTip";

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
    const [toolTipId, setToolTipId] = useState('');

    const [userImage, setUserImage] = useState(undefined);
    const [imageUrl, setImageUrl] = useState('');
    // const [fullImage, setSmallImage] = useState(false);


    useEffect(() => {
        if (userImage) {
            const photoUrl = URL.createObjectURL(userImage)
            setImageUrl(photoUrl);
        }  
        console.log(imageUrl)
    },[userImage])



    const onMouseEnterHandler = (e) => {
        setToolTipId(e.currentTarget.id);
        setShowToolTip(true);
      };
    
      const onMouseLeaveHandler = () => {
        setToolTipId('');
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

    const handleImage = (e, elem) => {
        setUserImage(e.target.files[0])

        setAllTasks((prev) => prev.map(item => {
            return elem.id === item.id ? {...item, haveImage : !item.haveImage} : item 
        }))
    }

    const toggleImage = (e, elem) => {
        setAllTasks((prev) => prev.map(item => {
            return elem.id === item.id ? {...item, fullImage : !item.fullImage} : item 
        }))
    }

   
    return (
        (tasks.length === 0) ? (<div>Этот список пуст</div>) :

        (<div className={styles.tasks}>
             
            {tasks.map((task, index) => {
                return  <div key={task.id}  className={classNames(!task.isActive  ? styles.task_checked : null, styles.task)}> <input  onChange={(e) => handleToggle(e, task, index)} type="checkbox"></input>{task.name}
                {task.haveImage && <img onClick={(e) => toggleImage(e, task)} className={task.fullImage ? styles.task_img_full : styles.task_img} src={imageUrl} alt={imageUrl}/>}
                <span className={styles.task_time}><span className={styles.task_time_title}>Создано:</span> {task.time}</span>
                <h2 id="edit"  onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={styles.task_edit} onClick={() => handleClick(task)} ><BsFillPencilFill/></h2>
                <h2 id="load"  onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}  className={styles.task_load}><input  className={styles.task_input_img}  type="file" accept=".png,.jpg,.jpeg,.gif" onChange={(e) => handleImage(e, task)}></input><BiSolidDownload/></h2>
                <h2 id="del" onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={styles.task_delete} onClick={() => handlerDelete(task)}>< RiDeleteBin2Fill/></h2> </div>
            })}

{showToolTip && <ToolTip toolTipId={toolTipId}/>}
            
        </div>  )
        
    );
}

export default ToDoItem;