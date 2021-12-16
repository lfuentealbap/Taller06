import axios from 'axios';
import React,{useEffect, useState} from 'react';
import MaterialDatatable from "material-datatable";

const Usuarios= ()=>{

  const [data,setData] = useState([])


  useEffect(() => {
    RecuperaCliente()
}, []);
  const RecuperaCliente = data => {


    axios
    .get("/api/usuario")
    .then(
      (response) => {
         console.log(response.data);
        
         setData(response.data.usuario)
         
        

      }
     
    )
    .catch((err) => {
        
        
        if (err.response) {
            if(err.response.status==401){
                let motivo= err.response.data.mensaje;
                alert(`No autorizado:${motivo}`)
            }
            console.log(err.response.data.mensaje)
          } else if (err.request) {
            // client never received a response, or request never left
          } else {
            // anything else
          }

    });


}

    return(
      <MaterialDatatable
      title={"Usuarios"}
      options={{
        selectableRows: false,
        print: false,
        onlyOneRowCanBeSelected: false,
        textLabels: {
          body: {
            noMatch: "Lo sentimos, no se encuentran registros",
            toolTip: "Sort",
          },
          pagination: {
            next: "Siguiente",
            previous: "Página Anterior",
            rowsPerPage: "Filas por Página:",
            displayRows: "de",
          },
          toolbar: {
            search: "Buscar",
            downloadCsv: "Descargar CSV",
            print: "Imprimir",
            viewColumns: "Ver Columna",
            filterTable: "Filtrar",
          },
        },
        download: false,
        pagination: true,
        rowsPerPage: 5,
        usePaperPlaceholder: true,
        rowsPerPageOptions: [5, 10, 25],
      }}
      columns={[
        { name: "Id", field: "_id" },
        { name: "mail", field: "mail" }
      ]}
      data={data}
    />
    )

}

export default Usuarios