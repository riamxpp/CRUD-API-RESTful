import style from './Input.module.css';

const Input = ({ htmlFor, label, name, value, onChange, placeholder, type = 'text'}) => {
  const handleChange = (event) => {
    const { value } = event.target;
    
    if (typeof value === 'string'){
      onChange(value);
    }else {
      onChange({ ...value, [name]: value});
    }
  }

  return (
    <div className={style.inputContainer}>
      {label && <label className={style.label} htmlFor={htmlFor}>{label}</label>}
      <input 
        className={style.input}
        value={value} 
        onChange={handleChange} 
        id={htmlFor}
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
}

export default Input;