import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { UserContext } from '../../../../Context/UserContext';

const Modalremove = observer(props => {
    const { id } = props 

    const [show, setShow] = useState('')
    const handleShow = () => { setShow(true) }
    const handleClose = () => { setShow(false) }
    const { coffeeDelete } = React.useContext(UserContext);

    const handleDelete = () => { coffeeDelete(id); setShow(false) }

    return (
        <>
            <Button onClick={handleShow}> </Button>
            <Modal className='modalWarning' show={show} onHide={handleClose} animation={false} centered>

                <Modal.Header>
                    <Modal.Title>Aviso</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Deseja realmente excluir este café?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="primary" style={{ backgroundColor: '#ff0000', borderColor: '#fff' }} onClick={handleDelete}>Excluir</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
})

export default Modalremove