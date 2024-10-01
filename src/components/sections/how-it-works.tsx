import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { Download, Search, Sparkles, Upload, Zap } from "lucide-react";

const data = [
  {
    id: 1,
    title: "1. Download Desktop Application",
    content:
      "Download our desktop application for your respective operating system.",
    image: "/download.png",
    icon: <Download className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Set Your Search Criteria",
    content:
      "Enter the desired search criteria neccessary to land your dream job.",
    image: "/lightPreferences.png",
    icon: <Search className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Click Start!",
    content:
      "Get live updates as the application finds and applies to jobs at lightning speed.",
    image: "/dashboardTutorial.png",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="How it works" subtitle="Just 3 steps to get started">
      <Features data={data} />
    </Section>
  );
}
