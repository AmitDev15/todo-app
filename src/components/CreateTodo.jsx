import { nanoid } from 'nanoid'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'
import todoContext from '../todoContext'

const CreateTodo = () => {
  const [todos, setTodos] = useContext(todoContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const submitHandler = (data) => {
    if (!data.todoTitle.trim()) return

    const newTodo = {
      id: nanoid(),
      title: data.todoTitle,
      details: data.todoDetails,
      isCompleted: false,
    }
    const copyTodos = [...todos]
    copyTodos.push(newTodo)
    setTodos(copyTodos)
    toast('✅ Task Added Successfully!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    })
    reset()
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white">Add New Task</h2>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Task Title
          </label>
          <input
            type="text"
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            {...register('todoTitle', { required: 'Title Cannot Be Empty' })}
          />
          {errors && errors.todoTitle && errors.todoTitle.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.todoTitle.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Details (Optional)
          </label>
          <textarea
            placeholder="Add more details about this task..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            {...register('todoDetails')}
          />
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-gray-200 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTodo
