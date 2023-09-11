import React from 'react';

function MyIframeComponent() {
  return (
    <iframe
      src="/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp2YWxlbnp1ZWxhMUB1Y29sLm14IiwiaWRVc3UiOiIyNDk0NSIsImlkQXBwIjoiMTQwIiwibm9tQXBwIjoiUElTIEJsb2ciLCJpZFJvbCI6IjYiLCJpZFJvbEFwcCI6IjEiLCJpZFBlcnNvbmEiOiIzMzM3MjYiLCJpZEVtcHJlc2EiOiI4NSIsImlkQ29udHJhdG8iOiIxIiwiaWRBUEkiOiI3IiwiYXV0b3JpZGFkIjoiMCIsImh1c28iOiJBbWVyaWNhL01leGljb19DaXR5IiwiaHVzbzIiOiI2IiwibmJmIjoxNjk0NDQzMDUxLCJleHAiOjE2OTQ0NzE4NTEsImlhdCI6MTY5NDQ0MzA1MSwiaXNzIjoiUElTIiwiYXVkIjoiQVBJTUFOIn0.Ue-BjamIO356YoBH-yxAv0poPLqEcBKYjeKqT_fJN8Q" // Reemplaza con la URL que deseas cargar en el iframe
      title="Contenido externo"
      width="800"
      height="600"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
}

export default MyIframeComponent;
