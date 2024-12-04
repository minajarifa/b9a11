import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import Swal from "sweetalert2";

const Updated = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const service = useLoaderData();
    // console.log('service', service);
    const handleUpdatedFunction = async (event) => {
        event.preventDefault();
        const form = event.target;
        const photo = form.serviceImage.value;
        const category = form.serviceName.value;
        const price = parseFloat(form.servicePrice.value);
        const serviceArea = form.serviceArea.value;
        const description = form.serviceDescription.value;
        const deadline = startDate
        const status = 'pending'
        const updatedService = { status, photo, category, serviceArea, price, description, deadline };
        // console.log('handleAddSubmit', updatedService);
        try {
            const { data } = await axios.put(`https://b9a11-server-red.vercel.app/tutor/${service?._id}`, updatedService);
            if (data.modifiedCount === 1) {
                Swal.fire("Data updated successfully !");
                navigate('/Booked')
            }
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Update Post</h2>

                <form onSubmit={handleUpdatedFunction}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Image URL of the Service</label>
                            <input
                                defaultValue={service?.photo}
                                required name="serviceImage" id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Service Name</label>
                            <select
                                defaultValue={service?.category}
                                required
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
                            <input
                                defaultValue={service?.price}
                                required name="servicePrice" id="password" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Service Area</label>
                            <input
                                required
                                defaultValue={service?.serviceArea}
                                name="serviceArea" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                    </div>

                    <div className="w-full mt-4">
                        <label className="text-gray-700 dark:text-gray-200 block" htmlFor="serviceDate">Date</label>
                        <div className="w-full">
                            <DatePicker
                                defaultValue={service?.deadline}

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
                        <select
                            required
                            defaultValue={service?.description}
                            name="serviceDescription" id="serviceDescription" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
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

export default Updated;