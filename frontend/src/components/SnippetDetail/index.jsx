import { useParams } from "react-router-dom";
import { useGetSnippetQuery } from "../../services/snippets";
import MainHeader from "../MainHeader";
import { RingLoader } from "react-spinners"
import { toast } from "react-toastify";
import { Copy } from "lucide-react";



import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";


import "./index.css"
const SnippetDetail = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetSnippetQuery(id);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(data.code);
            toast.success("Code copied to clipboard!");
        } catch {
            toast.error("Failed to copy code!");
        }
    };

    return (
        <div>
            <MainHeader />
            <main className="code-vault-hero">
                {isError ? (<div className="flex-layout">
                    <img className="flex-layout-image" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1765946826/error_wrnn2h.webp" alt="" />
                    <h1 className="flex-layout-error">{error?.data?.messae}</h1>
                </div>) : (isLoading ? (
                    <div className="flex-layout">
                        <h1 className="flex-layout-error">Please wait while we fetch data from the server</h1>
                        <RingLoader size={60} color="red" />
                    </div>
                ) : (
                    <>
                        <h1>Title:{data.title}</h1>
                        <p>Language: {data.language}</p>
                        <h4>Code: </h4>
                        <div className="code-box">
                            <button onClick={handleCopy} className="copy-icon">
                                <Copy size={18} />
                            </button>
                            <SyntaxHighlighter showLineNumbers
                                wrapLongLines language={data.language} style={oneDark}>
                                {data.code}
                                customStyle={{ whiteSpace: "pre-wrap" }}
                            </SyntaxHighlighter>
                        </div>


                        <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
                    </>
                ))}

            </main>
        </div>
    );
};

export default SnippetDetail;
