import type { Metadata } from "next";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { WhatsAppLink } from "@/components/contact/WhatsAppLink";
import { PageHero } from "@/components/sections/PageHero";
import { pageCopy } from "@/content/copy";
import { contactDetails } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: pageCopy.contact.body,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const copy = pageCopy.contact;
  const { email, phone, whatsapp, address } = contactDetails;
  const showDetails = Boolean(email || phone || whatsapp || address);

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title}>
        <p>{copy.body}</p>
      </PageHero>
      <section className="bg-cream py-[clamp(3rem,7vw,5.5rem)] text-espresso">
        <div className={`grid w-full gap-12 px-5 md:px-8 lg:px-12 ${showDetails ? "lg:grid-cols-[minmax(0,1.6fr)_minmax(16rem,0.7fr)]" : ""}`}>
          <EnquiryForm />
          {showDetails ? (
            <aside className="h-fit border-t border-stone pt-6 text-espresso lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-espresso">Contact</p>
              <ul className="mt-4 space-y-3 text-base text-espresso">
                {email ? (
                  <li>
                    <a className="text-espresso underline-offset-4 hover:underline" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </li>
                ) : null}
                {phone ? (
                  <li>
                    <a className="text-espresso underline-offset-4 hover:underline" href={`tel:${phone}`}>
                      {phone}
                    </a>
                  </li>
                ) : null}
                {whatsapp ? (
                  <li>
                    <WhatsAppLink className="text-espresso underline-offset-4 hover:underline">
                      {`WhatsApp ${whatsapp}`}
                    </WhatsAppLink>
                  </li>
                ) : null}
                {address ? <li>{address}</li> : null}
              </ul>
            </aside>
          ) : null}
        </div>
      </section>
    </>
  );
}
