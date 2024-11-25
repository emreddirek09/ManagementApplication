import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AdminComponent = () => {
    const [usercase, usercases] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUserName, setselectedUserName] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        Name: "",
        Surname: "",
        UserName: "",
        UserEmail: "",
        UserPassword: "",
        PhoneNumber: "",
        KimlikNo: "",
    });

    useEffect(() => {
        GetUserList();
    }, []);

    const toggleModal = (userName) => {
        setselectedUserName(userName);
        setModalOpen(!modalOpen);
    };
 
    const Change = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const contents = usercase === undefined
        ? <p><em>Kullanıcı Verileri Yükleniyor... </em></p>
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

                        {/* <td><button className='btn btn-success'>Güncelle</button></td> */}
                        <td><button className='btn btn-primary' onClick={() => toggleModal(user.userName)}>Rol Ata</button></td>
                        {/* <td><button className='btn btn-danger'>Sil</button></td> */}

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
            console.log("response", response)

            if (response.ok) {
                const data = await response.json();
                console.log("response.json", data)

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
            alert("Lütfen bir kullanıcı ve rol seçin!");
            return;
        }
        try {

            const formData = {
                UserName: selectedUserName,
                RoleName: selectedRole
            };

            console.log("Form Data:", formData);

            const response = await axios.post("https://localhost:44379/api/Admin/AssignRole", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("response", response)
            console.log("response.data", response.data)
            console.log("response.data.success", response.data.success)
            console.log("response.data.message", response.data.message)


            if (response.data.success) {
                console.log("response", response.data.message)

                alert(response.data.message);
                setModalOpen(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Role Atama Hatası:", error);
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        try {
            console.log("formData:", formData);
            const response = await axios.post("https://localhost:44379/api/Register", formData, {
                headers: {
                    "Content-Type": "application/json", // JSON gönderimi
                },
            });
            if (response.data.success) {
                setResponseMessage(JSON.stringify(response.data.message));
                setIsModalOpen(false);

            }
            else {
                setErrorMessage(JSON.stringify(response.data.message));
            }

        } catch (error) {
            if (error.response) {
                console.error("Hata Detayları:", error.response.data);
                setErrorMessage("Hata: " + JSON.stringify(error.response.data));
            } else {
                console.error("Axios Hatası:", error.message);
                setErrorMessage("İstek sırasında bir sorun oluştu: " + error.message);
            }
        }
        GetUserList();
        
    };

    return (
        <div className="container mt-3">
            <h1 id="tableLabel">Kullanıcılar</h1>
            <button type="button" className='btn btn-primary'
                style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }} onClick={() => setIsModalOpen(true)}>Ekle</button>

            {contents}

            <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
                <ModalHeader toggle={() => setModalOpen(false)}>Rol Ata</ModalHeader>
                <ModalBody>
                    <p>{selectedUserName} kullanıcısına rol atayın</p>
                    <select
                        className="form-select"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="">Seçim yapın</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-primary"
                        onClick={assignRole}
                    >
                        Gönder
                    </button>
                    <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                        İptal
                    </button>
                </ModalFooter>
            </Modal>

            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "30px",
                            borderRadius: "10px",
                            width: "400px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            textAlign: "center",
                        }}
                    >
                        <h2 style={{ marginBottom: "20px", color: "#333" }}>Kayıt Ol</h2>
                        <form onSubmit={addUser}>
                            <div className='row'>
                                <div className='col-6'>
                                    <div style={{ marginBottom: "15px", textAlign: "left" }}>
                                        <label htmlFor="Name" style={{ display: "block", marginBottom: "5px" }}>Ad:</label>
                                        <input
                                            type="text"
                                            id="Name"
                                            name="Name"
                                            value={formData.Name}
                                            onChange={Change}
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                borderRadius: "5px",
                                                border: "1px solid #ccc",
                                            }}
                                            required
                                        />
                                    </div>
                                    <div style={{ marginBottom: "15px", textAlign: "left" }}>
                                        <label htmlFor="Surname" style={{ display: "block", marginBottom: "5px" }}>Soyad:</label>
                                        <input
                                            type="text"
                                            id="Surname"
                                            name="Surname"
                                            value={formData.Surname}
                                            onChange={Change}
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                borderRadius: "5px",
                                                border: "1px solid #ccc",
                                            }}
                                            required
                                        />
                                    </div>
                                    <div style={{ marginBottom: "15px", textAlign: "left" }}>
                                        <label htmlFor="UserName" style={{ display: "block", marginBottom: "5px" }}>Kullanıcı Adı:</label>
                                        <input
                                            type="text"
                                            id="UserName"
                                            name="UserName"
                                            value={formData.UserName}
                                            onChange={Change}
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                borderRadius: "5px",
                                                border: "1px solid #ccc",
                                            }}
                                            required
                                        />
                                    </div>
                                    <div style={{ marginBottom: "15px", textAlign: "left" }}>
                                        <label htmlFor="UserEmail" style={{ display: "block", marginBottom: "5px" }}>E-posta:</label>
                                        <input
                                            type="email"
                                            id="UserEmail"
                                            name="UserEmail"
                                            value={formData.UserEmail}
                                            onChange={Change}
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                borderRadius: "5px",
                                                border: "1px solid #ccc",
                                            }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='col-6'>
                                    <div style={{ marginBottom: "15px", textAlign: "left" }}>
                                        <label htmlFor="UserPassword" style={{ display: "block", marginBottom: "5px" }}>Şifre:</label>
                                        <input
                                            type="password"
                                            id="UserPassword"
                                            name="UserPassword"
                                            value={formData.UserPassword}
                                            onChange={Change}
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                borderRadius: "5px",
                                                border: "1px solid #ccc",
                                            }}
                                            required
                                        />
                                    </div>
                                    <div style={{ marginBottom: "15px", textAlign: "left" }}>
                                        <label htmlFor="PhoneNumber" style={{ display: "block", marginBottom: "5px" }}>Telefon:</label>
                                        <input
                                            type="text"
                                            id="PhoneNumber"
                                            name="PhoneNumber"
                                            value={formData.PhoneNumber}
                                            onChange={Change}
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                borderRadius: "5px",
                                                border: "1px solid #ccc",
                                            }}
                                            required
                                        />
                                    </div>
                                    <div style={{ marginBottom: "15px", textAlign: "left" }}>
                                        <label htmlFor="KimlikNo" style={{ display: "block", marginBottom: "5px" }}>Kimlik No:</label>
                                        <input
                                            type="text"
                                            id="KimlikNo"
                                            name="KimlikNo"
                                            value={formData.KimlikNo}
                                            onChange={Change}
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                borderRadius: "5px",
                                                border: "1px solid #ccc",
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                            >
                                Kaydol
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    marginLeft: "10px",
                                    backgroundColor: "#f44336",
                                    color: "white",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                            >
                                Kapat
                            </button>
                        </form>
                        {responseMessage && <p style={{ color: "green", marginTop: "15px" }}>{responseMessage}</p>}
                        {errorMessage && <p style={{ color: "red", marginTop: "15px" }}>{errorMessage}</p>}
                    </div>
                </div>
            )}


        </div>
    );
};

export default AdminComponent;
