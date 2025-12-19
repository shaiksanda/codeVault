import { useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css"
import { useCreateSnippetMutation } from "../../services/snippets";

const CreateSnippetPopup = () => {
    const [formData, setFormData] = useState({ title: "", code: "", language: "" })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }
    const [createSnippet, { isLoading }] = useCreateSnippetMutation()

    const handleSubmit = async (e, close) => {
        e.preventDefault()

        try {
            await createSnippet(formData).unwrap();
            toast.success("Snippet Added Successfully!")
            close()
            setFormData({ title: "", language: "", code: "" })
        }
        catch (error) {
            toast.error(error?.data?.message || "Failed to add Snippet!");
        }
    }

    const isValid = Object.values(formData).every(value => value.trim() !== "");
    return (
        <Popup
            contentStyle={{
                border: 'none',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '400px',
            }} modal trigger={<button className="button save-button">Create</button>}>
            {(close) => (
                <div>
                    <h1 className="heading create-snippet-heading">Create Snippet</h1>
                    <form onSubmit={(e) => handleSubmit(e, close)} className="popup-layout">
                        <div className="input-wrapper">
                            <input onChange={handleChange} value={formData.title} name="title" required className="input-element" id="title" type="text" />
                            <label className="label" htmlFor="title">Title</label>
                        </div>

                        <select onChange={handleChange} value={formData.language} name="language" className="input-element">
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
                        <div className="input-wrapper">
                            <textarea onChange={handleChange} value={formData.code} name="code" required className="input-element" id="code" type="text" />
                            <label className="label" htmlFor="code">Code</label>
                        </div>

                        <button disabled={isLoading || !isValid} style={{ width: '100%' }} className="button login-button" type="submit">
                            {isLoading ? (<span color="black" style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                                Processing...
                                <PacmanLoader color="black" size={10} />
                            </span>) : ("Save")}
                        </button>

                    </form>
                </div>
            )}
        </Popup>
    )
}

export default CreateSnippetPopup