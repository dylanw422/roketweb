"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  FileText,
  User,
  CircleDollarSign,
  Banknote,
  LoaderCircle,
} from "lucide-react";
import socket from "@/socket";
import {
  findMostAppliedPos,
  findAvgSalary,
  findHighestPaying,
  useJobsQuery,
  usePrefsQuery,
} from "@/lib/utils";
import { cn } from "@/lib/utils";
import Captcha from "../captcha";
import { Job } from "@/lib/utils";

export default function DashboardHome() {
  const [socketJobs, setSocketJobs] = useState<Job[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<string>("");
  const [serviceStatus, setServiceStatus] = useState<string | null>();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const { data: jobs = [] } = useJobsQuery();
  const { data: prefs = {} } = usePrefsQuery();

  const handleApply = () => {
    if (isRunning) {
      socket.emit("stop");
    } else {
      socket.emit("apply", prefs);
    }
  };

  // HANDLE WEB SOCKET
  useEffect(() => {
    socket.on("job", (job) => {
      setSocketJobs((prevJobs) => [job, ...prevJobs]);
    });

    socket.on("started", (msg) => {
      setIsRunning(true);
      console.log(msg);
    });

    socket.on("status", (msg) => {
      setServiceStatus(msg);
    });

    socket.on("stopped", (msg) => {
      setIsRunning(false);
      setServiceStatus(null);
      console.log(msg);
    });

    socket.on("screenshot", (msg) => {
      setCaptcha(msg);
    });

    socket.on("solved", () => {
      setCaptcha(null);
    });

    return () => {
      socket.off("job");
      socket.off("started");
      socket.off("stopped");
      socket.off("status");
      socket.off("screenshot");
      socket.off("solved");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Application Board</h1>
          <button className="text-xs px-4 py-2 bg-muted rounded-md border">
            Download CSV
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<FileText className="h-4 w-4" />}
            title="Total Applications"
            value={jobs?.length + socketJobs.length}
          />
          <StatCard
            icon={<User className="h-4 w-4" />}
            title="Most Applied Role"
            value={findMostAppliedPos(jobs, socketJobs)}
          />
          <StatCard
            icon={<Banknote className="h-4 w-4" />}
            title="Avg. Salary"
            value={`$${findAvgSalary(jobs, socketJobs)}`}
          />
          <StatCard
            icon={<CircleDollarSign className="h-4 w-4" />}
            title="Highest Paying Company"
            value={findHighestPaying(jobs, socketJobs)}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Button
            onClick={() => handleApply()}
            className="w-28 bg-background border border-red-400 text-foreground hover:bg-background/100"
          >
            {isRunning ? (
              <LoaderCircle className="animate-spin w-5 h-5" />
            ) : (
              "Apply Now"
            )}
          </Button>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Filter results..."
              className="pl-8"
              onChange={(e) => setFilterCriteria(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden border border-border mb-24">
          <div className="overflow-x-auto">
            <Table className="table-fixed">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">APP ID</TableHead>
                  <TableHead className="font-semibold">Position</TableHead>
                  <TableHead className="font-semibold">Company</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Salary</TableHead>
                  <TableHead className="font-semibold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...socketJobs, ...jobs]
                  .filter((job: Job) =>
                    Object.values(job).some((value) =>
                      String(value)
                        .toLowerCase()
                        .includes(filterCriteria.toLowerCase()),
                    ),
                  )
                  .map((job: Job, index: number) => {
                    return (
                      <TableRow
                        key={index}
                        className="hover:bg-muted/50 transition-colors duration-200"
                      >
                        <TableCell>{`APP${job.id}`}</TableCell>
                        <TableCell>{job.position}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.type}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                            {job.location}
                          </span>
                        </TableCell>
                        <TableCell>{job.salary}</TableCell>
                        <TableCell className="flex items-center justify-center gap-2">
                          <Button
                            onClick={() => window.open(job.url)}
                            variant="outline"
                            size="sm"
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
        {serviceStatus && <Toast text={serviceStatus} />}
        {captcha && <Captcha image={captcha} />}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function Toast({ text }: { text: string | null | undefined }) {
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 w-[25%] h-min bg-background shadow-black shadow-2xl rounded-md border p-4",
      )}
    >
      <h1 className="text-foreground/50 font-semibold mb-4">Roket Status</h1>
      <p className="text-sm">{text}</p>
    </div>
  );
}
