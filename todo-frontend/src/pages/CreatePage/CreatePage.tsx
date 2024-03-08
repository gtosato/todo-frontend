import styles from "../CreatePage/CreatePage.module.scss"
import { FieldError, useForm, FieldValues, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createToDoListPost } from "../../services/to-do-list-services";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const CreatePage = () => {

    const schema = z.object({
       todoTask: z.string().min(1, "To Do Task must be at least 1 character"),
    });    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const navigate = useNavigate();
    
    const submitHandler: SubmitHandler<FieldValues> = async (data) => {
        try {
            const todoTaskValue = data.todoTask;

            await createToDoListPost(todoTaskValue);
            navigate("/");
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleCancelClick = () => {
        navigate("/");
    }
    
    return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)} >
        <Header />

        <div className={styles.fieldArea}>
            <div className={styles.fieldAreaContainer}>
                <h1 className={styles.headerTitle}>Add New Task</h1>
                <label htmlFor="todoTask">Enter To Do Task</label>
                <div>
                <input
                    className={styles.input}
                    type="text"
                    id="todoTask"
                    {...register("todoTask")}
                />
                </div>
                {errors.todoTask && (
                <div className={styles.errorMessage}>
                    {(errors.todoTask as FieldError).message}
                </div>
                    )}
                
                <div className={styles.btnContainer}>
                    <button className={styles.submitButton} type="submit">Submit</button>
                    <button className={styles.submitButton} onClick={handleCancelClick}>Cancel</button>
                </div>
            </div>        
        </div>
    </form>
  )
}

export default CreatePage