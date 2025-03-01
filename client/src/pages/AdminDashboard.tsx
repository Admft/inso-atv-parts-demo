import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Grid, Paper, Typography, Box, Divider, Card, CardContent,
  LinearProgress, Avatar, List, ListItem, ListItemText, ListItemAvatar, Badge
} from '@mui/material';
import { 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Truck,
  Package, DollarSign, User, Clock, Eye, Coins
} from 'lucide-react';

// Define TypeScript interfaces
interface DashboardData {
  totalSales: number;
  partsSold: number;
  inventoryCount: number;
  cartItems: number;
  pendingOrders: number;
  marketPotential: string;
  profitMargin: number;
  customerSatisfaction: number;
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
    yearToDate: number;
  };
  statistics: {
    visitorsToday: number;
    uniqueUsers: number;
    conversionRate: number;
    averageOrderValue: number;
    returningCustomers: number;
  };
}

interface ChartData {
  salesOverTime: Array<{ name: string; sales: number }>;
  categoryDistribution: Array<{ name: string; value: number }>;
  hourlyTraffic: Array<{ hour: string; visitors: number }>;
  recentOrders: Array<{
    id: string;
    customer: string;
    amount: number;
    status: string;
    timestamp: string;
  }>;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  userActivity: Array<{
    day: string;
    active: number;
    new: number;
  }>;
  regionPerformance: Array<{
    region: string;
    sales: number;
  }>;
}

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalSales: 1527890,
    partsSold: 8742,
    inventoryCount: 3254,
    cartItems: 127,
    pendingOrders: 15,
    marketPotential: 'High',
    profitMargin: 68,
    customerSatisfaction: 87,
    revenue: {
      daily: 24680,
      weekly: 172760,
      monthly: 689550,
      yearToDate: 2475980
    },
    statistics: {
      visitorsToday: 1245,
      uniqueUsers: 856,
      conversionRate: 4.2,
      averageOrderValue: 785.5,
      returningCustomers: 42.8,
    }
  });

  // Sample data for charts
  const [chartData, setChartData] = useState({
    salesOverTime: [
      { name: 'Jan', sales: 65000 },
      { name: 'Feb', sales: 59000 },
      { name: 'Mar', sales: 80000 },
      { name: 'Apr', sales: 81000 },
      { name: 'May', sales: 95000 },
      { name: 'Jun', sales: 110000 },
      { name: 'Jul', sales: 129000 },
      { name: 'Aug', sales: 121000 },
      { name: 'Sep', sales: 142000 },
      { name: 'Oct', sales: 165000 },
      { name: 'Nov', sales: 187000 },
      { name: 'Dec', sales: 189000 }
    ],
    categoryDistribution: [
      { name: 'Electronics', value: 45 },
      { name: 'Automotive', value: 30 },
      { name: 'Apparel', value: 15 },
      { name: 'Other', value: 10 }
    ],
    hourlyTraffic: [
      { hour: '00:00', visitors: 42 },
      { hour: '02:00', visitors: 28 },
      { hour: '04:00', visitors: 15 },
      { hour: '06:00', visitors: 22 },
      { hour: '08:00', visitors: 78 },
      { hour: '10:00', visitors: 145 },
      { hour: '12:00', visitors: 182 },
      { hour: '14:00', visitors: 168 },
      { hour: '16:00', visitors: 142 },
      { hour: '18:00', visitors: 124 },
      { hour: '20:00', visitors: 95 },
      { hour: '22:00', visitors: 65 }
    ],
    recentOrders: [
      { id: 'ORD-7829', customer: 'John Smith', amount: 1245.99, status: 'Completed', timestamp: '2 hours ago' },
      { id: 'ORD-7830', customer: 'Sarah Johnson', amount: 879.50, status: 'Processing', timestamp: '3 hours ago' },
      { id: 'ORD-7831', customer: 'Michael Brown', amount: 2340.75, status: 'Pending', timestamp: '5 hours ago' },
      { id: 'ORD-7832', customer: 'Emma Wilson', amount: 567.25, status: 'Completed', timestamp: '6 hours ago' },
      { id: 'ORD-7833', customer: 'Robert Davis', amount: 1890.00, status: 'Shipping', timestamp: '8 hours ago' }
    ],
    topProducts: [
      { name: 'Quantum Processor X7', sales: 287, revenue: 143500 },
      { name: 'Stealth Radar Module', sales: 184, revenue: 110400 },
      { name: 'Carbon Fiber Shell', sales: 321, revenue: 96300 },
      { name: 'Neural Network Interface', sales: 145, revenue: 87000 },
      { name: 'Tactical Optics System', sales: 201, revenue: 80400 }
    ],
    userActivity: [
      { day: 'Mon', active: 245, new: 54 },
      { day: 'Tue', active: 285, new: 43 },
      { day: 'Wed', active: 310, new: 65 },
      { day: 'Thu', active: 290, new: 47 },
      { day: 'Fri', active: 325, new: 71 },
      { day: 'Sat', active: 271, new: 38 },
      { day: 'Sun', active: 178, new: 24 }
    ],
    regionPerformance: [
      { region: 'North America', sales: 542000 },
      { region: 'Europe', sales: 423000 },
      { region: 'Asia', sales: 387000 },
      { region: 'South America', sales: 127000 },
      { region: 'Africa', sales: 48000 }
    ]
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, you would fetch actual data here
        // For demo, we're using the state initialized above
        console.log('Admin dashboard data loaded');
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#FF5722', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={16} color="#4CAF50" />;
      case 'Processing': return <Clock size={16} color="#2196F3" />;
      case 'Pending': return <AlertTriangle size={16} color="#FF9800" />;
      case 'Shipping': return <Truck size={16} color="#9C27B0" />;
      default: return null;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };

  return (
    <Box sx={{ 
      padding: '24px', 
      background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)', 
      color: '#FFF', 
      borderRadius: '10px',
      minHeight: '100vh'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF5722' }}>
          ADMIN CONTROL CENTER
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Badge badgeContent={3} color="error">
            <AlertTriangle size={24} color="#FF5722" />
          </Badge>
          <Badge badgeContent={7} color="primary">
            <Eye size={24} color="#2196F3" />
          </Badge>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 2, 
            background: 'rgba(255, 87, 34, 0.1)', 
            border: '1px solid #FF5722',
            borderRadius: '8px',
            height: '100%'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Total Revenue</Typography>
              <Coins size={24} color="#FF5722" />
            </Box>
            <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
              {formatCurrency(data.totalSales)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: '#4CAF50' }}>
              <TrendingUp size={16} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>+12.5% from last month</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 2, 
            background: 'rgba(33, 150, 243, 0.1)', 
            border: '1px solid #2196F3',
            borderRadius: '8px',
            height: '100%'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Parts Sold</Typography>
              <Package size={24} color="#2196F3" />
            </Box>
            <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
              {data.partsSold.toLocaleString()}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: '#4CAF50' }}>
              <TrendingUp size={16} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>+8.3% from last month</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 2, 
            background: 'rgba(76, 175, 80, 0.1)', 
            border: '1px solid #4CAF50',
            borderRadius: '8px',
            height: '100%'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Profit Margin</Typography>
              <DollarSign size={24} color="#4CAF50" />
            </Box>
            <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
              {data.profitMargin}%
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: '#F44336' }}>
              <TrendingDown size={16} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>-2.1% from last month</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 2, 
            background: 'rgba(156, 39, 176, 0.1)', 
            border: '1px solid #9C27B0',
            borderRadius: '8px',
            height: '100%'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Customer Satisfaction</Typography>
              <User size={24} color="#9C27B0" />
            </Box>
            <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
              {data.customerSatisfaction}%
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: '#4CAF50' }}>
              <TrendingUp size={16} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>+4.2% from last quarter</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Sales Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            p: 2, 
            background: 'rgba(45, 45, 45, 0.6)', 
            border: '1px solid #444',
            borderRadius: '8px'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Sales Performance (Annual)</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData.salesOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#AAA" />
                <YAxis stroke="#AAA" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#333', border: 'none' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  name="Sales Revenue"
                  stroke="#FF5722" 
                  fill="url(#colorSales)" 
                  activeDot={{ r: 8 }} 
                />
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5722" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF5722" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 2, 
            background: 'rgba(45, 45, 45, 0.6)', 
            border: '1px solid #444',
            borderRadius: '8px',
            height: '100%'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Category Distribution</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => `${value}%`}
                  contentStyle={{ backgroundColor: '#333', border: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 2, 
            background: 'rgba(45, 45, 45, 0.6)', 
            border: '1px solid #444',
            borderRadius: '8px'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Hourly Traffic</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chartData.hourlyTraffic}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="hour" stroke="#AAA" />
                <YAxis stroke="#AAA" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  name="Visitors"
                  stroke="#00C49F" 
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 2, 
            background: 'rgba(45, 45, 45, 0.6)', 
            border: '1px solid #444',
            borderRadius: '8px'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Region Performance</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData.regionPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="region" stroke="#AAA" />
                <YAxis stroke="#AAA" />
                <Tooltip 
                  formatter={(value: any) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#333', border: 'none' }}
                />
                <Bar 
                  dataKey="sales" 
                  name="Sales Revenue"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.regionPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 2, 
            background: 'rgba(45, 45, 45, 0.6)', 
            border: '1px solid #444',
            borderRadius: '8px'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>User Activity</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData.userActivity} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="day" stroke="#AAA" />
                <YAxis stroke="#AAA" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                <Legend />
                <Bar dataKey="active" name="Active Users" stackId="a" fill="#FF5722" />
                <Bar dataKey="new" name="New Users" stackId="a" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Third Row */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 2, 
            background: 'rgba(45, 45, 45, 0.6)', 
            border: '1px solid #444',
            borderRadius: '8px'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Orders</Typography>
            <List sx={{ width: '100%' }}>
              {chartData.recentOrders.map((order) => (
                <ListItem key={order.id} sx={{ 
                  borderBottom: '1px solid #444',
                  '&:last-child': { borderBottom: 'none' }
                }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: order.status === 'Completed' ? '#4CAF50' : 
                                        order.status === 'Processing' ? '#2196F3' : 
                                        order.status === 'Pending' ? '#FF9800' : '#9C27B0' }}>
                      {order.customer.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {order.id} - {order.customer}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {formatCurrency(order.amount)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getStatusIcon(order.status)}
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {order.status}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          {order.timestamp}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 2, 
            background: 'rgba(45, 45, 45, 0.6)', 
            border: '1px solid #444',
            borderRadius: '8px'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Top Selling Products</Typography>
            <List sx={{ width: '100%' }}>
              {chartData.topProducts.map((product, index) => (
                <Box key={index} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(product.revenue)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" color="textSecondary">
                      {product.sales} units sold
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {formatCurrency(product.revenue / product.sales)} per unit
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={index === 0 ? 100 : (product.revenue / chartData.topProducts[0].revenue) * 100} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: COLORS[index % COLORS.length]
                      }
                    }}
                  />
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Fourth Row - Stats Grid */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6} md={2}>
          <Card sx={{ background: 'rgba(33, 33, 33, 0.8)', border: '1px solid #444' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Visitors Today</Typography>
              <Typography variant="h6">{data.statistics.visitorsToday}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={2}>
          <Card sx={{ background: 'rgba(33, 33, 33, 0.8)', border: '1px solid #444' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Unique Users</Typography>
              <Typography variant="h6">{data.statistics.uniqueUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={2}>
          <Card sx={{ background: 'rgba(33, 33, 33, 0.8)', border: '1px solid #444' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Conversion Rate</Typography>
              <Typography variant="h6">{data.statistics.conversionRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={2}>
          <Card sx={{ background: 'rgba(33, 33, 33, 0.8)', border: '1px solid #444' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Avg. Order Value</Typography>
              <Typography variant="h6">${data.statistics.averageOrderValue}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={2}>
          <Card sx={{ background: 'rgba(33, 33, 33, 0.8)', border: '1px solid #444' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Returning Customers</Typography>
              <Typography variant="h6">{data.statistics.returningCustomers}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={2}>
          <Card sx={{ background: 'rgba(33, 33, 33, 0.8)', border: '1px solid #444' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Daily Revenue</Typography>
              <Typography variant="h6">${data.revenue.daily.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;