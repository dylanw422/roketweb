"use client";

import Marquee from "@/components/magicui/marquee";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-primary/20 p-1 py-0.5 font-bold text-primary dark:bg-primary/20 dark:text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      // light styles
      " border border-neutral-200 bg-white",
      // dark styles
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    {...props} // Spread the rest of the props here
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description}
      <div className="flex flex-row py-1">
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
      </div>
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      <Image
        width={40}
        height={40}
        src={img || ""}
        alt={name}
        className="h-10 w-10 rounded-full ring-1 ring-border ring-offset-4"
      />

      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Software Engineer",
    img: "https://randomuser.me/api/portraits/men/91.jpg",
    description: (
      <p>
        Using <strong>Roket</strong> has transformed my job search. I used to
        spend hours applying to roles manually.
        <Highlight>
          Now I’ve landed interviews for top-tier companies with minimal effort.
        </Highlight>{" "}
        A must-have tool for anyone serious about advancing their career.
      </p>
    ),
  },
  {
    name: "Samantha Lee",
    role: "Marketing Manager",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    description: (
      <p>
        With <strong>Roket</strong>, I applied to hundreds of jobs in less than
        a week.
        <Highlight>
          I landed my dream role in half the time it normally takes.
        </Highlight>{" "}
        This app made the job search process seamless and stress-free.
      </p>
    ),
  },
  {
    name: "Raj Patel",
    role: "Senior Software Engineer",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    description: (
      <p>
        As a startup founder, I needed to move quickly in my job search.{" "}
        <strong>Roket</strong> automated everything.
        <Highlight>
          It’s like having a personal assistant that applies to jobs for me.
        </Highlight>{" "}
        I’ve already received multiple offers!
      </p>
    ),
  },
  {
    name: "Emily Chen",
    role: "Product Manager",
    img: "https://randomuser.me/api/portraits/women/83.jpg",
    description: (
      <p>
        <strong>Roket</strong> completely changed the way I apply to jobs. It
        applied to hundreds of positions on LinkedIn for me.
        <Highlight>
          I went from zero responses to landing interviews with top companies.
        </Highlight>{" "}
        Highly recommended for busy professionals!
      </p>
    ),
  },
  {
    name: "Michael Brown",
    role: "Data Scientist",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    description: (
      <p>
        Thanks to <strong>Roket</strong>, I didn’t have to worry about missing
        any job opportunities.
        <Highlight>
          It automatically applied to roles that perfectly matched my skills.
        </Highlight>{" "}
        This app took all the hassle out of job hunting.
      </p>
    ),
  },
  {
    name: "Linda Wu",
    role: "VP of Operations",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    description: (
      <p>
        <strong>Roket</strong> has been a lifesaver during my job search.
        <Highlight>
          It streamlined the entire application process, and I received multiple
          offers within weeks.
        </Highlight>{" "}
        Can’t recommend it enough!
      </p>
    ),
  },
  {
    name: "Carlos Gomez",
    role: "Research & Development Analyst",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    description: (
      <p>
        Integrating <strong>Roket</strong> into my job search strategy saved me
        so much time.
        <Highlight>
          I’m now fielding offers from companies I didn’t even know were hiring!
        </Highlight>{" "}
        An essential tool for anyone serious about finding their dream job.
      </p>
    ),
  },
  {
    name: "Aisha Khan",
    role: "Chief Marketing Officer",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
    description: (
      <p>
        With <strong>Roket</strong>, I no longer had to spend hours searching
        for jobs and applying manually.
        <Highlight>
          My applications were sent out automatically, and the results speak for
          themselves.
        </Highlight>{" "}
        This app is a game-changer!
      </p>
    ),
  },
  {
    name: "Tom Chen",
    role: "IT Director",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    description: (
      <p>
        Implementing <strong>Roket</strong> into my job search process was the
        best decision I made.
        <Highlight>
          It fast-tracked my job applications, helping me secure multiple
          interviews in record time.
        </Highlight>{" "}
        It’s like having a job search assistant.
      </p>
    ),
  },
  {
    name: "Sofia Patel",
    role: "Marketing Consultant",
    img: "https://randomuser.me/api/portraits/women/73.jpg",
    description: (
      <p>
        <strong>Roket</strong> took the stress out of job applications for me.
        <Highlight>
          It applied to relevant roles automatically, and I landed interviews
          with top companies.
        </Highlight>{" "}
        An absolute time-saver for busy professionals.
      </p>
    ),
  },
  {
    name: "Jake Morrison",
    role: "Chief Technology Officer",
    img: "https://randomuser.me/api/portraits/men/25.jpg",
    description: (
      <p>
        Thanks to <strong>Roket</strong>, I was able to apply to jobs
        efficiently without lifting a finger.
        <Highlight>
          My job search was fully automated, and I landed interviews with
          leading tech companies.
        </Highlight>{" "}
        Truly a revolutionary tool.
      </p>
    ),
  },
  {
    name: "Nadia Ali",
    role: "Product Manager",
    img: "https://randomuser.me/api/portraits/women/78.jpg",
    description: (
      <p>
        <strong>Roket</strong> made my job search effortless. It did all the
        work for me.
        <Highlight>
          I received responses from employers faster than ever before.
        </Highlight>{" "}
        Highly recommend it to anyone looking to level up their career.
      </p>
    ),
  },
  {
    name: "Omar Farooq",
    role: "Lead Software Engineer",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
    description: (
      <p>
        <strong>Roket</strong> has been a game-changer for my job search. It
        applied to hundreds of roles on my behalf.
        <Highlight>
          I’ve had more interviews in a month than I’ve had in the past year!
        </Highlight>{" "}
        If you’re serious about landing your next job, this is the tool to use.
      </p>
    ),
  },
];

export default function Testimonials() {
  return (
    <Section
      title="Testimonials"
      subtitle="What our customers are saying"
      className="max-w-8xl"
    >
      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  "[--duration:60s]": i === 1,
                  "[--duration:30s]": i === 2,
                  "[--duration:70s]": i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
      </div>
    </Section>
  );
}
