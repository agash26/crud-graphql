import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { useNavigate } from "react-router-dom";
import { Button, Select, TextInput, Textarea } from "flowbite-react";
import { ADD_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function AddClient() {
  const { data: clientData } = useQuery(GET_CLIENTS);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [addProject] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, status, description, clientId } = formData;
    addProject({ variables: { name, status, description, clientId } });
    setFormData({});
    navigate("/projects");
  };
  return (
    <section className="max-w-4xl mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Add Project</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          id="name"
          className="mb-2"
          placeholder="Project Name"
          onChange={handleChange}
        />
        <Textarea
          className="mb-2"
          id="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <Select className="mb-2" onChange={handleChange} id="status">
          <option value="">Select Status</option>
          <option value="new">Not Started</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
        <Select className="mb-2" onChange={handleChange} id="clientId">
          <option value="">Select Client</option>
          {clientData?.clients?.map((c) => (
            <option value={c.id} key={c.id}>{c.name}</option>
          ))}
        </Select>
        <Button
          className="w-full"
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
        >
          Add
        </Button>
      </form>
    </section>
  );
}
