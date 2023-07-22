import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function Login() {
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [validation, setValidation] = useState([])

    useEffect(() => {
        const getToken = JSON.parse(localStorage.getItem("token"))
        if(getToken){
            navigate("/")
        }
    }, [])

    const handlerSubmit = async e => {
        e.preventDefault()
        const data = new FormData()
        data.append("email", email)
        data.append("password", password)

        try {
            const result = await axios.post("/api/auth/login", data)
            console.log(result);
            if(result.data.success){
                Swal.fire({
                    icon:"success",
                    title:"Welcome back"
                })

                localStorage.setItem("token", JSON.stringify(result.data.access_token))
                navigate("/")
            }
        } catch (error) {
            if(error.response.data.error == "Unauthorized"){
                Swal.fire({
                    icon:"info",
                    title:"No matching credentials"
                })
            }else{
                setValidation(error.response.data)
            }
        }
    }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-zinc-100">
        <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="px-6 py-4">

                <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

                <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

                <form onSubmit={e => handlerSubmit(e)}>
                    <div class="w-full mt-4">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" />
                        {
                            validation.email && (
                                <p className="text-sm text-red-500">{validation.email[0]}</p>
                            )
                        }
                    </div>

                    <div class="w-full mt-4">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                        {
                            validation.password && (
                                <p className="text-sm text-red-500">{validation.password[0]}</p>
                            )
                        }
                    </div>

                    <div class="flex items-center justify-between mt-4">
                        {/* <a href="#" class="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a> */}

                        <button type="submit" class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>

            <div class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                <span class="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

                <button onClick={() => navigate("/register")} class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</button>
            </div>
        </div>
    </div>
  )
}
