import { Link } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

const PopularCard = ({ popular }) => {
    const { loading, user } = useAuth();
    const { deadline, category, description, photo, price, serviceArea, _id, providerEmail, providerImage, providerName } = popular || {};
    // console.log('popular______', popular)
    if (loading) {
        return (
            <>
                <div className="flex justify-center items-center my-52">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </>
        );
    }
    else {
        const deadlineDate = new Date(deadline);
        return (
            <div>
                <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-light text-gray-600 dark:text-gray-400">deadline :  {deadlineDate.toLocaleDateString()}</span>
                        <button className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" role="button">{category}</button>
                    </div>
                    <div className="mt-2">

                        <button className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" role="link">{category}</button>
                        {/*  */}
                        <div className="flex justify-center ">
                            <img src={photo} className=" w-20 h-20 mx-4"/>
                        </div>
                        <p title={description} className="mt-2 text-gray-600 dark:text-gray-300">{description?.substring(0, 40)}...</p>
                        <Link to={`/DetailsCard/${_id}`} className="text-xl text-green-300">details</Link>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <Link to={`/AddApply/${_id}`} className="text-blue-600 dark:text-blue-400 hover:underline">AddBids</Link>
                        <button className="text-blue-600 dark:text-blue-400 hover:underline">Read mor</button>
                        <button className="text-blue-600 dark:text-blue-400 hover:underline">Read more</button>

                        <div className="flex items-center">
                            <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={providerImage} alt="" />
                            <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" role="link">{providerName}</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default PopularCard;