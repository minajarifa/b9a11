import { useState } from "react";
import useAuth from "../../hook/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
const Add = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useAuth();
    const handleAddSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const photo = form.serviceImage.value;
        const category = form.serviceName.value;
        const price = parseFloat(form.servicePrice.value);
        const serviceArea = form.serviceArea.value;
        const description = form.serviceDescription.value;
        const providerEmail = user.email;
        const providerImage = user.photoURL;
        const providerName = user.displayName;
        const deadline = startDate
         const status = 'pending'
        const addService = {status, photo,category, serviceArea, price, description, providerEmail, providerImage, providerName, deadline };
        // console.log('handleAddSubmit', addService);
        try {
            const { data } = await axios.post('https://b9a11-server-red.vercel.app/tutor',addService,{withCredentials:true});
            if (data.acknowledged === true) {
                Swal.fire("Data saved successfully !");
               navigate('/Manage')
            }
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>

                <form onSubmit={handleAddSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Image URL of the Service</label>
                            <input required name="serviceImage" id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Service Name</label>
                            <select
                                name="serviceName"
                                id="serviceName"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                                <option value="Math Tutoring">Math Tutoring</option>
                                <option value="Bangla Tutoring">Bangla Tutoring</option>
                                <option value="English Tutoring">English Tutoring</option>
                            </select>
                            {/* <input required name="serviceName" id="emailAddress" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" /> */}
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Service Price</label>
                            <input required name="servicePrice" id="password" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Service Area</label>
                            <input required name="serviceArea" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                    </div>

                    <div className="w-full mt-4">
                        <label className="text-gray-700 dark:text-gray-200 block" htmlFor="serviceDate">Date</label>
                        <div className="w-full">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                name="serviceDate"
                                required
                            />
                        </div>
                    </div>


                    <div className="w-full">
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Description</label>
                        <select name="serviceDescription" id="serviceDescription" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                            <option value="Experienced math tutor for high school students.">Experienced math tutor for high school students.</option>
                            <option value="Improve your English skills with personalized lessons.">Improve your English skills with personalized lessons.</option>
                            <option value="Learn Bangla from a native speaker with years of experience."> Bangla from a native speaker with years of experience.</option>
                        </select>
                        {/* <input required name="serviceDescription" type="text"  /> */}
                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="btn btn-block px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Add;
