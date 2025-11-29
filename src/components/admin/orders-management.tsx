"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  ChevronDown,
  MoreHorizontal,
  FileDown,
  Search,
  Calendar as CalendarIcon,
  ArrowUpDown,
  Filter,
  Printer,
  Mail,
  Trash2,
  ChevronRight,
  PlusCircle,
  MinusCircle
} from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type OrderStatus = "Pending" | "Confirmed" | "Shipped" | "Delivered";
type ServiceType = "Residential" | "Roam";

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  state: string;
  serviceType: ServiceType;
  plan: string;
  deviceCost: number;
  totalAmount: number;
  status: OrderStatus;
  orderDate: Date;
  shippingAddress: string;
  deviceSerialNumber: string;
  installationDate: Date;
  paymentMethod: string;
  notes: string;
}

// Mock Data Generation
const usStates = ["California", "Texas", "Florida", "New York", "Pennsylvania", "Illinois", "Ohio", "Georgia", "North Carolina", "Michigan"];
const servicePlans = ["Standard", "Priority 40GB", "Priority 1TB"];

const createOrder = (index: number): Order => {
  const statusOptions: OrderStatus[] = ["Pending", "Confirmed", "Shipped", "Delivered"];
  const serviceTypeOptions: ServiceType[] = ["Residential", "Roam"];
  const orderDate = new Date(2023, 10, 28 - index * 3);
  const deviceCost = 599;
  const planCost = index % 3 === 0 ? 120 : (index % 3 === 1 ? 150 : 250);

  return {
    id: `SL-085${934 - index}`,
    customerName: ['Liam Smith', 'Olivia Johnson', 'Noah Williams', 'Emma Brown', 'Oliver Jones', 'Ava Garcia', 'Elijah Miller', 'Charlotte Davis', 'William Rodriguez', 'Sophia Martinez'][index % 10],
    email: `customer${index}@example.com`,
    phone: `(555) 123-45${index.toString().padStart(2, '0')}`,
    state: usStates[index % usStates.length],
    serviceType: serviceTypeOptions[index % 2],
    plan: servicePlans[index % servicePlans.length],
    deviceCost: deviceCost,
    totalAmount: deviceCost + planCost,
    status: statusOptions[index % statusOptions.length],
    orderDate: orderDate,
    shippingAddress: `${123 + index} Main St, Anytown, ${usStates[index % usStates.length]} 12345`,
    deviceSerialNumber: `KIT${847592345 + index}`,
    installationDate: new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    paymentMethod: `Visa **** ${4242 + index}`,
    notes: index % 5 === 0 ? "Customer requested specific delivery instructions." : "",
  };
};
const mockOrders: Order[] = Array.from({ length: 50 }, (_, i) => createOrder(i));

type SortConfig = {
    key: keyof Order;
    direction: 'ascending' | 'descending';
} | null;

