import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import client from "./api";
import { AddVirksomhetDialog } from "./components/AddVirksomhetDialog";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import LogoutButton from "./components/LogoutButton";
function App() {
  const { getAccessTokenSilently } = useAuth0();
  const getVirksomheter = async () => {
    const token = await getAccessTokenSilently()
    return await client.GET("/Virksomheter", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data: res, isLoading } = useQuery({
    queryKey: ["virksomheter"],
    queryFn: async () => {
      return await getVirksomheter();
    },
  });


  const table = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <LogoutButton />
        </div>
        {res?.data &&
          <DataTable columns={columns} data={res.data} />
        }
        <div className="flex justify-center">
          <AddVirksomhetDialog />
        </div>
      </div>
    );
  };

  return <div className="max-w-7xl mx-auto p-2">{table()}</div>;
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuthenticationRequired(App, {
  onRedirecting: () => <div>Redirecting you to the login...</div>
});

// export default App