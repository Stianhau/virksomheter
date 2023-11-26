import { useQuery } from '@tanstack/react-query'
import './App.css'
import { columns } from "./components/columns"
import { DataTable } from './components/data-table'
import client from './api'
import { AddVirksomhetDialog } from './components/AddVirksomhetDialog'
function App() {

  const getVirksomheter = async () => {
    return  await client.GET('/Virksomheter')
  }

  const { data: res, isLoading } = useQuery({
    queryKey: ["virksomheter"],
    queryFn: async () => {
      return await getVirksomheter()
    },
  });

  const table = () => {
    if (isLoading) {
      return <div>Loading...</div>
    }
    if(!res?.data){
      return <div>No data</div>
    }

    return (
      <div className='flex flex-col gap-2'>
        <DataTable columns={columns} data={res.data} />
        <div className='flex justify-center'>
          <AddVirksomhetDialog />
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto p-2'>
      {table()}
    </div>
  )
}

export default App
