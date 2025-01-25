import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import DynamicSelector from '../components/DynamicSelector.jsx';
import Table from '../components/Table.jsx';
import ToggleButton from '../components/ToggleButton.jsx';
import Calendar from '../components/Calendar.jsx';
import { format } from 'date-fns';
import { getInfoHQ_end, getInfoDetails_end } from '../service/service.js';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getInfoHQ_end();
                setLoading(true);
                // Asegurarse de que result sea un array
                setData(Array.isArray(result.data) ? result.data : []);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los datos');
                setLoading(false);
                console.error('Error:', err);
            }
        };
        fetchData();
    }, []);

    const mappedData = Array.isArray(data) ? data.map((item) => ({
        'STName-STCode': `${item.storeName}-${item.storeCode}`,
        'TIENDA': item.TIENDA || '-',
        'HQ': item.countSell || '-',
        'SAP': item.SAP || '-',
        'date': format(new Date(item.sellDate), 'dd/MM/yy') || '-',
    })) : [];

   
  
    

    const columns = ['STName-STCode', 'TIENDA', 'HQ', 'SAP'];
    const detailColumns = ['DOC #', 'NAME', 'TRACKING', 'POSFLAG', 'EXTERNAL', 'TOTAL'];

   
      
      

    const sortedData = mappedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const [selectedDate, setSelectedDate] = useState(mappedData.date);
    const [isFiltered, setIsFiltered] = useState(false);

    const handleToggle = (filtered) => {
        setIsFiltered(filtered);
    };

    const getProcessedData = (data) => {
        if (!isFiltered) return data;
        return data.filter(
            (row) => !(row.TIENDA === row.HQ && row.HQ === row.SAP)
        );
    };

    const groupDataByDate = (data) => {
        return data.reduce((acc, curr) => {
            ;
            if (!acc[curr.date]) {
                acc[curr.date] = [];
            }
            acc[curr.date].push(curr);
            return acc;
        }, {});
    };
    const groupedData = groupDataByDate(sortedData);
    const sortedGroupedData = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));

    const handleDateSelect = (date) => {
        try {
            const formattedDate = format(date, 'dd/MM/yy');
            console.log('Fecha seleccionada:', formattedDate);
            setSelectedDate(formattedDate);
        } catch (error) {
            console.error('Error al formatear la fecha:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4 text-6xl">{error}</div>;
    }

    return (
        <div className="bg-gray-300 min-h-screen text-black">
            <NavBar />
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center">
                    Bienvenido al centro de monitoreo [Tienda - HQ - SAP]
                </h1>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-64 lg:shrink-0">
                        <div className="lg:sticky lg:top-8 space-y-7">
                            <div>
                                <Calendar onSelectDate={handleDateSelect} />
                            </div>
                            <div className="bg-white rounded-lg">
                                <DynamicSelector
                                    options={[
                                        { value: '1', label: 'Ultimo Mes' },
                                        { value: '2', label: 'Ultima Semana' },
                                    ]}
                                    labelTitle={'Seleccione'}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="bg-white text-black p-4 sm:p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                                Tabla de administración
                            </h2>
                            <div className="overflow-x-auto">
                                {sortedGroupedData.map((date) => {
                                    const filteredData = getProcessedData(groupedData[date]);
                                    return (
                                        filteredData.length > 0 && (
                                            <div key={date} className="mb-6">
                                                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                                                    Transacciones para el {date}
                                                </h3>
                                                <div className="w-full overflow-x-auto">
                                                    <Table
                                                        columns={columns}
                                                        data={filteredData}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
