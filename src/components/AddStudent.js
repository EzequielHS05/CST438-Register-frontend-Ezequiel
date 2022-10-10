import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddStudent extends Component {
    constructor(props){
        super(props);
        this.state=({student_email:'', student_name:'', student_id: 0, status_code:0});
    }
    handleSubmit = () =>{
        fetch('http://localhost:8080/student/',
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: this.state.student_id,
            student_email: this.state.student_email,
            student_name: this.state.student_name,
            status_code: this.state.status_code     
        })
        }).then(res => {
            if (res.ok) {
              toast.success("Student Succesfully registered", {
                  position: toast.POSITION.BOTTOM_LEFT
              });
            } else {
              toast.error("Student Registreation failed", {
                  position: toast.POSITION.BOTTOM_LEFT
              });
              console.error('Post http status =' + res.status);
        }}).catch(err => {
            console.error(err);
          }) 
    }
    
    handleChange = (event) =>  {
        this.setState({[event.target.name]: event.target.value});
     }
   
    render(){
        const {student_email, student_name, student_id, status_code} = this.state;
        return (
          <div>
            <b>Register Student</b>
            <br/><br/>
            <TextField autoFocus style = {{width:200}}
                label="Student Name" name="student_name"
                onChange={this.handleChange} value={student_name}
            />
            <br/><br/>
            <TextField autoFocus style = {{width:200}}
                label="Student Email" name="student_email"
                onChange={this.handleChange} value={student_email}
            />
            <br/> <br/>
            <Button variant="outlined" color="primary" style={{margin: 10}}
             onClick={this.handleSubmit} >Submit</Button>
             <ToastContainer autoClose={1500} />   

          </div>
        );
      }
}

export default AddStudent;