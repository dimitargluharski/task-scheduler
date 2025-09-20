import { useState, useMemo, useEffect } from "react";
import { LuGrid2X2 } from "react-icons/lu";
import { FaList } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { Chart } from "react-charts";

interface Comment {
  id: number;
  author: string;
  date: string;
  text: string;
}

interface Task {
  id: number;
  title: string;
  status: string;
  date: string;
  comments: Comment[];
  taskAuthor: string;
}

const tasks: Task[] = [
  {
    id: 1, title: 'Format web copy into code', status: 'Done', date: '2025-10-32', comments: [
      { id: 1, author: 'PM', date: '2024-09-10', text: 'aaaaaaa' }
    ], taskAuthor: 'admin'
  },
  { id: 2, title: 'Create slideshare presentation for yandoo', status: 'Open', date: '2025-10-33', comments: [], taskAuthor: 'admin' },
  { id: 3, title: 'Update requirements documentation', status: 'Doing', date: '2025-10-33', comments: [], taskAuthor: 'admin' },
  {
    id: 4, title: 'New UI for dashboard', status: 'Ideas', date: '2025-10-33', comments: [
      { id: 1, author: 'PM', date: '2024-09-10', text: 'aaaaaaa' },
      { id: 2, author: 'PM', date: '2024-09-10', text: 'bbbb' },
      { id: 3, author: 'PM', date: '2022-22-22', text: 'ccccc' }

    ], taskAuthor: 'admin'
  },
];

function App() {
  const [data, setData] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      return JSON.parse(storedTasks);
    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return tasks;
    }
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isActiveView, setIsActiveView] = useState<boolean>(true);
  const [statistics, showStatistics] = useState<boolean>(false);

  useEffect(() => {
    const tasksInLocalStorage = localStorage.getItem('tasks');

    if (tasksInLocalStorage !== null) {
      try {
        const parsedTasks = JSON.parse(tasksInLocalStorage);
        setData(parsedTasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        setData(tasks);
      }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    setData(tasks);
  }, []);

  const handleToggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleShowStatistics = () => {
    showStatistics(!statistics);
  }

  const prepareChartData = () => {
    const statusCounts = data.reduce((acc: Record<string, number>, task: Task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [{
      label: 'Tasks by Status',
      data: Object.entries(statusCounts).map(([status, count]) => ({
        x: status,
        y: count
      }))
    }];
  };

  const chartData = useMemo(() => prepareChartData(), [data]);
  const primaryAxis = useMemo(
    () => ({
      getValue: (datum: any) => datum.x,
    }),
    []
  );
  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum: any) => datum.y,
      },
    ],
    []
  );

  const handleColorizeBackgroundDependingOnTaskStatus = (taskStatus: string) => {
    switch (taskStatus) {
      case 'Done':
        return 'bg-green-500 text-slate-50';
      case 'Open':
        return 'bg-red-500 text-slate-50';
      case 'Doing':
        return 'bg-blue-500 text-slate-50';
      case 'Ideas':
        return 'bg-slate-400 text-slate-50'
      default:
        return 'bg-gray-500 text-slate-50';
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-dvh py-1">
      <div className="w-4xl mx-auto flex flex-col gap-1">

        <div className="flex gap-1">
          <input
            type="text"
            className="w-full px-2 border-2 border-slate-300 outline-slate-500 focus:border-slate-800 rounded-sm"
            placeholder="Search task..."
          />

          <span
            className="p-2 bg-blue-600 rounded-sm text-slate-50 hover:cursor-pointer hover:bg-blue-500"
            onClick={handleToggleModalVisibility}>
            create
          </span>

        </div>

        {isModalVisible && (
          <div className="flex flex-col gap-1">
            <input type="text" placeholder="Task title..." className="p-2 w-full" />
            <div className="bg-green-500 p-2 rounded-sm text-slate-50 text-center uppercase" aria-disabled>save</div>
          </div>
        )}

        <div className="flex justify-end gap-1 py-1 items-center">
          <div className={`p-2 hover:cursor-pointer rounded-sm ${statistics ? 'bg-slate-800 text-slate-50' : ''}`} onClick={handleShowStatistics}>
            <FaChartBar />
          </div>
          <div className="p-2 hover:cursor-pointer">
            <LuGrid2X2 className="h-5 w-5" />
          </div>
          <div className={`p-2 hover:cursor-pointer rounded-sm ${isActiveView ? 'bg-slate-800 text-slate-50' : ''}`}>
            <FaList className='w-5 h-5' />
          </div>
        </div>

        <div>
          {statistics && (
            <div className="mb-4 p-4 bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 text-slate-700">Tasks Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(data.reduce((acc: Record<string, number>, task: Task) => {
                  acc[task.status] = (acc[task.status] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)).map(([status, count]) => (
                  <div key={status} className="text-center p-3 rounded-lg bg-slate-50">
                    <div className={`text-2xl font-bold ${handleColorizeBackgroundDependingOnTaskStatus(status).includes('bg-green') ? 'text-green-600' :
                      handleColorizeBackgroundDependingOnTaskStatus(status).includes('bg-red') ? 'text-red-600' :
                        handleColorizeBackgroundDependingOnTaskStatus(status).includes('bg-blue') ? 'text-blue-600' : 'text-slate-600'}`}>
                      {count}
                    </div>
                    <div className="text-sm text-slate-600 capitalize">{status}</div>
                  </div>
                ))}
              </div>

              <div style={{ width: '100%', height: '300px' }}>
                <Chart
                  options={{
                    data: chartData,
                    primaryAxis,
                    secondaryAxes,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-slate-400">
          {data.length} {data.length > 1 || data.length === 0 ? 'tasks' : 'task'}
        </div>

        {data.map((task: Task) => (
          <div key={task.id} className="flex gap-2 py-1">
            <div className={`rounded-sm px-2 ${handleColorizeBackgroundDependingOnTaskStatus(task.status)}`}>
              {task.status}
            </div>

            <div className="hover:cursor-pointer hover:underline">
              {task.title}
            </div>

            {task.comments.length ? (
              <div className="flex items-center gap-1">
                <FaCommentAlt className="text-slate-400" />

                <span className="text-slate-500">
                  {task.comments.length}
                </span>

                <span className="italic text-slate-500">
                  (last comment: {task.comments.map((comment: Comment) => comment.date).slice(-1)})
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
