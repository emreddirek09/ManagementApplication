// import React, { Component } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       formData: {
//         UserNameOrMail: "",
//         UserPassword: "",
//       },
//       responseMessage: "",
//       errorMessage: ""
//     };
//   }

//   loginChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({
//       formData: {
//         ...this.state.formData,
//         [name]: value,
//       }
//     });
//   };

//   loginSubmit = async (e) => {
//     e.preventDefault();  
//     try {
//       console.log("formData:", this.state.formData); 
//       const response = await axios.post("https://localhost:44379/api/Login", this.state.formData, {
//         headers: {
//           "Content-Type": "application/json",  
//         },
//       });
//       console.log(response)

//       // Token ve role bilgisini localStorage'a kaydediyoruz
//       const { token, role } = response.data.token;
//       localStorage.setItem("jwtToken", token);
//       localStorage.setItem("userRole", role); // Role bilgisi de kaydediliyor

//       console.log(token)
//       console.log(role)

//       // Role'ye göre yönlendirme yapıyoruz
//       const navigate = useNavigate();
//       if (role === "Admin") {
//         navigate("/pages/HomePage");  // Admin için HomePage yönlendirmesi
//       } else if (role === "User") {
//         navigate("/Componenets/UserCaseComponent");  // User için UserCaseComponent yönlendirmesi
//       }

//       this.setState({
//         responseMessage: "Giriş başarılı!",
//         errorMessage: ""
//       });
//     } catch (error) {
//       if (error.response) {
//         this.setState({
//           errorMessage: "Hata: " + JSON.stringify(error.response.data),
//         });
//       } else {
//         this.setState({
//           errorMessage: "İstek sırasında bir sorun oluştu: " + error.message,
//         });
//       }
//     }
//   };

//   render() {
//     return (
//       <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", border: "1px solid #ccc" }}>
//         <h1>Giriş Yap</h1>
//         <form onSubmit={this.loginSubmit}>   
//           <div style={{ marginBottom: "10px" }}>
//             <label htmlFor="UserNameOrMail">Kullanıcı Adı & EMail:</label>
//             <input
//               type="text"
//               id="UserNameOrMail"
//               name="UserNameOrMail"
//               value={this.state.formData.UserNameOrMail}
//               onChange={this.loginChange}
//               required
//             />
//           </div> 
//           <div style={{ marginBottom: "10px" }}>
//             <label htmlFor="UserPassword">Şifre:</label>
//             <input
//               type="password"
//               id="UserPassword"
//               name="UserPassword"
//               value={this.state.formData.UserPassword}
//               onChange={this.loginChange}
//               required
//             />
//           </div>
        
//           <button type="submit">Giriş Yap</button>
//         </form>
        
//         {this.state.responseMessage && <p style={{ color: "green" }}>{this.state.responseMessage}</p>}
//         {this.state.errorMessage && <p style={{ color: "red" }}>{this.state.errorMessage}</p>}
//       </div>
//     );
//   }
// }

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
  const navigate = useNavigate();  // useNavigate hook'u function component içinde kullanılabilir

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
      const { token, role } = response.data.token;
      localStorage.setItem("jwtToken", response.data.token);
      localStorage.setItem("userRole", response.data.role); // Role bilgisi de kaydediliyor
 
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
