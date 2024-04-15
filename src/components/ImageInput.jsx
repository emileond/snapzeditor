import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spinner,
} from '@nextui-org/react'
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import {
  PiArrowCounterClockwiseBold,
  PiFileArrowUp,
  PiFileImageBold,
  PiTrashBold,
} from 'react-icons/pi'
import { displayToast } from '../utils/displayToast'

export default function ImageInput({ onChange, onCancel }) {
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadImage = useCallback((imgSrc, file) => {
    setIsLoading(true)
    const img = new window.Image()
    img.src = imgSrc
    img.onload = () => {
      setImage({
        src: imgSrc,
        file,
      })
      setIsLoading(false)
    }
  }, [])

  const handleUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/jpeg, image/png, image/jpg'
    input.onchange = () => {
      const reader = new FileReader()
      const file = input.files[0]
      reader.readAsDataURL(file)
      reader.onload = () => {
        loadImage(reader.result, file)
      }
    }
    // handle cancel
    input.oncancel = () => {
      return onCancel()
    }
    input.click()
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          loadImage(reader.result, file)
        }
      }
    },
    [loadImage]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: (e) => {
      const errorType = e[0].errors[0].code
      let msg = 'An error occurred'
      switch (errorType) {
        case 'file-invalid-type':
          msg = 'Invalid file type, use JPG or PNG'
          break
        case 'too-many-files':
          msg = 'Only one file is allowed'
          break
        default:
          msg = 'An error occurred'
          break
      }

      displayToast('error', msg)
    },
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
    },
    maxFiles: 1,
  })

  useEffect(() => {
    if (image && onChange) {
      onChange(image)
    }
  }, [image, onChange])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <PiFileImageBold fontSize="1.1rem" />
        <h5>Image</h5>
      </div>
      <Card className="p-[3px]">
        <div
          {...getRootProps()}
          className={`flex flex-col dropzone ${
            isDragActive ? 'bg-[#262a35]' : 'transparent'
          } hover:bg-[#262a35] transition-colors duration-300 ease-in-out cursor-pointer border-2 border-dashed border-content4 rounded-lg`}
        >
          <input {...getInputProps()} />

          <CardHeader w="100%">
            <div className="flex flex-col w-full justify-center items-center">
              <div className="flex items-center gap-2 text-default-500">
                <PiFileArrowUp fontSize="1.2rem" />
                <p className="text-default-500 text-xs text-center">
                  Drop a file or click to upload
                </p>
              </div>
              <p className="text-default-500 text-xs text-center">
                (JPG or PNG)
              </p>
            </div>
          </CardHeader>
          {(image || isLoading) && (
            <CardBody>
              {isLoading && (
                <div className="flex justify-center h-[140px] items-center bg-background/[.3] rounded-lg">
                  <Spinner size="large" color="primary" />
                </div>
              )}
              {image && !isLoading && (
                <div className="flex flex-col gap-1">
                  <img
                    src={image?.src}
                    alt="sample"
                    className="w-full h-full max-h-[140px] object-cover rounded-lg border border-content3"
                  />
                  <p className="text-default-600 text-sm w-full truncate">
                    {image?.file?.name}
                  </p>
                </div>
              )}
            </CardBody>
          )}
          <CardFooter>
            <div className="flex gap-2 w-full">
              {image ? (
                <>
                  <Button
                    size="sm"
                    fullWidth
                    variant="bordered"
                    onClick={handleUpload}
                    startContent={
                      <PiArrowCounterClockwiseBold fontSize="1rem" />
                    }
                  >
                    Replace
                  </Button>
                  <Button
                    size="sm"
                    fullWidth
                    variant="bordered"
                    isIconOnly
                    onClick={() => setImage(null)}
                    startContent={<PiTrashBold fontSize="1rem" />}
                  />
                </>
              ) : (
                <Button
                  size="sm"
                  fullWidth
                  variant="flat"
                  color="secondary"
                  onClick={handleUpload}
                >
                  Upload image
                </Button>
              )}
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}
