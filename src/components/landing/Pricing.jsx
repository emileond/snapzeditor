import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react'
import { PiCheckCircleBold } from 'react-icons/pi'

export default function Pricing() {
  const apps = [
    {
      title: 'Personal',
      price: '$39',
      desc: 'Pay-once license for personal use',
      isFeatured: false,
      features: [
        '1 Device',
        'All PRO features',
        '1Gb of cloud storage',
        'Pay once, use forever',
      ],
    },
    {
      title: 'Standard',
      price: '$59',
      desc: 'Best for multi-device setups',
      isFeatured: true,
      features: [
        '3 Devices',
        'All PRO features',
        '1Gb of cloud storage',
        'Pay once, use forever',
      ],
    },
    {
      title: 'Extended',
      price: '$129',
      desc: 'Best for small teams',
      isFeatured: false,
      features: [
        '5 Devices',
        'All PRO features',
        '1Gb of cloud storage',
        'Pay once, use forever',
      ],
    },
  ]
  return (
    <section id="download" className="relative py-20 bg-[rgb(15,23,42)] w-full">
      <div className="flex flex-col items-center justify-center gap-6 py-12">
        <h2 className="text-5xl font-bold text-center">
          Buy once, use forever
        </h2>
        <p className="text-center text-slate-400 text-lg">
          Snaps Editor is a one-time purchase. No subscriptions, no hidden fees.
          Buy the license you need, and use it forever.
        </p>
      </div>
      <div className="grid grid-col md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl m-auto">
        {apps?.map((feature) => (
          <Card
            key={feature?.title}
            className="p-2 bg-[rgb(30,41,59)]"
            shadow="lg"
            style={{
              border: feature.isFeatured ? '1px solid' : 'none',
              borderColor: '#9353d3',
            }}
          >
            <CardHeader>
              <div className="flex flex-col gap-2 items-start">
                <h3>{feature?.title}</h3>
                <span className="text-5xl font-bold">{feature?.price}</span>
                <p className="text-slate-400">{feature?.desc}</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-2 text-slate-300">
                {feature?.features?.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <PiCheckCircleBold fontSize="1.1rem" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                size="lg"
                variant={feature.isFeatured ? 'shadow' : 'flat'}
                color={feature.isFeatured ? 'secondary' : 'default'}
              >
                Get started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <p className="text-slate-400 text-center text-sm py-10">
        All prices are in USD and are automatically converted to your local
        currency. Taxes may apply. <br />
        Invoices are issued by our merchant of record, lemonsqueezy.com
      </p>
    </section>
  )
}