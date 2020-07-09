import React from 'react';

const UserKeyForm = ({ onChange, onSubmit }) => (
    <form className="user-key-form" onSubmit={(e) => onSubmit(e)}>
        <h4 className="user-key-form__title"> Find your repos!</h4>
        <input
            placeholder="Enter GitHub ApiKey"
            className="user-key-form__input-field"
            onChange={onChange}
        />
        <button
            className="user-key-form__submit-button"
            onClick={(e) => onSubmit(e)}
        >
            Submit
        </button>

    </form>
)

export default UserKeyForm;
