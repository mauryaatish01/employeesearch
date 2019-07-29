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
        const tempData = [...new Set(data)]
        if (this.state.redirect === true) {
            return <Redirect to="/" />;
        }

        return (

            <div className="App ">

                <h1>Employee Overview</h1>
                <div>

                    {
                        tempData && tempData.length === 0 ? <p><b>{employeeName} </b> has no subordinates</p> :
                            <p>Subordinates of employee <b>{employeeName}</b></p>
                    }
                    <ListGroup >
                        {
                            tempData && tempData.length > 0 ?
                                tempData.map((e) => <ListGroup.Item variant={"primary"} key={Math.random()}>{e}</ListGroup.Item>)
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
