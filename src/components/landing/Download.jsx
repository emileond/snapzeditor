import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from '@nextui-org/react'
import {
  PiAppleLogoFill,
  PiLinuxLogoFill,
  PiWindowsLogoFill,
} from 'react-icons/pi'

export default function Download() {
  const apps = [
    {
      title: 'Windows',
      desc: 'Windows 10 and above',
      icon: <PiWindowsLogoFill />,
      href: 'https://snapseditor-app-installers.s3.us-east-2.amazonaws.com/SnapsEditor+Setup+1.0.0-x64.exe',
    },
    {
      title: 'MacOS',
      desc: 'MacOS 10.15 and above',
      icon: <PiAppleLogoFill />,
      href: 'https://snapseditor-app-installers.s3.us-east-2.amazonaws.com/SnapsEditor+Mac+Installer.zip',
    },
    {
      title: 'Linux',
      desc: 'Supports most distros (AppImage)',
      icon: <PiLinuxLogoFill />,
      href: 'https://snapseditor-app-installers.s3.us-east-2.amazonaws.com/SnapsEditor-1.0.0-x86_64.AppImage',
    },
  ]
  return (
    <section id="download" className="py-20 bg-[rgb(15,23,42)] w-full">
      <div className="flex flex-col items-center justify-center gap-6 py-12">
        <h2 className="text-5xl font-bold text-center" data-aos="fade-up">
          Download Snaps Editor
        </h2>
        <p className="text-center text-slate-400 text-lg">
          Available for Windows, MacOS, and Linux.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl m-auto">
        {apps?.map((platform) => (
          <Card
            key={platform?.title}
            className="p-2 bg-[rgb(30,41,59)]"
            shadow="none"
          >
            <CardHeader>
              <div className="text-4xl mr-2">{platform?.icon}</div>
              <h3>{platform?.title}</h3>
            </CardHeader>
            <CardBody>{platform?.desc}</CardBody>
            <CardFooter>
              <Button as={Link} href={platform.href} color="primary">
                Download for {platform.title}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
