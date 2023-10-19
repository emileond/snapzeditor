import { Card, CardBody, CardHeader } from '@nextui-org/react'

export default function FeaturesGrid() {
  const featureList = [
    {
      title: 'Feature 1',
      desc: 'asdasdasdasd',
    },
    {
      title: 'Feature 2',
      desc: 'asdasdasdasd',
    },
    {
      title: 'Feature 3',
      desc: 'asdasdasdasd',
    },
    {
      title: 'Feature 4',
      desc: 'asdasdasdasd',
    },
    {
      title: 'Feature 5',
      desc: 'asdasdasdasd',
    },
    {
      title: 'Feature 6',
      desc: 'asdasdasdasd',
    },
  ]
  return (
    <section id="features" className="relative py-20">
      <h2
        className="text-5xl font-bold mb-6 text-center py-12"
        data-aos="fade-up"
      >
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl m-auto">
        {featureList?.map((feature) => (
          <Card
            key={feature?.title}
            isBlurred
            isHoverable
            className="p-2"
            shadow="none"
          >
            <CardHeader>
              <h3>{feature?.title}</h3>
            </CardHeader>
            <CardBody>{feature?.desc}</CardBody>
          </Card>
        ))}
      </div>
    </section>
  )
}
