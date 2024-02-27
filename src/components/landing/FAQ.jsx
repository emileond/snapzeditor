import { Accordion, AccordionItem } from '@nextui-org/react'

export default function FAQ() {
  const content = [
    {
      question: 'What is Snaps Editor?',
      answer:
        'Snaps Editor is an easy-to-use screenshots editor. It is a one-time purchase, meaning you pay once and use forever. No subscriptions, no hidden fees.',
    },
    {
      question: 'How does the license work?',
      answer:
        'The license is a perpetual license. One license key allows you to use the current app version indefinitely. Each license key is valid for a specific number of devices.',
    },
    {
      question: 'How do I activate my license?',
      answer:
        'You can activate your license by clicking on the "Activate license" button in the user menu in the app, and entering your license key.',
    },
    {
      question: 'Can I use my license on multiple devices?',
      answer:
        'Yes, you can use your license on multiple devices. The number of devices you can activate depends on the license you purchased.',
    },
    {
      question:
        'Can I change my license to a different device after I activated it?',
      answer:
        'Yes, you can change your license to a different device. You can deactivate your license from the current device and activate it on a different device. Just go to the License Manager located in the user menu in the app, there you can reset seats on your license, to free up a seat for a different device.',
    },
    {
      question: 'How can I suggest a feature?',
      answer:
        'Suggestions are welcome! If you have a feature you would like to see in SnapsEditor, visit our feature request page and submit your idea: https://snapseditor.canny.io/feature-requests',
    },
    {
      question: 'How do I get support?',
      answer:
        'You can get support by sending an email to support@snapseditor.com',
    },
  ]

  return (
    <section id="faq" className="py-24 bg-[rgb(15,23,42)] w-full">
      <div className="container max-w-3xl flex flex-col gap-16 m-auto">
        <h2 className="text-5xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        <Accordion fullWidth variant="splitted" selectionMode="multiple">
          {content.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.question}
              className="text-left font-semibold"
              style={{
                backgroundColor: 'rgb(30,41,59)',
              }}
            >
              <p className="text-left text-slate-300 font-medium pb-8">
                {item.answer}
              </p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
