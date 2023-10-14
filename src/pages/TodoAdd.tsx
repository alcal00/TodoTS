import { PropsWithChildren, useState, } from 'react';

type TodoProps = PropsWithChildren<{
    handleAddTodo: (todo: { title: string }) => Promise<void>
}>

export const TodoAdd = (props: TodoProps) => {
    const [todo, setTodo] = useState({
        title: ''
    })

    const { handleAddTodo } = props

    /**
     * 
     * @param {SubmitEvent} evt 
     */
   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleAddTodo(todo).catch(err => console.error(err))
        setTodo({ ...todo, title: '' })
    }

    /**
     * 
     * @param {import("react").ChangeEvent} evt 
     */
    function handleChangeAddTodo(evt: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.target
        setTodo({ ...todo, [name]: value })
    }

    return (
        <div className="mt-3 max-w-lg mx-auto p-4">
            <form className="flex flex-row m-5" onSubmit={e => handleSubmit(e)}>
                <input type="text" className="w-full m-2 border border-gray-600 h-8 rounded-sm pl-2"
                placeholder='What needs to be done?'
                    name="title" id="title" value={todo.title} onChange={(evt) => handleChangeAddTodo(evt)} />
                <input type="submit" value="Add a Todo" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded my-auto " />
            </form>
        </div>
    )
}