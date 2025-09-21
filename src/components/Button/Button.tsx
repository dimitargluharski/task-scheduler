type ButtonProps = {
  classNames?: string;
  children: string | React.ReactNode;
  handler?: (taks?: any) => void;
  disabled?: boolean;
}

export const Button = ({ classNames, handler, children, disabled }: ButtonProps) => {
  return (
    <button className={`${classNames}`} onClick={handler} disabled={disabled ? true : false}>
      {children}
    </button>
  )
}