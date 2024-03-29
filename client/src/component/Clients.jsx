import { useQuery } from "@apollo/client";
import { Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  return (
    <section>
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
                  key={client._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{client.name}</Table.Cell>
                  <Table.Cell>{client.email}</Table.Cell>
                  <Table.Cell>{client.phone}</Table.Cell>
                  <Table.Cell>
                    <span
                      //   onClick={() => {
                      //     setShowModal(true);
                      //     setClientIdToDelete(client._id);
                      //   }}
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
