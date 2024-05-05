import svg from "../assets/401.svg";
import { Link } from "react-router-dom";
const Unauthorized = () => {
    return (
        <>
            <div className=" h-[80vh] flex flex-col items-center justify-center">
                <img src={svg} alt="svg"  className="h-[70vh] w-[50vw]"/>
                <Link to={'/'}>
                    <button className="px-3 py-4 border-none cursor-pointer transition duration-300 text-base font-bold bg-indigo-500 hover:bg-indigo-400">
                        Back to Home
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Unauthorized;