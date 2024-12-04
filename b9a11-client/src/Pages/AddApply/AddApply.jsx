import useAuth from "../../hook/useAuth";
import axios from 'axios';
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
const AddApply = () => {
    const { user } = useAuth();
    const popular = useLoaderData();
    const {
        deadline, category, description,photo,price,serviceArea,_id,providerEmail,providerImage,providerName,status } = popular || {};
    // console.log(popular);
    const handleAddApplyButton = async (event) => {
        event.preventDefault();
        if (user?.email === providerEmail) { return Swal.fire("Action not permitted !"); };
        if (user?.displayName === providerName) { return Swal.fire("Action not permitted !"); };
        const form = event.target;
        const bidesName = user.displayName;
        const bidesEMail = user.email;
        const bidesPhoto = user.photoURL;
        const comment = form.comment.value;
        const title = form.title.value;
        const serviceId = _id
        const bidesUser = { bidesName, bidesPhoto, bidesEMail, providerEmail, providerName, providerImage, deadline, price, comment, category, status, title, photo,serviceId,serviceArea,status }
        // console.log("handleAddApplyButton", bidesUser);
        try {
            const { data } = await axios.post('https://b9a11-server-red.vercel.app/bides', bidesUser, );
            // console.log("data", data)
            if (data.acknowledged === true) {
                Swal.fire("Data saved successfully!");

            }
        } catch (error) {
            console.error('Error occurred:', error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `An error occurred: ${error.message}`,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }


    return (
        <div className="flex gap-10">
            <div className="my-10 w-full">
                {/* start */}
                <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-light text-gray-600 dark:text-gray-400">{deadline}</span>
                        <button className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" role="button">{category}</button>
                    </div>
                    <div className="mt-2">
                        <button className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" role="link">{category}</button>
                        <div className="flex justify-center ">
                            <img src={photo} className=" w-20 h-20 mx-4" />
                        </div>
                        <p title={description} className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                    <div className="flex items-center justify-between m-4">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline">Read more</button>
                        <p className="m-4">price : {price}$</p>
                        <p className="m-4">serviceArea : {serviceArea}</p>
                        <div className="flex items-center">
                            <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={providerImage} alt="avatar" />
                            <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" role="link">{providerName}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-10 w-full">
                <div className="max-w-2xl rounded-lg shadow-md dark:bg-gray-800">
                    <div className="mt-2">
                        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md dark:bg-gray-800">
                            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>
                            <form onSubmit={handleAddApplyButton}>
                                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-gray-700 dark:text-gray-200" >Applicant Name</label>
                                        <input required defaultValue={user.displayName} name="bidesName" id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                    </div>
                                    <div>
                                        <label className="text-gray-700 dark:text-gray-200" >Applicant Email </label>
                                        <input required defaultValue={user.email} name="bidesEMail" id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                    </div>
                                    <div className="">
                                        <label className="text-gray-700 dark:text-gray-200" >Comment</label>
                                        <input required name="comment" id="comment" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                    </div>
                                    <div>
                                        <label className="text-gray-700 dark:text-gray-200" >Title</label>
                                        <input required name="title" id="title" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddApply;
