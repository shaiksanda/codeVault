import { useParams } from "react-router-dom";
import { useGetSnippetQuery } from "../../services/snippets";
import MainHeader from "../MainHeader";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SnippetDetail = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetSnippetQuery(id);

    if (isLoading) return <p>Loading snippet…</p>;
    if (isError) return <p>Error fetching snippet</p>;

    const formatCode = (code) =>
        code
            .replace(/;/g, ";\n")
            .replace(/{/g, "{\n")
            .replace(/}/g, "\n}");


    return (
        <div>
            <MainHeader />
            <main className="code-vault-hero">
                <h1>{data.title}</h1>
                <p>Language: {data.language}</p>
                <SyntaxHighlighter showLineNumbers
                    wrapLongLines language={data.language} style={oneDark}>
                    {formatCode(data.code)}
                    customStyle={{ whiteSpace: "pre-wrap" }}
                </SyntaxHighlighter>
                <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
            </main>
        </div>
    );
};

export default SnippetDetail;
