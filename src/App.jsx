import React from 'react'
import { CompaniesProvider } from './context/CompaniesContext.jsx'
import Filters from './components/Filters.jsx'
import CompanyTable from './components/CompanyTable.jsx'
import CompanyCard from './components/CompanyCard.jsx'

const App = () => {
  const [view, setView] = React.useState('table')

  return (
    <CompaniesProvider>
      <div className="container">
        <header className="row" style={{justifyContent:'space-between', marginBottom: 16}}>
          <h1 style={{margin:0}}>Companies Directory</h1>
          <div className="row toolbar">
            <button className={"btn " + (view==='table'?'':'ghost')} onClick={()=>setView('table')}>Table</button>
            <button className={"btn " + (view==='cards'?'':'ghost')} onClick={()=>setView('cards')}>Cards</button>
          </div>
        </header>

        <div className="card" style={{marginBottom:16}}>
          <Filters />
        </div>

        <div className="card">
          {view === 'table' ? <CompanyTable /> : <CompanyCard />}
        </div>

        <div className="footer">Built with React + Vite. Mock API via JSON Server.</div>
      </div>
    </CompaniesProvider>
  )
}

export default App
