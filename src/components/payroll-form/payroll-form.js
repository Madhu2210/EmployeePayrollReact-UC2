import React, { useState, useEffect } from 'react';
import profile1 from '../../Assets/profile-images/Ellipse -1.png';
import profile2 from '../../Assets/profile-images/Ellipse -3.png';
import profile3 from '../../Assets/profile-images/Ellipse -7.png';
import profile4 from '../../Assets/profile-images/Ellipse -8.png';
import '../../../src/components/payroll-form/payroll-form.css';
import logo from '../../Assets/images/logo.png';
import { useParams, Link } from 'react-router-dom';

const PayrollForm = (props) => {
    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../Assets/profile-images/Ellipse -1.png' },
            { url: '../../Assets/profile-images/Ellipse -3.png' },
            { url: '../../Assets/profile-images/Ellipse -7.png' },
            { url: '../../Assets/profile-images/Ellipse -8.png' }
        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departmentValue: [],
        gender: '',
        salary: '',
        day: '',
        month: '',
        year: '',
        startDate: '',
        notes: '',
        id: '',
        profilePic: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: ''
        }
    }

    const [formValue, setForm] =useState(initialValue);

    const changeValue =(event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const onCheckChange =(name) =>{
        let index= formValue.departmentValue.indexOf(name);
        let checkArray= [...formValue.departmentValue]
        if (index >-1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
            setForm({ ...formValue, departmentValue: checkArray });
    }
    const getChecked= (name) =>{
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }

    const validData= async ()=> {
        let isError = false;
        let error= {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }

        if (formValue.name.length < 1){
            error.name = 'name is required field'
            isError = true;
        }
        if (formValue.gender.length < 1) {
            error.gender= 'gender is required field'
            isError= true;
        }
        if (formValue.salary.length < 1) {
            error.salary= 'salary is required field'
            isError= true;
        }
        if (formValue.profileUrl.length < 1) {
            error.salary= 'profile is required field'
            isError= true;
        }
        if (formValue.departmentValue.length < 1) {
            error.salary= 'department is required field'
            isError= true;
        }
        await setForm({...formValue, error: error})
        return isError;
    }

    const save= async(event)=>{
        event.preventDefault();
    }

    const reset = ()=> {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});

        console.log(formValue);
    }


    return(
        <div className="payroll-main">
            <header className='header-content header'>
            <div className="logo">
            <img src={logo} alt="" />
            <div>
            <span className="emp-text">EMPLOYEE</span> <br />
            <span className="emp-text emp-payroll">PAYROLL</span>
            </div>
        </div>
    </header>

    <div className="content">
        <form className="form" action="#" onSubmit={save}>
        <div className="form-head"> Employee Payroll Form</div>
            <div className="row">
                <label className="label text" htmlFor="name"> Name </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="input" type="text" id="name" name="name" value={formValue.name} 
                    onChange={changeValue} placeholder="Your name.." />
            </div>
            <div className="error"> {formValue.error.name}</div><br />

            <div className="row">
            <label className="label text" htmlFor="profileUrl"> Profile images </label>
            <div className="profile-radio-button">
            <label>
            <input type ="radio" name="profileUrl" checked={formValue.profileUrl==='../../Assets/profile-images/Ellipse -3.png'}
                value="../../Assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                <img className="profile" src={profile1} alt="profile" />
            </label>
                            
            <label>
            <input type="radio" name="profileUrl" checked={formValue.profileUrl==='../../Assets/profile-images/Ellipse -1.png'}
                value="../../Assets/profile-images/Ellipse -1.png" onChange={changeValue} />
                <img className="profile" src={profile2} alt="profile" />
            </label>

            <label>
            <input type="radio" name="profileUrl" checked={formValue.profileUrl==='../../Assets/profile-images/Ellipse -8.png'}
                value="../../Assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                <img className="profile" src={profile3} alt="profile" />
            </label>

            <label>
            <input type="radio" name="profileUrl" checked={formValue.profileUrl==='../../Assets/profile-images/Ellipse -4.png'}
                value="../../Assets/profile-images/Ellipse -4.png" onChange={changeValue} />
                    <img className="profile" src={profile4} alt="profile" />
            </label>
            </div>
        </div>
        <div className="error"> {formValue.error.profileUrl}</div>

        <div className="row">
            <label className="label text" htmlFor="gender">Gender  
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" id="male" checked={formValue.gender==='male'} onChange={changeValue} name="gender" value="male" />
                <label className="text" htmlFor ="male">Male</label> 
                <input type="radio" id="female" checked={formValue.gender==='female'} onChange={changeValue} name="gender" value="female" />
                <label className="text" htmlFor ="female">Female</label> 
                </label>
        </div>
        <div className="error" > {formValue.error.gender}</div><br />

        <div className='row'>
            <label className="label text" htmlFor="department">Department
            &nbsp;&nbsp; 
            </label>
            {formValue.allDepartment.map(item => (
            <span key={item}> 
            <input className="checkbox" type= "checkbox" onChange={() =>
                onCheckChange(item)} name={item} checked={getChecked(item)} value={item} />
            <label className='text' htmlFor={item}>{item}</label>
            </span>
            ))}                         
        </div>
        <div className='error'> {formValue.error.department}</div><br />

        <div className='row'>
            <label className="label text" htmlFor="salary">Salary
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input className="input" type="number" onChange={changeValue} id="salary" value={formValue.salary}
                name="salary" placeholder="salary" />      
        </div>      
        <div className="error" > {formValue.error.salary}</div><br />

        <div className="row"> 
            <label className="Label text" htmlFor="startDate">Start Date
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <select value={formValue.day} onChange={changeValue} id="day" name="day">
            <option value="">Day</option>
                <option value="01">1</option>
                <option value="02">2</option>
                <option value="03">3</option>
                <option value="04">4</option>
                <option value="05">5</option>
                <option value="06">6</option>
                <option value="07">7</option>
                <option value="08">8</option>
                <option value="09">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
            </select>
            <select value={formValue.month} onChange={changeValue} id="month" name="month">
            <option value="" >Month</option>
                <option value="Jan">January</option>
                <option value="Feb">Febuary</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
            </select>
            <select value={formValue.year} onChange={changeValue} id="year" name="year">
            <option value=""   >Year</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
            </select>  
        </div>
        <div className="error" > {formValue.error.startDate}</div><br />

        <div className="row">
            <label className="label text" htmlFor="notes">Notes
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <textarea onChange={changeValue} id="notes" value={formValue.notes} className="input" 
                name="notes" placeholder="" style={{height: '100%' }}></textarea>
        </div>

        <div className="buttonParent">
            <Link to="" className="resetButton button cancelButton">Cancel</Link>

            <div className="submit-reset">
                <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'update' : 'submit'}</button>
                <button type="button" onClick={reset} className="resetButton button"> Reset</button>
            </div>
        </div>
        </form>
        </div>
        </div>
    )}
    export default PayrollForm;