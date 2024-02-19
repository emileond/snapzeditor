import { useState, useEffect } from 'react'

const EditableText = ({
  color,
  size,
  weight,
  initialText,
  onEdit,
  onChange,
}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [text, setText] = useState(initialText)

  const handleDoubleClick = (e) => {
    // Only enter edit mode if not already in edit mode
    if (!isEditMode) {
      setIsEditMode(true)
      onEdit(true)

      // Prevent event from bubbling up to avoid potential conflicts
      e.stopPropagation()
    }
    // When in edit mode, do nothing, allowing for native double-click behavior in textarea
  }

  const handleChange = (e) => {
    setText(e.target.value)
    onChange(e.target.value)
  }

  const handleBlur = () => {
    setIsEditMode(false)
    onEdit(false)
  }

  useEffect(() => {
    if (isEditMode) {
      // Automatically focus the input when entering edit mode
      const inputElement = document.getElementById('editableTextInput')
      inputElement.focus()
      // Place cursor at the end of text
      inputElement.selectionStart = inputElement.value.length
      inputElement.selectionEnd = inputElement.value.length
    }
  }, [isEditMode])

  const fontSizes = {
    xs: '16px',
    sm: '20px',
    md: '32px',
    lg: '48px',
    xl: '64px',
  }

  const textStyle = {
    color: color,
    fontSize: fontSizes[size],
    fontWeight: weight,
  }

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditMode ? (
        <textarea
          id="editableTextInput"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            ...textStyle,
            backgroundColor: 'rgba(0, 0, 0, 0.32)',
            cursor: 'text',
            border: 'none',
            outline: 'none',
            width: '100%', // Ensure textarea fits container
            resize: 'none', // Optional: disable resizing
          }}
        />
      ) : (
        <p style={textStyle}>{text}</p>
      )}
    </div>
  )
}

export default EditableText
