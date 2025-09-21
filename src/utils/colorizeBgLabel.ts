export const handleColorizeBackgroundDependingOnTaskStatus = (taskStatus: string) => {
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