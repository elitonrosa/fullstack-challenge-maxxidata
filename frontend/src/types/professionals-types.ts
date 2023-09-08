import { ProfessionalType } from "@/types/professional-types-types";

export type ProfessionalDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  professionalType: {
    id: string;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Professional = {
  id: string;
  name: string;
  email: string;
  phone: string;
  professionalType: ProfessionalType;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};
