import React from 'react';
import Modal from 'react-modal';

const UserModal = ({ user, closeModal }) => {
    return (
        <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
            <h2>Подробная информация о пользователе</h2>
            <p>ФИО: {user.firstName} {user.lastName}</p>
            <p>Возраст: {user.age}</p>
            <p>Адрес: {user.address.city}, {user.address.street}</p>
            <p>Рост: {user.height} см</p>
            <p>Вес: {user.weight} кг</p>
            <p>Номер телефона: {user.phone}</p>
            <p>Email: {user.email}</p>
            <button onClick={closeModal}>Закрыть</button>
        </Modal>
    );
};

export default UserModal;