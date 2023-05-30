const Button = ({ text, handleAction, type }) => {
  return (
    <button onClick={handleAction} className={type}>
      {text}
    </button>
  );
};

export default Button;
