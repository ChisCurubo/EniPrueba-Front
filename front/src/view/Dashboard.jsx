import React, { useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import DynamicSelector from '../components/DynamicSelector.jsx';
import Table from '../components/Table.jsx';

const Dashboard = () => {
    const optionDate = [
        { value: '12/01/2025', label: '12/01/2025' },
        { value: '13/01/2025', label: '13/01/2025' },
        { value: '14/01/2025', label: '14/01/2025' },
    ];

    const columns = ['ID', 'TIENDA', 'HQ', 'SAP'];
    const data = [
        { ID: 1, TIENDA: 30, HQ: 30, SAP: 30, date: '12/01/2025' },
        { ID: 2, TIENDA: 30, HQ: 25, SAP: 25, date: '12/01/2025' },
        { ID: 3, TIENDA: 35, HQ: 35, SAP: 35, date: '13/01/2025' },
        { ID: 4, TIENDA: 40, HQ: 40, SAP: 40, date: '14/01/2025' },
    ];

    const detailColumns = ['Transaction_ID', 'Amount', 'Date'];
    const detailData = [
        { Transaction_ID: 'TX001', Amount: '$100', Date: '12/01/2025' },
        { Transaction_ID: 'TX002', Amount: '$200', Date: '13/01/2025' },
        { Transaction_ID: 'TX003', Amount: '$150', Date: '14/01/2025' },
    ];

    // Ordenamos las fechas en orden descendente
    const sortedDates = optionDate.sort((a, b) => new Date(b.value) - new Date(a.value));

    // Filtramos los datos por fecha
    const getDataForDate = (selectedDate) => {
        return data.filter(row => row.date === selectedDate);
    };

    const [selectedDate, setSelectedDate] = useState(optionDate[0].value);

    return (
        <div className="bg-gray-300 min-h-screen text-black">
            <NavBar />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Bienvenido al centro de monitoreo [tienda - HQ - SAP]
                </h1>
                <div className="bg-white text-black p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Tabla de administración</h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <DynamicSelector
                            options={optionDate}
                            labelTitle={'Seleccione fecha a revisar'}
                            onChange={e => setSelectedDate(e.target.value)}
                        />

                    </div>

                    {/* Repetir las tablas por cada fecha en orden descendente */}
                    {sortedDates.reverse().map((dateObj) => {
                        const date = dateObj.value;
                        return (
                            <div key={date} className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Transacciones para el {date}</h3>
                                <Table
                                    columns={columns}
                                    data={data}  // Filtrar los datos según la fecha
                                    detail={detailColumns}
                                    detaildata={detailData}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
