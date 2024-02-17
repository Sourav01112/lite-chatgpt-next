import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import LogoSVG from "@/utils/svg/logoSVG";



export const ChatSidebar = () => {
    return (
        <div className="flex flex-col"
            style={{ backgroundColor: "#171717" }}
        >
            <div className="flex justify-between p-3 m-1 w-[95%] text-center align-middle pt-5">

                <div className="flex">
                    <div className=" w-10 h-10">
                        <LogoSVG />
                    </div>
                    <div className="text-gray-100 font-semibold text-sm">New Chat</div>
                </div>






                <FontAwesomeIcon icon={faPenToSquare} className="text-white" />
            </div>
            <div>
                <Link href='/api/auth/logout'>Logout</Link>
            </div>
        </div>
    )
}


