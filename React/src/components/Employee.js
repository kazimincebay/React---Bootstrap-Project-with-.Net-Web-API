import React, { Component } from "react";
import { AddEmpModal } from "./AddEmpModal";
import { Button, ButtonToolbar, Table } from "react-bootstrap";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emps: [],
      addModalShow: false,
      editModalShow: false,
    };
  }

  componentDidMount() {
    this.refreshlist();
  }
  componentDidUpdate() {
    this.refreshlist();
  }
  refreshlist() {
    fetch("http://localhost:52396/api/employee").then((response) => {
      return response.json();
    }).then((data)=>{
        this.setState({
            emps:data
        })
    })
  }
deleteEmp(empid){
    if(window.confirm(`Are you sure?`)){
 fetch("http://localhost:52396/api/employee/"+empid,
      {
        method:'DELETE',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
    }

  }




  render() {
    const { emps,empid,empname,depmt,mail,doj } = this.state;
    let addModalClose= ()=>{
        this.setState({addModalShow:false})
    }
    let editModalClose= ()=>{
      this.setState({editModalShow:false})
  }
    return (
      <div>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Mail</th>
            <th>Date of Join</th>
            <th>Options</th>

          </tr>
        </thead>
        <tbody>
          {emps.map((emp) => (
            <tr key={emp.EmployeeID}>
              <td>{emp.EmployeeID}</td>
              <td>{emp.EmployeeName}</td>
              <td>{emp.Department}</td>
              <td>{emp.Mail}</td>
              <td>{emp.DOJ}</td>
              <td>

<ButtonToolbar>
  <Button variant="warning" onClick={()=>{
    this.setState({editModalShow:true,empid:emp.EmployeeID,empname:emp.EmployeeName,depmt:emp.Department,mail:emp.Mail,doj:emp.DOJ})
  }}>
    Edit
  </Button>
  <Button variant="danger" className="ms-2" onClick={()=>this.deleteEmp(emp.EmployeeID)
  }>
    Delete
  </Button>

  <EditEmpModal
  show={this.state.editModalShow} onHide={editModalClose} empid={empid} empname={empname} depmt={depmt} mail={mail} doj={doj}
  />
  
</ButtonToolbar>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonToolbar>
<Button onClick={()=> this.setState({
    addModalShow:true
})} variant="success">Add Employee</Button>
      </ButtonToolbar>
      <AddEmpModal show={this.state.addModalShow} onHide={addModalClose}/>
      </div>
    );
  }
}