export default function OrdersManagement() {
  const [orders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [stateFilter, setStateFilter] = useState("all");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);

  const ROWS_PER_PAGE = 20;

  const handleSort = (key: keyof Order) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const filteredOrders = useMemo(() => {
    let filtered = orders.filter(order => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (order.id.toLowerCase().includes(lowerSearchTerm) || order.customerName.toLowerCase().includes(lowerSearchTerm)) &&
               (stateFilter === "all" || order.state === stateFilter) &&
               (serviceTypeFilter === "all" || order.serviceType === serviceTypeFilter) &&
               (statusFilter === "all" || order.status === statusFilter) &&
               (!date?.from || order.orderDate >= date.from) &&
               (!date?.to || order.orderDate <= date.to);
    });

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [orders, searchTerm, stateFilter, serviceTypeFilter, statusFilter, date, sortConfig]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / ROWS_PER_PAGE);
  const selectedRowCount = Object.values(rowSelection).filter(Boolean).length;

  const handleSelectAll = (checked: boolean) => {
    const newSelection: { [key: string]: boolean } = {};
    if (checked) {
      paginatedOrders.forEach(order => {
        newSelection[order.id] = true;
      });
    }
    setRowSelection(newSelection);
  };
  
  const handleRowSelect = (orderId: string, checked: boolean) => {
    setRowSelection(prev => ({
      ...prev,
      [orderId]: checked,
    }));
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-900/50 text-yellow-300 border-yellow-700/60 hover:bg-yellow-900/70';
      case 'Confirmed': return 'bg-blue-900/50 text-blue-300 border-blue-700/60 hover:bg-blue-900/70';
      case 'Shipped': return 'bg-purple-900/50 text-purple-300 border-purple-700/60 hover:bg-purple-900/70';
      case 'Delivered': return 'bg-green-900/50 text-green-300 border-green-700/60 hover:bg-green-900/70';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const toggleRowExpansion = (orderId: string) => {
    setExpandedRowId(prevId => (prevId === orderId ? null : orderId));
  };
  
  const columns: { key: keyof Order, header: string, sortable: boolean }[] = [
    { key: "id", header: "Order ID", sortable: true },
    { key: "customerName", header: "Customer", sortable: true },
    { key: "email", header: "Contact", sortable: false },
    { key: "state", header: "State", sortable: true },
    { key: "serviceType", header: "Service Type", sortable: true },
    { key: "plan", header: "Plan", sortable: true },
    { key: "deviceCost", header: "Device Cost", sortable:true },
    { key: "totalAmount", header: "Total Amount", sortable: true },
    { key: "status", header: "Status", sortable: true },
    { key: "orderDate", header: "Order Date", sortable: true },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary-text">Orders Management</CardTitle>
          <CardDescription className="text-tertiary-text">Filter, sort, and manage all customer orders.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters Bar */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Order ID or Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-input-border placeholder:text-input-placeholder"
                />
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-input border-input-border hover:bg-accent",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, a")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
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

                <Select value={stateFilter} onValueChange={setStateFilter}>
                  <SelectTrigger className="bg-input border-input-border">
                    <SelectValue placeholder="Filter by State" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All States</SelectItem>
                    {usStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
                  <SelectTrigger className="bg-input border-input-border"><SelectValue placeholder="Service Type" /></SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All Service Types</SelectItem>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Roam">Roam</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-input border-input-border"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {(searchTerm || date || stateFilter !== 'all' || serviceTypeFilter !== 'all' || statusFilter !== 'all') && (
                <div className="flex items-center gap-2">
                    <p className="text-sm text-tertiary-text">Active filters:</p>
                    <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs" onClick={() => {
                        setSearchTerm(""); setDate(undefined); setStateFilter("all"); setServiceTypeFilter("all"); setStatusFilter("all");
                    }}>
                        Clear All <X className="ml-1 h-3 w-3"/>
                    </Button>
                </div>
            )}
          </div>

          {/* Table Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              {selectedRowCount > 0 ? (
                <span>{selectedRowCount} of {paginatedOrders.length} row(s) selected.</span>
              ) : (
                <span>{filteredOrders.length} order(s) found.</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {selectedRowCount > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover border-none">
                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                    <DropdownMenuItem> <Trash2 className="mr-2 h-4 w-4"/> Delete Selected</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export to CSV
              </Button>
            </div>
          </div>
          
          {/* Data Table */}
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead padding="checkbox" className="w-[80px]">
                    <Checkbox
                      checked={selectedRowCount > 0 && selectedRowCount === paginatedOrders.length}
                      onCheckedChange={(value) => handleSelectAll(!!value)}
                      aria-label="Select all"
                    />
                     <span className="sr-only">Expand</span>
                  </TableHead>
                  {columns.map(col => (
                    <TableHead key={col.key}>
                      {col.sortable ? (
                        <Button variant="ghost" onClick={() => handleSort(col.key)} className="px-0 py-2 h-auto hover:bg-transparent">
                          {col.header}
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      ) : col.header}
                    </TableHead>
                  ))}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length ? (
                  paginatedOrders.map((order) => (
                    <React.Fragment key={order.id}>
                    <TableRow key={order.id} data-state={rowSelection[order.id] && "selected"} className="border-border">
                      <TableCell padding="checkbox" className="flex items-center gap-2">
                        <Checkbox
                          checked={rowSelection[order.id]}
                          onCheckedChange={(value) => handleRowSelect(order.id, !!value)}
                          aria-label="Select row"
                        />
                         <Button variant="ghost" size="icon" onClick={() => toggleRowExpansion(order.id)} className="h-8 w-8">
                            {expandedRowId === order.id ? <MinusCircle className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                            <span className="sr-only">Toggle details</span>
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium text-secondary-text">{order.id}</TableCell>
                      <TableCell className="text-secondary-text">{order.customerName}</TableCell>
                      <TableCell className="text-tertiary-text">
                        <div>{order.email}</div>
                        <div className="text-xs">{order.phone}</div>
                      </TableCell>
                      <TableCell className="text-tertiary-text">{order.state}</TableCell>
                      <TableCell className="text-tertiary-text">{order.serviceType}</TableCell>
                      <TableCell className="text-tertiary-text">{order.plan}</TableCell>
                       <TableCell className="text-tertiary-text text-right">${order.deviceCost.toFixed(2)}</TableCell>
                      <TableCell className="text-secondary-text font-semibold text-right">${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeClass(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-tertiary-text">{format(order.orderDate, 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover border-border">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSelectedOrderForModal(order)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href={`mailto:${order.email}`} className="flex items-center w-full">
                                    <Mail className="mr-2 h-4 w-4"/> Contact Customer
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.print()}><Printer className="mr-2 h-4 w-4"/> Print Invoice</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                            <DropdownMenuItem>Set to Pending</DropdownMenuItem>
                            <DropdownMenuItem>Set to Confirmed</DropdownMenuItem>
                            <DropdownMenuItem>Set to Shipped</DropdownMenuItem>
                            <DropdownMenuItem>Set to Delivered</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    {expandedRowId === order.id && (
                        <TableRow className="bg-secondary/50">
                            <TableCell colSpan={columns.length + 2} className="p-0">
                                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                    <div><strong className="text-secondary-text">Shipping Address:</strong><p className="text-tertiary-text">{order.shippingAddress}</p></div>
                                    <div><strong className="text-secondary-text">Device S/N:</strong><p className="text-tertiary-text">{order.deviceSerialNumber}</p></div>
                                    <div><strong className="text-secondary-text">Installation Date:</strong><p className="text-tertiary-text">{format(order.installationDate, 'MMM d, yyyy')}</p></div>
                                    <div><strong className="text-secondary-text">Payment Method:</strong><p className="text-tertiary-text">{order.paymentMethod}</p></div>
                                    {order.notes && <div className="col-span-full"><strong className="text-secondary-text">Notes:</strong><p className="text-tertiary-text">{order.notes}</p></div>}
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length + 2} className="h-24 text-center text-muted-foreground">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>Next</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* View Details Modal */}
      <Dialog open={!!selectedOrderForModal} onOpenChange={(open) => !open && setSelectedOrderForModal(null)}>
        <DialogContent className="sm:max-w-[625px] bg-card border-border">
          {selectedOrderForModal && (
            <>
            <DialogHeader>
              <DialogTitle>Order Details: {selectedOrderForModal.id}</DialogTitle>
              <DialogDescription>
                Full information for the order placed by {selectedOrderForModal.customerName}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 text-sm">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div><strong className="text-secondary-text">Customer:</strong></div><div className="text-tertiary-text">{selectedOrderForModal.customerName}</div>
                    <div><strong className="text-secondary-text">Contact:</strong></div><div className="text-tertiary-text">{selectedOrderForModal.email} / {selectedOrderForModal.phone}</div>
                    <div><strong className="text-secondary-text">Order Date:</strong></div><div className="text-tertiary-text">{format(selectedOrderForModal.orderDate, 'PPP')}</div>
                    <div><strong className="text-secondary-text">Status:</strong></div><div><Badge variant="outline" className={getStatusBadgeClass(selectedOrderForModal.status)}>{selectedOrderForModal.status}</Badge></div>
                </div>
                <hr className="border-border" />
                 <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div><strong className="text-secondary-text">Service Type:</strong></div><div className="text-tertiary-text">{selectedOrderForModal.serviceType}</div>
                    <div><strong className="text-secondary-text">Plan:</strong></div><div className="text-tertiary-text">{selectedOrderForModal.plan}</div>
                    <div><strong className="text-secondary-text">Device Cost:</strong></div><div className="text-tertiary-text">${selectedOrderForModal.deviceCost.toFixed(2)}</div>
                    <div><strong className="text-secondary-text">Total Amount:</strong></div><div className="text-tertiary-text font-bold">${selectedOrderForModal.totalAmount.toFixed(2)}</div>
                </div>
                <hr className="border-border" />
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div><strong className="text-secondary-text">Shipping Address:</strong></div><div className="text-tertiary-text">{selectedOrderForModal.shippingAddress}</div>
                    <div><strong className="text-secondary-text">Device S/N:</strong></div><div className="text-tertiary-text">{selectedOrderForModal.deviceSerialNumber}</div>
                    <div><strong className="text-secondary-text">Scheduled Install:</strong></div><div className="text-tertiary-text">{format(selectedOrderForModal.installationDate, 'PPP')}</div>
                    <div><strong className="text-secondary-text">Payment Method:</strong></div><div className="text-tertiary-text">{selectedOrderForModal.paymentMethod}</div>
                    {selectedOrderForModal.notes && <><div><strong className="text-secondary-text">Notes:</strong></div><div className="text-tertiary-text col-span-1">{selectedOrderForModal.notes}</div></>}
                </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setSelectedOrderForModal(null)}>Close</Button>
            </DialogFooter>
          </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}