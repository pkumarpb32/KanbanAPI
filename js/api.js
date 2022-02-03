
export class API
{
    async getResp()
    {
          const response = await fetch("http://localhost:3000/api");
          if(response.ok){
              const data = await response.json();
              console.log("Correcte: ", data.responsables);

              return data.responsables;
          }
    }


}