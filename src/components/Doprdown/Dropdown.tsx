type Priorities = {
  priorities: {
    id: number;
    priorityLevel: string;
    handleOnChangeDropdownPriority: (text: string) => void;
  }[];
};

export const Dropdown = ({ priorities }: Priorities) => {
  return (
    <select name="" id="" className="w-full p-2 border-2 border-slate-300 outline-slate-500 focus:border-slate-800 rounded-sm">
      {priorities.map((item, index) => (
        <option value={item.priorityLevel} key={index} className="text-slate-400" onChange={() => handleOnChangeDropdownPriority(item.priorityLevel)}>
          {item.priorityLevel}
        </option>
      ))}
    </select>
  )
}