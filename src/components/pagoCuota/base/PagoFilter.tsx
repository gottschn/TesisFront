import React, { useState } from 'react'
/** redux */
import { HelperRedux } from '../../../@redux'
import { Actions } from '../../../@redux/Pagos'

/** components */
import { TextInput } from '../../../app/components/TextInput'

/** styles */
import { Button } from 'react-bootstrap'
import { getPagos } from '../../../domain/pagos'


const PagoFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {
    
    const dispatch = HelperRedux.useDispatch()
    const [legajo, setLegajo] = useState('')
    const [cantCuota, setCantCuota] = useState(0)
    const [nroCuota, setNroCuota] = useState(0)
    const [monto, setMonto] = useState(0)
    const [nroRecibo, setNroRecibo] = useState(0)
    const [fechaCarga, setFechaCarga] = useState('');
    const [fechaRecibo, setFechaRecibo] = useState('');
    const [alumnoId, setAlumnoId] = useState(0)
    const [alumno, setAlumno] = useState('')

    const handlerFilter = () => {

        dispatch(Actions.getPagos(
            legajo,
            cantCuota,
            nroCuota,
            monto,
            nroRecibo,
            fechaCarga,
            fechaRecibo,
            alumnoId,
            alumno,
        ))
        onClosed(true)
    }

    const handlerClearFilter = () => {
        setLegajo('')

        getPagos().then(x => { dispatch(Actions.setPagosStore(x.data.value)) })
        dispatch(Actions.setPagosFilterStore())

        onClosed(false)
    }

    return (
        <div className='container-filter'>
            <main>
                <TextInput
                    value={legajo}
                    onChange={(e) => setLegajo(e.target.value)}
                    label='Legajo'
                />
            </main>

            <footer className='d-flex justify-content-between mt-3'>
                <div className='d-flex'>
                    <Button
                        className='btn mx-1'
                        title='Limpiar'
                        onClick={handlerClearFilter}
                    >
                        Limpiar
                    </Button>

                    <Button
                        className='btn'
                        title='Aplicar'
                        onClick={() => handlerFilter()}
                    >
                        Aplicar
                    </Button>
                </div>

            </footer>
        </div>
    )
}

export default PagoFilter;