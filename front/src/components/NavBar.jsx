// src/components/Navbar.jsx
import retail from '../assets/images/retail.png';

const Navbar = () => {
  return (
    <nav className="bg-blue-bg text-white h-32 flex items-center">
      <div className="relative px-10 flex h-16 items-center justify-between xl:px-20 w-full">
          <div className="flex flex-nowrap items-center">
            <a href="/">
              <img
                className="h-auto w-auto max-h-20"
                src={retail}
                alt="Retail-Pro-logo"
              />
            </a>
          </div>

        {/* Contenedor para centrar el texto */}
        <div className="flex justify-center items-center flex-grow">
          <label className="text-4xl font-bold text-center mr-24">
            Monitoreo de Ventas Retail Pro
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
