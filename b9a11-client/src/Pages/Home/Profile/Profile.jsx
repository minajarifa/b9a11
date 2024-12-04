import useAuth from "../../../hook/useAuth";


const Profile = () => {
    const { user } = useAuth();
    if (user) return (
        <div className="flex justify-center">
           
            <div className="w-full px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="flex justify-center -mt-16 md:justify-end">
                    <img className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src={user?.photoURL} />
                </div>
                <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">Hello {user?.displayName}!</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">We’re thrilled to have you here! Whether you're looking to master a new subject, prepare for exams, or simply boost your knowledge, our community of expert tutors is ready to help you succeed. Explore personalized learning experiences designed just for you, and start your journey towards academic excellence today.</p>
                <div className="flex justify-end mt-4">
                    <a href="#" className="text-lg font-medium text-blue-600 dark:text-blue-300" tabindex="0" role="link">{user?.email}</a>
                </div>
            </div>
          
        </div>
    );
};
export default Profile;