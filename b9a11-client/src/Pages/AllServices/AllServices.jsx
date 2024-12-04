import { Link, useLoaderData } from "react-router-dom";
import useAllService from "../../hook/useAllService";
import useAuth from "../../hook/useAuth";



const AllServices = () => {
    const { loading, user } = useAuth();
    const services = useAllService();


    const totalCount = useLoaderData();
    // console.log("totalCount", totalCount);
    const itemsPerPage = 5;
    const numberOfPages = Math.ceil(itemsPerPage / totalCount);
    const pages = []
    for (let i = 0; i < numberOfPages; i++) {
        pages.push(i);
    }
    // console.log(pages);

    // if (loading) {
    //     return (
    //         <>
    //             <div className="flex justify-center items-center my-52">
    //                 <span className="loading loading-spinner loading-lg"></span>
    //                 <span className="loading loading-spinner loading-lg"></span>
    //             </div>
    //         </>
    //     );
    // }
    if (services.length < 1) {
        return (
            <>
                <h1>please await....</h1>
                <div className="flex justify-center items-center my-52">
                    <span className="loading loading-spinner loading-lg"></span>
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <h1 className="text-4xl text-center my-5"> Total: {services.length}</h1>
                <div className="grid grid-cols-2 gap-10">
                    {
                        services.map(service => <div key={service?._id}>
                            <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-light text-gray-600 dark:text-gray-400"> {service?.deadline}</span>
                                    <button className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" role="button">{service?.category}</button>
                                </div>
                                <div className="mt-2">
                                    <button className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" role="link">{service?.category}</button>
                                    {/*  */}
                                    <div className="flex justify-center ">
                                        <img src={service?.photo} className=" w-20 h-20 mx-4  " />
                                    </div>
                                    <p title={service?.description} className="mt-2 text-gray-600 dark:text-gray-300">{service?.description}</p>
                                    <Link to={`/DetailsCard/${service?._id}`} className="text-xl text-green-300">details</Link>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button className="text-blue-600 dark:text-blue-400 hover:underline">price : {service?.price}</button>
                                    <button className="text-blue-600 dark:text-blue-400 hover:underline">serviceArea : {service?.serviceArea}</button>
                                    <button className="text-blue-600 dark:text-blue-400 hover:underline">Read more</button>
                                    <div className="flex items-center">
                                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={service?.providerImage} alt="avatar" />
                                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" role="link">{service?.providerName}</a>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </>
        )
    };
};

export default AllServices;