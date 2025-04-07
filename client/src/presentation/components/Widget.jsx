export function Widget(prop){
    return <div style={estiloWidget}>
        <div style={estiloDetalles}>
            <div style={estiloTitulo}>{prop.titulo}</div>
            <div style={estiloRespuesta}>{prop.respuesta}</div>
        </div>
    </div>
}

const estiloWidget={
    backgroundColor: "#1C2C57",
    width: "33%",
    minWidth: "170px",
    height: "240px",
    marginTop: "5px",
    marginBottom: "5px",
    marginRight: "10px",
    padding: "10px",
    borderRadius: "10px"
}

const estiloDetalles={
    color: "white",
    marginLeft: "10px",
    width: "100%",
    height: "100%"
}

const estiloTitulo={
    fontSize: "15px",
    fontWeight: "400"
}

const estiloRespuesta={
    padding: "0px",
    fontSize: "40px",
    fontWeight: "700"
}