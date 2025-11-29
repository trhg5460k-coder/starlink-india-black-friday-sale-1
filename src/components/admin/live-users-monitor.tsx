"use client";

import { useState, useEffect, useMemo, FC, ReactNode } from "react";
import { Users, MapPin, Laptop, Smartphone, Tablet, ArrowRight, Clock, Eye, LogIn, Power, PowerOff } from "lucide-react";

// --- TYPES AND MOCK DATA ---

interface User {
  id: string;
  currentPage: string;
  timeOnPage: number; // in seconds
  pagesViewed: number;
  entryPage: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  state: string;
  joinTimestamp: number;
  status: 'new' | 'engaged' | 'browsing' | 'idle';
}

const US_STATES = ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA', 'WA', 'AZ', 'MA'];
const PAGES = ['/', '/residential', '/roam', 'https://starlink.com/specifications', '/checkout', '/business', '/map', '/support'];

const generateRandomUser = (): User => {
  const entryPage = PAGES[Math.floor(Math.random() * PAGES.length)];
  return {
    id: `...${Math.random().toString(36).substr(2, 6)}`,
    currentPage: entryPage,
    timeOnPage: Math.floor(Math.random() * 5),
    pagesViewed: 1,
    entryPage: entryPage,
    device: (['Desktop', 'Mobile', 'Tablet'] as const)[Math.floor(Math.random() * 3)],
    state: US_STATES[Math.floor(Math.random() * US_STATES.length)],
    joinTimestamp: Date.now(),
    status: 'new',
  };
};

// --- SUB-COMPONENTS ---

const AnimatedCounter: FC<{ value: number }> = ({ value }) => {
  return (
    <div className="relative h-16 w-full overflow-hidden text-7xl font-bold font-display tracking-tighter">
      <span
        key={value}
        className="absolute inset-0 transition-all duration-300 ease-out animate-in fade-in-0 slide-in-from-bottom-5"
      >
        {value.toLocaleString()}
      </span>
    </div>
  );
};

const MetricCard: FC<{ title: string; icon: ReactNode; children: ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-card border border-border rounded-lg p-6">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold text-muted font-display uppercase">{title}</h3>
      {icon}
    </div>
    {children}
  </div>
);

