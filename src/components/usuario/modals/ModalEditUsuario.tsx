import React from "react";
import { useState, useEffect } from "react";
import { HelperRedux } from "../../../@redux";
import { UsuarioProps } from "../../../@redux/usuario/types";
import { Actions } from "../../../@redux/usuario/actions";

import { Modal, Form, Button } from "react-bootstrap";
import { updateUsuarios } from "../../../domain/usuarios";
import Swal from "sweetalert2";

const ModalEditUsuario: React.FC<{
  usuario: UsuarioProps;
  visible: boolean;
  onClosedModal: () => void;
}> = ({ ...props }) => {
  const [form, setForm] = useState<UsuarioProps>({} as UsuarioProps);

  const dispatch = HelperRedux.useDispatch();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setForm({
      id: props.usuario.id,
      nombre: props.usuario.nombre,
      password: props.usuario.password,
      rol: props.usuario.rol,
      personaId: props.usuario.personaId,
    });
  }, [props.usuario.id]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    updateUsuarios(
      form.id,
      form.nombre,
      form.password,
      form.rol,
      form.personaId
    )
      .then(() => {
        dispatch(Actions.updateUsuarios({ ...form }, form.id));
        Swal.fire({
          icon: "success",
          text: "El Usuario se modifico con exito.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => props.onClosedModal());
  };

  return (
    <>
      <Modal
        show={props.visible}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modaltitle">
          <Modal.Title>Editar Ciudad</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del Usuario"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contraseña"
                name="password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                type="text"
                placeholder="Rol"
                name="rol"
                value={form.rol}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <div>{errorMsg && <p className="error-msg">{errorMsg}</p>}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Guardar
            </Button>
            <Button variant="danger" onClick={props.onClosedModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditUsuario;
