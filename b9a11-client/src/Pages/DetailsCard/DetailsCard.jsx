import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { useEffect, useState } from "react";


const DetailsCard = () => {
    const { user } = useAuth();
    const popular = useLoaderData();
    const {
        category, description, photo, price, serviceArea, _id } = popular || {};
    // console.log(popular);
   
    return (
        <div className="my-10 flex justify-center w-full ">
            {/* start */}
            <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>
                    <button className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" role="button">{category}</button>
                </div>
                <div className="mt-2">

                    <button className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" role="link">{category}</button>
                    {/*  */}
                    <div className="flex justify-center ">
                        <img src={photo} className=" w-20 h-20 mx-4  " />
                    </div>
                    <p title={description} className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
                    {/* <Link to={`/DetailsCard/${_id}`} className="text-xl text-green-300">details</Link> */}
                </div>
                <div className="flex items-center justify-between m-4">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline">Read more</button>
                    <p className="m-4">price : {price}</p>
                    <p className="m-4">serviceArea : {serviceArea}</p>

                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={user?.photoURL} alt="avatar" />
                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" role="link">{user?.displayName}</a>
                    </div>
                </div>
            </div>
            {/* end */}
        </div>
    );
};

export default DetailsCard;