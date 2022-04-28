import CreateOnlyTextEntityForm from "./CreateOnlyTextEntityForm";
import { createAcademicStatus } from "../api/apiCalls";

export const CreateAcademicStatusForm = () =>
  CreateOnlyTextEntityForm({
    title: "Create academic status",
    fields: [
      { name: "name", label: "Name" },
      { name: "shortName", label: "Short form" },
    ],
    createApiCall: async (obj) => {
      const newAcademicStatus = {
        name: obj.name,
        shortName: obj.shortName,
      };
      return await createAcademicStatus(newAcademicStatus);
    },
  });
