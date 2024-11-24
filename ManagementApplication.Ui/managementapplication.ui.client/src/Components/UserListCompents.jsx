import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";

const UserListCompents = () => {
    const [usercase, usercases] = useState(); 
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUserName, setselectedUserName] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
        

    useEffect(() => {
        GetUserList();
    }, []);
    
    const toggleModal = (userName) => {
        setselectedUserName(userName);
        setModalOpen(!modalOpen);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };
    const contents = usercase === undefined
        ? <p><em>Loading... Kullanıcı Verileri Yükleniyor </em></p>
        : <Table responsive className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>İsim</th>
                    <th>Soyisim</th>
                    <th>Kullanıcı Adı</th>
                    <th>Email</th>
                    <th>Telefon Numarası</th>
                    <th>Kimlik Numarası</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {usercase.map(user =>
                    <tr key={user.id}>
                        <td>{user.name}</td> 
                        <td>{user.surname}</td>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.kimlikNo}</td>

                        <td><button className='btn btn-success'>Güncelle</button></td>
                        <td><button className='btn btn-primary' onClick={() => toggleModal(user.userName)}>Rol Ata</button></td>
                        <td><button className='btn btn-danger'>Sil</button></td>

                    </tr>
                )}
            </tbody>
        </Table>; 

    async function GetUserList() {
        try {
            const response = await fetch("https://localhost:44379/api/Users/GetAllUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                usercases(data.data);  
            } else {
                console.error("Fetch Hatası:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Fetch Hatası:", error);
        }
    }
    
    const assignRole = async () => {
        if (!selectedRole || !selectedUserName) {
            debugger;
            alert("Lütfen bir kullanıcı ve rol seçin!");
            return;
        } 
        try {
             
            const formData = {
                UserName: selectedUserName, // Tablo satırından alınan kullanıcı adı
                RoleName: selectedRole     // Modal'da seçilen rol
            };
    
            console.log("Form Data:", formData); // Debugging için
    
            const response = await axios.post("https://localhost:44379/api/Admin/AssignRole", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                alert("Rol başarıyla atandı!");
                setModalOpen(false);  
            } else {
                alert("Rol atama işlemi başarısız!");
            }
        } catch (error) {
            console.error("Assign Role Hatası:", error);
        }
    };

    return ( 
        <div className="container mt-3">
           <h1 id="tableLabel">Kullanıcılar</h1>
            <button type="button" className='btn btn-primary'>Ekle</button>
             {contents}

        {/* Modal */}
        <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
            <ModalHeader toggle={() => setModalOpen(false)}>Rol Ata</ModalHeader>
            <ModalBody>
                <p>{selectedUserName} kullanıcısına rol atayın</p>
                <select
                    className="form-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)} // Rol seçim işlemi
                >
                    <option value="">Seçim yapın</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
            </ModalBody>
            <ModalFooter>
                <button
                    className="btn btn-primary"
                    onClick={assignRole} // Gönderim fonksiyonu
                >
                    Gönder
                </button>
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                    İptal
                </button>
            </ModalFooter>
        </Modal>
     </div>
    );
};

export default UserListCompents;
