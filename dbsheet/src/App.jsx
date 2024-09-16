import { useState } from 'react'
// import './App.css'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import User from './front/user'
import UpdateUser from './front/updateuser'
import CreateUser from './front/createUser'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<User></User>}></Route>
        <Route path='/create' element={<CreateUser/>}></Route>
        <Route path='/update/:id' element={<UpdateUser/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
