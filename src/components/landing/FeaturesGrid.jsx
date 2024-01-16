import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'

export default function FeaturesGrid() {
  const featureList = [
    {
      title: 'Quickly beautify your screenshots',
      desc: 'Simply Upload your screenshot, choose a background, and frame your shots for that perfect, professional edge – all in a blink.',
      key: 1,
    },
    {
      title: 'Ready for social media',
      desc: 'Export in any size, with presets for all social platforms. Snaps Editor keeps your content sharp and share-ready!',
      key: 2,
    },
    {
      title: 'Personalize with your brand',
      desc: 'Add custom watermarks. Your brand, your mark - everywhere.',
    },
    {
      title: 'Creative Annotations',
      desc: 'Texts, shapes, stickers - speak louder with creative annotations that tell your story',
      key: 4,
    },
    {
      title: 'Extract Text with Ease',
      desc: `Why type when you can extract? Pull text from images in seconds - a time-saver's dream!`,
      key: 5,
    },
    {
      title: 'High-Res, anywhere, anytime',
      desc: 'Download your images, copy, or save them in the cloud. Your high-resolution masterpieces, accessible everywhere.',
    },
  ]
  return (
    <section id="features" className="py-20 bg-[rgb(15,23,42)] w-full">
      <div className="flex flex-col items-center justify-center gap-6 py-12">
        <h2 className="text-5xl font-bold text-center" data-aos="fade-up">
          Revolutionize your content
        </h2>
        <p className="text-center text-slate-400 text-lg">
          With Snaps Editor, your screenshots transform from simple images to
          eye-catching visuals in seconds.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl m-auto">
        {featureList?.map((feature) => (
          <Card
            key={feature?.title}
            className="p-2 bg-[rgb(30,41,59)]"
            shadow="none"
          >
            <Image src={`/f${feature.key}.gif`} />
            <CardHeader>
              <h3 className="text-lg font-medium text-slate-200">
                {feature?.title}
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-slate-400">{feature?.desc}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  )
}
