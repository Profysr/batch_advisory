import { ManageIndividualClass } from "@/components/Admin/ManageClass";
import React from "react";

const page = async ({ params }) => {
  const { slug } = await params;
  return <ManageIndividualClass slug={slug} />;
};

export default page;
