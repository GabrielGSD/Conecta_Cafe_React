import React from 'react';
import styles from './Button.module.css';

function Button({ children, ...props }) {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
}
export default Button;

function ButtonAcc({ children, ...props }) {
  return (
    <button {...props} className={styles.buttonAcc}>
      {children}
    </button>
  );
}

function ButtonNavFazenda({ children, ...props }) {
  return (
    <button {...props} className={styles.buttonFaz}>
      {children}
    </button>
  );
}

function ButtonSalvar({ children, ...props }) {
  return (
    <button {...props} className={styles.buttonSave}>
      {children}
    </button>
  );
}

export {
  Button,
  ButtonAcc,
  ButtonNavFazenda,
  ButtonSalvar
}
