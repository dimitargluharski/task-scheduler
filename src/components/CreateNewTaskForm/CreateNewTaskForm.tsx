import { FaRegFloppyDisk } from "react-icons/fa6"
import { Button } from "../Button/Button"
import { Dropdown } from "../Doprdown/Dropdown"
import { TextInput } from "../TextInput/TextInput"

type NewTaskFormProps = {
  text: string;
  handleOnChangeTextValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeForm: () => void;
  saveNewTask: (task: string, priorityLevel: string) => void;
  handleOnChangeSavePriorityLevel: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  priorityLevel: string;
}

export const CreateNewTaskForm = ({ text, handleOnChangeTextValue, closeForm, saveNewTask, handleOnChangeSavePriorityLevel, priorityLevel }: NewTaskFormProps) => {
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

      <Dropdown handleOnChangeSavePriorityLevel={handleOnChangeSavePriorityLevel} priorityLevel={priorityLevel} />

      <Button classNames={`p-2 bg-green-600 rounded-sm flex justify-center gap-1 items-center text-slate-50 hover:cursor-pointer hover:bg-green-500 ${text.length >= 3 ? '' : 'bg-slate-600 text-slate-500 hover:bg-slate-600'}`}
        handler={() => {
          closeForm();
          saveNewTask(text, priorityLevel);
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