import React, { useEffect, useState } from 'react';

/* REDUX */
import { ExtensionProps } from '../../../@redux/extension/types';
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/extension';
import { deleteExtensiones, getExtensiones } from '../../../domain/extensiones';
/* Components */
import DataGrid from '../../../app/components/DataGrid';
import ExtensionFilter from './ExtensionFilter';
import ModalAddExtension from '../modals/ModalAddExtension';
import ModalEditExtension from '../modals/ModalEditExtension';
import ModalDeleteExtension from '../modals/ModalDeleteExtension';
/* icons */
import Columns from './Extension.json';
import { ModalConfirmation } from '../../../app/components/Modal';

const ExtensionList: React.FC<{ extension: ExtensionProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { extensiones } = HelperRedux.useSelector((state) => state.extensiones)
    const [confirmationDelete, setConfirmationDelete] = useState({ visible: false, item: { id: 0 } })

    useEffect(() => {
        if (extensiones.length === 0) {
            getInitial()
        }
    }, [])

    const getInitial = () => {
        getExtensiones().then(x => { dispatch(Actions.setExtensionesStore(x.data.value)) })

    }

    const handleDeleteExtensiones = () => {
        const { id } = confirmationDelete.item

        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })

        deleteExtensiones(id).then(() => {
            dispatch(Actions.deleteExtensiones(id))
        })
            .catch(error => console.log(error))
        window.location.reload()
    }

    const handlerDeleteNotification = () => {
        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })
    }

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3>Listado de Extensiones</h3>
                </div>

                <div className="col-6 d-flex justify-content-end mb-1">
                    <ModalAddExtension />
                </div>
            </div>
            <DataGrid
                singlePagination={true}
                subTableName='details'
                pageSize={10}
                columns={Columns.extension}
                onClickEdit={(row) => { <ModalEditExtension extension={props.extension} /> }}
                onClickDelete={(row) => setConfirmationDelete({ visible: true, item: row })}

                rows={extensiones.map(x => ({
                    ...x,
                }),
                )}
                filterComponent={(onClosedFilter) => <ExtensionFilter onClosed={onClosedFilter} />}
            />

            <ModalConfirmation
                title='¿Confirma baja del registro?'
                visible={confirmationDelete.visible}
                onClickYes={handleDeleteExtensiones}
                onClickNo={handlerDeleteNotification} children={undefined}
            />
        </>
    );
};

export default ExtensionList;