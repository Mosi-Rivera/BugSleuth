const SelectInput = props => (
    <select defaultValue={props.default_value} onChange={props.onChange} onFocus={props.onFocus}>
        {
            props?.options.map((elem,i) => <option key={'select-option-' + i} value={elem.value}>{elem.name}</option>)
        }
    </select>
);

export default SelectInput;