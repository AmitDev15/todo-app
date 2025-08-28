import { useState } from 'react'
import TodoContext from './todoContext'

const Wrapper = (props) => {
  const [todos, setTodos] = useState([])

  return (
    // Step 2: Wrapping todoContext around the children
    <TodoContext.Provider value={[todos, setTodos]}>
      {props.children}
    </TodoContext.Provider>
  )
}

export default Wrapper
