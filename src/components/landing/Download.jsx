import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
      desc: 'Supports Windows 10 and above',
      icon: <PiWindowsLogoFill />,
    },
    {
      title: 'MacOS',
      desc: 'Supports MacOS 10.15 and above',
      icon: <PiAppleLogoFill />,
    },
    {
      title: 'Linux',
      desc: 'Supports most distros',
      icon: <PiLinuxLogoFill />,
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
        {apps?.map((feature) => (
          <Card
            key={feature?.title}
            className="p-2 bg-[rgb(30,41,59)]"
            shadow="none"
          >
            <CardHeader>
              <div className="text-4xl mr-2">{feature?.icon}</div>
              <h3>{feature?.title}</h3>
            </CardHeader>
            <CardBody>{feature?.desc}</CardBody>
            <CardFooter>
              <Button color="primary">Download for {feature.title}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
