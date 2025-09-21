const priorities = [
  { id: 1, level: 'high', label: 'High' },
  { id: 2, level: 'medium', label: 'Medium' },
  { id: 3, level: 'low', label: 'Low' }
]

type DropdownProps = {
  handleOnChangeSavePriorityLevel: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  priorityLevel: string;
}

export const Dropdown = ({ handleOnChangeSavePriorityLevel, priorityLevel }: DropdownProps) => {
  return (
    <select
      name="priorityLevel"
      id="priorityLevel"
      className="w-full p-2 border-2 border-slate-300 outline-slate-500 focus:border-slate-800 rounded-sm"
      onChange={handleOnChangeSavePriorityLevel}
      value={priorityLevel}
    >
      <option value="" disabled>Select priority</option>
      {priorities.map((item, index) => (
        <option value={item.level} key={index} className="text-slate-400">
          {item.label}
        </option>
      ))}
    </select>
  )
}