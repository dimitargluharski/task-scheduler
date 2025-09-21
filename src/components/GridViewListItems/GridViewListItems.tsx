import { FaCommentAlt } from "react-icons/fa";
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

export const GridViewListItems = ({ id, priority, title, comments, status }: TaskItemProps) => {
  console.log(priority);
  return (
    <div key={id} className="flex flex-col p-2 shadow-sm rounded-sm">
      <div className="flex items-center gap-3">
        <div className={`${handleColorizeBackgroundDependingOnTaskStatus(status)} rounded-full w-8 h-8 p-5 relative`} />
        <h2 className="font-bold" title={title}>{title}</h2>
      </div>

      <div className="flex items-center justify-between">
        {status}

        {comments.length ? (
          <div className="flex items-center gap-1">
            <FaCommentAlt className="text-slate-400" />

            <span className="text-slate-500">
              {comments.length}
            </span>

            <span className="italic text-slate-500">
              ({comments.map((comment: { date: string }) => comment.date).slice(-1)})
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}