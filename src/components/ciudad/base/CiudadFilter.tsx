import React, { useState } from "react";

/** components */

/** styles */
import { HelperRedux } from "../../../@redux";
import { Actions } from "../../../@redux/ciudad";
import { getCiudades } from "../../../domain/ciudades";
import { Button } from "react-bootstrap";
import { TextInput } from "../../../app/components/TextInput";

/** redux */

const CiudadFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({
  onClosed,
}) => {
  const dispatch = HelperRedux.useDispatch();
  const [descripcion, setDescripcion] = useState("");

  const handlerFilter = () => {
    dispatch(Actions.setFilterCiudadesStore(descripcion));

    onClosed(true);
  };

  const handlerClearFilter = () => {
    getCiudades().then((x) => {
      dispatch(Actions.setCiudadesStore(x.data.value));
    });
    dispatch(Actions.setFilterCiudadesStore(""));
    setDescripcion("");
    onClosed(false);
  };

  return (
    <div className="container-filter">
      <main>
        <TextInput
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          label="Descripcion"
        />
      </main>

      <footer className="d-flex justify-content-between mt-3">
        <div className="d-flex">
          <Button
            className="btn mx-1"
            title="Limpiar"
            onClick={handlerClearFilter}
            variant="outline-danger"
          >
            Limpiar
          </Button>

          <Button
            className="btn mx-5"
            title="Aplicar"
            variant="outline-success"
            onClick={handlerFilter}
          >
            Aplicar
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default CiudadFilter;
