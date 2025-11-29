"use client";

import * as React from "react";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  ChevronDown,
  Download,
  Filter,
  LayoutDashboard,
  Package,
  PieChart as PieChartIcon,
  Rocket,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Funnel,
  FunnelChart,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
  residential: {
    label: "Residential",
    color: "hsl(var(--chart-1))",
  },
  roam: {
    label: "Roam",
    color: "hsl(var(--chart-2))",
  },
  business: {
    label: "Business",
    color: "hsl(var(--chart-3))",
  },
  mini: {
    label: "Mini",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const ordersOverTimeData = [
  { month: "Jan", orders: 1860 },
  { month: "Feb", orders: 2050 },
  { month: "Mar", orders: 2370 },
  { month: "Apr", orders: 1980 },
  { month: "May", orders: 2540 },
  { month: "Jun", orders: 2390 },
];

const ordersByStateData = [
  { state: "CA", orders: 980 },
  { state: "TX", orders: 850 },
  { state: "FL", orders: 740 },
  { state: "NY", orders: 620 },
  { state: "PA", orders: 510 },
  { state: "IL", orders: 450 },
];

const serviceTypeData = [
  { type: "Residential", value: 45, fill: "var(--color-chart-1)" },
  { type: "Roam", value: 25, fill: "var(--color-chart-2)" },
  { type: "Business", value: 20, fill: "var(--color-chart-3)" },
  { type: "Mini", value: 10, fill: "var(--color-chart-4)" },
];

const conversionFunnelData = [
  { value: 12345, name: "Website Visits", fill: "var(--color-chart-1)" },
  { value: 9876, name: "Viewed Plans", fill: "var(--color-chart-2)" },
  { value: 6543, name: "Address Check", fill: "var(--color-chart-3)" },
  { value: 3210, name: "Added to Cart", fill: "var(--color-chart-4)" },
  { value: 1890, name: "Purchased", fill: "var(--color-chart-5)" },
].map((p, i, a) => ({
  ...p,
  percentage: `${((p.value / (a[i - 1]?.value ?? p.value)) * 100).toFixed(0)}%`,
}));

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <Card className="w-full max-w-sm mx-4 bg-card/50 backdrop-blur-md border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center uppercase tracking-wider text-primary-text">Admin Login</CardTitle>
        <CardDescription className="text-center text-tertiary-text">Enter your credentials to access the dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="email" placeholder="Email" className="bg-input border-input-border placeholder:text-input-placeholder" defaultValue="admin@starlink.com"/>
        <Input type="password" placeholder="Password" className="bg-input border-input-border placeholder:text-input-placeholder" defaultValue="••••••••" />
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary-cta text-primary-cta-text font-bold uppercase tracking-wider hover:bg-white/90" onClick={onLogin}>
          Sign In
        </Button>
      </CardFooter>
    </Card>
  </div>
);

