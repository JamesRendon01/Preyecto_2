import Nav from "../../components/nav.jsx";
import FormUpdatePlans from "../../components/form_update_planes.jsx";
import { useParams } from "react-router-dom";

export default function UpdatePlanes() {
  const { id } = useParams();

  return (
    <div>
      <div className="mb-24">
        <Nav
          showFilter={false}
          showTitleAdmin={false}
          showNavbarAdmin={true}
          showSearch={false}
          showTitleUpdatePlanesAdmin={true}
        />
      </div>


      <div className="mt-8 px-8">
        <FormUpdatePlans />
      </div>
    </div>
  );
}
