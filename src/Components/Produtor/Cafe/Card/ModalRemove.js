import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { UserContext } from '../../../../Context/UserContext';

const Modalremove = observer(props => {
    const { cafe } = props

    const { coffeeDelete } = React.useContext(UserContext);
    const { data, coffeeEdit, getFarm } = React.useContext(UserContext)

    const [reload, setReload] = React.useState(0)

    const [show, setShow] = useState(false)
    const handleShow = () => { setShow(true) }
    const handleClose = () => { setShow(false) }

    useEffect(() => {
        function fetchGrower() {
          if (data && reload>0) {
            getFarm(data.data.id)
          }
        }
        fetchGrower();
      }, [reload]);

    const handleDelete = () => {
        coffeeDelete(cafe.id)
        setShow(false)
        console.log(reload)
        setReload(reload + 1)
        console.log(reload)
    }


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