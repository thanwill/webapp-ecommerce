// cria um componente com titulo e subtitulo

export default function Title(props) {
  return (
    <div className="">
      <div className="">
        <div className="col-12 col-md-6 text-left mt-5 mb-5">
          <h1 className="">{props.title}</h1>
          <p className="text-muted">{props.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
