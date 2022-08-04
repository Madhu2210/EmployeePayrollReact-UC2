import './App.css';
import logo from './logo.svg';
import PayrollForm from './components/payroll-form/payroll-form';
import { BrowserRouter, Routes, Route, withRouter } from "react-router-dom";

function App(){
  return(     
      <div className='Routing'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PayrollForm />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div> 
  );
}

export default App;