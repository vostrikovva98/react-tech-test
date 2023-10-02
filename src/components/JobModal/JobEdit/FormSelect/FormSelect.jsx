import PropTypes from "prop-types";
import { Multiselect } from "multiselect-react-dropdown";
import Form from "react-bootstrap/Form";

export const FormSelect = ({ 
    options, 
    selected,
    setSelected,
    isSingle,
    displayValue,
    label,
}) =>  (
    <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Multiselect
            options={options}
            selectedValues={selected}
            displayValue={displayValue}
            singleSelect={isSingle}
            onSelect={setSelected}
            onRemove={setSelected}
        />
    </Form.Group>
);

const OptionPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    color: PropTypes.string,
});
FormSelect.propTypes = {
    options: PropTypes.arrayOf(OptionPropType).isRequired,
    selected: PropTypes.arrayOf(OptionPropType).isRequired,
    setSelected: PropTypes.func.isRequired,
    isSingle: PropTypes.bool,
    displayValue: PropTypes.string,
    label: PropTypes.string.isRequired,
};

FormSelect.defaultProps = {
    isSingle: false,
    displayValue: "name",
};