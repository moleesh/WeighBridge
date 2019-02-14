import React from "react";
import { Row, Col, Form, Card } from "react-bootstrap";

import ColumnOne from "./weighing/columnOne";
import ColumnTwo from "./weighing/columnTwo";
import ColumnThree from "./weighing/columnThree";
import Bottom from "./weighing/bottom";

const Weighing = props => {
  let thisState = props.preState;
  return (
    <Form className="mt-4" style={{boxShadow: 'none'}}>
      <Row>
        <ColumnOne preState={thisState} />
        <Col column sm="8">
          <Row className="justify-content-center pb-2 bold mt-n5">
            <Card
              className="text-center w-75 display-2 "
              style={{
                color: "red",
                fontsize: "20px",
                fontFamily: "sans-serif"
              }}
            >
              <Card.Header
                onClick={event => console.log(event.target.children)}
              >
                {thisState.Weight}
              </Card.Header>
            </Card>
          </Row>
          <Row>
            <ColumnTwo preState={thisState} />
            <ColumnThree preState={thisState} />
          </Row>
        </Col>
      </Row>
      <Bottom preState={thisState} />
    </Form>
  );
};

export default Weighing;
