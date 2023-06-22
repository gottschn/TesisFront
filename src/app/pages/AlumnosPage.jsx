import '../../app/components/GlobalStyles/css/basePage.css'
import AlumnoList from '../../components/alumno/base/AlumnoList';
import React from 'react';

export const AlumnosPage = () => {
    return (
        <div className='app'>
            <AlumnoList />
        </div>
    );
};

export default AlumnosPage;
