import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';

import { HelperRedux } from '../../../@redux';

import { Actions } from '../../../@redux/empleado';
import { createEmpleado } from '../../../domain/empleados';
import { EmpleadosProps } from '../../../@redux/empleado/types';

import { Actions as ActionsExtensiones } from '../../../@redux/extension';
import { Actions as ActionsCiudades } from '../../../@redux/ciudad';

import '../../../css/entities/carrera/carrera.css';
import '../../../app/components/GlobalStyles/css/GlobalStyle.css'
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getExtensiones } from '../../../domain/extensiones';
import { getCiudades } from '../../../domain/ciudades';
import moment from 'moment';

const ModalAddEmpleado = () => {

    const [form, setForm] = useState<EmpleadosProps>({
        id: 0,
        apynom: '',
        tipoDoc: 0,
        nroDoc: '',
        fechaNacimiento: new Date(),
        direccion: '',
        telefono: '',
        mail: '',
        extensionId: 0,
        ciudadId: 0,
        codigoPostal: 0,
        areaTrabajo: '',
    });

    const dispatch = HelperRedux.useDispatch()
    const { extensiones, ciudades } = HelperRedux.useSelector((state) => state)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [clearModal, setClearModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name === 'extensionId') {
            setForm({
                ...form,
                [name]: [(value)],
            });
            return
        }

        if (name === 'ciudadId') {
            setForm({
                ...form,
                [name]: [(value)],
            });
            return
        }

        if (name === 'fechaNacimiento') {
            setForm({
                ...form,
                [name]: moment(value, 'YYYY-MM-DD').toDate()
            });
            return
        }
        setForm({
            ...form,
            [name]: value,
        });
    };
    useEffect(() => {
        if (showModal) {
            getExtensiones()
                .then(x => dispatch(ActionsExtensiones.setExtensionesStore(x.data.value)))
                .catch(() => alert('Se produjo un error'))
        }
        if (showModal) {
            getCiudades()
                .then(x => dispatch(ActionsCiudades.setCiudadesStore(x.data.value)))
                .catch(() => alert('Se produjo un error'))
        }
    }, [showModal])

    const handlerClearFilter = () => {
        setClearModal(true)
        handleCloseModal()
        /* setForm({
            id: 0,
            nombre: '',   
        }) */
       /*  window.location.reload() */
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setErrorMsg(null);
        createEmpleado(form.apynom, form.tipoDoc, form.nroDoc,form.fechaNacimiento, form.direccion, form.telefono,
            form.mail,form.areaTrabajo, form.ciudadId, form.extensionId).then((x) => {
                dispatch(Actions.createEmpleados({
                    ...form,
                    id: x.data.value
                }));
                alert('Se Registro el Empleado con Exito.')
            })
            .catch(error => {
                console.log('createEmpleado', error)

            })
            .finally(() => handlerClearFilter())
    };
    return (
        <>
            <Button
                className='modalMargin'
                size='small'
                variant="contained"
                color="success"
                onClick={(handleOpenModal)}
            >
                <AddCircleIcon />
                <span>Agregar Empleado</span>
            </Button>

            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>Agregar Empleado</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre y Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre y Apellido"
                                name="apynom"
                                value={form.apynom}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de Documento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tipo de Documento"
                                name="tipoDoc"
                                value={form.tipoDoc}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Numero de Documento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Numero de Documento"
                                name="nroDoc"
                                value={form.nroDoc}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha de Nacimiento"
                                name="fechaNacimiento"
                                value={moment(form.fechaNacimiento).format('YYYY-MM-DD')}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Direccion"
                                name="direccion"
                                value={form.direccion}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Telefono"
                                name="telefono"
                                value={form.telefono}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Mail"
                                name="mail"
                                value={form.mail}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Extension</Form.Label>
                            <Form.Control
                                as={'select'}
                                multiple={false}
                                name="extensionId"
                                value={form.extensionId}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-ext-0`} value={0}>Seleccione...</option>
                                {extensiones.extensiones.map(x => <option key={`option-extensiones-${x.id}`} value={x.id}>{x.descripcion}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                                as={'select'}
                                multiple={false}
                                name="ciudadId"
                                value={form.ciudadId}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-ciudad-0`} value={0}>Seleccione...</option>
                                {ciudades.ciudades.map(x => <option key={`option-ciudades-${x.id}`} value={x.id}>{x.descripcion}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Area de Trabajo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Area de Trabajo"
                                name="areaTrabajo"
                                value={form.areaTrabajo}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <div>
                            {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="success" type="submit">
                            Añadir
                        </Button>
                        <Button variant="contained" color="error" onClick={handleCloseModal} >
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAddEmpleado;