import { Accordion, AccordionItem, Link } from '@nextui-org/react'

export default function FAQ() {
  const content = [
    {
      question: 'What is Snaps Editor?',
      answer: (
        <p>
          Snaps Editor is an easy-to-use screenshots editor. It is a one-time
          purchase, meaning you pay once and use forever. No subscriptions, no
          hidden fees.
        </p>
      ),
    },
    {
      question: 'How does the license work?',
      answer: (
        <p>
          The license you purchase is perpetual, it grants you ongoing access to
          the app along with all future updates and features. Each license key
          is valid for activation on a specified number of devices.
        </p>
      ),
    },
    {
      question: 'How do I activate my license?',
      answer: (
        <>
          <p>
            You can activate your license by clicking on the &quot;Activate
            license&quot; button in the user menu in the app, and entering your
            license key.
          </p>
          <p>Here is a video tutorial on how to activate your license:</p>
          <div>
            <iframe
              className="w-full h-[30rem]"
              src="https://komododecks.com/embed/recordings/A4FNyQ0xyoWGJtOVrpzt?onlyRecording=1"
              allowFullScreen
            ></iframe>
          </div>
        </>
      ),
    },
    {
      question: 'Can I use my license on multiple devices?',
      answer: (
        <p>
          Yes, you can use your license on multiple devices. The number of
          devices you can activate depends on the license you purchased.
        </p>
      ),
    },
    {
      question:
        'Can I change my license to a different device after I activated it?',
      answer: (
        <>
          <p>
            Yes, you can change your license to a different device. You can
            deactivate your license from the current device and activate it on a
            different device.
          </p>
          <p>
            To free up a seat, simply go to the License Manager located in the
            user menu in the app.
          </p>
        </>
      ),
    },
    {
      question: 'How can I suggest a feature?',
      answer: (
        <p>
          Suggestions are welcome! If you have a feature you would like to see
          in SnapsEditor, visit our{' '}
          <Link
            href="https://feedback.snapseditor.com"
            isExternal
            showAnchorIcon
          >
            feature request board
          </Link>{' '}
          and submit your idea:
        </p>
      ),
    },
    {
      question: 'How do I get support?',
      answer: (
        <p>
          You can get support by sending an email to{' '}
          <Link href="mailto: hello@snapseditor.com">
            hello@snapseditor.com
          </Link>
        </p>
      ),
    },
  ]

  return (
    <section id="faq" className="py-24 bg-[rgb(15,23,42)] w-full">
      <div className="container max-w-4xl flex flex-col gap-16 m-auto">
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
              <div className="text-left text-slate-300 font-medium pb-8 flex flex-col gap-4">
                {item.answer}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
