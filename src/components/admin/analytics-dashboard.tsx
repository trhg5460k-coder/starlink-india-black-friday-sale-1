"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Calendar as CalendarIcon,
  ChevronDown,
  Download,
  FileBarChart,
  Globe,
  Goal,
  Landmark,
  Map,
  ShoppingBag,
  Tablet,
  TrendingUp,
  Users,
  Percent,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

// --- MOCK DATA --- //
const trafficAnalyticsData = {
  pageViews: { value: "1.2M", change: 12.5, period: "vs last month" },
  uniqueVisitors: { value: "850K", change: 8.2, period: "vs last month" },
  sessionDuration: { value: "3m 45s", change: -2.1, period: "vs last month" },
  bounceRate: { value: "40.5%", change: 5.3, period: "vs last month" },
};

const revenueTrendData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
  { name: "Jul", revenue: 7000 },
];

const conversionFunnelData = [
  { name: "Visitors", value: 850000, color: "hsl(var(--chart-1))" },
  { name: "Product Page Views", value: 450500, color: "hsl(var(--chart-2))" },
  { name: "Checkout Initiated", value: 120134, color: "hsl(var(--chart-3))" },
  { name: "Checkout Completed", value: 96107, color: "hsl(var(--chart-4))" },
];

const trafficSourcesData = [
  { name: "Direct", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Organic Search", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Referral", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Social", value: 10, color: "hsl(var(--chart-4))" },
];

const pagePerformanceData = [
  { page: "/", views: "450K", bounceRate: "35%", conversion: "5.2%" },
  { page: "/residential", views: "210K", bounceRate: "42%", conversion: "8.1%" },
  { page: "/roam", views: "150K", bounceRate: "38%", conversion: "6.5%" },
  { page: "/checkout", views: "120K", bounceRate: "25%", conversion: "80.2%" },
];

const geoDistributionData = [
  { state: "California", orders: 18203, revenue: "$2.1M" },
  { state: "Texas", orders: 14560, revenue: "$1.7M" },
  { state: "Florida", orders: 11020, revenue: "$1.3M" },
  { state: "New York", orders: 9850, revenue: "$1.1M" },
  { state: "Washington", orders: 7600, revenue: "$0.9M" },
];

const devicePlanData = [
    { name: 'Standard Kit', Residential: 4000, Roam: 2400 },
    { name: 'High-Perf Kit', Residential: 3000, Roam: 1398 },
    { name: 'Mini Kit', Residential: 900, Roam: 5800 },
];

const revenueMetrics = {
    totalRevenue: { value: "$10.4M", change: 15.2 },
    aov: { value: "$875.50", change: 3.1 },
    revenueByService: [
        { name: "Residential", value: "6.8M" },
        { name: "Roam", value: "3.2M" },
        { name: "Business", value: "0.4M" },
    ]
}

const abTestData = [
    { test: 'New Checkout Button', variantA: '15.2%', variantB: '17.8%', winner: 'B (+17.1%)' },
    { test: 'Hero Section Headline', variantA: '2.8%', variantB: '2.5%', winner: 'A (+12.0%)' },
]

// --- SUB-COMPONENTS --- //

type MetricCardProps = {
  title: string;
  value: string;
  change: number;
  period: string;
  icon: React.ElementType;
};

const MetricCard = ({ title, value, change, period, icon: Icon }: MetricCardProps) => (
  <Card className="bg-card">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <p className="text-xs text-muted-foreground flex items-center">
        <span className={cn("flex items-center gap-1", change > 0 ? "text-green-500" : "text-red-500")}>
          {change > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          {Math.abs(change)}%
        </span>
        <span className="ml-1">{period}</span>
      </p>
    </CardContent>
  </Card>
);

const ConversionFunnel = () => {
    const total = conversionFunnelData[0].value;
    return (
        <Card className="bg-card">
            <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>From initial visit to final purchase</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {conversionFunnelData.map((stage, index) => {
                        const prevStageValue = index > 0 ? conversionFunnelData[index - 1].value : total;
                        const dropOff = index > 0 ? ((prevStageValue - stage.value) / prevStageValue) * 100 : 0;
                        const percentageOfTotal = (stage.value / total) * 100;

                        return (
                            <div key={stage.name} className="relative">
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="font-medium text-foreground">{stage.name}</span>
                                    <span className="text-muted-foreground">{stage.value.toLocaleString()}</span>
                                </div>
                                <div className="h-8 w-full bg-secondary rounded overflow-hidden">
                                    <div style={{ width: `${percentageOfTotal}%`, backgroundColor: stage.color }} className="h-full rounded" />
                                </div>
                                {index > 0 && (
                                    <div className="absolute -top-2.5 right-0 text-xs text-red-500 flex items-center">
                                       <ArrowDownRight className="h-3 w-3 mr-1" /> {dropOff.toFixed(1)}% drop-off
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};


// --- MAIN DASHBOARD COMPONENT --- //

export default function AnalyticsDashboard() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -29),
    to: new Date(),
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-background text-foreground">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal bg-secondary border-border hover:bg-accent",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" className="bg-secondary border-border hover:bg-accent">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Page Views" icon={BookOpen} {...trafficAnalyticsData.pageViews} />
        <MetricCard title="Unique Visitors" icon={Users} {...trafficAnalyticsData.uniqueVisitors} />
        <MetricCard title="Avg. Session Duration" icon={TrendingUp} {...trafficAnalyticsData.sessionDuration} />
        <MetricCard title="Bounce Rate" icon={Percent} {...trafficAnalyticsData.bounceRate} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-card">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Total revenue over the selected period.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={revenueTrendData}>
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))' }}/>
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-2))" fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 bg-card">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>How users are finding the website.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie data={trafficSourcesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} >
                    {trafficSourcesData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))' }}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <ConversionFunnel />
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Page Performance</CardTitle>
            <CardDescription>Key metrics for individual pages.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Bounce Rate</TableHead>
                  <TableHead className="text-right">Conversion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagePerformanceData.map((page) => (
                  <TableRow key={page.page}>
                    <TableCell className="font-medium text-foreground">{page.page}</TableCell>
                    <TableCell className="text-muted-foreground">{page.views}</TableCell>
                    <TableCell className="text-muted-foreground">{page.bounceRate}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{page.conversion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
       <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card">
          <CardHeader>
            <CardTitle>Device Cost vs. Plan Analysis</CardTitle>
            <CardDescription>Breakdown of device selections and plan choices.</CardDescription>
          </CardHeader>
          <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={devicePlanData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))' }}/>
                      <Legend wrapperStyle={{fontSize: "12px"}}/>
                      <Bar dataKey="Residential" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]}/>
                      <Bar dataKey="Roam" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]}/>
                  </BarChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Top states by number of orders.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>State</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {geoDistributionData.map((geo) => (
                  <TableRow key={geo.state}>
                    <TableCell className="font-medium text-foreground">{geo.state}</TableCell>
                    <TableCell className="text-muted-foreground">{geo.orders.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{geo.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
       </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Real-time Users</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold flex items-center">
                    <span className="relative flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    1,287
                </div>
                <p className="text-xs text-muted-foreground">Live users on site</p>
            </CardContent>
        </Card>
        <MetricCard title="Total Revenue" icon={Landmark} value={revenueMetrics.totalRevenue.value} change={revenueMetrics.totalRevenue.change} period="vs last month" />
        <MetricCard title="Average Order Value" icon={ShoppingBag} value={revenueMetrics.aov.value} change={revenueMetrics.aov.change} period="vs last month" />
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Goal Completions</CardTitle>
                <Goal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">+45</div>
                <p className="text-xs text-muted-foreground">+12.1% from last month</p>
            </CardContent>
        </Card>
      </div>

      <Card className="bg-card">
          <CardHeader>
            <CardTitle>A/B Test Results</CardTitle>
            <CardDescription>Performance of ongoing experiments.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test/Experiment</TableHead>
                  <TableHead>Variant A Conversion</TableHead>
                  <TableHead>Variant B Conversion</TableHead>
                  <TableHead className="text-right">Winner (Significance)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {abTestData.map((test) => (
                  <TableRow key={test.test}>
                    <TableCell className="font-medium text-foreground">{test.test}</TableCell>
                    <TableCell className="text-muted-foreground">{test.variantA}</TableCell>
                    <TableCell className="text-muted-foreground">{test.variantB}</TableCell>
                    <TableCell className="text-right font-semibold text-green-500">{test.winner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

    </div>
  );
}