import React, { useEffect, useState } from "react";
import { FormGroup, Input, Table, Label } from "reactstrap";

const AdminAllCaseComponent = () => {
    const [state, setState] = useState(true);
    useEffect(() => {
        GetCaseList();
    }, []);
    const [usercase, usercases] = useState();

    const params = new URLSearchParams({
        Id: 0
    });

    async function GetCaseList() {
        try {
            const response = await fetch(`https://localhost:44379/api/Tasks/GetAll?${params}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("burdayım", response)
            console.log("burdayım", response.ok)

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
    const contents = usercase === undefined
        ? <p><em>Kullanıcı Görevleri Yükleniyor... </em></p>
        : <Table responsive className="table table-striped" aria-labelledby="tableLabel">
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
                                    onChange={() => setState(!cases.isCompleted)}
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
                )} 
            </tbody>
        </Table>

    return (
        <div>
            {contents}


        </div>
    );
};

export default AdminAllCaseComponent;
