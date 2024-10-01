import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  CircleDollarSign,
  Clock,
  Hand,
  Shield,
  Zap,
} from "lucide-react";

const problems = [
  {
    title: "Time Wasted",
    description:
      "Job seekers spend hundreds of hours manually applying to jobs on LinkedIn, resulting in lost time and reduced productivity.",
    icon: Clock,
  },
  {
    title: "Missed Opportunities",
    description:
      "Users often miss out on ideal job postings because they can't consistently monitor job listings or apply quickly enough.",
    icon: CircleDollarSign,
  },
  {
    title: "Managing Applications",
    description:
      "Tracking applied jobs and follow-ups can become overwhelming, leading to unorganized job searches and missed deadlines.",
    icon: Brain,
  },
];

export default function Component() {
  return (
    <Section title="Problem" subtitle="Manually Applying For Jobs Sucks!">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
