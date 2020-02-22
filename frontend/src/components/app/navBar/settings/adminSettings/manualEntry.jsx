import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const ManualEntry = props => {
    // noinspection JSUnresolvedVariable
    let thisState = props.preState;
    let prevent = false;

    return (
        <Modal
            show={thisState.setting.manualEntryDialog}
            onHide={() => {
                thisState.setting.manualEntryDialog = false;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Manual Entry
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Password
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            type="password"
                            autoComplete="off"
                            className="text-centre"
                            value={thisState.setting.manualEntryPassword}
                            onChange={event => {
                                thisState.setting.manualEntryPassword = event.target.value;
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                // noinspection StatementWithEmptyBodyJS
                                if (event.keyCode === 9 && event.shiftKey);
                                else if (event.keyCode === 13 || event.keyCode === 9)
                                    thisState.setting.manualEntryReference.current.focus();
                            }}
                            ref={thisState.setting.manualEntryPasswordReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        thisState.setting.manualEntryDialog = false;
                        thisState.setMyState(thisState)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        if (
                            thisState.setting.manualEntryPassword ===
                            thisState.settings.value.MANUAL_ENTRY_PASSWORD
                        ) {
                            thisState.weight.manual = "Y";
                            thisState.setting.manualEntry = true;
                            thisState.weighing.disable.grossDetailsDisabled = false;
                            thisState.weighing.disable.tareDetailsWeightDisabled = false;
                            thisState.setting.manualEntryDialog = false;
                        } else {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "danger",
                                headline: "Manual Entry",
                                message: "Password incorrect"
                            });
                        }
                        thisState.setMyState(thisState)
                    }}
                    onKeyPress={event => {
                        if (prevent) {
                            prevent = false;
                            event.preventDefault();
                        }
                    }}
                    onFocus={() => {
                        prevent = true;
                    }}
                    ref={thisState.setting.manualEntryReference}
                >
                    Manual Entry
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ManualEntry;
