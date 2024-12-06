import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate import ediliyor

const Register = () => {
  const navigate = useNavigate(); // navigate fonksiyonunu tanımlıyoruz
  const [formData, setFormData] = useState({
    Name: "",
    Surname: "",
    UserName: "",
    UserEmail: "",
    UserPassword: "",
    PhoneNumber: "",
    KimlikNo: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Form verilerini güncelleyen fonksiyon
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData:", formData); // Konsolda form verilerini kontrol et
      const response = await axios.post(
        "https://localhost:44379/api/Register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",  
          },
        }
      );

      setResponseMessage("Kayıt başarılı! API yanıtı: " + JSON.stringify(response.data));
      setErrorMessage(""); 
      if (response.data.success) {
        navigate("/"); 
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
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", border: "1px solid #ccc" }}>
      <h1>Kayıt Ol</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="Name">Ad:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="Surname">Soyad:</label>
          <input
            type="text"
            id="Surname"
            name="Surname"
            value={formData.Surname}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="UserName">Kullanıcı Adı:</label>
          <input
            type="text"
            id="UserName"
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="UserEmail">E-posta:</label>
          <input
            type="email"
            id="UserEmail"
            name="UserEmail"
            value={formData.UserEmail}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="UserPassword">Şifre:</label>
          <input
            type="password"
            id="UserPassword"
            name="UserPassword"
            value={formData.UserPassword}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="PhoneNumber">Telefon:</label>
          <input
            type="text"
            id="PhoneNumber"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="KimlikNo">Kimlik No:</label>
          <input
            type="text"
            id="KimlikNo"
            name="KimlikNo"
            value={formData.KimlikNo}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Kaydol
        </button>
      </form>

      {responseMessage && <p style={{ color: "green" }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Register;
