type TextInputProps = {
  classNames?: string;
  placeholder?: string;
  inputType: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const defaultClasses = 'w-full px-2 border-2 border-slate-300 outline-slate-500 focus:border-slate-800 rounded-sm';

export const TextInput = ({ classNames, placeholder, inputType, onChange, value }: TextInputProps) => {
  return (
    <input
      type={inputType}
      className={`${classNames} ${defaultClasses}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}