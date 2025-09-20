import { FaList } from "react-icons/fa6"
import { LuGrid2X2 } from "react-icons/lu"
import { Button } from "../Button/Button"

type ButtonsLayoutViewProps = {
  activeViewType: string;
  handleActiveLayoutView: (viewType: string) => void;
}

export const ButtonsLayoutView = ({ activeViewType, handleActiveLayoutView }: ButtonsLayoutViewProps) => {
  return (
    <div className="flex justify-end gap-1 py-1 items-center">
      {/* <Button classNames={`p-2 hover:cursor-pointer rounded-sm ${isActiveView ? 'bg-slate-800 text-slate-50' : ''}`}
        handler={handleActiveLayoutView}
      >
        <FaChartBar className="w-5 h-5" />
      </Button> */}

      <Button
        classNames={`p-2 hover:cursor-pointer rounded-sm ${activeViewType === 'list' ? 'bg-slate-800 text-slate-50' : ''}`}
        handler={() => handleActiveLayoutView('list')}
      >
        <FaList className='w-5 h-5' />
      </Button>

      <Button
        classNames={`p-2 hover:cursor-pointer rounded-sm ${activeViewType === 'grid' ? 'bg-slate-800 text-slate-50' : ''}`}
        handler={() => handleActiveLayoutView('grid')}
      >
        <LuGrid2X2 className="h-5 w-5" />
      </Button>
    </div>
  )
}