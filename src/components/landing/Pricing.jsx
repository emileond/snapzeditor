import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from '@nextui-org/react'
import { PiCheckCircleBold } from 'react-icons/pi'

export default function Pricing() {
  const apps = [
    {
      title: 'Personal',
      price: '$39',
      desc: 'Pay-once license for personal use',
      href: 'https://snapseditor.lemonsqueezy.com/checkout/buy/cb592c26-c3ec-4a79-b242-e6d2d5190037?media=0',
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
      price: '$99',
      desc: 'Best for multi-device setups',
      href: 'https://snapseditor.lemonsqueezy.com/checkout/buy/9aadbed6-2db0-4f45-b0a1-2bd86bbc8955?media=0',
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
      price: '$145',
      desc: 'Best for small teams',
      href: 'https://snapseditor.lemonsqueezy.com/checkout/buy/5e5b889a-b7ee-4300-8064-95da43363fef?media=0',
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
    <section id="pricing" className="relative py-20 bg-[rgb(15,23,42)] w-full">
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
              <div className="flex flex-col gap-3">
                {feature?.features?.map((item, i) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="text-success-400">
                      <PiCheckCircleBold fontSize="1.3rem" />
                    </div>
                    <p
                      className={
                        i === 0 ? 'font-bold text-slate-100' : 'text-slate-400'
                      }
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
            <CardFooter>
              <Button
                as={Link}
                href={feature.href}
                fullWidth
                size="lg"
                variant={feature.isFeatured ? 'shadow' : 'ghost'}
                color="secondary"
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
