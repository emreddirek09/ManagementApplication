import React, { useEffect, useState } from "react";
import { FormGroup, Input, Table, Label } from "reactstrap";

const UserCaseComponent = () => {
  const _userId = localStorage.getItem("userId");

  // usercase başlangıçta boş bir dizi olarak tanımlanmalı
  const [usercase, setUsercases] = useState([]);
  const [loading, setLoading] = useState(true); // Yükleniyor durumu için state

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
        setUsercases(data.data); // Gelen veriyi state'e aktar
        setLoading(false); // Veriler yüklendiğinde loading'i false yap
      } else {
        console.error("Fetch Hatası:", response.status, response.statusText);
        setLoading(false); // Hata durumunda da loading'i false yap
      }
    } catch (error) {
      console.error("Fetch Hatası:", error);
      setLoading(false); // Hata durumunda da loading'i false yap
    }
  }

  useEffect(() => {
    GetCaseList();
  }, []);

  // Eğer veriler yükleniyorsa "Yükleniyor" mesajını göster
  if (loading) {
    return <p><em>Kullanıcı Görevleri Yükleniyor...</em></p>;
  }

  // Eğer veriler yoksa, uygun mesajı göster
  if (usercase.length === 0) {
    return <p><em>Görev bulunamadı.</em></p>;
  }

  // Veriler mevcutsa, tablodaki veriyi render et
  return (
    <div>
      <Table responsive className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Açıklama</th>
            <th>Kullanıcı Adı</th>
            <th>Durum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usercase.map(cases => (
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
                      // Durumu güncelleme işlemi
                      const updatedCases = usercase.map(c => 
                        c.id === cases.id ? { ...c, isCompleted: !c.isCompleted } : c
                      );
                      setUsercases(updatedCases);
                    }}
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
    </div>
  );
};

export default UserCaseComponent;
