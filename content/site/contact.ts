/** Copy for the contact CTA and the project brief dialog. */

export const contact = {
  email: "info@vyrova.co.uk",
  buttons: {
    primary: "Start a project",
    secondary: "Email us",
    copy: "Copy email address",
    copied: "Copied",
  },
  form: {
    eyebrow: "New project",
    title: "Tell us what you are building.",
    intro:
      "Four questions and a short brief. You get a scoped plan and a price within one business day.",
    close: "Close",
    name: { label: "Your name", placeholder: "Asim Haider" },
    email: { label: "Work email", placeholder: "you@company.com" },
    company: { label: "Company", hint: "optional", placeholder: "Company or product name" },
    kind: { label: "What do you need?" },
    kinds: [
      "Website design and build",
      "Product film or explainer",
      "Brand identity",
      "Video editing",
      "Software or web app",
      "Not sure yet",
    ],
    brief: {
      label: "What is the project about?",
      placeholder:
        "What you are launching, who it is for, and anything that already exists (deck, site, footage).",
    },
    timeline: { label: "Timeline" },
    timelines: ["As soon as possible", "In two to four weeks", "In one to two months", "Just exploring"],
    budget: { label: "Budget range", hint: "optional" },
    budgets: ["Under $2,000", "$2,000 to $5,000", "$5,000 to $10,000", "$10,000 and up", "Not sure yet"],
    submit: "Send the brief",
    sending: "Sending",
    required: "Please fill this in.",
    invalidEmail: "That email does not look right.",
    successTitle: "Brief received.",
    successBody:
      "We read every brief ourselves. Expect a scoped plan and a price from us within one business day.",
    successClose: "Close",
    errorTitle: "That did not send.",
    errorBody: "Send the same details straight to us and we will pick it up from there:",
    mailtoNote: "Your mail app will open with everything filled in. Press send and we have it.",
  },
} as const;
