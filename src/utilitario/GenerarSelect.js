

import React from 'react';
import Select from 'react-select';



export const ReduxFormSelect = props => {
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: 13
        }),
        control: styles => ({ ...styles, backgroundColor: 'white', color: 'black', fontSize: 13, fontFamily: 'sans-serif' }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            return { ...provided, opacity, transition };
        }
    }
    const { input, options } = props;
    const { touched, error } = props.meta;
    console.log('valor',props.input.value);
    return (
        <>
            <Select
                {...input}

                styles={customStyles}
                isSearchable={false}
                placeholder='Seleccione un medico'
                value={props.input.value}
                defaultValue={props.input.value}
                
                onChange={value => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                noOptionsMessage={() => 'Aun no hay ningun medico registrado'}
                options={options}
            />
            {touched && ((error && <span className="text-danger form-group" style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>{error}</span>))}
        </>
    )
}