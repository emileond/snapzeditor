import { useCallback, useState } from 'react'
import ReactCodeMirror from '@uiw/react-codemirror'
import { loadLanguage } from '@uiw/codemirror-extensions-langs'
import { themes, themeConfigs } from '../cmThemes'
import stripIndent from 'strip-indent'
import { useDevModeSettings } from '../context/DevModeSettingsContext'

const CodeEditor = () => {
  const { settings } = useDevModeSettings()

  const [codeMirrorValue, setCodeMirrorValue] = useState(
    `
import React from 'react';

const MyComponent = () => {
  return <div>Hello, World!</div>;
};
      
export default MyComponent;
`
  )

  const onCMChange = useCallback((val) => {
    setCodeMirrorValue(val)
  }, [])

  const formatCode = () => setCodeMirrorValue(stripIndent(codeMirrorValue))

  return (
    <div
      className="p-4 text-left"
      style={{
        background: `${themeConfigs[settings?.theme]?.settings?.containerBg}E0`,
      }}
    >
      {/* <Button onClick={formatCode}>Format</Button> */}

      <ReactCodeMirror
        extensions={[loadLanguage(settings?.codeLang)]}
        value={codeMirrorValue}
        theme={themes[settings?.theme]}
        minWidth="480px"
        minHeight="400px"
        height="100%"
        style={{ fontSize: '16px' }}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLineGutter: false,
          highlightSpecialChars: false,
          allowMultipleSelections: false,
          highlightActiveLine: false,
          indentOnInput: true,
        }}
        onChange={onCMChange}
      />
    </div>
  )
}

export default CodeEditor
