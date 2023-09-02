import './input.scss'

export type InputType = 'text' | 'password' | 'number' | 'phone' | 'date';

interface Props {
  label?: string;
  type?: InputType;
  value: string | null | number;
  placeholder?: string;
  name: string;
  error?: string;

}

export default function UiInput({
  name,
  value,
  error,
  label,
  placeholder,
  type
}: Props) {

  return (
    <div className='input_container error'>
      <label htmlFor="input">username</label>
      <input type="text" id="input" placeholder="Enter username" className='input' />
    </div>
  )
}