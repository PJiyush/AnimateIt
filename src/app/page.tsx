import Card from '@/components/ui/Card'
import { FaPlus } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";
export default function Home() {
  return (
    <div className="h-screen bg-blue-400">
      <div className="flex items-center gap-10 justify-center h-full">
        <Card logo={<FaPlus/>} title='New' link='/new' />
        <Card logo={<FaFolder/>} title='My Library' link='/my-library' />
      </div>
    </div>
  );
}