const Sidebar = () => (
  <aside className="hidden lg:block w-64 bg-sidebar text-sidebar-foreground flex-col border-r border-sidebar-border">
    <div className="flex flex-col h-full">
      <div className="flex items-center h-20 px-6 border-b border-sidebar-border">
        <Rocket className="h-7 w-7 text-sidebar-primary" />
        <h1 className="ml-3 text-xl font-bold tracking-widest uppercase">STARLINK</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <a href="#" className="flex items-center px-4 py-2 text-sm font-semibold rounded-md bg-sidebar-accent text-sidebar-primary-foreground">
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-sm font-semibold rounded-md hover:bg-sidebar-accent/50 transition-colors">
          <ShoppingCart className="w-5 h-5 mr-3" />
          Orders
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-sm font-semibold rounded-md hover:bg-sidebar-accent/50 transition-colors">
          <Users className="w-5 h-5 mr-3" />
          Users
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-sm font-semibold rounded-md hover:bg-sidebar-accent/50 transition-colors">
          <BarChart3 className="w-5 h-5 mr-3" />
          Analytics
        </a>
      </nav>
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <a href="#" className="flex items-center px-4 py-2 text-sm font-semibold rounded-md hover:bg-sidebar-accent/50 transition-colors">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </a>
      </div>
    </div>
  </aside>
);

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon }) => (
  <Card className="bg-card/50 backdrop-blur-md border-border transition-all hover:border-white/40">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <div className="flex items-center text-xs text-muted-foreground">
        {isPositive ? (
          <ArrowUp className="w-4 h-4 mr-1 text-green-500" />
        ) : (
          <ArrowDown className="w-4 h-4 mr-1 text-red-500" />
        )}
        <span className={isPositive ? "text-green-500" : "text-red-500"}>{change}</span>
        <span className="ml-1">from last month</span>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!isAuthenticated) return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;

    return (
        <div className="flex min-h-screen w-full bg-background font-body text-primary-text">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <header className="flex items-center h-20 px-6 gap-4 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex-1">
                        <h1 className="text-2xl font-semibold uppercase tracking-wider text-primary-text">Dashboard</h1>
                        <p className="text-sm text-tertiary-text">Welcome back, Admin.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm text-muted-foreground">Real-time</span>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-1 border-secondary-cta-border text-secondary-cta-text bg-transparent hover:bg-secondary">
                                    <Filter className="h-4 w-4" />
                                    <span>Last 30 Days</span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                                <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                                <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" className="gap-2 border-secondary-cta-border text-secondary-cta-text bg-transparent hover:bg-secondary">
                            <Download className="h-4 w-4" />
                            Export Data
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Bell className="h-5 w-5" />
                        </Button>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <MetricCard title="Total Revenue" value="$45,231.89" change="+20.1%" isPositive={true} icon={<Wallet className="h-5 w-5 text-muted-foreground" />} />
                        <MetricCard title="Total Orders" value="+2350" change="+180.1%" isPositive={true} icon={<Package className="h-5 w-5 text-muted-foreground" />} />
                        <MetricCard title="Active Users" value="+573" change="+19%" isPositive={true} icon={<Users className="h-5 w-5 text-muted-foreground" />} />
                        <MetricCard title="Conversion Rate" value="12.5%" change="-2.4%" isPositive={false} icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />} />
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card className="bg-card/50 backdrop-blur-md border-border">
                            <CardHeader>
                                <CardTitle className="uppercase tracking-wider">Orders Over Time</CardTitle>
                                <CardDescription>Line chart showing monthly order volume.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="w-full h-[250px]">
                                    <LineChart data={ordersOverTimeData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                                    <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12}/>
                                    <YAxis tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(value) => `${value / 1000}k`} />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                    <Line dataKey="orders" type="monotone" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 backdrop-blur-md border-border">
                            <CardHeader>
                                <CardTitle className="uppercase tracking-wider">Orders by State</CardTitle>
                                <CardDescription>Top states by order volume.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="w-full h-[250px]">
                                <BarChart data={ordersByStateData} layout="vertical" margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid horizontal={false} stroke="var(--color-border)" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="state" type="category" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} width={40} />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                    <Bar dataKey="orders" fill="var(--color-chart-2)" radius={4} />
                                </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="bg-card/50 backdrop-blur-md border-border">
                            <CardHeader>
                                <CardTitle className="uppercase tracking-wider">Service Type Distribution</CardTitle>
                                <CardDescription>Breakdown of orders by service type.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center">
                                <ChartContainer config={chartConfig} className="w-full h-[250px]">
                                    <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent nameKey="type" hideLabel />} />
                                    <Pie data={serviceTypeData} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={100} innerRadius={60}>
                                        <LabelList
                                            dataKey="type"
                                            className="fill-background"
                                            stroke="none"
                                            fontSize={12}
                                            formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
                                        />
                                    </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 backdrop-blur-md border-border">
                            <CardHeader>
                                <CardTitle className="uppercase tracking-wider">Conversion Funnel</CardTitle>
                                <CardDescription>Customer journey from visit to purchase.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{}} className="w-full h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <FunnelChart data={conversionFunnelData} >
                                    <RechartsTooltip />
                                    <Funnel dataKey="value" nameKey="name" isAnimationActive>
                                        <LabelList
                                        position="center"
                                        fill="#000"
                                        stroke="none"
                                        dataKey="percentage"
                                        className="font-bold"
                                        />
                                    </Funnel>
                                    </FunnelChart>
                                </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;