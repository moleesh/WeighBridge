import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faWrench} from "@fortawesome/free-solid-svg-icons";

import AddNewProfile from "./generalSettings/addNewProfile"

const GeneralSettings = props => {
    let thisState = props.preState;
    return (
        <Form>
            <Row className="pb-5">
                <Col>
                    <h4 className="text-center font-weight-bold">General Settings</h4>
                </Col>
            </Row>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Weighbridge Name
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={thisState.settings.value.weighbridgeName}
                        onChange={event => {
                            thisState.settings.value.weighbridgeName = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Weighbridge Address
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={thisState.settings.value.weighbridgeAddress}
                        onChange={event => {
                            thisState.settings.value.weighbridgeAddress = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Footer
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={thisState.settings.value.footer}
                        onChange={event => {
                            thisState.settings.value.footer = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    CGST %
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={
                            thisState.settings.value.cgst === ""
                                ? 0
                                : thisState.settings.value.cgst
                        }
                        onChange={event => {
                            thisState.settings.value.cgst = (event.target.value.match("[0-9.]+") || []).pop() || "";
                            thisState.settings.value.cgst = thisState.settings.value.cgst.split(".").slice(0, 2).join(".");
                            if (!thisState.invoices.disablecalculation) {
                                thisState.invoice._cgst = thisState.settings.value.cgst;
                            }
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    SGST %
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={
                            thisState.settings.value.sgst === ""
                                ? 0
                                : thisState.settings.value.sgst
                        }
                        onChange={event => {
                            thisState.settings.value.sgst = (event.target.value.match("[0-9.]+") || []).pop() || "";
                            thisState.settings.value.sgst = thisState.settings.value.sgst.split(".").slice(0, 2).join(".");
                            if (!thisState.invoices.disablecalculation) {
                                thisState.invoice._sgst = thisState.settings.value.sgst;
                            }
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    IGST %
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={
                            thisState.settings.value.igst === ""
                                ? 0
                                : thisState.settings.value.igst
                        }
                        onChange={event => {
                            thisState.settings.value.igst = (event.target.value.match("[0-9.]+") || []).pop() || "";
                            thisState.settings.value.igst = thisState.settings.value.igst.split(".").slice(0, 2).join(".");
                            if (!thisState.invoices.disablecalculation) {
                                thisState.invoice._igst = thisState.settings.value.igst;
                            }
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Profile
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.PROFILE}
                        onChange={event => {
                            thisState.PROFILE = event.target.value;
                            Promise.all(
                                [
                                    fetch(thisState.INITIAL_URL + "/setting/getAllSettingsByProfile?profile=" + thisState.PROFILE).then(resp => resp.json()),
                                    fetch(thisState.INITIAL_URL + "/setting/getNextSlipNoByProfile?profile=" + thisState.PROFILE).then(resp => resp.text())
                                ]
                            ).then(([settings, slipNo]) => {
                                settings.automation = settings.automation.toLowerCase().indexOf("true") !== -1;
                                thisState.settings.value = settings;
                                thisState.weight.slipNo = slipNo;
                                if (slipNo === -1) {
                                    thisState.SETTING_DISABLED = true;
                                    thisState.weighing.disable.getWeightDisabled = true;
                                }
                                if (thisState.settings.array.availablePrinters.indexOf(thisState.settings.value.printerNameForWeighing) === -1) {
                                    thisState.settings.array.availablePrinters.push(thisState.settings.value.printerNameForWeighing);
                                }
                                if (thisState.settings.array.availablePrinters.indexOf(thisState.settings.value.printerNameForInvoice) === -1) {
                                    thisState.settings.array.availablePrinters.push(thisState.settings.value.printerNameForInvoice);
                                }
                                thisState.alerts.push({
                                    id: new Date().getTime(),
                                    type: "success",
                                    headline: "Profile Update",
                                    message: "Indicator Successfully Updated."
                                });
                                thisState.setMyState(thisState)
                            }).catch(() => {
                                thisState.weight.slipNo = -1;
                                thisState.SETTING_DISABLED = true;
                                thisState.weighing.disable.getWeightDisabled = true;
                                thisState.alerts.push({
                                    id: new Date().getTime(),
                                    type: "danger",
                                    headline: "Profile Update",
                                    message: "Profile Update Failed."
                                });
                                thisState.setMyState(thisState);
                            })
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.profiles.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Button
                variant="dark"
                size="lg"
                className="mr-1"
                onClick={() => {
                    thisState.settings.resetSlipNoPassword = "";
                    thisState.settings.addNewProfileDialog = true;
                    thisState
                        .setMyState(thisState)
                        .then(() =>
                            thisState.settings.newProfileReference.current.focus()
                        );
                }}
                disabled={thisState.SETTING_DISABLED}
            >
                <FontAwesomeIcon icon={faEdit} className="mr-3" />
                Add New Profile
            </Button>
            <AddNewProfile preState={thisState} />
            <Button
                variant="success"
                size="lg"
                onClick={() => {
                    fetch(thisState.INITIAL_URL + "/profile/setMyPrimaryProfile?profile=" + thisState.PROFILE, {
                        method: "PATCH",
                    }).then(response => {
                        if (response.status === 200) {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "success",
                                headline: "Primary Profile Update",
                                message: "Primary Profile Updated Successfully."
                            });
                            thisState.setMyState(thisState);
                        } else throw Error(response.statusText);
                    })
                        .catch(() => {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "danger",
                                headline: "Primary Profile Update",
                                message: "Primary Profile Update Failed."
                            });
                            thisState.setMyState(thisState);
                        });
                }}
                disabled={thisState.SETTING_DISABLED}
            >
                <FontAwesomeIcon icon={faWrench} className="mr-3" />
                Set Primary Profile
            </Button>
        </Form>
    );
};

export default GeneralSettings;
