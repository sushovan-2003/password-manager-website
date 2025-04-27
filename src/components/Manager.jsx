import React, { useState, useEffect,useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';


const Manager = () => {

    const [passwordArray, setpasswordArray] = useState([])
    const [form, setform] = useState({ site: "", username: "", password: "" })

    useEffect(() => {
        let pass = localStorage.getItem("passwords")
        if (pass) {
            setpasswordArray(JSON.parse(pass))
        }
    }, [])


    const savepassword = () => {
        if (form.site.length >= 3 && form.username.length >= 3 && form.password.length >= 3) {

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringfy([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
            toast('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        } else {
            toast.error('🦄Error! Password not saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
    }
const changeref = useRef()
const passwordref = useRef()

const showpassword=()=>{
    
if(changeref.current.src.includes("public/eyecross.png")){
    changeref.current.src="public/eye.png"
   passwordref.current.type="password"
    
}else{
   changeref.current.src="public/eyecross.png"
   passwordref.current.type="text"
}
}

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleedit = (id) => {
        setform(passwordArray.filter(i => i.id == id)[0])
        setpasswordArray(passwordArray.filter(i => i.id !== id))
    }
    const handledelete = (id) => {
        let c = confirm("do you really want to delete!")
        if (c) {
            setpasswordArray(passwordArray.filter(i => i.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(i => i.id !== id)))
            toast('deleted successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
    }
    const handlecopy = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />

            <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <div className="w-[72vw] mx-auto p-3 min-h-[83vh] md:min-h-[84.5vh] flex flex-col items-center gap-3">
                <h2>

                    <div className="logo text-purple-500 font-bold text-3xl">&lt;Pass<span className='text-black'>OP/&gt;</span></div>
                </h2>
                <div>Your own password manager</div>
                <div className='w-full flex flex-col gap-3'>
                    <input type="text" name='site' value={form.site} onChange={handlechange} className=' p-1 border-2 border-purple-900 w-full rounded-full px-4' placeholder='Enter URL' />
                    <div className='w-full gap-3 flex flex-col md:flex-row'>
                        <input type="text" name='username' value={form.username} onChange={handlechange} placeholder='Enter Username' className=' border-2 border-purple-900 w-full rounded-full p-1 px-4' />
                        <div className='w-1/2 relative'>
                            <input ref={passwordref} type="password" name='password' value={form.password} onChange={handlechange} placeholder='Enter Password' className=' border-2 border-purple-900 w-full rounded-full px-4  p-1' />
                            <span onClick={showpassword} className='w-5 h-5 absolute right-3 bottom-2' ><img ref={changeref}  src="/public/eye.png" alt="eye" /></span>
                        </div>
                    </div>
                </div>
                <button onClick={savepassword} className='hover:bg-purple-500 flex items-center gap-2 text-white bg-purple-600 border border-purple-400 p-2 px-3 rounded-full my-2'><lord-icon
                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                    trigger="hover" style={{ "height": "25px", "width": "25px", "filter": "invert(1)" }}>
                </lord-icon><span>Save</span></button>

                <div className="passwords w-full">
                    <h2 className='font-bold'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 &&
                        <table class="w-full table-auto mt-1 overflow-hidden rounded-md">
                            <thead className='bg-purple-800 text-white'>
                                <tr>
                                    <th className='py-1'>Site</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-purple-300'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center border border-white p-2'>
                                            <div className='flex items-center justify-center gap-1'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div onClick={() => { handlecopy(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>

                                        </td>
                                        <td className='text-center border border-white'>  <div className='flex items-center justify-center gap-1'>
                                          <span>{item.username}</span>
                                            <div onClick={() => { handlecopy(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div></td>
                                        <td className='text-center border border-white'>  <div className='flex items-center justify-center gap-1'>
                                           <span>{"*".repeat(item.password.length)}</span>
                                            <div onClick={() => { handlecopy(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div></td>
                                        <td className='text-center border border-white'>
                                            <button className='edit' onClick={() => { handleedit(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </button>
                                            <button className="delete" onClick={() => { handledelete(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </button>

                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>


        </>
    )
}

export default Manager
