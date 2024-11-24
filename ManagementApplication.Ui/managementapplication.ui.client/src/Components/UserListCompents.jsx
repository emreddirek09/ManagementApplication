import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";

const UserListCompents = () => {
    const [usercase, usercases] = useState(); 
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUserName, setselectedUserName] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");

    const formData = {
        UserName: selectedUserName, // userName bir string olduğu için direkt gönderiyoruz
        RoleName: selectedRole
    };
    
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
                usercases(data.data); // Gelen veri formatına uygun olarak düzeltildi
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
        debugger;
        try {

            const response = await fetch("https://localhost:44379/api/Admin/AssignRole", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    UserName: selectedUserName.userName,
                    RoleName: selectedRole
                })
            });

            if (response.ok) {
                alert("Rol başarıyla atandı!");
                setModalOpen(false); // Modalı kapat
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
        <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Rol Atama</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="roleSelect">Rol Seçin</Label>
                    <Input type="select" name="role" id="roleSelect" value={selectedRole} onChange={handleRoleChange}>
                        <option value="">Rol Seçin</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </Input>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={assignRole}>
                    Kaydet
                </Button>{" "}
                <Button color="secondary" onClick={toggleModal}>
                    İptal
                </Button>
            </ModalFooter>
        </Modal>
    </div>
    );
};

export default UserListCompents;
