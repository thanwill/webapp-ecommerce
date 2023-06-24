import Title from '../Title';

export default function Error404(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-5 ">
            <img src="./assets/find.png" alt="" />
            <Title
              title={props.title || "Página não encontrada"}
              subtitle={props.subtitle || "A página que você está procurando ainda não existe."}
            />
          </div>
        </div>
      </div>
    </>
  );
}
