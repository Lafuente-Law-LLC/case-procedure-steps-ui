import type { ReactDispatcher } from "../helpers/reducer/dispatchFunctionFactory";
import Callback from "../../../callback/callback";
import MenuItem from "./MenuItem";


const newTaskCallObj = Callback.callbackAdminObjs.get("create_task");
if(newTaskCallObj == undefined){
    throw new Error("CallbackAdminObjs does not contain create_task");
}
const createEventCallObj = Callback.callbackAdminObjs.get("create_event");

if(createEventCallObj == undefined){
    throw new Error("CallbackAdminObjs does not contain create_event");
}



const newTaskCallbackHandler = (e: React.MouseEvent<HTMLDivElement>) => {

    }


const newTaskCallbackMenuItem = ({dispatcher}:{dispatcher: ReactDispatcher})=>{
    const handler = (e: React.MouseEvent<HTMLDivElement>) => {
        
    }
    return (
      
    );
    
}




const AddNewCallbackOnTable = ({
  dispatcher,
}: {
  dispatcher: ReactDispatcher;
}) => {







};




export default AddNewCallbackOnTable;

