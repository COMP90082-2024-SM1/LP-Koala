import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCurrentUser = async (token:string | undefined)=> {
    const userId = jwtDecode(token!).id
    const response = await fetch(`http://localhost:3000/users/findUser/${userId}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": token!
        }
    })
    const result = await response.json()
    return result.user

}

export function getTimestampInSeconds () {
    return Math.floor(Date.now() / 1000)
}

export function isUserLoggedIn (token: string | undefined) {
    try {
        if (token !== undefined) {
            const decoded = jwtDecode(token);
            return (decoded.exp ? decoded.exp : 0) >= getTimestampInSeconds();

        }else {
            return false
        }
    }catch (error) {
        console.log(error)
        return false
    }

}

export const getUserRole = async (token: string | undefined) =>{
    const user = await getCurrentUser(token);
    // console.log(token);
    return user.role;
}