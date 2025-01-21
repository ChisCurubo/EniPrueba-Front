import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay
} from 'date-fns';

const Calendar = ({ onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Obtener todos los días del mes actual
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const daysInCalendar = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth} 
          className="text-blue-600 hover:text-blue-800 font-bold p-2"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button 
          onClick={nextMonth} 
          className="text-blue-600 hover:text-blue-800 font-bold p-2"
        >
          &gt;
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-gray-500 font-medium text-center text-sm p-1">
            {day}
          </div>
        ))}
        
        {daysInCalendar.map((date, idx) => (
          <button
            key={idx}
            onClick={() => handleDateClick(date)}
            className={`
              p-2 text-sm rounded-full 
              ${!isSameMonth(date, currentMonth) ? 'text-gray-300' : 'hover:bg-blue-100'}
              ${isSameDay(date, selectedDate) ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
              ${isSameDay(date, new Date()) && !isSameDay(date, selectedDate) ? 'border border-blue-500' : ''}
            `}
          >
            {format(date, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;