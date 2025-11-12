import data from '../data/companies.json'

export async function fetchCompanies() {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.companies)
    }, 400)
  })
}
