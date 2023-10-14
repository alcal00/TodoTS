import { PropsWithChildren } from "react"
import { TodoItem } from "../components/TodoItem"

interface todo {
    id: number,
    title: string,
    completed: boolean,
}

type TodosListProps = PropsWithChildren<{
    todos: todo[],
    handleRemoveTodo: (id: number) => Promise<void>,
    handleToggleTodo: (id: number, isChecked: boolean) => Promise<void>
    handleEditTodo: (id: number) => void,
    editTodoId: number | null
    editTodoTitle: string
    setEditTodoTitle: (title: string) => void,
    fetchSaveTodo: (id: number) => Promise<void>
}>

export const TodoList = (props: TodosListProps) => {
    const { todos,
        handleRemoveTodo,
        handleToggleTodo,
        handleEditTodo,
        editTodoId,
        editTodoTitle,
        setEditTodoTitle,
        fetchSaveTodo } = props
    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>
            <div>
                {todos.slice().reverse().map(todo => (
                    <TodoItem key={todo.id} todo={todo}
                        handleRemoveTodo={handleRemoveTodo}
                        handleToggleTodo={handleToggleTodo}
                        handleEditTodo={handleEditTodo}
                        editTodoId={editTodoId}
                        editTodoTitle={editTodoTitle}
                        setEditTodoTitle={setEditTodoTitle}
                        fetchSaveTodo={fetchSaveTodo} />
                ))}
            </div>
        </div>
    )
}