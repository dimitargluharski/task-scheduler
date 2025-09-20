import { FaRegFloppyDisk } from "react-icons/fa6"
import { Button } from "../Button/Button"
import { Dropdown } from "../Doprdown/Dropdown"
import { TextInput } from "../TextInput/TextInput"

type Priorities = {
  id: number;
  priorityLevel: string;
}

type NewTaskFormProps = {
  text: string;
  handleOnChangeTextValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeForm: () => void;
  saveNewTask: (task: string) => void;
  priorities: Priorities[];
  handleOnChangeDropdownPriority: (text: string) => void;
}

export const CreateNewTaskForm = ({ text, handleOnChangeTextValue, closeForm, saveNewTask, priorities, handleOnChangeDropdownPriority }: NewTaskFormProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="px-1 italic">Create new task</h2>

      <TextInput
        inputType="text"
        placeholder="Task title"
        classNames="p-2 w-full"
        value={text}
        onChange={handleOnChangeTextValue}
      />

      <Dropdown priorities={priorities} handleOnChangeDropdownPriority={handleOnChangeDropdownPriority} />

      <Button classNames={`p-2 bg-green-600 rounded-sm flex justify-center gap-1 items-center text-slate-50 hover:cursor-pointer hover:bg-green-500 ${text.length >= 3 ? '' : 'bg-slate-600 text-slate-500 hover:bg-slate-600'}`}
        handler={() => {
          closeForm();
          saveNewTask(text);
        }}
        disabled={text.length >= 3 ? false : true}
      >
        <span className="uppercase font-bold">
          save
        </span>

        <FaRegFloppyDisk className="w-4 h-4" />
      </Button>
    </div>
  )
}