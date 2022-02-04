import Responsable from './Responsable.js'; 
export class API
{
    async getResp()
    {
          const response = await fetch("http://localhost:3000/api/responsables");
          if(response.ok){
              const data = await response.json();
              console.log("Correcte: ", data.responsables);
              return data.responsables;
          }
          else{
              console.log("Error");
          }
    }

    async addResp(resp1){
       const response = await fetch("http://localhost:3000/api/responsables",
        {
            method: "POST",
            body: JSON.stringify({codi: resp1.codi, nom: resp1.nom, email: resp1.email}),
            headers: {
                'Content-Type': 'application/json'
            }
            });
        if(response.ok){
            const data = await response.json();
            console.log(data.responsables);
            alert("Fet");
        }
    }

    deleteResp(id){
        fetch( "http://localhost:3000/api/responsables/" + id, 
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if(res.ok) {
                    res.json()
                        .then((res2) => {
                        console.log("Fet: ", res2.responsables);
                        })
                } else {
                    console.log("Error!")
                }
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    }


}