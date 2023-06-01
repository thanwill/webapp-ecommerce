// cria um componente com titulo e subtitulo

export default function Title(props) {
  return (
    <div className="col-12 col-md-6 text-left mb-5">
      <h1 className="">{props.title}</h1>
      <p className="text-muted">{props.subtitle}</p>
    </div>
  );
}
