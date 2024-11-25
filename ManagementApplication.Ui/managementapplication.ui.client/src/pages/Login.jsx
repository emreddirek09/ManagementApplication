import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    UserNameOrMail: "",
    UserPassword: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 
  const loginChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData:", formData);
      const response = await axios.post("https://localhost:44379/api/Login", formData, {
        headers: {
          "Content-Type": "application/json",  
        },
      });

      // Token ve role bilgisini localStorage'a kaydediyoruz
      const { token, role ,fullName,userId} = response.data.token;
      localStorage.setItem("jwtToken", response.data.token);
      localStorage.setItem("userRole", response.data.role); // Role bilgisi de kaydediliyor
      localStorage.setItem("fullName", response.data.fullName);
      localStorage.setItem("userId", response.data.userId); // Role bilgisi de kaydediliyor
      // Role'ye göre yönlendirme yapıyoruz
       if (response.data.role === "Admin") {
        navigate("/AdminComponent");  // Admin için HomePage yönlendirmesi
      } else if (response.data.role === "User") {
        navigate("/UserCaseComponent");  // User için UserCaseComponent yönlendirmesi
      }

      setResponseMessage("Giriş başarılı!");
      setErrorMessage("");
    } catch (error) {
      if (error.response) {
        setErrorMessage("Hata: " + JSON.stringify(error.response.data));
      } else {
        setErrorMessage("İstek sırasında bir sorun oluştu: " + error.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", border: "1px solid #ccc" }}>
      <h1>Giriş Yap</h1>
      <form onSubmit={loginSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="UserNameOrMail">Kullanıcı Adı & EMail:</label>
          <input
            type="text"
            id="UserNameOrMail"
            name="UserNameOrMail"
            value={formData.UserNameOrMail}
            onChange={loginChange}
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
            onChange={loginChange}
            required
          />
        </div>
        
        <button type="submit">Giriş Yap</button>
      </form>

      {responseMessage && <p style={{ color: "green" }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
