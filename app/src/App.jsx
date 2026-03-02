import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import InitialPage from './pages/InitialPage/InitialPage'
import Fotos from './pages/Fotos/Fotos'
import Posts from './pages/Post/Posts'
import Motivos from './pages/Motivos/Motivos'
import Musicas from './pages/Musicas/Musicas'
import Futuro from './pages/Futuro/Futuro'

function App() {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/initialPage' element={<InitialPage/>} />
            <Route path='/fotos' element={<Fotos/>} />
            <Route path='/posts' element={<Posts/>} />
            <Route path='/motivos' element={<Motivos/>} />
            <Route path='/musicas' element={<Musicas/>} />
        
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
