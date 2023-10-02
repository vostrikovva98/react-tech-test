import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { getStateFromTimestamp, getTimestampFromState } from "./util";

export const FormDateInput = ({
    label,
    value,
    onChange,
}) => {
    const [{ date, time }, setState] = useState(getStateFromTimestamp(value));

    const handlerOnChangeDate = (event) => {
        setState((prev) => ({ 
            ...prev,
            date: event.target.value,
        }));
    };
    const handlerOnChangeTime = (event) => {
        setState((prev) => ({
            ...prev,
            time: event.target.value,
        }));
    };

    useEffect(() => {
        onChange(getTimestampFromState({ date, time }));
    }, [date, time]);

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Row>
                <Col sm="8">
                    <Form.Control 
                        col={1}
                        value={date}
                        type="date"
                        onChange={handlerOnChangeDate}
                    />
                </Col>
                <Col sm="4">
                    <Form.Control 
                        col={1}
                        value={time}
                        type="time"
                        onChange={handlerOnChangeTime}
                    />
                </Col>
            </Row>
        </Form.Group>
    );
};

FormDateInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};