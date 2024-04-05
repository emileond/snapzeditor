import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Kbd,
  Divider,
} from '@nextui-org/react'
import SampleImage from '/images/sample.png'
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import {
  PiEyeBold,
  PiEyeClosedBold,
  PiArrowCounterClockwiseBold,
  PiFileArrowUp,
  PiFileImageBold,
} from 'react-icons/pi'

export default function ImageInput({ loadImage, handleUpload, handlePaste }) {
  const [imgVisibility, setImgVisibility] = useState(true)
  const onDrop = useCallback(
    console.log('onDrop'),
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
  })
  return (
    <>
      <div className="flex items-center gap-2">
        <PiFileImageBold fontSize="1.1rem" />
        <h5>File</h5>
      </div>
      <Card
        {...getRootProps()}
        className={`flex flex-col dropzone ${
          isDragActive ? 'bg-[#262a35]' : 'transparent'
        } hover:bg-[#262a35] transition-colors duration-300 ease-in-out cursor-pointer border-2 border-dashed border-content4 rounded-lg`}
      >
        <CardHeader w="100%">
          <div className="flex flex-col w-full justify-center items-center">
            <div className="flex items-center gap-2 text-default-500">
              <PiFileArrowUp fontSize="1.2rem" />
              <p className="text-default-500 text-xs text-center">
                Drop a file or click to upload
              </p>
            </div>
            <p className="text-default-500 text-xs text-center">(JPG or PNG)</p>
          </div>
        </CardHeader>
        <CardBody>
          <input {...getInputProps()} />
          <div className="flex flex-col gap-1">
            <img
              src={SampleImage}
              alt="sample"
              className="w-full h-full max-h-[120px] object-cover rounded-lg"
            />
            <p className="text-default-600 text-sm w-full truncate">
              Filename.png
            </p>
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Button
              size="sm"
              fullWidth
              variant="bordered"
              onClick={handleUpload}
              startContent={<PiArrowCounterClockwiseBold fontSize="1rem" />}
            >
              Replace
            </Button>
            <Button
              size="sm"
              fullWidth
              onClick={() => setImgVisibility(!imgVisibility)}
              variant="bordered"
              startContent={
                imgVisibility ? (
                  <PiEyeClosedBold fontSize="1rem" />
                ) : (
                  <PiEyeBold fontSize="1rem" />
                )
              }
            >
              Hide
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
