import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { useEffect } from "react";
import { useParams } from "react-router";

function PageEditor() {
  const { id } = useParams();

  const { data } = useQuery(["page_editor"], async () => {
    const response = await fetch(`${portfolioManagerURL}/api/page/${id}`);
    return response.json();
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>PageEditor</div>;
}

export default PageEditor;
