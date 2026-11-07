// Per-route SEO metadata. Also read by vite.config.js to build sitemap.xml,
// so keep this file free of browser/React imports.
export const SITE_NAME = "Selves & Spaces";

export const PAGES = {
  "/": {
    title: "Selves & Spaces | Mental Health Clinic in Adyar, Chennai",
    description:
      "Selves & Spaces is a mental health practice in Adyar, Chennai offering therapy, assessments, workshops and school programmes for children, adolescents, adults and families.",
  },
  "/our-team": {
    title: "Our Team",
    description: "Meet the clinical psychologists and psychotherapists at Selves & Spaces, Chennai.",
  },
  "/what-we-offer": {
    title: "Therapy & Services",
    description: "Individual, child, adolescent and family therapy and other mental health services at Selves & Spaces, Chennai.",
  },
  "/school-mental-health": {
    title: "Mental Health for Schools",
    description: "School partnerships, programmes and training that support student and staff wellbeing.",
  },
  "/assessments": {
    title: "Psychological Assessments",
    description: "Psychological and developmental assessments at Selves & Spaces, Chennai. Book a consultation.",
  },
  "/our-work": {
    title: "Resources & FAQs",
    description: "Resources, forums and answers to common questions about working with Selves & Spaces.",
  },
  "/gallery": {
    title: "Gallery",
    description: "A look at the space, events and work of Selves & Spaces.",
  },
  "/blog": {
    title: "Blog",
    description: "Articles on mental health, therapy and wellbeing from the Selves & Spaces team.",
  },
  "/workshops": {
    title: "Workshops",
    description: "Workshops for parents, professionals and the community on emotional wellbeing and self-awareness.",
  },
  "/first-visit": {
    title: "Your First Visit",
    description: "What to expect at your first session at Selves & Spaces: how booking works, confidentiality and fees policy.",
  },
  "/contact": {
    title: "Book a Session",
    description: "Contact Selves & Spaces in Adyar, Chennai to book a session. Call, WhatsApp, email or send a message.",
  },
  "/partners": {
    title: "Partners",
    description: "Organisations and institutions that partner with Selves & Spaces.",
  },
  "/shop": {
    title: "Shop",
    description: "Games and resources for children and families from Selves & Spaces.",
  },
  "/privacy": {
    title: "Privacy",
    description: "How Selves & Spaces handles the information you share with us.",
  },
  "/orders": { title: "My Orders", description: "", noindex: true },
  "/login": { title: "Sign in", description: "", noindex: true },
  "/checkout": { title: "Checkout", description: "", noindex: true },
  "/order-confirmation": { title: "Order Confirmation", description: "", noindex: true },
};

export const NOT_FOUND = { title: "Page not found", description: "", noindex: true };

export const sitemapPaths = () =>
  Object.entries(PAGES)
    .filter(([, page]) => !page.noindex)
    .map(([path]) => path);
