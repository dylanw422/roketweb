import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import {
  BarChart3,
  Bolt,
  Brain,
  FileText,
  LineChart,
  Search,
} from "lucide-react";
import { FaBoltLightning } from "react-icons/fa6";

const data = [
  {
    id: 1,
    title: "Application Management",
    content: "Manage your applications with ease.",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Lightning Fast Applications",
    content: "Apply to jobs quickly and easily.",
    icon: <FaBoltLightning className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Custom Job Search",
    content: "Find the perfect job for you using custom search filters.",
    icon: <Search className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Roket Intelligence",
    content: "Use our AI powered tools to land a job even faster.",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="Features" subtitle="User Flows and Navigational Structures">
      <Features collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  );
}
