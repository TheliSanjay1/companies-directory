import React from 'react'
import { useCompanies } from '../context/CompaniesContext.jsx'

const Filters = () => {
  const { filters, setFilters, meta, resetFilters } = useCompanies()

  const onChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value, page: 1 }))

  return (
    <div className="row">
      <input className="input" style={{flex:1, minWidth:220}} placeholder="Search by name..."
        value={filters.search} onChange={e=>onChange('search', e.target.value)} />

      <select className="select" value={filters.location} onChange={e=>onChange('location', e.target.value)}>
        <option value="">All locations</option>
        {meta.locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
      </select>

      <select className="select" value={filters.industry} onChange={e=>onChange('industry', e.target.value)}>
        <option value="">All industries</option>
        {meta.industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
      </select>

      <select className="select" value={filters.sortBy} onChange={e=>onChange('sortBy', e.target.value)}>
        <option value="name">Sort: Name</option>
        <option value="employees">Sort: Employees</option>
        <option value="founded">Sort: Founded</option>
      </select>

      <label className="row pill" style={{gap:8}}>
        <input type="checkbox" checked={filters.activeOnly} onChange={e=>onChange('activeOnly', e.target.checked)} />
        Active only
      </label>

      <button className="btn ghost" onClick={resetFilters}>Reset</button>
    </div>
  )
}

export default Filters
