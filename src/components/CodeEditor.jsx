import { useRef, useState } from "react";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const flexDirection = useBreakpointValue({ base: "column", md: "row" });

  return (
    <Box>
      <Flex direction={flexDirection} spacing={4}>
        <Box w={{ base: "100%", md: "50%" }}>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: true,
              },
              fontSize: 15,
              formatOnPaste: true,
              tabSize: 4,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              selectOnLineNumbers: true,
              colorDecorators: true,
              wordWrap: "bounded",
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </Flex>
    </Box>
  );
};

export default CodeEditor;
