type TaskCounterProps = {
  length: number;
}

export const TaskCounter = ({ length }: TaskCounterProps) => {
  return (
    <div className="text-sm text-slate-400">
      {length} {length > 1 || length === 0 ? 'tasks' : 'task'}
    </div>
  )
}