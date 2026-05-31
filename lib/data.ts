export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Service", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact Us", path: "/contact" },
];

export const services = [
  {
    title: "Non-Ferrous Castings",
    category: "Casting",
    description:
      "Precision casting for aluminum, brass, and copper components with industry-leading quality standards.",
    image: "/images/services/service_casting.jpg",
  },
  {
    title: "Tools, Jigs & Fixtures",
    category: "Manufacturing",
    description:
      "Custom manufacturing aids designed for precision assembly and production efficiency.",
    image: "/images/services/service_jigs.jpg",
  },
  {
    title: "Special Purpose Machines",
    category: "Automation",
    description:
      "Automated solutions engineered for complex industrial processes and workflows.",
    image: "/images/services/service_spm.jpg",
  },
  {
    title: "Fabrication & Erection",
    category: "Structural",
    description:
      "Complete structural fabrication, erection, and commissioning services end-to-end.",
    image: "/images/services/service_fabrication.jpg",
  },
  {
    title: "Prototype Development",
    category: "R&D",
    description:
      "From concept validation to pilot production — rapid, precise prototype development.",
    image: "/images/services/service_prototype.jpg",
  },
];

export const clients = Array.from({ length: 7 }, (_, i) => ({
  src: `/images/clients/client${i + 1}.png`,
  alt: `Client ${i + 1}`,
}));

export const testimonials = [
  {
    author: "Devaraj",
    designation: "Senior Engineer",
    quote:
      "Gait Engineers exceeded our expectations with their precise and timely delivery. Their expertise in SPM solutions is truly remarkable.",
    stars: 4,
  },
  {
    author: "Priya Sharma",
    designation: "Operations Head",
    quote:
      "Their attention to detail and commitment to quality made our casting project a success. Highly professional and reliable team.",
    stars: 5,
  },
  {
    author: "Anil Kumar",
    designation: "Senior Project Manager",
    quote:
      "Gait Engineers exceeded our expectations with their precise and timely delivery. Their expertise in SPM solutions is truly remarkable.",
    stars: 4,
  },
];

export const achievements = [
  {
    title: "Industry Partnerships",
    description:
      "Collaborated with leading industrial, automotive, and aerospace companies, delivering tailored engineering solutions.",
    icon: "Handshake" as const,
  },
  {
    title: "Customized Automation",
    description:
      "Designed and developed innovative solutions to improve automation, enhance operational efficiency, and optimize processes.",
    icon: "Settings2" as const,
  },
  {
    title: "Strict Quality Control",
    description:
      "Adhered to global quality standards, maintaining rigorous quality control throughout the manufacturing cycle.",
    icon: "ShieldCheck" as const,
  },
  {
    title: "Investment in Innovation",
    description:
      "Continuously invested in R&D, smart manufacturing, and future-ready technologies to stay ahead of industry demands.",
    icon: "Lightbulb" as const,
  },
  {
    title: "Cost Effective Solution",
    description:
      "Providing high-quality engineering solutions that optimize resources, reduce operational costs, and deliver maximum value.",
    icon: "TrendingDown" as const,
  },
  {
    title: "Tailored Solution",
    description:
      "Delivering tailored engineering solutions that meet unique client needs, ensuring flexibility and precision across every project.",
    icon: "Layers" as const,
  },
];

export const serviceCategories = [
  {
    name: "Casting Manufacturing",
    subcategories: [
      "Prototype Development",
      "Pilot Lot Development",
      "Low-pressure & Gravity Die Casting",
      "Shell Moulding & Sand Casting",
    ],
  },
  { name: "Special Purpose Machines", subcategories: [] },
  { name: "Tools, Jigs & Fixtures", subcategories: [] },
  { name: "Fabrication, Erection & Commissioning", subcategories: [] },
];

export const capabilities = [
  {
    num: "01",
    title: "Custom Molding & Tooling",
    description:
      "Precision-engineered to match client specifications.",
  },
  {
    num: "02",
    title: "Pilot Lot Development",
    description: "Small-scale production for testing and validation.",
  },
  {
    num: "03",
    title: "Dimensional & Strength Testing",
    description: "Ensuring accuracy before mass production.",
  },
  {
    num: "04",
    title: "Process Optimization",
    description:
      "Identifying the best manufacturing approach for full-scale rollout.",
  },
];

export const contactInfo = {
  phone: "+91-94492-62225",
  email: "ramesh@gaitcorp.in",
  address:
    "#26A, Muneeswara Layout, 5th Cross, Near SEA College Arch, K.R. Puram, Bangalore - 560036",
};
