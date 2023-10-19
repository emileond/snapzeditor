import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react'

export default function FeaturesGrid() {
  const apps = [
    {
      title: 'Windows',
      desc: 'asdasdasdasd',
    },
    {
      title: 'MacOS',
      desc: 'asdasdasdasd',
    },
    {
      title: 'Linux',
      desc: 'asdasdasdasd',
    },
  ]
  return (
    <section id="download" className="relative py-20">
      <h2
        className="text-5xl font-bold mb-6 text-center py-12"
        data-aos="fade-up"
      >
        Download
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl m-auto">
        {apps?.map((feature) => (
          <Card key={feature?.title} isBlurred className="p-2" shadow="none">
            <CardHeader>
              <h3>{feature?.title}</h3>
            </CardHeader>
            <CardBody>{feature?.desc}</CardBody>
            <CardFooter>
              <Button variant="flat">Download</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
