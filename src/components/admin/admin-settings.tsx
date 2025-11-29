"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2, Edit, X, DollarSign, Text, Mail, Users, Server, Shield, FileDown, FileUp, Eye } from "lucide-react";

// Mock shadcn/ui components - assuming these exist in the project structure
// In a real project, these would be imported from "@/components/ui/..."

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link', size?: 'default' | 'sm' | 'lg' | 'icon' }>(({ className, variant = 'default', size, ...props }, ref) => {
    const variantClasses = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
    };
    const sizeClasses = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
    };
    return (
        <button
            ref={ref}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${size ? sizeClasses[size] : sizeClasses.default} ${className}`}
            {...props}
        />
    )
});
Button.displayName = "Button";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
));
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
));
Textarea.displayName = "Textarea";

const SwitchPrimitive = {
    Root: React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { checked?: boolean, onCheckedChange?: (checked: boolean) => void }>(({ className, checked, onCheckedChange, ...props }, ref) => (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onCheckedChange?.(!checked)}
            className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-primary' : 'bg-input'} ${className}`}
            {...props}
            ref={ref}
        >
            <SwitchPrimitive.Thumb checked={checked} />
        </button>
    )),
    Thumb: ({ checked }: { checked?: boolean }) => (
        <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    )
};
const Switch = SwitchPrimitive.Root;
Switch.displayName = "Switch";

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => <h3 className={`font-display text-2xl font-semibold uppercase leading-none tracking-tight ${className}`}>{children}</h3>;
const CardDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const CardFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;

