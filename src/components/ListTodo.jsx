import { useContext, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import todoContext from '../todoContext'

const ListTodo = () => {
  const [todos, setTodos] = useContext(todoContext)
  // Using an array to store completed todo IDs (easier to understand for beginners)
  const [completedTodos, setCompletedTodos] = useState([])

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id)
    setTodos(filteredTodos)

    // Remove the deleted todo from completed list if it was completed
    const updatedCompletedTodos = completedTodos.filter(
      (todoId) => todoId !== id
    )
    setCompletedTodos(updatedCompletedTodos)

    toast.success('Task Deleted Successfully!', {
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
  }

  const toggleComplete = (id) => {
    // Check if the todo is already completed
    const isCurrentlyCompleted = completedTodos.includes(id)

    if (isCurrentlyCompleted) {
      // Remove from completed list
      const updatedCompletedTodos = completedTodos.filter(
        (todoId) => todoId !== id
      )
      setCompletedTodos(updatedCompletedTodos)
    } else {
      // Add to completed list
      const updatedCompletedTodos = [...completedTodos, id]
      setCompletedTodos(updatedCompletedTodos)
    }
  }

  const renderTodoList = todos.map((todo, index) => {
    // Check if this todo is completed by looking in the completedTodos array
    const isCompleted = completedTodos.includes(todo.id)

    return (
      <li
        key={todo.id}
        className={`bg-gray-700/30 border border-gray-600 rounded-xl p-4 transition-all duration-300 hover:bg-gray-700/50 ${
          isCompleted ? 'opacity-75 border-green-500/30' : ''
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <button
              onClick={() => toggleComplete(todo.id)}
              className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                isCompleted
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-400 hover:border-green-400'
              }`}
            >
              {isCompleted && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-lg transition-all duration-200 ${
                  isCompleted ? 'text-gray-400 line-through' : 'text-white'
                }`}
              >
                {todo.title}
              </h3>
              {todo.details && (
                <p
                  className={`mt-1 text-sm transition-all duration-200 ${
                    isCompleted ? 'text-gray-500 line-through' : 'text-gray-300'
                  }`}
                >
                  {todo.details}
                </p>
              )}
              <div className="flex items-center mt-2 space-x-2">
                <span className="text-xs text-gray-500">#{index + 1}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    isCompleted
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {isCompleted ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => deleteTodo(todo.id)}
            className="ml-4 p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            title="Delete task"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </li>
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg">
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
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white">Your Tasks</h2>
        </div>

        {todos.length > 0 && (
          <div className="text-sm text-gray-400">
            {completedTodos.length} of {todos.length} completed
          </div>
        )}
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-400 mb-2">
            No tasks yet
          </h3>
          <p className="text-gray-500">Add your first task to get started!</p>
        </div>
      ) : (
        <div className="relative">
          {/* Scrollable container with fixed height */}
          <ul className="space-y-3 h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {renderTodoList}
          </ul>

          {/* Scroll indicator - shows when there are many tasks */}
          {todos.length > 3 && (
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-800/50 to-transparent pointer-events-none rounded-b-xl" />
          )}
        </div>
      )}
    </div>
  )
}

export default ListTodo
