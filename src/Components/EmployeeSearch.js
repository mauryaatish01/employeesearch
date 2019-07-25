import React from 'react';
import '../App.css';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { Redirect } from "react-router-dom";
import _ from 'lodash'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'



class EmployeeSearch extends React.Component {
    inputRef = React.createRef()
    state = {
        redirect: false,
        isLoading: false,
        data: {},
        employeeName: ''
    }

    hadleEnter = (e) => {
        if (e.keyCode === 13) {
            this.handleSearch();
        }

    }

    handleSearch = () => {
        let employeeName = this.inputRef.current.value;
        if (employeeName.length > 0) {
            let api = `http://api.additivasia.io/api/v1/assignment/employees/${employeeName}`;
            this.setState({ isLoading: !this.state.isLoading })
            fetch(api).then((result) => result.json())
                .then((result) => {

                    this.inputRef.current.value = ""
                    if (_.isEmpty(result)) {
                        alert("No Result Were Found")
                        this.setState(prevState => {
                            return {
                                isLoading: !prevState.isLoading,
                            }
                        })
                    } else {
                        this.setState(prevState => {
                            let history = []
                            if (localStorage.getItem("history")) {
                                history = JSON.parse(localStorage.getItem("history"))["history"];
                            }
                            if (history.indexOf(employeeName) === -1) {

                                localStorage.setItem("history", JSON.stringify({ history: [...history, employeeName] }))
                            }
                            return {
                                redirect: !prevState.redirect,
                                isLoading: !prevState.isLoading,
                                data: result,
                                employeeName: employeeName
                            }
                        })
                    }

                })
                .catch((e) => { console.log(e) })
        } else {
            alert("Please enter a valid employee name")
        }


    }
    render() {
        let history = localStorage.getItem("history") && JSON.parse(localStorage.getItem("history"))["history"];
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: "/eployeeoverview",
                data: this.state.data,
                employeeName: this.state.employeeName

            }} />;
        }
        return (
            <div className="App ">

                <Container>
                    <h1>Employee Explorer</h1>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search a employee"
                            aria-label="Search a employee"
                            aria-describedby="basic-addon2"
                            ref={this.inputRef}
                            onKeyUp={this.hadleEnter}
                        />
                        <InputGroup.Append className="ml-3">
                            <Button variant="outline-secondary" onClick={!this.state.isLoading ? this.handleSearch : null}>{this.state.isLoading ? 'Searching...' : 'Search'}</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <Row>
                        <Col>
                            <h1 >History of Search</h1>
                        </Col>
                        <Col>
                            <ListGroup>
                                {
                                    history && history.map((h) => <ListGroup.Item key={Math.random()}>{h}</ListGroup.Item>)
                                }

                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default EmployeeSearch;
