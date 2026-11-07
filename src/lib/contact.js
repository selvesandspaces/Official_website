export const CONTACT = {
  phoneDisplay: "+91 96771 75894",
  phoneTel: "+919677175894",
  whatsappNumber: "919677175894",
  email: "selvesandspaces@gmail.com",
  instagram: "https://www.instagram.com/selvesandspaces/",
};

export const whatsappUrl = (text = "") =>
  `https://wa.me/${CONTACT.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
