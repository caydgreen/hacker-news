import styles from './Button.module.css';

const Button = ({
  children, disabled, onClick, link, active,
}) => (
  <button
    href={link}
    className={[
      styles.button,
      styles[active],
    ].join(' ')}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
