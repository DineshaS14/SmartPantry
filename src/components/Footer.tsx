const Footer = () => {
  return (
    <footer className="bg-[#0A3981] text-white text-center py-4">
      <span
        className="
          border-2 border-[#E38E49] rounded-xl m-5 drop-shadow-[0_5px_10px_rgba(227,142,73,1)] border-solid 
          px-4 py-2 text-xs sm:px-8 sm:py-3 sm:text-sm md:px-12 md:py-3 md:text-base lg:px-20 lg:py-3 lg:text-lg
        "
      >
        &copy; {new Date().getFullYear()} SmartPantry. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;

  