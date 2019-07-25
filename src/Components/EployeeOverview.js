import React from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup'

class EmployeeSearch extends React.Component {

    state = {
        redirect: false
    }

    goback = () => {
        this.setState({ redirect: !this.state.redirect })
    }
    render() {
        const { employeeName, data } = this.props.location;

        if (this.state.redirect === true) {
            return <Redirect to="/" />;
        }

        return (

            <div className="App ">

                <h1>Employee Overview</h1>
                <div>

                    {
                        data && data.length === 1 ? <p><b>{employeeName} </b> has no subordinates</p> :
                            <p>Subordinates of employee <b>{employeeName}</b></p>
                    }
                    <ListGroup>
                        {
                            data && data.length > 1 && data[1]["direct-subordinates"] ?
                                data[1]["direct-subordinates"].map((e) => <ListGroup.Item key={Math.random()}>{e}</ListGroup.Item>)
                                : null


                        }

                    </ListGroup>
                </div>

                <Button className="mt-4" variant="outline-secondary" onClick={this.goback}>Go Back</Button>
            </div>
        );
    }
}


export default EmployeeSearch;
