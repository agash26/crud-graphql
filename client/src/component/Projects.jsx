import { useMutation, useQuery } from "@apollo/client";
import { Button, Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutation";

export default function Projects() {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    update: (cache, { data: { deleteProject } }) => {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.filter((c) => c.id !== deleteProject.id) },
      });
    },
  });
  const { loading, error, data } = useQuery(GET_PROJECTS);
  return (
    <section className="max-w-4xl mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Projects</h1>
      <div className="flex gap-2">
        <Link to={"/add-project"}>
          <Button gradientDuoTone="purpleToBlue" className="mb-2 mt-2">
            Add Project
          </Button>
        </Link>
        <Link to={"/"}>
          <Button gradientDuoTone="purpleToBlue" outline className="mb-2 mt-2">
            Clients
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
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Client Name</Table.HeadCell>
              <Table.HeadCell>Client Email</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.projects?.map((project) => (
                <Table.Row
                  key={project.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{project.name}</Table.Cell>
                  <Table.Cell>{project.status}</Table.Cell>
                  <Table.Cell>{project.description}</Table.Cell>
                  <Table.Cell>{project.client?.name}</Table.Cell>
                  <Table.Cell>{project.client?.email}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        deleteProject({
                          variables: { id: project.id },
                        });
                      }}
                      className="cursor-pointer font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    {/* {console.log(project)} */}
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-project/${project.id}`}
                      state={{ project }}
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
