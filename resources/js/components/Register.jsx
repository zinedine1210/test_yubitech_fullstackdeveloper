import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function Register() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [email, setEmail] = useState("")
    const [validation, setValidation] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getToken = JSON.parse(localStorage.getItem("token"))
        if(getToken){
            navigate("/")
        }
    }, [])

    const handlerSubmit = async e => {
        e.preventDefault()
        const data = new FormData()

        data.append("name", name)
        data.append("email", email)
        data.append("password", password)
        data.append("password_confirmation", passwordConfirm)


        try {
            const result = await axios.post("/api/auth/register", data)
            console.log(result);
            if(result.data.success){
                Swal.fire({
                    icon:"info",
                    title:"Register Successfully"
                })
                navigate("/login")
            }
            
        } catch (error) {
            console.log(error.response.data);
            setValidation(error.response.data)
        }
    }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-zinc-100">
        <div class="bg-white dark:bg-gray-900 p-5 rounded-md shadow-md">
            <form onSubmit={(e) => handlerSubmit(e)} class="w-full max-w-md">
                <div class="flex justify-center mx-auto">
                    <h1 className="font-bold text-xl">Register</h1>
                </div>
                <div>
                    <div class="relative flex items-center mt-8">
                        <span class="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>

                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username"/>
                    </div>
                    {
                        validation.name && (
                            <p className="text-sm text-red-500">{validation.name[0]}</p>
                        )
                    }
                </div>

                <div>
                    <div class="relative flex items-center mt-4">
                        <span class="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"/>
                    </div>
                    {
                        validation.email && (
                            <p className="text-sm text-red-500">{validation.email[0]}</p>
                        )
                    }

                </div>
                <div>
                    <div class="relative flex items-center mt-4">
                        <span class="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
                    </div>
                    {
                        validation.password && (
                            <p className="text-sm text-red-500">{validation.password[0]}</p>
                        )
                    }
                </div>

                <div>
                    <div class="relative flex items-center mt-4">
                        <span class="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password"/>
                    </div>
                    {
                        validation.password_confirmation && (
                            <p className="text-sm text-red-500">{validation.password_confirmation[0]}</p>
                        )
                    }
                </div>

                <div class="mt-4">
                    <button type="submit" class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Sign Up
                    </button>

                    <div class="mt-4 text-center ">
                        <button onClick={() => navigate("/login")} class="text-sm text-blue-500 hover:underline dark:text-blue-400">
                            Already have an account?
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
