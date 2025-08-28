import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.jsx'
import { Slide, ToastContainer } from 'react-toastify'
import Wrapper from './Wrapper.jsx'

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
    />
  </Wrapper>
)
