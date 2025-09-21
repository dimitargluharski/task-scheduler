import { ListViewListItems } from "../ListViewListItems/ListViewListItems";
import { GridViewListItems } from "../GridViewListItems/GridViewListItems";

interface TaskItemProps {
  id: number;
  status: string;
  priority: string;
  title: string;
  activeView: string;
  comments: {
    date: string;
  }[];
};

export const TaskItem = ({ id, status, priority, title, comments, activeView }: TaskItemProps) => {
  return (
    <>
      {activeView === 'list'
        ? <ListViewListItems
          id={id}
          status={status}
          title={title}
          priority={priority}
          comments={comments}
        />
        :
        <GridViewListItems
          id={id}
          status={status}
          title={title}
          priority={priority}
          comments={comments}
        />
      }
    </>
  )
}