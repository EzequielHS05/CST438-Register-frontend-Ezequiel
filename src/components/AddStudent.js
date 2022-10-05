import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
        })
        .then(response => response.json() )
        .then(responseData => {
            const { correct } = responseData;
            this.setState({
            correct: correct, 
            message: (correct ? 'Correct' : 'Not correct. Try again')
            });
        })
        .catch(err => console.error(err))
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

          </div>
        );
      }
}

export default AddStudent;