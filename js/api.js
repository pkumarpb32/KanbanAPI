import Responsable from './Responsable.js'; 
export class API
{
    async getResp()
    {
          const response = await fetch("http://localhost:3000/api/responsables");
          if(response.ok){
              const data = await response.json();
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
            console.log(data);
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
                        console.log("Fet: ", res2);
                        })
                } else {
                    console.log("Error!")
                }
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    }
// Mètode per obtenir totes les tasques
    async getTasks()
    {
          const response = await fetch("http://localhost:3000/api/tasques");
          if(response.ok){
              const data = await response.json();
              return data.tasques;
          }
          else{
              console.log("Error");
          }
    }
    // Mètode per afegir una nova tasca
    async addTask(tasca){
        const response = await fetch("http://localhost:3000/api/tasques",
         {
             method: "POST",
             body: JSON.stringify({codi: tasca.codi, nom: tasca.nom, data_creacio: tasca.data_creacio, data_previsio: tasca.data_previsio, id_responsable: tasca.id_responsable, descripcio: tasca.descripcio, estat: tasca.estat, prioritat: tasca.prioritat}),
             headers: {
                 'Content-Type': 'application/json'
             }
             });

         if(response.ok){
             const data = await response.json();
         }
     }
    // Mètode per eliminar una tasca
     deleteTask(id){
        fetch( "http://localhost:3000/api/tasques/" + id, 
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
                        console.log("Fet: ", res2);
                        })
                } else {
                    console.log("Error!")
                }
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    }
    // Mètode per modificar una tasca
    async updateTask(task_id, status)
    {
        const response = await  fetch("http://localhost:3000/api/tasques/" + task_id, 
        {
            method: "PUT",
            body: JSON.stringify({estat: status}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
            const data = await response.json();
        }

      }

}