"use client";
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
import { Search, Users, FileText, CheckCircle, Clock, Pin } from "lucide-react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function DashboardHome({
  jobs,
  prefs,
}: {
  jobs: any;
  prefs: any;
}) {
  const handleApply = () => {
    socket.emit("message", prefs);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Application Board</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Users className="h-4 w-4" />}
            title="Total Applications"
            value="1,234"
          />
          <StatCard
            icon={<FileText className="h-4 w-4" />}
            title="Most Applied Role"
            value="Senior Software Engineer"
          />
          <StatCard
            icon={<CheckCircle className="h-4 w-4" />}
            title="Avg. Salary"
            value="$72,000"
          />
          <StatCard
            icon={<Clock className="h-4 w-4" />}
            title="Highest Paying Role"
            value="Meta Platforms, Inc."
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Button
            onClick={() => handleApply()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Apply Now
          </Button>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Filter results..."
              className="pl-8"
            />
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">
                    Application ID
                  </TableHead>
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
                {jobs.map((job, index) => {
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
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
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
