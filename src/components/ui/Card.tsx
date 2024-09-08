"use client"
interface CardProps {
    logo: React.ReactNode | React.ReactNode[];
    title: string;
    link:string
}

export default function Card({logo, title, link}: CardProps) {
    return (
        <div className="h-64 w-64 bg-white rounded-2xl cursor-pointer" onClick={()=>{
            console.log('clicked')
            window.location.href = link
        }}>
            <div className=" h-5/6 rounded-2xl flex items-center text-5xl justify-center">
                {logo}
            </div>
            <div className=" w-full flex justify-center">
                <h1 className="text-center text-2xl font-semibold bg-gray-200 px-4 py-1 -top-11 relative rounded-3xl">{title}</h1>
            </div>
        </div>
    );
}