import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

export const FormInput = ({ id, label, type, value, onChange }) => {
    const handlerOnChange = () => {
        onChange(event.target.value);
    };
    
    return (
        <Form.Group>
            <Form.Label htmlFor={id}>{label}</Form.Label>
            <Form.Control 
                value={value}
                onChange={handlerOnChange}
                type={type}
                id={id}
            />
        </Form.Group>
    );
};

FormInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};