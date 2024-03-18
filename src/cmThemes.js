import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'

const themeConfigs = {
  Snaps: {
    dark: 'dark',
    settings: {
      containerBg: '#18181b', // Dark gray
      backgroundImage: '',
      foreground: '#D4D4D8', // zinc-300
      caret: '#F4F4F5', // zinc-100
      selection: '#52525B', // zinc-600
      selectionMatch: '#3F3F46', // zinc-700
      gutterBackground: '#FFFFFF',
      gutterForeground: '#4D4D4C',
      gutterBorder: '#dddddd',
      gutterActiveForeground: '',
      lineHighlight: '#EFEFEF',
    },
    styles: [
      { tag: t.comment, color: '#71717A' }, // zinc-500
      { tag: t.name, color: '#F7B750' }, //yellow-400
      { tag: t.definition(t.typeName), color: '#194a7b' },
      { tag: t.typeName, color: '#194a7b' },
      { tag: t.standard(t.typeName), color: '#194a7b' },
      { tag: t.tagName, color: '#7EE7FC' },
      { tag: t.standard(t.tagName), color: '#F871A0' }, //red-300
      { tag: t.variableName, color: '#AE7EDE' }, //purple-300
      { tag: t.definition(t.variableName), color: '#AE7EDE' }, //purple-300
      { tag: t.function(t.variableName), color: '#45D483' }, //green-400
      { tag: t.propertyName, color: '#F54180' },
      { tag: t.function(t.propertyName), color: '#F54180' },
      { tag: t.definition(t.propertyName), color: '#99C7FB' },
      { tag: t.special(t.propertyName), color: '#6aff1a' },
      { tag: t.attributeName, color: '#F5A524' },
      { tag: t.attributeValue, color: '#FBDBA7' },
      { tag: t.url, color: '#7EE7FC' },
      { tag: t.operator, color: '#45D483' },
      { tag: t.keyword, color: '#F871A0' },
      { tag: t.bool, color: '#99C7FB' },
      { tag: t.number, color: '#99C7FB' },
    ],
  },

  NightOwl: {
    dark: 'dark',
    settings: {
      containerBg: '#011627', // Deep, dark blue
      foreground: '#d6deeb', // Soft, light gray-blue
      caret: '#80A4C2', // Lighter blue for the caret
      selection: '#7E57C2', // A soft purple for selections
      selectionMatch: '#264f78', // Darker blue for matched selections
      gutterBackground: '#011627', // Same as the background
      gutterForeground: '#637777', // Muted teal for gutter text
      gutterBorder: '#204051', // Dark teal for gutter border
      lineHighlight: '#014E6F', // Subtle blue for the current line highlight
    },
    styles: [
      { tag: t.comment, color: '#637777' }, // Muted teal for comments
      { tag: t.name, color: '#82AAFF' }, // Bright blue for names
      { tag: t.definition(t.typeName), color: '#ADDB67' }, // Soft green for type names
      { tag: t.typeName, color: '#ADDB67' },
      { tag: t.standard(t.typeName), color: '#ADDB67' },
      { tag: t.tagName, color: '#7E57C2' }, // Soft purple for tags
      { tag: t.standard(t.tagName), color: '#E99287' }, // Coral for standard tags
      { tag: t.variableName, color: '#F78C6C' }, // Soft orange for variable names
      { tag: t.definition(t.variableName), color: '#F78C6C' },
      { tag: t.function(t.variableName), color: '#C792EA' }, // Soft purple for functions
      { tag: t.propertyName, color: '#FFEB95' }, // Yellow for properties
      { tag: t.function(t.propertyName), color: '#FFEB95' },
      { tag: t.definition(t.propertyName), color: '#82AAFF' }, // Bright blue for property definitions
      { tag: t.special(t.propertyName), color: '#80CBC4' }, // Teal for special properties
      { tag: t.attributeName, color: '#FFCB6B' }, // Bright yellow for attribute names
      { tag: t.attributeValue, color: '#F2FFA6' }, // Light green for attribute values
      { tag: t.url, color: '#FFCA28' }, // Yellow for URLs
      { tag: t.operator, color: '#89DDFF' }, // Sky blue for operators
      { tag: t.keyword, color: '#C792EA' }, // Soft purple for keywords
      { tag: t.bool, color: '#FF5370' }, // Bright red for booleans
      { tag: t.number, color: '#F78C6C' }, // Soft orange for numbers
    ],
  },

  TokyoNight: {
    dark: 'dark',
    settings: {
      containerBg: '#1a1b26', // Deep dark blue almost black
      foreground: '#c0caf5', // Soft, light blue
      caret: '#ff9e64', // Neon orange for the caret
      selection: '#414868', // Dark indigo for selections
      selectionMatch: '#2a2e36', // Darker shade for matched selections
      gutterBackground: '#1a1b26', // Same as the background for consistency
      gutterForeground: '#545c7e', // Muted indigo for gutter text
      gutterBorder: '#3b4261', // Darker indigo for gutter border
      lineHighlight: '#292e42', // Subtle darker blue for the current line highlight
    },
    styles: [
      { tag: t.comment, color: '#565f89' }, // Muted purple for comments
      { tag: t.name, color: '#7dcfff' }, // Sky blue for names
      { tag: t.definition(t.typeName), color: '#f7768e' }, // Soft red for type names
      { tag: t.typeName, color: '#f7768e' },
      { tag: t.standard(t.typeName), color: '#f7768e' },
      { tag: t.tagName, color: '#bb9af7' }, // Lavender for tags
      { tag: t.standard(t.tagName), color: '#ff9e64' }, // Neon orange for standard tags
      { tag: t.variableName, color: '#9ece6a' }, // Soft green for variable names
      { tag: t.definition(t.variableName), color: '#9ece6a' },
      { tag: t.function(t.variableName), color: '#bb9af7' }, // Lavender for functions
      { tag: t.propertyName, color: '#ff9e64' }, // Neon orange for properties
      { tag: t.function(t.propertyName), color: '#ff9e64' },
      { tag: t.definition(t.propertyName), color: '#7dcfff' }, // Sky blue for property definitions
      { tag: t.special(t.propertyName), color: '#e0af68' }, // Muted orange for special properties
      { tag: t.attributeName, color: '#7dcfff' }, // Sky blue for attribute names
      { tag: t.attributeValue, color: '#a9b1d6' }, // Soft blue for attribute values
      { tag: t.url, color: '#ff9e64' }, // Neon orange for URLs
      { tag: t.operator, color: '#89ddff' }, // Bright sky blue for operators
      { tag: t.keyword, color: '#bb9af7' }, // Lavender for keywords
      { tag: t.bool, color: '#ff9e64' }, // Neon orange for booleans
      { tag: t.number, color: '#ff9e64' }, // Neon orange for numbers
    ],
  },

  GreatWave: {
    dark: 'dark',
    settings: {
      containerBg: '#0A192F', // Deep navy blue reminiscent of the deep ocean
      foreground: '#E0E1E3', // Soft white for text, like the foam of the wave
      caret: '#88C0D0', // Light blue, similar to the lighter parts of the wave
      selection: '#3D4C5F', // Darker blue for selections, reflecting the shadows in the water
      selectionMatch: '#2E4057', // Even darker blue for matched selections
      gutterBackground: '#0A192F', // Same as the background for a seamless look
      gutterForeground: '#4C5772', // Muted blue for gutter text, like distant water
      gutterBorder: '#334E68', // Dark blue for gutter border, mirroring the ocean's depth
      lineHighlight: '#12263A', // Subtle highlight for the current line, reminiscent of the night sea
    },
    styles: [
      { tag: t.comment, color: '#607B96' }, // Muted blue for comments, like soft waves
      { tag: t.name, color: '#81A1C1' }, // Lighter blue for names, reflecting the sea's surface
      { tag: t.definition(t.typeName), color: '#8FBCBB' }, // Soft teal for type names, inspired by shallow waters
      { tag: t.typeName, color: '#8FBCBB' },
      { tag: t.standard(t.typeName), color: '#8FBCBB' },
      { tag: t.tagName, color: '#EBCB8B' }, // Sand yellow for tags, like the beaches that witness the waves
      { tag: t.standard(t.tagName), color: '#D08770' }, // Soft orange, reflecting the sun's warmth on the sea
      { tag: t.variableName, color: '#A3BE8C' }, // Foam green for variable names, evoking the foam atop the waves
      { tag: t.definition(t.variableName), color: '#A3BE8C' },
      { tag: t.function(t.variableName), color: '#88C0D0' }, // Light blue for functions, like the wave's crest
      { tag: t.propertyName, color: '#D8DEE9' }, // Bright white for properties, akin to the spray of the sea
      { tag: t.function(t.propertyName), color: '#D8DEE9' },
      { tag: t.definition(t.propertyName), color: '#81A1C1' }, // Reflecting the calm parts of the ocean
      { tag: t.special(t.propertyName), color: '#ECEFF4' }, // Very light blue, like glimpses of light through water
      { tag: t.attributeName, color: '#EBCB8B' }, // Sand yellow for attribute names
      { tag: t.attributeValue, color: '#A3BE8C' }, // Foam green for attribute values
      { tag: t.url, color: '#D08770' }, // Soft orange for URLs, like the setting sun over the sea
      { tag: t.operator, color: '#81A1C1' }, // Light blue for operators, like clear water
      { tag: t.keyword, color: '#EBCB8B' }, // Sand yellow for keywords, evoking beaches
      { tag: t.bool, color: '#D08770' }, // Soft orange for booleans, like the sun's reflection
      { tag: t.number, color: '#B48EAD' }, // Muted purple, like the rare flowers on distant cliffs
    ],
  },

  Rogue: {
    dark: 'dark',
    settings: {
      containerBg: '#2D1E2F', // A deep, warm purple as the base for the cozy atmosphere
      foreground: '#F4DECB', // Soft, warm off-white for main text, like dimmed lights
      caret: '#FFA759', // A soft, glowing orange for the caret, to mimic a cozy firelight
      selection: '#422A38', // A darker, muted purple for selections, adding depth
      selectionMatch: '#563B49', // Even deeper shade for matched selections
      gutterBackground: '#2D1E2F', // Same as the background for consistency
      gutterForeground: '#A58A7C', // Earthy brown for gutter text, grounding the theme
      gutterBorder: '#3E2C3B', // Dark muted purple for gutter border, for subtle contrast
      lineHighlight: '#3A2C35', // Subtle highlight for the current line, cozy and understated
    },
    styles: [
      { tag: t.comment, color: '#988B8E' }, // Muted pink for comments, like whispers in a quiet room
      { tag: t.name, color: '#F4A261' }, // Warm orange for names, adding a spark of creativity
      { tag: t.definition(t.typeName), color: '#E76F51' }, // A deep, warm red for type names, passionate and strong
      { tag: t.typeName, color: '#E76F51' },
      { tag: t.standard(t.typeName), color: '#E76F51' },
      { tag: t.tagName, color: '#FFBA92' }, // Soft peach for tags, gentle and inviting
      { tag: t.standard(t.tagName), color: '#F4A261' }, // Brighter orange for standard tags, like a cozy lantern
      { tag: t.variableName, color: '#F4DECB' }, // The warm off-white for variable names, blending seamlessly
      { tag: t.definition(t.variableName), color: '#F4DECB' },
      { tag: t.function(t.variableName), color: '#E9C46A' }, // Mustard yellow for functions, cheerful and bright
      { tag: t.propertyName, color: '#FFCDB2' }, // Light salmon for properties, warm and welcoming
      { tag: t.function(t.propertyName), color: '#FFCDB2' },
      { tag: t.definition(t.propertyName), color: '#F4A261' }, // Warm orange, for clarity and focus
      { tag: t.special(t.propertyName), color: '#2A9D8F' }, // Teal as a refreshing contrast, like an oasis
      { tag: t.attributeName, color: '#E76F51' }, // Deep warm red for attribute names, drawing attention
      { tag: t.attributeValue, color: '#E9C46A' }, // Mustard yellow for attribute values, for consistency and vibrance
      { tag: t.url, color: '#F4A261' }, // Warm orange for URLs, highlighting paths and links
      { tag: t.operator, color: '#F4DECB' }, // The warm off-white for operators, seamlessly integrating
      { tag: t.keyword, color: '#E76F51' }, // Deep warm red for keywords, grounding yet dynamic
      { tag: t.bool, color: '#E9C46A' }, // Mustard yellow for booleans, signifying truth and logic
      { tag: t.number, color: '#F4A261' }, // Warm orange for numbers, clear and defined
    ],
  },

  linearLight: {
    dark: 'light', // Although it's a light theme, the "dark" property is required
    settings: {
      containerBg: '#f9f8f9', // Pure white for the background, clean and bright
      foreground: '#333333', // Soft black for text, ensuring good readability without harshness
      caret: '#5A67D8', // A soft indigo for the caret, adding a subtle pop of color
      selection: '#E2E8F0', // Very light gray for selections, unobtrusive and clean
      selectionMatch: '#CBD5E0', // Slightly darker shade for matched selections
      gutterBackground: '#f9f8f9', // Same as the background for a seamless look
      gutterForeground: '#A0AEC0', // Muted blue for gutter text, subtle and sophisticated
      gutterBorder: '#EDF2F7', // Very light gray for gutter borders, almost invisible
      lineHighlight: '#FAFBFC', // Almost white, for a barely-there highlight of the current line
    },
    styles: [
      { tag: t.comment, color: '#718096' }, // Slate gray for comments, muted but readable
      { tag: t.name, color: '#2D3748' }, // Darker gray for names, strong and present
      { tag: t.definition(t.typeName), color: '#4A5568' }, // Charcoal gray for type names, adding depth
      { tag: t.typeName, color: '#4A5568' },
      { tag: t.standard(t.typeName), color: '#4A5568' },
      { tag: t.tagName, color: '#E53E3E' }, // Red for tags, vibrant and clear
      { tag: t.standard(t.tagName), color: '#38B2AC' }, // Teal for standard tags, refreshing and modern
      { tag: t.variableName, color: '#2B6CB0' }, // Blue for variable names, trustworthy and stable
      { tag: t.definition(t.variableName), color: '#2B6CB0' },
      { tag: t.function(t.variableName), color: '#9F7AEA' }, // Light purple for functions, imaginative and insightful
      { tag: t.propertyName, color: '#DD6B20' }, // Orange for properties, energetic and engaging
      { tag: t.function(t.propertyName), color: '#DD6B20' },
      { tag: t.definition(t.propertyName), color: '#2B6CB0' }, // Blue to maintain consistency with variable names
      { tag: t.special(t.propertyName), color: '#319795' }, // Cyan for special properties, cool and clear
      { tag: t.attributeName, color: '#E53E3E' }, // Red for attribute names, drawing attention effectively
      { tag: t.attributeValue, color: '#38B2AC' }, // Teal for attribute values, harmonious with tags
      { tag: t.url, color: '#DD6B20' }, // Orange for URLs, highlighting links and references
      { tag: t.operator, color: '#4A5568' }, // Charcoal gray for operators, subtly distinguishing them
      { tag: t.keyword, color: '#5A67D8' }, // Indigo for keywords, striking and significant
      { tag: t.bool, color: '#E53E3E' }, // Red for booleans, denoting truth values distinctly
      { tag: t.number, color: '#38B2AC' }, // Teal for numbers, clear and precise
    ],
  },
}

// Instantiate themes from configurations
const themes = Object.keys(themeConfigs).reduce((acc, themeName) => {
  acc[themeName] = createTheme(themeConfigs[themeName])
  return acc
}, {})

// Export both the configurations and the instantiated themes
export { themeConfigs, themes }
