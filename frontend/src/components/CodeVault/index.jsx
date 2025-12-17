import { useDeleteSnippetMutation, useGetAllSnippetsQuery } from "../../services/snippets"
import MainHeader from "../MainHeader"
import { RingLoader } from "react-spinners"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { stagedTimers } from "../../fetchData"
import {toast} from "react-toastify"
import "./index.css"

const CodeVault = () => {
    const [filters, setFilters] = useState({ search: "", language: "" })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFilters((prev) => ({ ...prev, [name]: value }))
    }
    const navigate = useNavigate()
    const { data, isLoading, isFetching, isError, error } = useGetAllSnippetsQuery(filters)
    const [deleteSnippet,{isLoading:deleteLoading}]=useDeleteSnippetMutation()
    
    useEffect(() => {
        if (isLoading || isFetching) stagedTimers.start();
        else stagedTimers.stop();

        return () => {
            stagedTimers.stop();
        }
    }, [isLoading, isFetching])

    const handleDelete=async(e,id)=>{
        e.stopPropagation()

        try{
            await deleteSnippet(id).unwrap()
            toast.success("Snippet Deleted Successfully!")
        }
        catch(error){
            toast.error(error?.data?.message)
        }

    }
    return (
        <div>
            <MainHeader />
            <main className="code-vault-hero">
                {/* <div className="filters-layout">
                    <div className="input-wrapper">
                        <input name="search" onChange={handleChange} value={filters.search} required className="input-element" id="search" type="search" />
                        <label className="label" htmlFor="search">Search...</label>
                    </div>
                    <select name="language" onChange={handleChange} value={filters.language} className="input-element">
                        <option value="">Select Language</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                        <option value="cpp">C++</option>
                        <option value="typescript">TypeScript</option>
                        <option value="php">PHP</option>
                        <option value="ruby">Ruby</option>
                        <option value="go">Go</option>
                        <option value="kotlin">Kotlin</option>
                    </select>
                    <button className="button remove-filters-button">Remove Filters</button>
                </div> */}

                {isError ? (
                    <div className="flex-layout">
                        <img className="flex-layout-image" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1765946826/error_wrnn2h.webp" alt="" />
                        <h1>{error?.data?.message}</h1>
                    </div>
                ) : (isLoading || isFetching) ? (
                    <div className="flex-layout">
                        <h1 className="flex-layout-error">Please wait while we fetch data from the server</h1>
                        <RingLoader color="red" size={60} />
                    </div>
                ) : (
                    <div className="grid-data-wrapper">
                        {data?.map((each) => (
                            <div onClick={() => navigate(`/snippet/${each._id}`)} className="grid-data" key={each._id}>
                                <h2>{each.title}</h2>
                                <p>Language: {each.language}</p>
                                <p>Created At: {new Date(each.createdAt).toLocaleString()}</p>
                                <p>{each.code}</p>
                                <button disabled={deleteLoading} onClick={(e)=>handleDelete(e,each._id)} className="button">Delete</button>
                            </div>
                        ))}
                    </div>
                )}



            </main>
        </div>
    )
}

export default CodeVault
