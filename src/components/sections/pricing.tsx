"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: "yearly" | "monthly") => void;
  className?: string;
  children: (activeTab: string) => React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  onClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
}

const tiers = [
  {
    name: "Roket",
    price: { yearly: "$99" },
    frequency: { yearly: "lifetime" },
    description: "Perfect for anyone who wants to get hired.",
    features: [
      "One-time payment",
      "Unlimited applications",
      "Lightning fast application processes",
      "Application management",
      "Priority support",
      "Access to Discord community",
    ],
    popular: true,
  },
  {
    name: "Competitors",
    price: { yearly: "$150+ " },
    frequency: { yearly: "month" },
    description: "For those who like wasting money.",
    features: [
      "Recurring payments",
      "Limited monthly applications",
      "No support",
    ],
  },
];

function PricingTier({
  tier,
  billingCycle,
}: {
  tier: (typeof tiers)[0];
  billingCycle: "monthly" | "yearly";
}) {
  return (
    <div
      className={cn(
        "outline-focus transition-transform-background relative z-10 box-border grid h-full w-full grid-rows-[150px_1fr_auto] overflow-hidden rounded-xl bg-background/60 p-3 text-foreground outline-2 outline-offset-2 backdrop-saturate-150 motion-reduce:transition-none dark:border dark:border-neutral-400/15 dark:bg-background/50",
        "shadow-[0px_0px_5px_0px_rgba(0,0,0,0.03),0px_2px_30px_0px_rgba(0,0,0,0.08),0px_0px_1px_0px_rgba(0,0,0,0.3)] dark:shadow-[0px_0px_5px_0px_rgba(255,255,255,0.015),0px_2px_30px_0px_rgba(255,255,255,0.02),0px_0px_1px_0px_rgba(255,255,255,0.3)]",
        tier.popular ? "border border-neutral-900 dark:border-neutral-100" : "",
      )}
    >
      <CardHeader className="h-full border-b p-4">
        <CardTitle className="flex items-center justify-between">
          {tier.name}
        </CardTitle>
        <div className="pt-2 text-3xl font-bold">
          <motion.div
            key={tier.price[billingCycle]}
            initial={{
              opacity: 0,
              x: billingCycle === "yearly" ? -10 : 10,
              filter: "blur(5px)",
            }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {tier.price[billingCycle]}
            <span className="text-sm font-medium text-neutral-600 dark:font-normal dark:text-neutral-300">
              / {tier.frequency[billingCycle]}
            </span>
          </motion.div>
        </div>
        <p className="text-[15px] font-medium text-neutral-600 dark:font-normal dark:text-neutral-300">
          {tier.description}
        </p>
      </CardHeader>

      <CardContent className="flex h-full flex-col justify-start p-4 pt-5">
        <ul className="space-y-2">
          {tier.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center">
              <Check className="mr-2 size-4 text-green-500" />
              <span className="font-medium dark:font-normal">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      {tier.name === "Roket" ? (
        <Button
          size="lg"
          className={cn(
            "mt-4 w-full rounded-lg shadow-none",
            tier.popular
              ? "bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200"
              : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800",
          )}
        >
          Buy Now
        </Button>
      ) : null}
    </div>
  );
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly",
  );

  const handleTabChange = (tab: "yearly" | "monthly") => {
    setBillingCycle(tab);
  };

  return (
    <section id="pricing">
      <div className="mx-auto max-w-6xl p-6 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
            Simple pricing, no catch.
          </h2>

          <p className="mt-6 mb-10 text-balance text-xl leading-8 text-black/80 dark:text-white">
            Our <strong>affordable plan</strong> that&apos;s packed with the
            best features for landing your dream job faster!{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {tiers.map((tier, index) => (
            <PricingTier key={index} tier={tier} billingCycle={billingCycle} />
          ))}
        </div>
      </div>
    </section>
  );
}
