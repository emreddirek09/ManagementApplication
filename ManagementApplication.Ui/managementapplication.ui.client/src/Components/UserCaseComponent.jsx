import React, { useEffect, useState } from "react";
import { FormGroup, Input, Table, Label } from "reactstrap";
import axios from "axios"; // Axios importu ekledik

const UserCaseComponent = () => {
  const _userId = localStorage.getItem("userId");

  // State tanımlamaları
  const [usercase, setUsercases] = useState([]); // Başlangıçta boş dizi
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modalın açılma durumu
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    IsCompleted: false, // Başlangıçta tamamlanmamış
    UserId: _userId
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Formdaki her bir değişikliği handle eden fonksiyon
  const Change = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // API'den görev listesini alacak fonksiyon
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
        setUsercases(data.data); // Veriyi state'e aktar
        setLoading(false); // Yüklenme tamamlanınca loading false
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
    GetCaseList(); // Sayfa yüklendiğinde API'den veriyi al
  }, []);

  // Görev ekleme işlemi
  const addTask = async (e) => {
    e.preventDefault();
    try {
      console.log("formData:", formData);
      const response = await axios.post("https://localhost:44379/api/Tasks/AddTask", formData, {
        headers: {
          "Content-Type": "application/json", // JSON gönderimi
        },
      });

      if (response.data.success) {
        setResponseMessage(JSON.stringify(response.data.message));
        setIsModalOpen(false);
        GetCaseList(); // Görev ekledikten sonra listeyi güncelle
      } else {
        setErrorMessage(JSON.stringify(response.data.message));
      }
    } catch (error) {
      console.error("Axios Hatası:", error.message);
      setErrorMessage("İstek sırasında bir sorun oluştu: " + error.message);
    }
  };

  // Durum değiştirme (isCompleted)
  const toggleTaskStatus = (taskId) => {
    const updatedCases = usercase.map(c =>
      c.id === taskId ? { ...c, isCompleted: !c.isCompleted } : c
    );
    setUsercases(updatedCases); // Durum güncellemesini state'e aktar
  };

  return (
    <div>
      <h1 id="tableLabel">Görevler</h1>

      {/* Ekle butonu her durumda aktif */}
      <button
        type="button"
        className="btn btn-primary"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => setIsModalOpen(true)} // Modal açma
      >
        Ekle
      </button>

      {/* Modal Açma */}
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
            <h2 style={{ marginBottom: "20px", color: "#333" }}>Yeni Görev Ekle</h2>
            <form onSubmit={addTask}>
              <div className="row">
                <div className="col-6">
                  {/* Başlık */}
                  <div style={{ marginBottom: "15px", textAlign: "left" }}>
                    <label htmlFor="Title" style={{ display: "block", marginBottom: "5px" }}>
                      Başlık:
                    </label>
                    <input
                      type="text"
                      id="Title"
                      name="Title"
                      value={formData.Title}
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

                  {/* Açıklama */}
                  <div style={{ marginBottom: "15px", textAlign: "left" }}>
                    <label htmlFor="Description" style={{ display: "block", marginBottom: "5px" }}>
                      Açıklama:
                    </label>
                    <input
                      type="text"
                      id="Description"
                      name="Description"
                      value={formData.Description}
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

                  {/* Durum */}
                  <div style={{ marginBottom: "15px", textAlign: "left" }}>
                    <label htmlFor="IsCompleted" style={{ display: "block", marginBottom: "5px" }}>
                      Durum:
                    </label>
                    <input
                      type="checkbox"
                      id="IsCompleted"
                      name="IsCompleted"
                      checked={formData.IsCompleted}
                      onChange={(e) => setFormData({ ...formData, IsCompleted: e.target.checked })}
                      style={{
                        marginRight: "10px",
                      }}
                    />
                    <label htmlFor="IsCompleted" style={{ marginLeft: "5px" }}>
                      Tamamlandı
                    </label>
                  </div>

                  <input
                    type="hidden"
                    id="UserId"
                    name="UserId"
                    value={_userId} // localStorage'dan alınan _userId değeri
                  />
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
                onClick={() => setIsModalOpen(false)} // Modal kapama
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

      {/* Yükleniyor durumu */}
      {loading && <p><em>Kullanıcı Görevleri Yükleniyor...</em></p>}

      {/* Görevler Tablosu */}
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
                      onChange={() => toggleTaskStatus(cases.id)} // Durum değiştirme fonksiyonu
                    />
                    <Label check>{cases.isCompleted ? "Aktif" : "Pasif"}</Label>
                  </FormGroup>
                </td>
                <td>
                  <button className="btn btn-success">Güncelle</button>
                </td>
                <td>
                  <button className="btn btn-danger">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Görevler boşsa ve yükleme tamamlanmışsa mesajı */}
      {usercase.length === 0 && !loading && <p><em>Görev bulunamadı. Yeni görev eklemek için butona tıklayın.</em></p>}
    </div>
  );
};

export default UserCaseComponent;
