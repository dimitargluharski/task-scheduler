import { FaCommentAlt } from "react-icons/fa"
import { taskPriority } from "../../utils/taskPriority"
import { handleColorizeBackgroundDependingOnTaskStatus } from "../../utils/colorizeBgLabel";

interface TaskItemProps {
  id: number;
  status: string;
  priority: string;
  title: string;
  comments: {
    date: string;
  }[];
};

export const ListViewListItems = ({ id, priority, title, comments, status }: TaskItemProps) => {
  return (
    <div key={id} className="flex gap-2 py-1 items-center">
      <div className={`rounded-sm px-2 ${handleColorizeBackgroundDependingOnTaskStatus(status)}`}>
        {status}
      </div>

      <div>
        {taskPriority(priority ?? "")}
      </div>

      <div className="hover:cursor-pointer hover:underline">
        {title}
      </div>

      {comments.length ? (
        <div className="flex items-center gap-1">
          <FaCommentAlt className="text-slate-400" />

          <span className="text-slate-500">
            {comments.length}
          </span>

          <span className="italic text-slate-500">
            (last comment: {comments.map((comment: { date: string }) => comment.date).slice(-1)})
          </span>
        </div>
      ) : null}
    </div>
  )
}