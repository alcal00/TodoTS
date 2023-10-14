import { useState } from 'react';
import { PropsWithChildren } from "react"

interface todo {
    id: number,
    title: string,
    completed: boolean,
}
type TodoItemProps = PropsWithChildren<{
    todo: todo
    handleRemoveTodo: (id: number) => Promise<void>
    handleToggleTodo: (id: number, isChecked: boolean) => Promise<void>
    handleEditTodo: (id: number) => void
    editTodoId: number | null
    editTodoTitle: string
    setEditTodoTitle: (title: string) => void,
    fetchSaveTodo: (id: number) =>  Promise<void>
}>

export const TodoItem = (props: TodoItemProps) => {
    const { todo,
        handleRemoveTodo,
        handleToggleTodo,
        handleEditTodo,
        editTodoId,
        editTodoTitle,
        setEditTodoTitle,
        fetchSaveTodo } = props

    const [completed, setCompleted] = useState<boolean>(todo.completed)

    function handleCheckboxChange(evt: React.ChangeEvent<HTMLInputElement>): void {
        const isChecked = evt.target.checked;
        setCompleted(isChecked);
        handleToggleTodo(todo.id, isChecked).catch((err) => { console.error(err) })
    }
    function handleSaveEdit(): void {
        if (editTodoTitle.trim() !== '') {
            todo.title = editTodoTitle;   
        }
        if (todo.id === editTodoId) {
            fetchSaveTodo(todo.id)
            .catch((err) => { console.error(err) })
        }
    }


    return (
        <div className={`relative my-4 border border-gray-200 shadow-sm rounded-md bordered max-w-xl mx-auto
        ${completed ? "line-through text-stone-500" : ""
            }`}
            key={todo.id}>
            <ul className="my-2 flex flex-row justify-between px-2">
                <input type="checkbox" name="todochekbox" id="todochekbox"
                    onChange={handleCheckboxChange}
                    checked={completed} />
                {editTodoId === todo.id ? (
                    <input
                        type="text"
                        value={editTodoTitle}
                        onChange={(e) => setEditTodoTitle(e.currentTarget.value)}
                        className="border border-purple-500 rounded-md px-2 py-1"
                        id="edit-todo-title"
                    />
                ) : (
                    <li>
                        <div>{todo.title}</div>
                    </li>
                )}
                <li>
                    <button className="h-8 w-16 bg-red-500 hover:bg-red-700 text-white rounded "
                        onClick={() => void handleRemoveTodo(todo.id)}>
                        delete
                    </button>
                </li>
            </ul>
            <div className="absolute top-8 right-16 -mt-6 mr-4">
                {editTodoId === todo.id ? (
                    <button
                        className="px-2 py-1 border border-gray-200 rounded-md bg-purple-400 hover:bg-purple-600"
                        onClick={handleSaveEdit}
                    >
                        <span className="text-white">save</span>
                    </button>
                ) : (
                    <button
                        className="px-2 py-1 border border-gray-200 rounded-md bg-purple-400 hover:bg-purple-600"
                        onClick={() => {
                            void handleEditTodo(todo.id);
                        }}
                    >
                        <span className='text-white'>edit</span>
                    </button>
                )}
            </div>
        </div>

    )
}