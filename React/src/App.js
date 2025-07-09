import './App.css';
import {Home} from './components/Home'
import { Department } from './components/Department';
import { Employee } from './components/Employee';
import { Navigation } from './components/Navigation';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className='container'>
    <BrowserRouter>
    <h3 className='m-3 d-flex justify-content-center'>React js with Bootstrap</h3>
    <h5 className='m-3 d-flex justify-content-center'>Employee Management Portal</h5>

    <Navigation/>
    
    <Routes>
    <Route path='/' element={<Home/>} exact /> 
    <Route path='/department' element={<Department/>} /> 
    <Route path='/employee' element={<Employee/>} /> 
    </Routes>
    </BrowserRouter>
</div>
);
}

export default App;
