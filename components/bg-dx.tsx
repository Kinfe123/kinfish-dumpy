const ButtonShadowGradient = () => {
    return (
      <button className='relative inline-flex h-12 max-w-fit  items-center justify-center rounded-md bg-white px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'>
        <div className='absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#b534fa] to-[#8678f9] opacity-75 blur-md' />
        Coming Soon
      </button>
    );
  };
  
  export default ButtonShadowGradient;
  