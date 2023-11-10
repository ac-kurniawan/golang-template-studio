import { FC, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { parse } from "@ctrl/golang-template";

export const StudioPage: FC = () => {
  const [paramerterValue, setParameterValue] = useState("{}");
  const [templateValue, setTemplateValue] = useState("");
  const [resultTemplate, setResultTemplate] = useState({ __html: "" });
  useEffect(() => {
    try {
      const result = parse(templateValue, JSON.parse(paramerterValue));
      setResultTemplate({
        __html: result,
      });
    } catch (e) {
      setResultTemplate({
        __html: `ERROR: ${e}`,
      });
    }
  }, [paramerterValue, templateValue]);
  return (
    <div className="grid gap-4 grid-cols-2">
      <div className="grid grid-cols-1">
        <Editor
          height="30vh"
          width={`100%`}
          language={"json"}
          value={paramerterValue}
          theme="vs-dark"
          defaultValue="/* Replace this with your parameters */"
          onChange={(val) => {
            setParameterValue(val || "");
          }}
        />

        <Editor
          height="70vh"
          width={`100%`}
          language={"html"}
          value={templateValue}
          theme="vs-dark"
          defaultValue="/* Replace this with your template */"
          onChange={(val) => {
            setTemplateValue(val || "");
          }}
        />
      </div>
      <div dangerouslySetInnerHTML={resultTemplate} />
    </div>
  );
};
