import React, { useState, useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Failed to fetch enterprise metrics.');
        const data = await res.json();
        
        // Rich enterprise metrics formatting
        const formattedData = data.slice(0, 6).map((user, idx) => ({
          id: user.id,
          name: user.name,
          username: `@${user.username.toLowerCase()}`,
          company: user.company.name,
          revenue: `$${((user.id + 4) * 3150).toLocaleString()}`,
          status: idx % 3 === 0 ? 'Active' : idx % 3 === 1 ? 'Pending' : 'Completed',
          category: idx % 2 === 0 ? 'Enterprise' : 'Standard'
        }));
        setMetrics(formattedData);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Filter logic combining search text and category selection
  const filteredMetrics = metrics.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(filter.toLowerCase()) ||
      m.company.toLowerCase().includes(filter.toLowerCase()) ||
      m.status.toLowerCase().includes(filter.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div className="loader-overlay" role="status">
      <div className="spinner"></div>
      <p>Loading enterprise analytics...</p>
    </div>
  );

  if (error) return (
    <div className="error-banner" role="alert">
      <span>⚠️ Error: {error}</span>
    </div>
  );

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand-logo">
          <span className="logo-icon">⚡</span>
          <h2>NexusCore</h2>
        </div>
        <nav className="nav-menu">
          <a href="#overview" className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
            <span className="icon">📊</span> Overview
          </a>
          <a href="#analytics" className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
            <span className="icon">📈</span> Analytics
          </a>
          <a href="#clients" className={activeTab === 'clients' ? 'active' : ''} onClick={() => setActiveTab('clients')}>
            <span className="icon">👥</span> Clients
          </a>
          <a href="#settings" className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            <span className="icon">⚙️</span> Settings
          </a>
        </nav>
        <div className="sidebar-footer">
          <div className="workspace-badge">
            <span className="dot"></span> Production v2.4
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-title">
            <h1>Executive Dashboard</h1>
            <p>Monitor real-time client growth, revenue stream, and operational status.</p>
          </div>
          <div className="header-actions">
            <button className="notification-btn" aria-label="View notifications">
              🔔 <span className="notification-dot"></span>
            </button>
            <div className="user-profile">
              <div className="avatar">JD</div>
              <div className="user-info">
                <span className="user-name">John Doe</span>
                <span className="user-role">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Summary Cards */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Monthly Recurring Revenue</h3>
              <span className="stat-icon-badge blue">💰</span>
            </div>
            <p className="stat-value">$128,430</p>
            <div className="stat-footer positive">
              <span>↑ 14.2%</span> vs last month
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Active Enterprise Clients</h3>
              <span className="stat-icon-badge purple">🏢</span>
            </div>
            <p className="stat-value">1,429</p>
            <div className="stat-footer positive">
              <span>↑ 5.8%</span> growth rate
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>System Uptime</h3>
              <span className="stat-icon-badge green">🟢</span>
            </div>
            <p className="stat-value">99.98%</p>
            <div className="stat-footer">
              <span>All systems operational</span>
            </div>
          </div>
        </section>

        {/* Client Transactions Section */}
        <div className="content-card">
          <div className="card-header-flex">
            <div>
              <h2>Client Accounts & Metrics</h2>
              <p className="card-subtitle">Manage and filter recent enterprise subscriptions.</p>
            </div>
            <div className="filter-toolbar">
              <div className="category-tabs">
                {['All', 'Enterprise', 'Standard'].map(cat => (
                  <button 
                    key={cat}
                    className={`tab-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="search-box">
                <label htmlFor="metric-filter" className="sr-only">Search metrics</label>
                <input 
                  id="metric-filter"
                  type="text" 
                  placeholder="Search client, company..." 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  aria-label="Filter metrics"
                />
              </div>
            </div>
          </div>

          {/* Professional Data Table */}
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Company</th>
                  <th>Tier</th>
                  <th>Revenue Share</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody aria-live="polite">
                {filteredMetrics.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-data-cell">
                      <div className="empty-state">
                        <p>No matching client metrics found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredMetrics.map(client => (
                    <tr key={client.id}>
                      <td>
                        <div className="client-identity">
                          <span className="client-name">{client.name}</span>
                          <span className="client-handle">{client.username}</span>
                        </div>
                      </td>
                      <td>{client.company}</td>
                      <td>
                        <span className={`badge-tier ${client.category.toLowerCase()}`}>
                          {client.category}
                        </span>
                      </td>
                      <td><strong>{client.revenue}</strong></td>
                      <td>
                        <span className={`status-badge ${client.status.toLowerCase()}`}>
                          <span className="status-dot"></span> {client.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}