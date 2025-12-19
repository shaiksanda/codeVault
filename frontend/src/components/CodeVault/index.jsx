import { useDeleteSnippetMutation, useGetAllSnippetsQuery } from "../../services/snippets"
import MainHeader from "../MainHeader"
import { RingLoader } from "react-spinners"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { stagedTimers } from "../../fetchData"
import { toast } from "react-toastify"

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./index.css"

const CodeVault = () => {
    const [filters, setFilters] = useState({ search: "", language: "" })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFilters((prev) => ({ ...prev, [name]: value }))
    }
    const navigate = useNavigate()
    const { data, isLoading, isFetching, isError, error } = useGetAllSnippetsQuery(filters)
    const [deleteSnippet, { isLoading: deleteLoading }] = useDeleteSnippetMutation()

    useEffect(() => {
        if (isLoading || isFetching) stagedTimers.start();
        else stagedTimers.stop();

        return () => {
            stagedTimers.stop();
        }
    }, [isLoading, isFetching])

    const handleDelete = async (e, id) => {
        e.stopPropagation()

        try {
            await deleteSnippet(id).unwrap()
            toast.success("Snippet Deleted Successfully!")
        }
        catch (error) {
            toast.error(error?.data?.message)
        }

    }

    const getPreviewCode = (code) => {
        if (!code) return "";

        const lines = code.split("\n");

        if (lines.length <= 2) {
            return code;
        }

        return `${lines[0]}\n...\n${lines[lines.length - 1]}`;
    };

    const removeFilters = () => {
        setFilters({ search: "", language: "" })
    }

    return (
        <div>
            <MainHeader />
            <main className="code-vault-hero">
                <div className="filters-layout">
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
                    <button onClick={removeFilters} className="button remove-filters-button">Remove Filters</button>
                </div>

                {isError ? (
                    <div className="flex-layout">
                        <img className="flex-layout-image" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1765946826/error_wrnn2h.webp" alt="" />
                        <h1 className="flex-layout-error">{error?.data?.message}</h1>
                    </div>
                ) : (isLoading || isFetching) ? (
                    <div className="flex-layout">
                        <h1 className="flex-layout-error">Please wait while we fetch data from the server</h1>
                        <RingLoader color="red" size={60} />
                    </div>
                ) : data?.length === 0 ? (
                    <div className="flex-layout">
                        <img
                            src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1766135031/no_data_found_fxfsg7.webp"
                            alt="no data"
                        />
                        <h1 className="error">No snippets to show.</h1>
                    </div>
                ) : (
                    <div className="grid-data-wrapper">
                        {data?.map((each) => (
                            <div
                                key={each._id}
                                onClick={() => navigate(`/snippet/${each._id}`)}
                                className="grid-data"
                            >
                                <h2>Title: {each.title}</h2>
                                <p>Language: {each.language}</p>
                                <p>Created At: {new Date(each.createdAt).toLocaleString()}</p>

                                <h4>Code:</h4>
                                <div className="highlighter">
                                    <SyntaxHighlighter
                                        showLineNumbers
                                        wrapLongLines
                                        language={each.language}
                                        style={oneDark}
                                        customStyle={{
                                            maxWidth: "100%",
                                            overflowX: "auto",
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-word",
                                            boxSizing: "border-box",
                                        }}
                                    >
                                        {getPreviewCode(each.code)}
                                    </SyntaxHighlighter>
                                </div>

                                <Popup
                                    modal
                                    trigger={
                                        <button
                                            disabled={deleteLoading}
                                            className="button logout-button"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Delete
                                        </button>
                                    }
                                    contentStyle={{ border: "none", borderRadius: "12px", width: "90%", maxWidth: "400px" }}
                                >
                                    {(close) => (
                                        <div className="popup-layout">
                                            <h2>Are you sure you want to delete this snippet?</h2>
                                            <div className="flex-buttons">
                                                <button
                                                    className="button logout-button"
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        await handleDelete(e, each._id);
                                                        close();
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        close();
                                                    }}
                                                    className="button close-button"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

export default CodeVault
