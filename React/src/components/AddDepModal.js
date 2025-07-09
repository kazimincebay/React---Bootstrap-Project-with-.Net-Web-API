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
import {Snackbar,IconButton} from "@mui/material";


export class AddDepModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbaropen: false,
      snackbarmsg: "",
    };
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  
  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:52396/api/department", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentID: null,
        DepartmentName: e.target.DepartmentName.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({snackbarOpen:true,
            snackbarmsg:result
          })
        },
        (error) => {
          this.setState({snackbarOpen:true,
            snackbarmsg:"failed"
          })
        }
      );
  }
  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
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
              Add Department
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <FormLabel>Department Name</FormLabel>
                    <FormControl
                      type="text"
                      name="DepartmentName"
                      required
                      placeholder="Department Name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Button variant="primary" type="submit" className="mt-2">
                      Add Department
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
