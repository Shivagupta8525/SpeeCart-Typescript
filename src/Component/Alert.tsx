import  {  FC, useEffect } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineDangerous } from "react-icons/md";
import { withAlert } from "./withProvider";

interface Alert{
    message: string,
    type: string;
}
interface  AlertProps{
    alert:Alert|null;
    removeAlert:()=>void;
}


const themeMap = {
    success: {
        color: "bg-green-400",
        Icon: AiOutlineCheckCircle,
    },
    error: {
        color: "bg-red-400",
        Icon: MdOutlineDangerous,
    },
}
const  Alert:FC<AlertProps>=({ alert, removeAlert }) =>{
    useEffect(function () {
        if (alert) {
            const timer = setTimeout(removeAlert, 2000)
            return function () {
                clearTimeout(timer)
            }
        }
    }, [alert,removeAlert]
    );

    if (!alert) {
        return <></>
    }


    const { message, type } = alert;
    const { Icon, color } = themeMap[type as keyof typeof themeMap];
    console.log("alert", alert);
    
    return (
        <div className="bg-gray-100">
            <div className="bg-white mx-16 flex justify-between pr-4">
                <div className="flex gap-10">
                    <Icon className={"text-5xl " + color} />
                    <p className="my-auto text-xl">{message}</p>
                </div>
                <button className="my-auto underline text-blue-500" onClick={removeAlert}>Dismiss</button>
            </div>

        </div>
    )
}
export default withAlert(Alert);