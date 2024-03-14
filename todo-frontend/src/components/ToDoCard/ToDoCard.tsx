import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "../ToDoCard/ToDoCard.module.scss";

export interface ToDoCardProps {
  id: number;
  title: string;
  isComplete: boolean;
  createdAt: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedData: Partial<ToDoCardProps>) => void;
}

const ToDoCard: React.FC<ToDoCardProps> = ({ id, title, isComplete, createdAt, onDelete, onUpdate }) => {
  const [localIsComplete, setLocalIsComplete] = useState(isComplete);
  const [editMode, setEditMode] = useState(false);
  const [titleInput, setTitleInput] = useState(title);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editMode && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [editMode]);  

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setLocalIsComplete(checked);
    onUpdate(id, { isComplete: checked });
  };

  function formatDate(dateString : string) : string {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const timeString = new Date(dateString).toLocaleTimeString(undefined, options);
    const dateStringFormatted = new Date(dateString).toLocaleDateString('en-GB');

    return `${timeString}, ${dateStringFormatted}`;
  }

  const deleteTask = () => {
    onDelete(id);
  }

  const toggleEdit = () => {
    setEditMode(!editMode)
  }

  const handleTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  }

  const handleUpdateTitle = () => {
    onUpdate(id, { title: titleInput });
    setEditMode(false);
  }  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleUpdateTitle();
    }
  };

  return (
    <article className={`${styles.card} ${localIsComplete ? styles.completed : ''}`} data-testid="to-do-card">
      <div className={styles.container__left}>
        <input
          type="checkbox"
          checked={localIsComplete}
          onChange={changeHandler}
          data-testid="checkbox" 
          id={String(id)}
        />
        {!editMode && 
          <p className={styles.fieldContent}>{title}</p>
        }
        {editMode && 
          <p className={styles.fieldContent}>
            <input
              type="text"
              name="titleInput"
              data-testid="title-input"
              value={titleInput}
              onChange={handleTitleInputChange}
              onBlur={handleUpdateTitle}
              onKeyDown={handleKeyDown}
              ref={titleInputRef}
            />
          </p>
        }
        <p className={styles.fieldContent}>{formatDate(createdAt)}</p>
      </div>
      <div className={styles.container__right}>
        {!localIsComplete && 
          <div className={styles.btnContainer}  onClick={toggleEdit} data-testid="pencil-button">
            <FontAwesomeIcon icon={faPencil} />
          </div>
        }
        <div className={styles.btnContainer} id="deleteBtn" onClick={deleteTask} data-testid="delete-button">
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </article>
  );
};

export default ToDoCard;
