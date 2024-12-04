import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hook/useAuth";
import { FcAcceptDatabase } from "react-icons/fc";
import { RiChatDeleteFill } from "react-icons/ri";
import Swal from "sweetalert2";

const ServiceToDo = () => {
    const { user } = useAuth();
    const [requests, setRequest] = useState([]);

    useEffect(() => {
        getData();
    }, [user]);

    // Function to fetch data from the server
    const getData = async () => {
        try {
            const { data } = await axios(`https://b9a11-server-red.vercel.app/bides-request/${user?.email}`,{withCredentials:true});
            setRequest(data)
            // console.log("data",data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    };

    // Function to handle status changes

    const handleStatus = async (id, previousStatus, status) => {
        if (previousStatus === status) return Swal.fire("Oops...")
        // console.log('id', id, "previousStatus", { previousStatus }, "status", { status: status });
        try {
            const { data } = await axios.patch(`https://b9a11-server-red.vercel.app/bid/${id}`, { status: status },);
            // console.log("Status update response:", data);
            getData();
            if(data.modifiedCount===1){
                Swal.fire("Updated data successfully");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (

        <>
            <div>
                <h1 className="text-3xl m-5">Bides Request {requests?.length}</h1>
                <section className="container px-4 mx-auto">
                    <div className="flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                                                    Customer
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                            {requests.map((request) => (

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
                                                            <h2 className={`rounded-full 
                                                            ${request?.status === 'pending' && 'text-yellow-500'}
                                                             ${request?.status === 'working' && 'text-green-500'}
                                                             ${request?.status === 'completed' && 'text-blue-500'}
                                                             ${request?.status === 'rejected' && 'text-red-500'}
                                                             `}>
                                                                {request?.status}
                                                            </h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-3xl whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">
                                                            <button
                                                                onClick={() => handleStatus(request?._id, request?.status, 'working')}
                                                                disabled={request?.status === "completed" || request?.status === "working"}

                                                            >
                                                                <FcAcceptDatabase />
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatus(request?._id, request?.status, 'rejected')}
                                                                disabled={request?.status === "completed" || request?.status === "rejected"}
                                                                className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                                <RiChatDeleteFill />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
export default ServiceToDo;