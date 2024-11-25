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
      const { token, role, fullName, userId } = response.data.token;
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
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Giriş Yap</h2>
        
        <form onSubmit={loginSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="UserNameOrMail" style={{ display: 'block', marginBottom: '5px' }}>Kullanıcı Adı & EMail:</label>
            <input
              type="text"
              id="UserNameOrMail"
              name="UserNameOrMail"
              value={formData.UserNameOrMail}
              onChange={loginChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="UserPassword" style={{ display: 'block', marginBottom: '5px' }}>Şifre:</label>
            <input
              type="password"
              id="UserPassword"
              name="UserPassword"
              value={formData.UserPassword}
              onChange={loginChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Giriş Yap
          </button>
        </form>

        {responseMessage && <p style={{ color: "green", marginTop: "15px", textAlign: 'center' }}>{responseMessage}</p>}
        {errorMessage && <p style={{ color: "red", marginTop: "15px", textAlign: 'center' }}>{errorMessage}</p>}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>
            Henüz kayıt olmadınız mı?{" "}
            <button
              onClick={() => navigate('/Register')}
              style={{
                background: 'none',
                color: '#4CAF50',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              KAYDOL
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
