import React, { useEffect, useState } from 'react';
import  UserModal  from './UserModal';
import  SearchBar  from './SearchBar';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data.users);
                setFilteredUsers(data.users);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = users.filter(user => {
            return (
                (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.age && user.age.toString().includes(searchTerm)) ||
                (user.gender && user.gender.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.phone && user.phone.includes(searchTerm)) ||
                (user.address && user.address.city && user.address.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.address && user.address.street && user.address.street.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        setFilteredUsers(filtered);
    }, [searchTerm, sortConfig, users]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = '';
            key = '';
        }
        setSortConfig({ key, direction });
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    return (
        <div>
            {error && <div>Error: {error}</div>}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <table style={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('firstName')}>ФИО</th>
                        <th onClick={() => handleSort('age')}>Возраст</th>
                        <th onClick={() => handleSort('gender')}>Пол</th>
                        <th onClick={() => handleSort('phone')}>Номер телефона</th>
                        <th onClick={() => handleSort('address')}>Адрес</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id} onClick={() => handleUserClick(user)}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.age}</td>
                            <td>{user.gender}</td>
                            <td>{user.phone}</td>
                            <td>{user.address.city}, {user.address.street}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedUser && <UserModal user={selectedUser} closeModal={closeModal} />}
        </div>
    );
};

export default UserTable;