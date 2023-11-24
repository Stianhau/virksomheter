import { useQuery } from '@tanstack/react-query'
import './App.css'
import { columns } from "./components/columns"
import { DataTable } from './components/data-table'
import client from './api'
function App() {
  // const [count, setCount] = useState(0)


  const getVirksomheter = async () => {
    return  await client.GET('/Virksomhet')
  }

  const { data: res, isLoading } = useQuery({
    queryKey: ["virksomheter"],
    queryFn: () => getVirksomheter(),
  });

  const table = () => {
    if (isLoading) {
      return <div>Loading...</div>
    }
    if(!res?.data){
      return <div>No data</div>
    }

    return (
      <>
        <DataTable columns={columns} data={res.data} />
      </>
    )
  }

  return (
    <div className='max-w-7xl mx-auto'>
      {table()}
    </div>
  )
}

export default App
