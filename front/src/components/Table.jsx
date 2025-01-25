import React, { useState, useEffect,onClick } from 'react';
import { getInfoHQ_end, getInfoDetails_end } from '../service/service.js';
import { format } from 'date-fns';

const Table = ({ columns, data }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [dataDetails, setDetailsData] = useState([]); // Separar el estado para detalles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  

  // Procesar los datos para determinar si se debe mostrar el botón
  const processedData = data.map((row) => {
    const [col1, col2, col3, col4] = columns;
    const showButton = !(row[col2] === row[col3] && row[col3] === row[col4]);
    return { ...row, showButton }; // Agregar una propiedad que indica si el botón debe mostrarse
  });

  const handleViewDetails = async (row) => {
    setTransactionDetails(row); // Guardar los detalles relevantes
    setShowDetails(true);
    setLoading(true); 
    const dater = row.date; // Asegúrate de usar `row.date` en lugar de `data.date`
  
    // Obtener 'name' y 'code' del valor de 'STName-STCode' en el objeto row
    const [name, code] = row["STName-STCode"].split("-");
  
    // Llamada a la función con name, code y date
    const result2 = await getInfoDetails_end(name, code, dater);
  
    // Asegurarse de que result sea un array
    setDetailsData(Array.isArray(result2.data) ? result2.data : []); // Actualizar con result2
    setLoading(false); 
  };
  

  const handleCloseDetails = () => {
    setShowDetails(false);
    setTransactionDetails(null);
  };

  const detailColumns = ['DOC #', 'NAME', 'TRACKING', 'POSFLAG', 'EXTERNAL', 'TOTAL'];

  const mappedDataDetail = Array.isArray(dataDetails)? dataDetails.map((item) => ({
    'DOC #': item.docNo || '-', // Si `docNo` no existe, muestra '-'
    'NAME': item.btName || '-',
    'TRACKING': item.traking || '-',
    'POSFLAG': item.pos_flag || '-',
    'EXTERNAL': item.external || '-',
    'TOTAL': item.transaction || '-',
    'date': format(new Date(item.sellDate), 'dd/MM/yy') || '-',
    'STName-STCode':`${item.storeName}-${item.storeCode}`
  }))
: [];

  return (
    <div className="p-6">
      {/* Tabla principal */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            {columns.map((column, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4  py-2 text-center"
              >
                {column}
              </th>
            ))}
            <th className="border border-gray-300 px-8 py-2 text-center">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {processedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-gray-100 even:bg-white">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border border-gray-300 px-4 py-2 text-center">
                  {row[column] || 'N/A'}
                </td>
              ))}
              <td className="border border-gray-300 px-0 py-2 text-center" >
                {/* Mostrar el botón solo si showButton es true */}
                {row.showButton && (
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 "
                    onClick={() => handleViewDetails(row)}
                  >
                    Ver Detalles
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para los detalles */}
      {showDetails && transactionDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 h-3/4 p-6 overflow-hidden">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Detalles de la Transacción</h2>
              <button
                className="text-red-500 font-bold text-lg"
                onClick={handleCloseDetails}
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="mt-4 h-[calc(100%-4rem)] overflow-y-auto">
              {/* Tabla secundaria para detalles de la transacción */}
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-green-500 text-white">
                    {detailColumns.map((column, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {mappedDataDetail.map((column, rowIndex) => (
                  <tr key={rowIndex} className="border border-gray-300">
                    {Object.keys(column).slice(0, -2).map((key) => (
                      <td key={`${rowIndex}-${key}`} className="border border-gray-300 px-4 py-2">
                        {column[key] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;