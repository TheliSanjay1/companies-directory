import React from 'react'
import { useCompanies } from '../context/CompaniesContext.jsx'

const Pagination = () => {
  const { filters, setFilters, pageCount } = useCompanies()
  const { page } = filters

  return (
    <div className="row" style={{justifyContent:'space-between', marginTop:12}}>
      <div>Page {page} of {pageCount}</div>
      <div className="row">
        <button className="btn ghost" onClick={()=>setFilters(f=>({...f, page: Math.max(1, f.page-1)}))} disabled={page<=1}>Prev</button>
        <button className="btn" onClick={()=>setFilters(f=>({...f, page: Math.min(pageCount, f.page+1)}))} disabled={page>=pageCount}>Next</button>
      </div>
    </div>
  )
}

const CompanyTable = () => {
  const { data, loading, error } = useCompanies()

  if (loading) return <div>Loading companies…</div>
  if (error) return <div>Failed to load: {error}</div>
  if (data.length === 0) return <div>No companies match your filters.</div>

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Industry</th>
            <th>Employees</th>
            <th>Founded</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(c => (
            <tr key={c.id}>
              <td><a href={c.website} target="_blank" rel="noreferrer">{c.name}</a></td>
              <td>{c.location}</td>
              <td>{c.industry}</td>
              <td>{c.employees.toLocaleString()}</td>
              <td>{c.founded}</td>
              <td><span className="badge">{c.isActive ? 'Active' : 'Inactive'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  )
}

export default CompanyTable
