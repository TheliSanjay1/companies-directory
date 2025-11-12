import React from 'react'
import { fetchCompanies } from '../services/api.js'

const CompaniesContext = React.createContext(null)

const defaultFilters = {
  search: '',
  location: '',
  industry: '',
  sortBy: 'name',
  activeOnly: false,
  page: 1,
  pageSize: 6
}

export const CompaniesProvider = ({ children }) => {
  const [filters, setFilters] = React.useState(defaultFilters)
  const [all, setAll] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    let alive = true
    setLoading(true)
    fetchCompanies()
      .then(data => { if (alive) { setAll(data); setError(null) } })
      .catch(err => { if (alive) setError(err.message || 'Error') })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const meta = React.useMemo(() => {
    const locations = Array.from(new Set(all.map(c => c.location))).sort()
    const industries = Array.from(new Set(all.map(c => c.industry))).sort()
    return { locations, industries }
  }, [all])

  const prepared = React.useMemo(() => {
    let list = [...all]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(c => c.name.toLowerCase().includes(q))
    }
    if (filters.location) list = list.filter(c => c.location === filters.location)
    if (filters.industry) list = list.filter(c => c.industry === filters.industry)
    if (filters.activeOnly) list = list.filter(c => c.isActive)

    switch (filters.sortBy) {
      case 'employees': list.sort((a,b)=>a.employees-b.employees); break
      case 'founded': list.sort((a,b)=>a.founded-b.founded); break
      default: list.sort((a,b)=>a.name.localeCompare(b.name))
    }

    const pageCount = Math.max(1, Math.ceil(list.length / filters.pageSize))
    const page = Math.min(filters.page, pageCount)
    const start = (page - 1) * filters.pageSize
    const data = list.slice(start, start + filters.pageSize)
    return { data, pageCount, page }
  }, [all, filters])

  React.useEffect(() => {
    if (filters.page !== prepared.page) {
      setFilters(f => ({ ...f, page: prepared.page }))
    }
  }, [prepared.page])

  const resetFilters = () => setFilters(defaultFilters)

  const value = {
    loading, error,
    data: prepared.data,
    pageCount: prepared.pageCount,
    filters, setFilters,
    meta, resetFilters
  }

  return (
    <CompaniesContext.Provider value={value}>
      {children}
    </CompaniesContext.Provider>
  )
}

export const useCompanies = () => {
  const ctx = React.useContext(CompaniesContext)
  if (!ctx) throw new Error('useCompanies must be used within CompaniesProvider')
  return ctx
}
