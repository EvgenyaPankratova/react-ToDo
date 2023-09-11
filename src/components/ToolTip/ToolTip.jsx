
import styles from "./ToolTip.module.css";

const ToolTip = ({toolTipId}) => {
    return <div className={styles.tooltip_container} >
        <span className={styles.tooltip}>{toolTipId === 'del' ? 'удалить задачу' : 
    toolTipId === 'edit' ? 'редактировать задачу' : 
    toolTipId === 'load' ? 'загрузить файл' : ''}</span></div>
}

export default ToolTip;