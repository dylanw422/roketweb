import { siteConfig } from "@/lib/config";
import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Job {
  id: number;
  position: string;
  company: string;
  type: string;
  location: string;
  salary: string;
  url: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || siteConfig.url}${path}`;
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = absoluteUrl("/og"),
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  return {
    title: {
      template: "%s | " + siteConfig.name,
      default: siteConfig.name,
    },
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    icons: "/favicon.ico",
    metadataBase: new URL(siteConfig.url),
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    ...props,
  };
}

export function formatDate(date: string) {
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

export const convertToYearlySalary = (salary: any) => {
  if (salary.toLowerCase() === "no salary provided") {
    return null; // Ignore if no salary is provided
  }

  // Regex patterns for different salary formats
  const hourlyPattern = /\$([\d,.]+)\/hr/;
  const yearlyPattern = /\$([\d,.]+)K\/yr/;
  const hourlyRangePattern = /\$([\d,.]+)\/hr - \$([\d,.]+)\/hr/;
  const yearlyRangePattern = /\$([\d,.]+)K\/yr - \$([\d,.]+)K\/yr/;

  const hoursPerWeek = 40;
  const weeksPerYear = 52;

  // Handle hourly range
  if (hourlyRangePattern.test(salary)) {
    const match = salary.match(hourlyRangePattern);
    const minHourly = parseFloat(match[1].replace(/,/g, ""));
    const maxHourly = parseFloat(match[2].replace(/,/g, ""));
    return ((minHourly + maxHourly) / 2) * hoursPerWeek * weeksPerYear;
  }

  // Handle hourly single rate
  if (hourlyPattern.test(salary)) {
    const match = salary.match(hourlyPattern);
    const hourlyRate = parseFloat(match[1].replace(/,/g, ""));
    return hourlyRate * hoursPerWeek * weeksPerYear;
  }

  // Handle yearly range
  if (yearlyRangePattern.test(salary)) {
    const match = salary.match(yearlyRangePattern);
    const minYearly = parseFloat(match[1].replace(/,/g, "")) * 1000;
    const maxYearly = parseFloat(match[2].replace(/,/g, "")) * 1000;
    return (minYearly + maxYearly) / 2;
  }

  // Handle yearly single rate
  if (yearlyPattern.test(salary)) {
    const match = salary.match(yearlyPattern);
    return parseFloat(match[1].replace(/,/g, "")) * 1000;
  }

  return null; // Return null for unrecognized formats
};

export const findMostAppliedPos = (jobs: Job[], socketJobs: Job[]) => {
  const posCnt: { [key: string]: number } = {};
  [...jobs, ...socketJobs].forEach((job: any) => {
    const pos = job.position;
    posCnt[pos] = (posCnt[pos] || 0) + 1;
  });

  let mostAppliedPos = null;
  let maxCnt = 0;
  for (const pos in posCnt) {
    if (posCnt[pos] > maxCnt) {
      mostAppliedPos = pos;
      maxCnt = posCnt[pos];
    }
  }
  return mostAppliedPos;
};

export const findAvgSalary = (jobs: Job[], socketJobs: Job[]) => {
  const allJobs = [...jobs, ...socketJobs];

  const validSalaries = allJobs
    .map((job: any) => convertToYearlySalary(job.salary))
    .filter((salary: number | null): salary is number => salary !== null);

  const totalSalary = validSalaries.reduce(
    (sum: number, salary: number) => sum + salary,
    0,
  );

  return Math.round(totalSalary / validSalaries.length).toLocaleString();
};

export const findHighestPaying = (jobs: Job[], socketJobs: Job[]) => {
  let highestPayingCompany: string | null = null;
  let highestSalary = 0;

  [...jobs, ...socketJobs].forEach((job: any) => {
    const yearlySalary = convertToYearlySalary(job.salary); // normalize salary to yearly

    if (yearlySalary !== null && yearlySalary > highestSalary) {
      highestSalary = yearlySalary;
      highestPayingCompany = job.company;
    }
  });

  return highestPayingCompany;
};

export const fetchJobsData = async () => {
  const res = await axios.get("/api/jobs");
  if (!res || !res.data) {
    return [];
  }
  return res.data;
};

export const fetchPrefsData = async () => {
  const res = await axios.get("/api/preferences");
  if (!res || !res.data) {
    return {};
  }
  return res.data;
};

export const useJobsQuery = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobsData,
  });
};

export const usePrefsQuery = () => {
  return useQuery({
    queryKey: ["prefs"],
    queryFn: fetchPrefsData,
  });
};
