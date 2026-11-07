import { CONTACT } from "../lib/contact";

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="font-display mb-3 text-2xl italic text-ink">{title}</h2>
    <div className="font-body space-y-3 text-[15px] font-light leading-relaxed text-ink/70">{children}</div>
  </section>
);

const Privacy = () => {
  return (
    <main className="bg-cream px-6 pb-24 pt-36 md:px-14 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-body mb-4 text-[10px] uppercase tracking-[0.3em] text-sage">Privacy</p>
        <h1 className="font-display mb-10 text-4xl italic text-ink md:text-5xl">How we handle your information</h1>

        <Section title="What we collect">
          <p>
            When you use the contact form we receive your name, email address and the message you write. When you order
            from the shop we receive your name, email, phone number and delivery address, plus the items you order.
          </p>
        </Section>

        <Section title="How we use it">
          <p>
            We use this information only to reply to your enquiry, schedule a session, or fulfil and support your order.
            Please do not include sensitive clinical details in the contact form; we will discuss those with you in
            session, in confidence.
          </p>
        </Section>

        <Section title="On your device">
          <p>
            Your shop cart and a note that you have seen the first-visit prompt are stored in your browser so they
            persist between visits. You can clear them at any time from your browser settings.
          </p>
        </Section>

        <Section title="Payments">
          <p>Card and UPI payments are handled by our payment provider. We do not see or store your payment details.</p>
        </Section>

        <Section title="Questions or requests">
          <p>
            To ask what we hold about you, or to have it corrected or deleted, write to{" "}
            <a className="underline underline-offset-4" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </Section>
      </div>
    </main>
  );
};

export default Privacy;
