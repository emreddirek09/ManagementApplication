import React, { useEffect, useState } from "react";
import { FormGroup, Input, Table, Label } from "reactstrap";
import axios from "axios"; // Axios importu ekledik

const UserCaseComponent = () => {
  const _userId = localStorage.getItem("userId");
  const [usercase, setUsercases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    IsCompleted: false,
    UserId: _userId
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
  const [taskToChangeStatus, setTaskToChangeStatus] = useState(null);
  const [newStatus, setNewStatus] = useState(null);

  const [isEditing, setIsEditing] = useState(false);  // Güncelleme kontrolü için state

  const Change = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function GetCaseList() {
    const params = new URLSearchParams({
      Id: _userId
    });

    try {
      const response = await fetch(`https://localhost:44379/api/Tasks/GetAll?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsercases(data.data);
        setLoading(false);
      } else {
        console.error("Fetch Hatası:", response.status, response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Fetch Hatası:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    GetCaseList();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:44379/api/Tasks/AddTask", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setResponseMessage(JSON.stringify(response.data.message));
        setIsModalOpen(false);
        GetCaseList();
      } else {
        setErrorMessage(JSON.stringify(response.data.message));
      }
    } catch (error) {
      console.error("Axios Hatası:", error.message);
      setErrorMessage("İstek sırasında bir sorun oluştu: " + error.message);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("https://localhost:44379/api/Tasks/UpdateCase", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setResponseMessage("Görev başarıyla güncellendi!");
        setIsModalOpen(false);
        GetCaseList();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Axios Hatası:", error.message);
      setErrorMessage("Güncelleme sırasında bir sorun oluştu: " + error.message);
    }
  };

  const updateTaskStatus = async (taskId, currentStatus) => {
    const updatedCases = usercase.map(c =>
      c.id === taskId ? { ...c, isCompleted: !currentStatus } : c
    );
    setUsercases(updatedCases);

    try {
      const response = await axios.put("https://localhost:44379/api/Tasks/UpdateCaseIsComplated", {
        Id: taskId,
        UserId: _userId,
        IsCompleted: !currentStatus
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("API Hatası:", error);
      // Eğer API isteği başarısız olursa, frontend'deki değişiklik geri alınabilir
      const revertedCases = usercase.map(c =>
        c.id === taskId ? { ...c, isCompleted: currentStatus } : c
      );
      setUsercases(revertedCases);
      setErrorMessage("Görev durumu güncellenirken bir hata oluştu.");
    }
  };

  const deleteTask = async () => {
    try {
      const response = await axios.delete("https://localhost:44379/api/Tasks/DeleteCase", {
        data: { Id: taskToDelete },
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.data.success) {
        setIsDeleteModalOpen(false);
        GetCaseList();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Silme işlemi sırasında hata:", error);
      setErrorMessage("Silme işlemi sırasında bir hata oluştu.");
    }
  };

  const startEditing = (task) => {
    setIsEditing(true);
    setFormData({
      Id: task.id,
      Title: task.title,
      Description: task.description,
      IsCompleted: task.isCompleted,
      UserId: _userId
    });
    setIsModalOpen(true);
  };

  // Durum değişikliğini onaylama fonksiyonu
  const confirmStatusChange = async () => {
    try {
      const updatedCases = usercase.map(c =>
        c.id === taskToChangeStatus ? { ...c, isCompleted: !newStatus } : c
      );
      setUsercases(updatedCases);

      const response = await axios.put("https://localhost:44379/api/Tasks/UpdateCaseIsComplated", {
        Id: taskToChangeStatus,
        UserId: _userId,
        IsCompleted: !newStatus
      });

      if (response.data.success) {
        setIsStatusChangeModalOpen(false);
        setNewStatus(null);
        setTaskToChangeStatus(null);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Durum güncellenirken bir hata oluştu.");
      console.error(error);
    }
  };

  // Durum değişikliğini iptal etme fonksiyonu
  const cancelStatusChange = () => {
    setIsStatusChangeModalOpen(false);
    setNewStatus(null);
    setTaskToChangeStatus(null);
  };

  return (
    <div>
      <h1 id="tableLabel">Görevler</h1>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          setIsEditing(false);
          setFormData({
            Title: '',
            Description: '',
            IsCompleted: false,
            UserId: _userId
          });
          setIsModalOpen(true);
        }}
      >
        Ekle
      </button>

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
            <h2 style={{ marginBottom: "20px", color: "#333" }}>
              {isEditing ? "Görev Güncelle" : "Yeni Görev Ekle"}
            </h2>
            <form onSubmit={isEditing ? updateTask : addTask}>
              <div className="row">
                <div className="col-6">
                  <div style={{ marginBottom: "15px", textAlign: "left" }}>
                    <label htmlFor="Title" style={{ display: "block", marginBottom: "5px" }}>
                      Başlık:
                    </label>
                    <Input
                      type="text"
                      name="Title"
                      value={formData.Title}
                      onChange={Change}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: "15px", textAlign: "left" }}>
                    <label htmlFor="Description" style={{ display: "block", marginBottom: "5px" }}>
                      Açıklama:
                    </label>
                    <Input
                      type="text"
                      name="Description"
                      value={formData.Description}
                      onChange={Change}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "15px", textAlign: "left" }}>
                    <label htmlFor="IsCompleted" style={{ display: "block", marginBottom: "5px" }}>
                      Durum:
                    </label>
                    <FormGroup switch>
                      <Input
                        type="switch"
                        name="IsCompleted"
                        checked={formData.IsCompleted}
                        onChange={(e) => setFormData({ ...formData, IsCompleted: e.target.checked })}
                      />
                      <Label check>{formData.IsCompleted ? "Aktif" : "Pasif"}</Label>
                    </FormGroup>
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
                Kaydet
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
          </div>
        </div>
      )}

      {isStatusChangeModalOpen && (
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
            <h2 style={{ marginBottom: "20px" }}>
              Durumu değiştirmek istediğinizden emin misiniz?
            </h2>
            <button
              onClick={confirmStatusChange}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Evet
            </button>
            <button
              onClick={cancelStatusChange}
              style={{
                marginLeft: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Hayır
            </button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
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
            <h2 style={{ marginBottom: "20px" }}>
              Bu görevi silmek istediğinizden emin misiniz?
            </h2>
            <button
              onClick={deleteTask}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Evet
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              style={{
                marginLeft: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Hayır
            </button>
          </div>
        </div>
      )}

      {loading && <p><em>Kullanıcı Görevleri Yükleniyor...</em></p>}

      {usercase.length > 0 && (
        <Table responsive className="table table-striped" aria-labelledby="tableLabel">
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
            {usercase.map((cases) => (
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
                        setNewStatus(cases.isCompleted);
                        setIsStatusChangeModalOpen(true);
                      }} 
                    />
                    <Label check>{cases.isCompleted ? "Aktif" : "Pasif"}</Label>
                  </FormGroup>
                </td>
                <td>
                  <button className="btn btn-success" onClick={() => startEditing(cases)}>
                    Güncelle
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => { setTaskToDelete(cases.id); setIsDeleteModalOpen(true); }}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {usercase.length === 0 && !loading && <p><em>Görev bulunamadı. Yeni görev eklemek için butona tıklayın.</em></p>}
    </div>
  );
};

export default UserCaseComponent;
