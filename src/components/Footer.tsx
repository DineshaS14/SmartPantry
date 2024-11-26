/* src/components/Footer.tsx */

const Footer = () => {
    return (
      <footer className=" bg-[#0A3981] text-white text-center py-4">
        <span className="border-2 border-[#E38E49] drop-shadow-[0_5px_10px_rgba(227,142,73,1)] border-solid px-20 py-3">
        &copy; {new Date().getFullYear()} SmartPantry. All rights reserved.
        </span>
      </footer>
    );
  };
  
  export default Footer;
  