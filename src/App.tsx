import { useState } from "react";
import { Button } from "./components/Button/Button";
import { TextInput } from "./components/TextInput/TextInput";
import { ButtonsLayoutView } from "./components/ButtonsLayoutView/ButtonsLayoutView";
import { TaskCounter } from "./components/TaskCounter/TaskCounter";
import { FaPlus } from "react-icons/fa6";
import { CreateNewTaskForm } from "./components/CreateNewTaskForm/CreateNewTaskForm";
import { TaskItem } from "./components/TaskItem/TaskItem";

interface Comment {
  id: number;
  author: string;
  date: string;
  text: string;
};

interface Task {
  id: number;
  title: string;
  status: string;
  date: string;
  comments: Comment[];
  taskAuthor: string;
  taskPriority?: string | undefined;
};

const tasks: Task[] = [
  {
    id: 1, title: 'Format web copy into code', status: 'Done', date: '2025-10-32', taskPriority: 'high', comments: [
      { id: 1, author: 'PM', date: '2024-09-10', text: 'aaaaaaa' }
    ], taskAuthor: 'admin'
  },
  { id: 2, title: 'Create slideshare presentation for yandoo', status: 'Open', date: '2025-10-33', taskPriority: 'low', comments: [], taskAuthor: 'admin' },
  { id: 3, title: 'Update requirements documentation', status: 'Doing', taskPriority: 'medium', date: '2025-10-33', comments: [], taskAuthor: 'admin' },
  {
    id: 4, title: 'New UI for dashboard', status: 'Ideas', date: '2025-10-33', taskPriority: 'idea', comments: [
      { id: 1, author: 'PM', date: '2024-09-10', text: 'aaaaaaa' },
      { id: 2, author: 'PM', date: '2024-09-10', text: 'bbbb' },
      { id: 3, author: 'PM', date: '2022-22-22', text: 'ccccc' }

    ], taskAuthor: 'admin'
  },
];

function App() {
  const [data, setData] = useState<Task[]>(tasks);
  const [isFormVisible, setIsVisibleForm] = useState<boolean>(false);
  const [activeViewType, setActiveViewType] = useState<string>('list');
  const [createNewTaskText, setCreateNewTaskText] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [priorityLevel, setPriorityLevel] = useState('');

  const handleToggleModalVisibility = () => {
    setIsVisibleForm(!isFormVisible);
  };

  const handleActiveLayoutView = (viewType: string) => {
    return viewType === 'grid' ? setActiveViewType('grid') : setActiveViewType('list');
  }

  const handleCreateNewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateNewTaskText(event.target.value);
  }

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  const handleSaveNewTask = (newTask: string, priorityLevel: string) => {
    setData((prevData) => [
      ...prevData,
      {
        id: prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 1,
        title: newTask,
        status: "Open",
        date: new Date().toISOString().split("T")[0],
        comments: [],
        taskAuthor: "admin",
        taskPriority: `${priorityLevel}`
      }
    ]);

    setCreateNewTaskText('');
    setPriorityLevel('');
  };

  const handleOnChangeSavePriorityLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriorityLevel(event.target.value);
  }

  return (
    <div className="bg-slate-50 min-h-dvh py-1">
      <div className="w-4xl mx-auto flex flex-col gap-1">

        <div className="flex gap-1">
          <TextInput
            inputType="text"
            placeholder="Search"
            onChange={handleSearchQuery}
            value={query}
          />

          <Button
            classNames="p-2 bg-blue-600 rounded-sm flex gap-1 items-center text-slate-50 hover:cursor-pointer hover:bg-blue-500"
            handler={handleToggleModalVisibility}>

            <span className="uppercase font-bold">
              create
            </span>

            <FaPlus className="w-4 h-4" />
          </Button>
        </div>

        {isFormVisible &&
          <CreateNewTaskForm
            text={createNewTaskText}
            handleOnChangeTextValue={handleCreateNewTask}
            saveNewTask={handleSaveNewTask}
            closeForm={handleToggleModalVisibility}
            handleOnChangeSavePriorityLevel={handleOnChangeSavePriorityLevel}
            priorityLevel={priorityLevel}
          />}

        <ButtonsLayoutView
          activeViewType={activeViewType}
          handleActiveLayoutView={handleActiveLayoutView}
        />

        <TaskCounter length={tasks.length} />

        <div className={`${activeViewType === 'list' ? 'flex flex-col' : 'grid grid-cols-3'}`}>
          {data.map((task: Task) => (
            <TaskItem
              activeView={activeViewType}
              id={task.id}
              status={task.status}
              priority={task.taskPriority ?? ""}
              title={task.title}
              comments={task.comments}
            />
          ))}
        </div>
      </div>
    </div >
  )
}

export default App
