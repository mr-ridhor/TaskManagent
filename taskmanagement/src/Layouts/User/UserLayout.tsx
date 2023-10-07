
import { Outlet } from "react-router-dom"

import {Toaster} from "react-hot-toast"


const UserLayout = () => {
  
  // const [userItems, setUserItems] = useState(initialItems);
    

  return (
    <div className="w-screen h-screen bg-gray-100 flex font-Montserrat">
      
      <div className="w-full  h-full overflow-y-auto no-scrollbar">

        <div className="p-1 lg:p-2 w-full h-full ">
          <Outlet />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default UserLayout