const TabsContext = React.createContext<{ activeTab: string, setActiveTab: (value: string) => void } | null>(null);
const useTabs = () => { const context = React.useContext(TabsContext); if (!context) { throw new Error('useTabs must be used within a Tabs component'); } return context; }
const Tabs = ({ children, defaultValue, className }: { children: React.ReactNode, defaultValue: string, className?: string }) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue);
    const contextValue = React.useMemo(() => ({ activeTab, setActiveTab }), [activeTab]);
    return <TabsContext.Provider value={contextValue}><div className={className}>{children}</div></TabsContext.Provider>
};
const TabsList = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`inline-flex h-auto items-center justify-center rounded-md bg-secondary p-1 text-secondary-foreground flex-wrap ${className}`}>{children}</div>;
const TabsTrigger = ({ children, value, className }: { children: React.ReactNode, value: string, className?: string }) => {
    const {activeTab, setActiveTab} = useTabs();
    return <button onClick={() => setActiveTab(value)} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase ${activeTab === value ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-accent'} ${className}`}>{children}</button>
};
const TabsContent = ({ children, value, className }: { children: React.ReactNode, value: string, className?: string }) => {
    const { activeTab } = useTabs();
    return activeTab === value ? <div className={`mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}>{children}</div> : null;
};

// Form related components
const Form = ({ children, ...props }: React.PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>>) => <form {...props}>{children}</form>;
const FormItem = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`space-y-2 ${className}`}>{children}</div>;
const FormLabel = ({ children, className }: { children: React.ReactNode, className?: string }) => <label className={`text-sm font-medium leading-none text-secondary-text peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>{children}</label>;
const FormControl = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const FormMessage = ({ children }: { children: React.ReactNode }) => <p className="text-sm font-medium text-destructive">{children}</p>;
const FormDescription = ({ children }: { children: React.ReactNode }) => <p className="text-sm text-tertiary-text">{children}</p>;

// Table
const Table = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`relative w-full overflow-auto ${className}`}><table className="w-full caption-bottom text-sm">{children}</table></div>;
const TableHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => <thead className={`[&_tr]:border-b [&_tr]:border-border-subtle ${className}`}>{children}</thead>;
const TableBody = ({ children, className }: { children: React.ReactNode, className?: string }) => <tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>;
const TableRow = ({ children, className }: { children: React.ReactNode, className?: string }) => <tr className={`border-b border-border-subtle transition-colors hover:bg-secondary/50 data-[state=selected]:bg-muted ${className}`}>{children}</tr>;
const TableHead = ({ children, className }: { children: React.ReactNode, className?: string }) => <th className={`h-12 px-4 text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</th>;
const TableCell = ({ children, className }: { children: React.ReactNode, className?: string }) => <td className={`p-4 align-middle text-secondary-text [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>;


// AlertDialog
const AlertDialog = ({ children, open }: { children: React.ReactNode, open: boolean }) => open ? <div className="fixed inset-0 z-50 bg-overlay-dark flex items-center justify-center">{children}</div> : null;
const AlertDialogContent = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`relative z-50 grid w-full max-w-lg gap-4 border border-border-subtle bg-secondary-background p-6 shadow-lg duration-200 sm:rounded-lg ${className}`}>{children}</div>;
const AlertDialogHeader = ({ children }: { children: React.ReactNode }) => <div className="flex flex-col space-y-2 text-center sm:text-left">{children}</div>;
const AlertDialogTitle = ({ children }: { children: React.ReactNode }) => <h2 className="text-lg font-semibold font-display uppercase">{children}</h2>;
const AlertDialogDescription = ({ children }: { children: React.ReactNode }) => <p className="text-sm text-muted-foreground">{children}</p>;
const AlertDialogFooter = ({ children }: { children: React.ReactNode }) => <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">{children}</div>;
const AlertDialogCancel = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <Button variant="outline" {...props} />;
const AlertDialogAction = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <Button {...props} />;

const pricingSchema = z.object({
  deviceCost: z.number().min(0, "Must be a positive number"),
  planPrice: z.number().min(0, "Must be a positive number"),
  discountPercentage: z.number().min(0, "Must be between 0-100").max(100, "Must be between 0-100"),
  blackFridaySale: z.boolean(),
});

const contentSchema = z.object({
    promotionalBanner: z.string().max(200),
    heroText: z.string().max(100),
    heroSubtext: z.string().max(200),
});

const systemSchema = z.object({
    maintenanceMode: z.boolean(),
    analyticsTracking: z.boolean(),
    apiKey: z.string(),
});

type PricingFormValues = z.infer<typeof pricingSchema>;
type ContentFormValues = z.infer<typeof contentSchema>;
type SystemFormValues = z.infer<typeof systemSchema>;

// Mock data
const statesData = [
    { id: 'AL', name: 'Alabama', enabled: true, price: null }, { id: 'CA', name: 'California', enabled: true, price: 120 },
    { id: 'TX', name: 'Texas', enabled: true, price: null }, { id: 'FL', name: 'Florida', enabled: false, price: null },
    { id: 'NY', name: 'New York', enabled: true, price: 125 }, { id: 'WA', name: 'Washington', enabled: true, price: null },
];
const usersData = [
    { id: 1, email: 'admin@starlink.com', role: 'Super Admin' }, { id: 2, email: 'content.manager@starlink.com', role: 'Content Manager' },
    { id: 3, email: 'support.lead@starlink.com', role: 'Support' },
];
const auditLogData = [
    { id: 1, user: 'admin@starlink.com', action: 'Updated Pricing', details: 'Set Black Friday Sale to ON', timestamp: '2024-07-29 10:00:00' },
    { id: 2, user: 'content.manager@starlink.com', action: 'Updated Content', details: 'Changed hero section text', timestamp: '2024-07-28 15:32:10' },
    { id: 3, user: 'admin@starlink.com', action: 'Managed Users', details: 'Added new user support.lead@starlink.com', timestamp: '2024-07-28 09:05:45' },
];

export default function AdminSettings() {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const { register: registerPricing, handleSubmit: handlePricingSubmit, formState: { errors: pricingErrors }, setValue: setPricingValue, watch: watchPricing } = useForm<PricingFormValues>({
    resolver: zodResolver(pricingSchema),
    defaultValues: { deviceCost: 599, planPrice: 110, discountPercentage: 0, blackFridaySale: false },
    mode: "onChange",
  });
  const { register: registerContent, handleSubmit: handleContentSubmit } = useForm<ContentFormValues>({
      resolver: zodResolver(contentSchema),
      defaultValues: { promotionalBanner: 'No upfront Residential hardware cost | Free professional setup', heroText: 'RELIABLE HIGH-SPEED INTERNET FROM SPACE', heroSubtext: 'Select areas only. Up to 400+ Mbps in the U.S.' }
  });
  const { register: registerSystem, handleSubmit: handleSystemSubmit, setValue: setSystemValue, watch: watchSystem } = useForm<SystemFormValues>({
      resolver: zodResolver(systemSchema),
      defaultValues: { maintenanceMode: false, analyticsTracking: true, apiKey: 'pk_live_********************' }
  });

  const onPricingSubmit = (data: PricingFormValues) => console.log('Saving Pricing:', data);
  const onContentSubmit = (data: ContentFormValues) => console.log('Publishing Content:', data);
  const onSystemSubmit = (data: SystemFormValues) => console.log('Saving System Settings:', data);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-background font-body text-primary-text">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
                <h1 className="font-display text-4xl font-bold uppercase tracking-wider">Admin Settings</h1>
                <p className="mt-2 text-tertiary-text">Configure site-wide parameters and manage content.</p>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Export</Button>
                <Button variant="outline"><FileUp className="mr-2 h-4 w-4" /> Import</Button>
            </div>
        </div>

        <Tabs defaultValue="pricing" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:flex md:w-auto">
                <TabsTrigger value="pricing"><DollarSign className="w-4 h-4 mr-2" />Pricing</TabsTrigger>
                <TabsTrigger value="states"><MapIcon className="w-4 h-4 mr-2" />States</TabsTrigger>
                <TabsTrigger value="content"><Text className="w-4 h-4 mr-2" />Content</TabsTrigger>
                <TabsTrigger value="email"><Mail className="w-4 h-4 mr-2" />Emails</TabsTrigger>
                <TabsTrigger value="users"><Users className="w-4 h-4 mr-2" />Users</TabsTrigger>
                <TabsTrigger value="system"><Server className="w-4 h-4 mr-2" />System</TabsTrigger>
                <TabsTrigger value="audit"><Shield className="w-4 h-4 mr-2" />Audit Log</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pricing">
                <Card className="mt-6">
                    <CardHeader><CardTitle>Pricing Management</CardTitle><CardDescription>Edit device costs, plan prices, and promotional sales.</CardDescription></CardHeader>
                    <Form onSubmit={handlePricingSubmit(onPricingSubmit)}>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <FormItem><FormLabel>Device Cost ($)</FormLabel><FormControl><Input type="number" placeholder="599" {...registerPricing("deviceCost", { valueAsNumber: true })} /></FormControl>{pricingErrors.deviceCost && <FormMessage>{pricingErrors.deviceCost.message}</FormMessage>}</FormItem>
                            <FormItem><FormLabel>Default Plan Price ($/mo)</FormLabel><FormControl><Input type="number" placeholder="110" {...registerPricing("planPrice", { valueAsNumber: true })} /></FormControl>{pricingErrors.planPrice && <FormMessage>{pricingErrors.planPrice.message}</FormMessage>}</FormItem>
                            <FormItem className="md:col-span-2"><FormLabel>Discount Percentage (%)</FormLabel><FormControl><Input type="number" placeholder="0" {...registerPricing("discountPercentage", { valueAsNumber: true })} /></FormControl>{pricingErrors.discountPercentage && <FormMessage>{pricingErrors.discountPercentage.message}</FormMessage>}</FormItem>
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border-subtle p-4 md:col-span-2">
                                <div className="space-y-0.5"><FormLabel>Black Friday Sale</FormLabel><FormDescription>Enable a site-wide discount for Black Friday.</FormDescription></div>
                                <FormControl><Switch checked={watchPricing('blackFridaySale')} onCheckedChange={(checked) => setPricingValue('blackFridaySale', checked, { shouldValidate: true })} /></FormControl>
                            </FormItem>
                        </CardContent>
                        <CardFooter className="justify-end space-x-2"><Button variant="outline" type="button">Cancel</Button><Button type="submit">Save Changes</Button></CardFooter>
                    </Form>
                </Card>
            </TabsContent>

            <TabsContent value="states">
                <Card className="mt-6">
                    <CardHeader><CardTitle>State Management</CardTitle><CardDescription>Enable or disable service and set custom pricing for specific states.</CardDescription></CardHeader>
                    <CardContent><Table><TableHeader><TableRow><TableHead>State</TableHead><TableHead>Service Enabled</TableHead><TableHead>Price Override ($/mo)</TableHead></TableRow></TableHeader><TableBody>{statesData.map((state) => (<TableRow key={state.id}><TableCell className="font-medium text-primary-text">{state.name}</TableCell><TableCell><Switch checked={state.enabled} /></TableCell><TableCell><Input type="number" placeholder="Default" defaultValue={state.price ?? ''} className="max-w-[150px]" /></TableCell></TableRow>))}</TableBody></Table></CardContent>
                    <CardFooter className="justify-end space-x-2"><Button variant="outline">Cancel</Button><Button>Save Changes</Button></CardFooter>
                </Card>
            </TabsContent>
            
            <TabsContent value="content">
                <Card className="mt-6">
                    <CardHeader><CardTitle>Content Management</CardTitle><CardDescription>Edit text for key areas of the website.</CardDescription></CardHeader>
                    <Form onSubmit={handleContentSubmit(onContentSubmit)}>
                        <CardContent className="space-y-6"><FormItem><FormLabel>Promotional Banner</FormLabel><FormControl><Textarea placeholder="Enter banner text..." {...registerContent("promotionalBanner")} /></FormControl></FormItem><FormItem><FormLabel>Hero Headline</FormLabel><FormControl><Textarea placeholder="Enter hero headline..." {...registerContent("heroText")} /></FormControl></FormItem><FormItem><FormLabel>Hero Sub-headline</FormLabel><FormControl><Textarea placeholder="Enter hero sub-headline..." {...registerContent("heroSubtext")} /></FormControl></FormItem></CardContent>
                        <CardFooter className="justify-between"><Button variant="outline" type="button"><Eye className="mr-2 h-4 w-4" /> Preview</Button><div className="space-x-2"><Button variant="outline" type="button">Cancel</Button><Button type="submit">Publish Changes</Button></div></CardFooter>
                    </Form>
                </Card>
            </TabsContent>

            <TabsContent value="email">
                <Card className="mt-6">
                    <CardHeader><CardTitle>Email Configuration</CardTitle><CardDescription>Setup email templates. Use {'{{variable}}'} for dynamic content.</CardDescription></CardHeader>
                    <CardContent className="space-y-6"><FormItem><FormLabel>Order Confirmation Email</FormLabel><Textarea placeholder="Your order #{{orderId}} is confirmed!" rows={8} /></FormItem><FormItem><FormLabel>Shipping Notification Email</FormLabel><Textarea placeholder="Good news! Your order #{{orderId}} has shipped." rows={8} /></FormItem></CardContent>
                    <CardFooter className="justify-end space-x-2"><Button variant="outline">Cancel</Button><Button>Save Templates</Button></CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="users">
                <Card className="mt-6">
                    <CardHeader className="flex flex-row items-center justify-between"><div className="space-y-1.5"><CardTitle>Admin User Management</CardTitle><CardDescription>Add, remove, and manage permissions.</CardDescription></div><Button><PlusCircle className="mr-2 h-4 w-4" /> Add User</Button></CardHeader>
                    <CardContent><Table><TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{usersData.map((user) => (<TableRow key={user.id}><TableCell className="font-medium text-primary-text">{user.email}</TableCell><TableCell>{user.role}</TableCell><TableCell className="text-right"><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => setShowConfirm(true)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell></TableRow>))}</TableBody></Table></CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="system">
                <Card className="mt-6">
                    <CardHeader><CardTitle>System Settings</CardTitle><CardDescription>Configure system-level settings and integrations.</CardDescription></CardHeader>
                    <Form onSubmit={handleSystemSubmit(onSystemSubmit)}>
                        <CardContent className="space-y-6">
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border-subtle p-4"><div className="space-y-0.5"><FormLabel>Maintenance Mode</FormLabel><FormDescription>Take the public website offline.</FormDescription></div><FormControl><Switch checked={watchSystem('maintenanceMode')} onCheckedChange={(c) => setSystemValue('maintenanceMode', c)} /></FormControl></FormItem>
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border-subtle p-4"><div className="space-y-0.5"><FormLabel>Analytics Tracking</FormLabel><FormDescription>Enable or disable analytics tracking.</FormDescription></div><FormControl><Switch checked={watchSystem('analyticsTracking')} onCheckedChange={(c) => setSystemValue('analyticsTracking', c)} /></FormControl></FormItem>
                            <FormItem><FormLabel>API Key</FormLabel><FormControl><Input type="password" {...registerSystem("apiKey")} /></FormControl><FormDescription>API key for external integrations.</FormDescription></FormItem>
                        </CardContent>
                        <CardFooter className="justify-end space-x-2"><Button variant="outline" type="button">Cancel</Button><Button type="submit">Save Settings</Button></CardFooter>
                    </Form>
                </Card>
            </TabsContent>
            
            <TabsContent value="audit">
                <Card className="mt-6">
                    <CardHeader><CardTitle>Change History (Audit Log)</CardTitle><CardDescription>All administrative changes made to the site.</CardDescription></CardHeader>
                    <CardContent><Table><TableHeader><TableRow><TableHead>Timestamp</TableHead><TableHead>User</TableHead><TableHead>Action</TableHead><TableHead>Details</TableHead></TableRow></TableHeader><TableBody>{auditLogData.map((log) => (<TableRow key={log.id}><TableCell>{log.timestamp}</TableCell><TableCell className="font-medium text-primary-text">{log.user}</TableCell><TableCell>{log.action}</TableCell><TableCell>{log.details}</TableCell></TableRow>))}</TableBody></Table></CardContent>
                </Card>
            </TabsContent>
        </Tabs>

        <AlertDialog open={showConfirm}>
            <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete the user account and remove their access.</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter><AlertDialogCancel onClick={() => setShowConfirm(false)}>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => setShowConfirm(false)} variant="destructive">Yes, delete user</AlertDialogAction></AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}

const MapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.969 8.516a2 2 0 0 0-1.01-1.8l-6-3.5a2 2 0 0 0-1.918 0l-6 3.5a2 2 0 0 0-1.012 1.8v6.968a2 2 0 0 0 1.01 1.8l6 3.5a2 2 0 0 0 1.918 0l6-3.5a2 2 0 0 0 1.012-1.8z" /><path d="m14 9-2-1-2 1" /><path d="m10 9-2 1" /><path d="m18 13.5-4-2.5-4 2.5" /><path d="m12 11 4 2.5" /></svg>
);