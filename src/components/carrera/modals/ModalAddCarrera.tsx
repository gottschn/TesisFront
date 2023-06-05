import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../../css/entities/carrera/carrera.css';
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/carreras';
import { CarrerasProps } from '../../../@redux/carreras/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { createCarreras } from '../../../domain/carreras';

const ModalAddCarrera = () => {
  
  const [form, setForm] = useState<CarrerasProps>({
    id: 0,
    descripcion: '',
    cantCuotas: 0,
    precioCuo: 0,
  });
  const { descripcion, cantCuotas } = form;

  const dispatch = HelperRedux.useDispatch()
  const { carreras} = HelperRedux.useSelector((state) => state.carreras)
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  
  useEffect(() => {

    const carrerasModal = carreras.find((x) => x.id )
    if( carrerasModal) setForm(carrerasModal)
    
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (descripcion === '' || !cantCuotas) {
      setErrorMsg('Todos los campos son obligatorios');
      return;
    }
    setErrorMsg(null);
   // dispatch(Actions.createCarreras(form));
    createCarreras(form.descripcion, form.cantCuotas).then((x) => {
      dispatch(Actions.createCarreras({...form,id:x.data.value}));
    })
    .catch(error => {console.log(error)})
    .finally(() => {handleCloseModal()})
  };

  return (
    <>
       <Button
          variant="success"
         onClick={(handleOpenModal)}
        >
        <FontAwesomeIcon icon={faAdd} />
         <span>Agregar Carrera </span>              
       </Button>

      <Modal
        show = {showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modaltitle">
          <Modal.Title>Agregar carrera</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre De la Carrera </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad Cuotas</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad de cuotas"
                name="cantCuotas"
                value={cantCuotas}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <div>{errorMsg && <p className="error-msg">{errorMsg}</p>}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Añadir
            </Button>
            <Button variant="danger"  onClick={handleCloseModal} >
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddCarrera;