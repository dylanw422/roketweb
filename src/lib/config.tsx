import { Icons } from "@/components/icons";
import { X } from "lucide-react";
import { FaDiscord, FaTiktok, FaTwitter } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Roket",
  description: "Automated Job Finder.",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_APP_URL!,
  keywords: ["SaaS", "Template", "Next.js", "React", "Tailwind CSS"],
  links: {
    twitter: "https://twitter.com/magicuidesign",
    discord: "https://discord.gg/qQcfbkbDJF",
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "AI-Powered Automation",
          description:
            "Streamline your application process with intelligent automation.",
          href: "#",
        },
        items: [
          {
            href: "#",
            title: "Task Automation",
            description: "Automate repetitive tasks and save time.",
          },
          {
            href: "#",
            title: "Resume Optimization",
            description: "Get the perfect application EVERY time.",
          },
          {
            href: "#",
            title: "Application Management",
            description: "All your applications in one place.",
          },
        ],
      },
    },
  ],
  pricing: [
    {
      name: "BASIC",
      href: "#",
      price: "$19",
      period: "month",
      yearlyPrice: "$16",
      features: [
        "1 User",
        "5GB Storage",
        "Basic Support",
        "Limited API Access",
        "Standard Analytics",
      ],
      description: "Perfect for individuals and small projects",
      buttonText: "Subscribe",
      isPopular: false,
    },
    {
      name: "PRO",
      href: "#",
      price: "$49",
      period: "month",
      yearlyPrice: "$40",
      features: [
        "5 Users",
        "50GB Storage",
        "Priority Support",
        "Full API Access",
        "Advanced Analytics",
      ],
      description: "Ideal for growing businesses and teams",
      buttonText: "Subscribe",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      href: "#",
      price: "$99",
      period: "month",
      yearlyPrice: "$82",
      features: [
        "Unlimited Users",
        "500GB Storage",
        "24/7 Premium Support",
        "Custom Integrations",
        "AI-Powered Insights",
      ],
      description: "For large-scale operations and high-volume users",
      buttonText: "Subscribe",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "What is Roket?",
      answer: (
        <span>
          Roket is a platform that helps you land your dream job faster than
          ever before. It provides tools and services to streamline the
          application process so that you&apos;re not wasting time and energy.
        </span>
      ),
    },
    {
      question: "How can I get started with Roket?",
      answer: (
        <span>
          You can get started with Roket by purchasing a product key and
          download the Roket app from our website. We also offer tips and
          documentation to help you along the way.
        </span>
      ),
    },
    {
      question: "What types of jobs does Roket support?",
      answer: (
        <span>
          Roket supports a wide range of job types, including but not limited to
          software development, data analysis, and marketing. We continuously
          update our platform to support the latest job types.
        </span>
      ),
    },
    {
      question: "Is Roket suitable for remote workers?",
      answer: (
        <span>
          Yes, acme.ai is designed to be user-friendly for both remote and
          in-person workers. If you&apos;re looking for a remote job, Roket is
          the best solution for you.
        </span>
      ),
    },
    {
      question: "What kind of support does Roket provide?",
      answer: (
        <span>
          Roket provides a Discord community filled with other experienced
          users, tips and tricks, and a dedicated support forum.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#features", text: "Features", icon: null },
        { href: "#pricing", text: "Pricing", icon: null },
        { href: "#", text: "Download", icon: null },
      ],
    },
    {
      title: "Authentication",
      links: [
        {
          href: "/signup",
          text: "Signup",
          icon: null,
        },
        {
          href: "/login",
          text: "Login",
          icon: null,
        },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "TikTok",
          icon: <FaTiktok />,
        },
        {
          href: "#",
          text: "Twitter",
          icon: <FaXTwitter />,
        },
        {
          href: "https://discord.gg/qQcfbkbDJF",
          text: "Discord",
          icon: <FaDiscord />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
