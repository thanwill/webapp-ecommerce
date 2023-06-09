// cria um componente com titulo e subtitulo
import React from 'react';
import './style.css';

export default function Title(props) {
  return (
    <div className={`${props.class} mb-3`} >
      <div className="row">
      <h1 className="">{props.title}</h1>
      <p className="text-muted">{props.subtitle}</p>
      </div>
    </div>
  );
}
