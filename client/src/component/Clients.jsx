import { useMutation, useQuery } from "@apollo/client";
import { Button, Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { GET_CLIENTS } from "../queries/clientQueries";
import { DELETE_CLIENT } from "../mutations/clientMutation";

export default function Clients() {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update: (cache, { data: { deleteClient } }) => {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients.filter((c) => c.id !== deleteClient.id) },
      });
    },
  });
  const { loading, error, data } = useQuery(GET_CLIENTS);
  return (
    <section className="max-w-4xl mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Clients</h1>
      <div className="flex gap-2">
        <Link to={"/add-client"}>
          <Button gradientDuoTone="purpleToPink" className="mb-2 mt-2">
            Add Client
          </Button>
        </Link>
        <Link to={"/projects"}>
          <Button gradientDuoTone="purpleToPink" outline className="mb-2 mt-2">
            Projects
          </Button>
        </Link>
      </div>
      {loading && <Spinner size="xl" />}
      {error && <p>Something Went Wrong...</p>}
      {!loading && !error && (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.clients?.map((client) => (
                <Table.Row
                  key={client.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{client.name}</Table.Cell>
                  <Table.Cell>{client.email}</Table.Cell>
                  <Table.Cell>{client.phone}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        deleteClient({
                          variables: { id: client.id },
                        });
                      }}
                      className="cursor-pointer font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-client/${client._id}`}
                    >
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      )}
    </section>
  );
}
