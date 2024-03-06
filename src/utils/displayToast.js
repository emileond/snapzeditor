import toast from 'react-hot-toast'

export const displayToast = (variant, text) => {
  const style = {
    background: '#1d1d1d',
    color: '#fff',
  }
  switch (variant) {
    case 'success':
      toast.success(text, {
        style,
      })
      break
    case 'error':
      toast.error(text, {
        style,
      })
      break
    default:
      toast(text, {
        style,
      })
      break
  }
}
