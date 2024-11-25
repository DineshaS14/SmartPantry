import Link from 'next/link';

export default function WelcomePage() {
    return (
        <>
        <div className="flex flex-col justify-center font-bold text-black text-center h-screen">
            <h1 className='text-[#E38E49] italic font-extrabold text-9xl mb-10'>SmartPantry</h1>
            <div className='flex flex-row justify-center '>
            <Link href="/login" 
            className=" border-solid border-[#E38E49] w-1/5 border-2
             hover:bg-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
                  Login
            </Link>
            <Link href="/signup" 
            className="border-solid border-[#E38E49] w-1/5 border-2
             hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Signup
            </Link>
            </div>
        </div>
        </>
    );
} // WelcomePage