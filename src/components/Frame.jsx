import './Frame.css'

const Frame = ({ type, x, y, width, height }) => {
  let frameClass = 'frame'

  switch (type) {
    case 'browser':
      frameClass += ' browser'
      break
    case 'phone':
      frameClass += ' phone'
      break
    default:
      break
  }

  return (
    <div
      className={`absolute border-4 border-${type}`}
      style={{
        left: x + 'px',
        top: y + 'px',
        width: width + 'px',
        height: height + 'px',
      }}
    ></div>
  )
}

export default Frame
