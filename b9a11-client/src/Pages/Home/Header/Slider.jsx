import { Link } from 'react-router-dom';

const Slider = ({ image, text }) => {
    return (
        <div>
            <div 
                className="w-full bg-center bg-cover h-[38rem] rounded-3xl" 
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="flex items-center justify-center w-full h-full bg-black opacity-60 rounded-3xl">
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-white lg:text-4xl ml-14 mr-14 mb-14">
                            <h1 className='text-5xl'>Our mission</h1>
                            {text}
                        </div>
                        <button className="w-full px-5 py-2 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            Start project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slider;
