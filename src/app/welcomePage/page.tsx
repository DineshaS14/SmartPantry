import Link from 'next/link';

export default function WelcomePage() {
    return (
        <>
        <div className="flex flex-col justify-center font-bold bg-[#D4EBF8] text-black text-center h-screen">
            <h1 className='drop-shadow-[0_1.2px_5px_rgba(0,0,0,1)] text-[#E38E49] italic font-extrabold text-9xl mb-10'>
                SmartPantry
            </h1>
            <div className='flex flex-row justify-center space-x-1 '>
            <Link href="/login" className="bg-[#E38E49] text-white
            hover:bg-[#1F509A]  w-1/5 border-2
              hover:bg-blue-7 px-3 py-2 rounded-lg text-sm font-medium border-black">
              <span className='italic drop-shadow-[0_0px_5px_rgba(0,0,0,1)]'>Login</span>
            </Link>
            <Link href="/signup" className="bg-[#E38E49] text-white
            hover:bg-[#1F509A]  w-1/5 border-2
              hover:bg-blue-7 px-3 py-2 rounded-lg text-sm font-medium border-black">
              <span className='italic drop-shadow-[0_0px_5px_rgba(0,0,0,1)]'>SignUp</span>
            </Link>
            </div>
        </div>
        </>
    );
} // WelcomePage