import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowsLeftRight } from "react-icons/fa6";
import { FaArrowsSpin } from "react-icons/fa6";

export const taskPriority = (task: string) => {
  switch (task) {
    case 'high':
      return <FaArrowUp className="w-5 h-5 text-red-500" title="High Priority" />

    case 'medium':
      return <FaArrowsLeftRight className="w-5 h-5 text-yellow-500" title="Medium Priority" />

    case 'low':
      return <FaArrowDown className="w-5 h-5 text-green-500" title="Low Priority" />

    case 'idea':
      return <FaArrowsSpin className="w-5 h-5 text-slate-400" title="Idea" />

    default:
  }
}