const PageCard: FC<{ page: string; count: number; total: number }> = ({ page, count, total }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  const isCheckout = page === '/checkout';

  return (
    <div className={`bg-secondary border border-border-subtle rounded-lg p-4 transition-all duration-300 hover:bg-accent/50 ${isCheckout ? 'border-chart-3 ring-2 ring-chart-3/50' : ''}`}>
      <div className="flex justify-between items-baseline mb-1">
        <p className="text-sm font-semibold truncate text-secondary-text" title={page}>{page.replace('https://starlink.com', '')}</p>
        <span className={`font-bold text-lg ${isCheckout ? 'text-blue-400' : 'text-primary'}`}>{count}</span>
      </div>
      <div className="w-full bg-accent rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-500 ease-out ${isCheckout ? 'bg-chart-3' : 'bg-primary'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const GeoBar: FC<{ location: string; count: number; total: number }> = ({ location, count, total }) => {
  const maxCount = total > 0 ? Math.max(...Object.values(total)) : 1;
  const percentage = total > 0 ? (count / total) * 100 : 0;
  
  return (
    <div>
      <div className="flex justify-between items-center text-sm mb-1">
        <span className="font-semibold text-secondary-text flex items-center gap-2"><MapPin size={12} className="text-muted" />{location}</span>
        <span className="text-muted-foreground">{count}</span>
      </div>
      <div className="w-full bg-accent rounded-full h-2">
        <div
          className="bg-chart-2 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const UserJourneyFlow: FC<{ users: User[] }> = ({ users }) => {
  const flows = useMemo(() => {
    const pageFlows: Record<string, Record<string, number>> = {};
    users.forEach(user => {
      if (user.entryPage === user.currentPage) return;
      if (!pageFlows[user.entryPage]) {
        pageFlows[user.entryPage] = {};
      }
      if (!pageFlows[user.entryPage][user.currentPage]) {
        pageFlows[user.entryPage][user.currentPage] = 0;
      }
      pageFlows[user.entryPage][user.currentPage]++;
    });

    return Object.entries(pageFlows)
      .flatMap(([from, toMap]) => Object.entries(toMap).map(([to, count]) => ({ from, to, count })))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [users]);

  if (flows.length === 0) {
    return <p className="text-center text-muted mt-8">Not enough journey data to display.</p>;
  }

  return (
    <div className="space-y-4">
      {flows.map(({ from, to, count }, index) => (
        <div key={index} className="flex items-center justify-between text-sm animate-in fade-in-0 duration-500">
          <span className="font-mono bg-secondary px-2 py-1 rounded-md text-tertiary-text truncate max-w-[120px]">{from.replace('https://starlink.com', '')}</span>
          <div className="flex-1 flex items-center mx-2 min-w-0">
            <div className="flex-1 border-t border-dashed border-border-subtle"></div>
            <span className="bg-card text-xs px-2 text-muted">{count}</span>
            <ArrowRight size={14} className="text-muted" />
          </div>
          <span className="font-mono bg-secondary px-2 py-1 rounded-md text-tertiary-text truncate max-w-[120px]">{to.replace('https://starlink.com', '')}</span>
        </div>
      ))}
    </div>
  );
};

const SessionDetailsTable: FC<{ users: User[] }> = ({ users }) => {
  const getDeviceIcon = (device: User['device']) => {
    switch (device) {
      case 'Desktop': return <Laptop size={16} />;
      case 'Mobile': return <Smartphone size={16} />;
      case 'Tablet': return <Tablet size={16} />;
    }
  };

  const getStatusIndicator = (status: User['status']) => {
    const baseClasses = "w-2.5 h-2.5 rounded-full";
    switch (status) {
      case 'new': return <div className={`${baseClasses} bg-green-500 relative flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></div>;
      case 'engaged': return <div className={`${baseClasses} bg-green-400`} title="Engaged"></div>;
      case 'browsing': return <div className={`${baseClasses} bg-yellow-400`} title="Browsing"></div>;
      case 'idle': return <div className={`${baseClasses} bg-red-500/80`} title="Idle"></div>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-secondary/50 text-muted uppercase tracking-wider">
          <tr>
            <th className="p-4 font-semibold">User</th>
            <th className="p-4 font-semibold">Current Page</th>
            <th className="p-4 font-semibold text-center"><Clock size={14} className="inline-block -mt-0.5" /></th>
            <th className="p-4 font-semibold text-center"><Eye size={14} className="inline-block -mt-0.5" /></th>
            <th className="p-4 font-semibold"><LogIn size={14} className="inline-block -mt-0.5" /> Entry</th>
            <th className="p-4 font-semibold text-center">Device</th>
            <th className="p-4 font-semibold text-center">State</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 15).map((user) => {
            const isNew = user.status === 'new';
            return (
              <tr
                key={user.id}
                className={`border-b border-border-subtle hover:bg-accent/50 transition-colors duration-200 ${isNew ? 'bg-green-500/10' : ''} ${user.currentPage === '/checkout' ? 'bg-chart-3/10' : ''}`}
              >
                <td className="p-4 font-mono flex items-center space-x-3">
                  {getStatusIndicator(user.status)}
                  <span className="text-secondary-text">{user.id}</span>
                </td>
                <td className="p-4 font-semibold truncate max-w-xs text-primary" title={user.currentPage}>{user.currentPage.replace('https://starlink.com', '')}</td>
                <td className="p-4 text-center text-muted-foreground">{Math.floor(user.timeOnPage / 60)}m {user.timeOnPage % 60}s</td>
                <td className="p-4 text-center text-muted-foreground">{user.pagesViewed}</td>
                <td className="p-4 text-muted-foreground truncate max-w-xs" title={user.entryPage}>{user.entryPage.replace('https://starlink.com', '')}</td>
                <td className="p-4 text-muted-foreground">
                  <div className="flex justify-center items-center" title={user.device}>{getDeviceIcon(user.device)}</div>
                </td>
                <td className="p-4 text-center font-semibold text-secondary-text">{user.state}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

// --- MAIN COMPONENT ---

const LiveUsersMonitor: FC = () => {
    const [users, setUsers] = useState<User[]>(() => Array.from({ length: Math.floor(Math.random() * 50) + 120 }, generateRandomUser));
    const [activityFeed, setActivityFeed] = useState<string[]>([]);
    const [isAutoRefreshOn, setIsAutoRefreshOn] = useState(true);

    const totalActiveUsers = users.length;

    const pageCounts = useMemo(() => {
        const counts = PAGES.reduce((acc, page) => ({ ...acc, [page]: 0 }), {} as Record<string, number>);
        users.forEach(user => {
            if (counts[user.currentPage] !== undefined) counts[user.currentPage]++;
        });
        return counts;
    }, [users]);

    const geoDistribution = useMemo(() => {
        const counts = US_STATES.reduce((acc, state) => ({ ...acc, [state]: 0 }), {} as Record<string, number>);
        users.forEach(user => {
            if (counts[user.state] !== undefined) counts[user.state]++;
        });
        return Object.entries(counts).sort(([, a], [, b]) => b - a);
    }, [users]);
    
    useEffect(() => {
        if (!isAutoRefreshOn) return;

        const interval = setInterval(() => {
            setUsers(prevUsers => {
                let newUsers = [...prevUsers];
                let newActivity: string[] = [];

                newUsers = newUsers.map(user => {
                    const updatedUser = { ...user, timeOnPage: user.timeOnPage + 5, status: user.status === 'new' ? 'new' : user.status };
                    if (Math.random() < 0.05) {
                        const newPage = PAGES[Math.floor(Math.random() * PAGES.length)];
                        if (newPage !== updatedUser.currentPage) {
                            updatedUser.currentPage = newPage;
                            updatedUser.pagesViewed++;
                            newActivity.unshift(`User ${updatedUser.id} to ${newPage.replace('https://starlink.com', '')}`);
                        }
                    }
                    if (updatedUser.status === 'new' && (Date.now() - updatedUser.joinTimestamp) > 10000) updatedUser.status = 'browsing';
                    else if (updatedUser.timeOnPage > 180) updatedUser.status = 'idle';
                    else if (updatedUser.timeOnPage > 45) updatedUser.status = 'engaged';
                    return updatedUser;
                });

                if (Math.random() < 0.3) {
                    const newUser = generateRandomUser();
                    newUsers.push(newUser);
                    newActivity.unshift(`✨ New user from ${newUser.state} on ${newUser.entryPage.replace('https://starlink.com', '')}`);
                }

                if (newUsers.length > 50 && Math.random() < 0.15) {
                    const removedUser = newUsers.splice(Math.floor(Math.random() * newUsers.length), 1)[0];
                    if (removedUser) newActivity.unshift(`👋 User ${removedUser.id} left`);
                }

                setActivityFeed(prevFeed => [...newActivity, ...prevFeed].slice(0, 50));
                return newUsers;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoRefreshOn]);

    return (
        <div className="bg-black text-primary-text min-h-screen p-4 sm:p-6 lg:p-8 font-body">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold font-display uppercase tracking-wider">Live User Monitor</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted uppercase font-semibold">Auto-Refresh</span>
                    <button
                        onClick={() => setIsAutoRefreshOn(!isAutoRefreshOn)}
                        className={`p-2 rounded-md transition-colors border ${isAutoRefreshOn ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}
                        aria-label={isAutoRefreshOn ? 'Turn off auto-refresh' : 'Turn on auto-refresh'}
                    >
                        {isAutoRefreshOn ? <Power size={20} /> : <PowerOff size={20} />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <main className="col-span-12 lg:col-span-9 space-y-6">
                    <MetricCard title="Active Users" icon={<Users className="text-muted" />}>
                        <AnimatedCounter value={totalActiveUsers} />
                    </MetricCard>

                    <div className="bg-card border border-border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 font-display uppercase">Active Pages</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Object.entries(pageCounts).map(([page, count]) => <PageCard key={page} page={page} count={count} total={totalActiveUsers} />)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                        <div className="bg-card border border-border rounded-lg p-6 xl:col-span-2">
                            <h2 className="text-xl font-semibold mb-4 font-display uppercase">Geographic Distribution</h2>
                            <div className="space-y-3">
                                {geoDistribution.slice(0, 7).map(([state, count]) => <GeoBar key={state} location={state} count={count} total={totalActiveUsers} />)}
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 xl:col-span-3">
                            <h2 className="text-xl font-semibold mb-4 font-display uppercase">User Journey Flow</h2>
                            <UserJourneyFlow users={users} />
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg">
                        <h2 className="text-xl font-semibold p-6 font-display uppercase">Session Details</h2>
                        <SessionDetailsTable users={users.sort((a, b) => b.joinTimestamp - a.joinTimestamp)} />
                    </div>
                </main>

                <aside className="col-span-12 lg:col-span-3">
                    <div className="bg-card border border-border rounded-lg p-6 h-full sticky top-6">
                        <h2 className="text-xl font-semibold mb-4 font-display uppercase">Live Feed</h2>
                        <ul className="space-y-3 h-[calc(100vh-14rem)] overflow-y-auto pr-2 custom-scrollbar">
                            {activityFeed.map((activity, index) => (
                                <li key={index} className="text-sm text-tertiary-text animate-in fade-in-0 slide-in-from-top-2 duration-500 leading-snug">
                                    {activity}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default LiveUsersMonitor;