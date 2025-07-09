import React, { Component } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Snackbar, IconButton } from "@mui/material";

export class AddEmpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
deps:[],
        snackbaropen: false,
      snackbarmsg: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

componentDidMount(){
    fetch('http://localhost:52396/api/department').then(response=>response.json()).then(data=>{
this.setState({
    deps:data
})
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:52396/api/employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeID: null,
        EmployeeName: e.target.EmployeeName.value,
        Department: e.target.Department.value,
        Mail: e.target.Mail.value,
        Doj: e.target.Doj.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ snackbarOpen: true, snackbarmsg: result });
        },
        (error) => {
          this.setState({ snackbarOpen: true, snackbarmsg: "failed" });
        }
      );
  }

  

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              X
            </IconButton>
          }
        />
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup controlId="EmployeeName">
                    <FormLabel>Employee Name</FormLabel>
                    <FormControl
                      type="text"
                      name="EmployeeName"
                      required
                      placeholder="Employee Name"
                    />
                  </FormGroup>
                  <FormGroup controlId="Department">
                    <FormLabel>Department</FormLabel>
                    <FormControl as="select" >
                        {this.state.deps.map(dep=><option key={dep.DepartmentID} >{dep.DepartmentName}</option>)}
                        
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId="Mail">
                    <FormLabel>Mail</FormLabel>
                    <FormControl
                      type="text"
                      name="Mail"
                      required
                      placeholder="Mail"
                    />
                  </FormGroup>
                  <FormGroup controlId="Doj">
                    <FormLabel>DOJ</FormLabel>
                    <FormControl
                      type="date"
                      name="DOJ"
                      required
                      placeholder="DOJ"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Button variant="primary" type="submit" className="mt-2">
                      Add Employee
                    </Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
