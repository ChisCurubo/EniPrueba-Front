import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-blue-600 font-bold">&lt; Prev</button>
        <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth} className="text-blue-600 font-bold">Next &gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-gray-500 font-medium">{day}</div>
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="py-2">{i + 1}</div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
