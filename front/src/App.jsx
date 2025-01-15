import { useState } from 'react'
import viteLogo from '/vite.svg'
import Dashboard from './view/Dashboard'
//import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  //const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path='/' element={<Dashboard />} />

      </Routes>
    </BrowserRouter >
  )
}

export default App

// import Login from './views/UserView/Login.jsx'
// import Dashboard from './views/UserView/Dashboard.jsx'

// import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';  // Importando librerias de react-router-dom para el manejo de wards ('/')
// import Services from './views/UserView/Services.jsx';
// import AboutUs from './views/UserView/AboutUs.jsx';
// import MedicalHistory from './views/UserView/MedicalHistory.jsx';
// import Appointments from './views/UserView/Appointments.jsx';
// import ManagementPanel from './views/OperatorView/ManagementPanel.jsx';
// import ProtectedRoute from './utils/ProtectedRoute.jsx';
// import DoctorDashboard from './views/DoctorView/DoctorDashboard.jsx';
// /**
//  * App structure 'routes'
//  * Defines routes and its related components
//  * @returns {Component} App
//  */
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* MAIN ROUTE '/' */}
//         <Route index element={<Dashboard />} />
//         {/* USUARIO */}
//         <Route path='/' element={<Dashboard />} />
//         <Route path='login' element={<Login />} />
//         <Route path='nosotros' element={<AboutUs />} />
//         <Route path='citas' element={<Appointments />} />
//         <Route path='servicios' element={<Services />} />
//         <Route path='historiaclinica' element={<MedicalHistory />} />
//         {/* OPERADOR */}
//         {/* <Route element={<ProtectedRoute isAllowed={user.rol === 2} redirectTo={"/management"} />} > */}
//         <Route path='management' element={<ManagementPanel />} />
//         {/* </Route> */}

//         {/* MEDICO */}
//         {/* <Route element={<ProtectedRoute isAllowed={user.rol === 3} />} > */}
//           <Route path='medico' element={<DoctorDashboard />} />
//         {/* </Route> */}
//       </Routes>
//     </BrowserRouter>


//   )
// }


// export default App