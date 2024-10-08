import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';


const Topbar = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    return (
        <div className="flex w-full justify-between items-center px-6 py-2 bg-white border-b">
            {/* Left Side */}
            <div className="flex items-center space-x-2">
                <img
                    src="logo.png"
                    alt="Testbook Logo"
                    className="w-6 h-6" // Placeholder for your logo
                />
                <span className="font-semibold text-sm text-gray-700">
                    IBPS PO 2024 Prelims Full Test 1
                </span>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4 gap-6">

                <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-md max-sm:px-2 max-sm:py-1">
                    <span className="text-sm text-gray-500 max-sm:text-xs">Rate the Test</span>
                    <div className="flex space-x-1">
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;

                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        className="hidden"
                                    />
                                    <FaStar
                                        className={`cursor-pointer transition duration-200 ${ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'
                                            }`}
                                        size={ratingValue <= (hover || rating) ? 20 : 18} // Make star size responsive
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center space-x-2 max-sm:hidden">
                    <button className="text-sm text-cyan-500 hover:underline">Go to Tests</button>
                    <span className="text-sm text-gray-500">or</span>
                    <button className="border border-cyan-500 text-sm text-cyan-500 px-2 py-1 rounded hover:bg-cyan-100 hover:text-black transition-all duration-300 transition-colors">
                        Solutions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
