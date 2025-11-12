import React from 'react'
import { useCompanies } from '../context/CompaniesContext.jsx'

const CompanyCard = () => {
  const { data, loading, error } = useCompanies()

  if (loading) return <div>Loading companies…</div>
  if (error) return <div>Failed to load: {error}</div>
  if (data.length === 0) return <div>No companies match your filters.</div>

  return (
    <div className="grid">
      {data.map(c => (
        <div className="card" key={c.id}>
          <div className="row" style={{justifyContent:'space-between'}}>
            <h3 style={{margin:'6px 0'}}>{c.name}</h3>
            <span className="badge">{c.isActive ? 'Active' : 'Inactive'}</span>
          </div>
          <div className="row" style={{gap:8, marginBottom:8}}>
            <span className="pill">{c.location}</span>
            <span className="pill">{c.industry}</span>
          </div>
          <div className="row" style={{gap:16}}>
            <div><strong>Employees:</strong> {c.employees.toLocaleString()}</div>
            <div><strong>Founded:</strong> {c.founded}</div>
          </div>
          <div style={{marginTop:10}}>
            <a href={c.website} target="_blank" rel="noreferrer">Visit website →</a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CompanyCard
