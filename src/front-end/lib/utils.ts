import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCurrentUser = async ()=> {

    const userId = Cookies.get('userId')? Cookies.get('userId'): " ";
    let token = Cookies.get('token')? Cookies.get('token'):" ";
    const response = await fetch(`http://localhost:3000/users/findUser/${userId}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": token!
        }
    })
    return await response.json()

}

export function getTimestampInSeconds () {
    return Math.floor(Date.now() / 1000)
}