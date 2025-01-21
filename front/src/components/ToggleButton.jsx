import React, { useState } from 'react';


const ToggleSButton = ({ onToggle }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        const newState = !isToggled;
        setIsToggled(newState);
        onToggle(newState); // Notifica al componente padre
    };

    return (
        <div
            onClick={handleToggle}
            className={`w-14 h-8 flex items-center rounded-full cursor-pointer p-1 transition-colors duration-300 ${
                isToggled ? 'bg-green-500' : 'bg-gray-300'
            }`}
        >
            <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    isToggled ? 'translate-x-6' : 'translate-x-0'
                }`}
            ></div>
        </div>
    );
};

export default ToggleSButton;
