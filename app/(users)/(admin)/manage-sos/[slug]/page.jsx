import { ManageIndividualSos } from "@/components/Admin/ManageSos";
import React from "react";

const page = async ({ params }) => {
  const { slug } = await params;
  return <ManageIndividualSos slug={slug} />;
};

export default page;