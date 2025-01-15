import React, { useState } from 'react';

const Table = ({ columns, data, detail, detaildata }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  // Procesar los datos para determinar si se debe mostrar el botón
  const processedData = data.map((row) => {
    const [col1, col2, col3, col4] = columns;
    const showButton = !(row[col2] === row[col3] && row[col3] === row[col4]);
    return { ...row, showButton }; // Agregar una propiedad que indica si el botón debe mostrarse
  });

  const handleViewDetails = (row) => {
    setTransactionDetails(row); // Guardar los detalles relevantes
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setTransactionDetails(null);
  };

  return (
    <div className="p-6">
      {/* Tabla principal */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            {columns.map((column, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-left"
              >
                {column}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2 text-left">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {processedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-gray-100 even:bg-white">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border border-gray-300 px-4 py-2">
                  {row[column] || 'N/A'}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2">
                {/* Mostrar el botón solo si showButton es true */}
                {row.showButton && (
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
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
          <div className="bg-white rounded-lg shadow-lg w-3/4 p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Detalles de la Transacción</h2>
              <button
                className="text-red-500 font-bold text-lg"
                onClick={handleCloseDetails}
              >
                ×
              </button>
            </div>
            <div className="mt-4">
              {/* Tabla secundaria para detalles de la transacción */}
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-green-500 text-white">
                    {detail.map((column, index) => (
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
                  {/* Mostrar detalles basados en la transacción seleccionada */}
                  <tr className="odd:bg-gray-100 even:bg-white">
                    {detaildata.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {/* Aquí mostramos el valor correspondiente de la transacción */}
                        {column || 'N/A'}
                        
                      </td>
                    ))}
                  </tr>
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
