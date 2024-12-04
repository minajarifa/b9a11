import { FcAcceptDatabase } from "react-icons/fc";
import { RiChatDeleteFill } from "react-icons/ri";

const ToDoCard = ({request}) => {
    // console.log(request)
    
    return (
        <tr className="">
            <tr key={request?._id}>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {request?.deadline ? new Date(request.deadline).toLocaleDateString() : "No Deadline"}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-8 h-8 rounded-full" src={request?.photo} alt="" />
                        <div>
                            <h2 className="text-sm font-medium text-gray-800 dark:text-white">{request?.bidesName}</h2>
                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{request?.bidesEMail}</p>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" />
                        </svg>
                        <h2 className={`rounded-full ${request?.status === 'pending' && 'text-yellow-500'} ${request?.status === 'working' && 'text-green-500'} ${request?.status === 'completed' && 'text-blue-500'}`}>
                            {request?.status}
                        </h2>
                    </div>
                </td>
                <td className="px-4 py-4 text-3xl whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                        <button
                            onClick={() => handleStatus(request?._id, request?.status, 'working')}
                         disabled={request?.status==="completed"}
                        >
                            <FcAcceptDatabase />
                        </button>
                        <button
                            onClick={() => handleStatus(request?._id, request?.status, 'completed')}
                            //  disabled={request?.status==="completed"}
                            className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                            <RiChatDeleteFill />
                        </button>
                    </div>
                </td>
            </tr>
        </tr>
    );
};

export default ToDoCard;