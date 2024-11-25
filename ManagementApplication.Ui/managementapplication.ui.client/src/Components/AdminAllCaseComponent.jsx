import React, { useEffect, useState } from "react";
import { FormGroup, Input, Table, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';

const AdminAllCaseComponent = () => {
    const [usercase, setUsercases] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [newTask, setNewTask] = useState({
        id: "",
        title: "",
        description: "",
        isCompleted: false,
        userId: ""
    });
    const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [taskToChangeStatus, setTaskToChangeStatus] = useState(null);
    const [newStatus, setNewStatus] = useState(false);
    const [_SUserId, _SelectUserId] = useState(null);     
    const [responseMessage, setResponseMessage] = useState(""); // Success message
    const [errorMessage, setErrorMessage] = useState(""); // Error message

    useEffect(() => {
        GetCaseList();
    }, []);

    async function GetCaseList() {
        try {
            const response = await axios.get("https://localhost:44379/api/Tasks/GetAll");
            console.log("response.data.data", response.data.data);
            setUsercases(response.data.data);
        } catch (error) {
            console.error("Fetch Hatası:", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value
        });
    }; 
    const toggleEditModal = () => setEditModalOpen(!editModalOpen); 

    const updateTaskStatus = async () => {
        try {
            const response = await axios.put(`https://localhost:44379/api/Tasks/UpdateCaseIsComplated`, {
                Id: taskToChangeStatus,
                IsCompleted: newStatus,
                UserId: _SUserId
            });
            console.log("response.response", response)
            if (response.data.success) {
                setIsStatusChangeModalOpen(false);
                GetCaseList();  // Güncel veri çekmek için listeyi tekrar al
            } else {
                console.error("Durum güncellenirken hata oluştu");
            }
        } catch (error) {
            console.error("Durum güncellenirken hata oluştu:", error);
        }
    };

    const deleteTask = async () => {
        try {
            const response = await axios.delete(`https://localhost:44379/api/Tasks/DeleteCase`, {
                data: { Id: taskToDelete },
                headers: { "Content-Type": "application/json" }
            });

            if (response.data.success) {
                setIsDeleteModalOpen(false);
                GetCaseList();  // Güncel veri çekmek için listeyi tekrar al
            } else {
                console.error("Görev silinirken hata oluştu");
            }
        } catch (error) {
            console.error("Görev silinirken hata oluştu:", error);
        }
    }; 
    const startEditing = (task) => {
        setCurrentTask(task);
        setNewTask({
            title: task.title,
            description: task.description,
            id: task.id,
            isCompleted: task.isCompleted,
            userId: _SUserId
        });
        setEditModalOpen(true);
    };

    // handleEditTask fonksiyonunu updateTask fonksiyonu ile güncelledik
    const handleEditTask = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("https://localhost:44379/api/Tasks/UpdateCase", newTask, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                setResponseMessage("Görev başarıyla güncellendi!"); // Success message
                setEditModalOpen(false);
                GetCaseList();  // Güncel veri çekmek için listeyi tekrar al
            } else {
                setErrorMessage(response.data.message); // Error message
            }
        } catch (error) {
            console.error("Axios Hatası:", error.message);
            setErrorMessage("Güncelleme sırasında bir sorun oluştu: " + error.message);
        }
    };

    const contents = usercase.length === 0
        ? <div style={{ textAlign: 'center' }}><p><em>Görev bulunamadı.</em></p></div>
        : <Table responsive className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Başlık</th>
                    <th>Açıklama</th>
                    <th>Kullanıcı Adı</th>
                    <th>Durum</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {usercase.map(cases =>
                    <tr key={cases.id}>
                        <td>{cases.title}</td>
                        <td>{cases.description}</td>
                        <td>{cases.userName}</td>
                        <td>
                            <FormGroup switch>
                                <Input
                                    type="switch"
                                    checked={cases.isCompleted}
                                    onChange={() => {
                                        setTaskToChangeStatus(cases.id);
                                        _SelectUserId(cases.userId);
                                        setNewStatus(!cases.isCompleted);
                                        setIsStatusChangeModalOpen(true);
                                    }}
                                />
                                <Label check>{cases.isCompleted ? "Aktif" : "Pasif"}</Label>
                            </FormGroup>
                        </td>
                        <td>
                            <button className="btn btn-success"
                                onChange={() => {
                                    _SelectUserId(cases.userId);
                                }}
                                onClick={() => startEditing(cases)}>Güncelle</button>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => { setTaskToDelete(cases.id); setIsDeleteModalOpen(true); }}>Sil</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>;

    return (
        <div>
            {contents}
 
            {isStatusChangeModalOpen && (
                <Modal isOpen={isStatusChangeModalOpen} toggle={() => setIsStatusChangeModalOpen(false)}>
                    <ModalHeader toggle={() => setIsStatusChangeModalOpen(false)}>Durum Değişikliği Onayı</ModalHeader>
                    <ModalBody>
                        <p>Durumu değiştirmek istediğinizden emin misiniz?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={updateTaskStatus}>Evet</Button>
                        <Button color="secondary" onClick={() => setIsStatusChangeModalOpen(false)}>Hayır</Button>
                    </ModalFooter>
                </Modal>
            )}
 
            {isDeleteModalOpen && (
                <Modal isOpen={isDeleteModalOpen} toggle={() => setIsDeleteModalOpen(false)}>
                    <ModalHeader toggle={() => setIsDeleteModalOpen(false)}>Görev Silme Onayı</ModalHeader>
                    <ModalBody>
                        <p>Bu görevi silmek istediğinizden emin misiniz?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={deleteTask}>Evet</Button>
                        <Button color="secondary" onClick={() => setIsDeleteModalOpen(false)}>Hayır</Button>
                    </ModalFooter>
                </Modal>
            )} 

            {editModalOpen && (
                <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
                    <ModalHeader toggle={toggleEditModal}>Görevi Güncelle</ModalHeader>
                    <ModalBody>
                        <div>
                            <label htmlFor="title">Başlık</label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={newTask.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Açıklama</label>
                            <Input
                                type="text"
                                id="description"
                                name="description"
                                value={newTask.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div> 
                        <div>
                            <FormGroup switch>
                                <Label check>Aktif</Label>
                                <Input
                                    type="switch"
                                    name="isCompleted"
                                    checked={newTask.isCompleted}
                                    onChange={() => setNewTask({ ...newTask, isCompleted: !newTask.isCompleted })}
                                />
                            </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleEditTask}>Görevi Güncelle</Button>
                        <Button color="secondary" onClick={toggleEditModal}>İptal</Button>
                    </ModalFooter>
                </Modal>
            )} 
        </div>
    );
};

export default AdminAllCaseComponent;
