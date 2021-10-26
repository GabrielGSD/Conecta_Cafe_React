import React from 'react';
import styles from './Input.module.css';

function Input({ label, type, name, value, onChange, error, onBlur, show, placeholder }) {

  var showError = (show !== false ? true : false);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && showError && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;

// Text Area 
function TextArea({ label, type, name, value, onChange, error, onBlur, show, placeholder }) {

  var showError = (show !== false ? true : false);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea 
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && showError && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export {
  Input,
  TextArea
};
