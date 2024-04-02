import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Select, TextInput, Textarea } from "flowbite-react";
import { EDIT_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function EditClient() {
  const { state } = useLocation();
  const { projectId } = useParams();
  const project = state?.project || {};
  const { data: clientData } = useQuery(GET_CLIENTS);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...project });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [editProject] = useMutation(EDIT_PROJECT, {
    update(cache, { data: { editProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, editProject] },
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, status, description, clientId } = formData;
    editProject({
      variables: { id: projectId, name, status, description, clientId },
    });
    setFormData({});
    navigate("/projects");
  };
  return (
    <section className="max-w-4xl mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Edit Project</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          id="name"
          className="mb-2"
          placeholder="Project Name"
          onChange={handleChange}
          value={formData.name}
        />
        <Textarea
          className="mb-2"
          id="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
        />
        <Select
          className="mb-2"
          onChange={handleChange}
          id="status"
          value={formData.status}
        >
          <option value="">Select Status</option>
          <option value="new">Not Started</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
        <Select className="mb-2" onChange={handleChange} id="clientId">
          <option value="">Select Client</option>
          {clientData?.clients?.map((c) => (
            <option value={c.id} key={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Button
          className="w-full"
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
        >
          Edit
        </Button>
      </form>
    </section>
  );
}
