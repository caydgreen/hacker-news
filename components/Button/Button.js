import styles from './Button.module.css';

const Button = ({
  children, disabled, onClick, link, active,
}) => (
  <button
    href={link}
    className={[
      styles.button,
      active && styles.active,
    ].join(' ')}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

export default Button;
