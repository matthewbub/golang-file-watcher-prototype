import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "Do I need to know how to code?",
    answer:
      "Yeah, probably. It's a copy-paste job, so you don't need to be a pro. You'll need to know the basics of Git, Vercel and Supabase at the least. We have a few tutorials to help you get you started.",
  },
  {
    question: "What do you mean by 'I own my data'?",
    answer:
      "Exactly that. We provided you with the source code to the app, and you host it yourself or on Supabase. Either way, this means you'll actually own the server that your data is stored on. We don't have access to it, and neither does anyone else.",
  },
  {
    question: "How does the lifetime updates work?",
    answer:
      "You'll continue to receive updates to the app via GitHub for as long as we're around. We'll also be adding new features and improvements over time. You'll be able to update your app with a single command.",
  },
  {
    question: "What do I need to get started?",
    answer:
      "You'll need a Supabase account, a Vercel account, and a GitHub account. You'll also need to know how to use Git and the command line. We have a few tutorials to help you get you started.",
  },
]

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
