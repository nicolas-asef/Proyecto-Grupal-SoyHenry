import React from "react";
import CardContract from "../CardContract/CardContract";
import ContractForm from "../ContractForm/ContractForm";
import style from "./CardContracts.module.css";
import { ButtonGroup, Button, Pagination } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getUserDetail } from "../../redux/actions/actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { sumador } from "../../AuxFunctions";

function CardContracts({ isWorker, isLoading, getUserDetail, user }) {
  const [columns, setColumns] = useState([[], [], []]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [type, setType] = useState("p");
  const [update, setUpdate] = useState(false);
  const [loading2, setLoading2] = useState(true);
  let keys = sumador();

  const changePag = (e) => {
    setPage(e.target.innerText);
  };

  const id = useParams().id;

  useEffect(() => {
    getUserDetail(id);
  }, [update]);

  useEffect(() => {
    if (user) setLoading2(false);
    else setLoading2(true);
  }, [user]);

  useEffect(() => {
    let contratos = [];
    let todos_contratos = [];

    if (user.Worker) {
      todos_contratos = user.Worker.Contracts.map((e) => {
        e.type = true;
        return e;
      });
    }
    todos_contratos = todos_contratos.concat(user.Contracts);

    if (user.Contracts) {
      if (type == "p")
        contratos = todos_contratos.filter((e) => !e.confirmed && !e.finished);
      if (type == "c")
        contratos = todos_contratos.filter((e) => e.confirmed && !e.finished);
      if (type == "t")
        contratos = todos_contratos.filter((e) => e.finished && e.confirmed);
      if (type == "f")
        contratos = todos_contratos.filter((e) => e.finished && !e.confirmed);
    }

    setMaxPage(Math.ceil(contratos.length / 9));
    let num = 0;
    const columnas_aux = [[], [], []];
    for (
      let index = page * 9 - 9;
      index < 9 * page && index < contratos.length;
      index++
    ) {
      const element = contratos[index];
      columnas_aux[num].push(element);
      num++;
      num = num % 3;
    }
    setColumns(columnas_aux);
  }, [page, type, isLoading]);

  const forceUpdate = () => {
    setUpdate(!update);
  };

  const forceLoading = () => {
    setLoading2(true);
  };

  const changeType = (e) => {
    setPage(1);
    setType(e.target.value);
  };

  return (
    <div className={style.cardContracts}>
      <div className={style.containerContacts}>
        <div className={style.filters}>
          <button value="p" onClick={changeType}>
            Pendientes
          </button>
          <button value="c" onClick={changeType}>
            Confirmados
          </button>
          <button value="t" onClick={changeType}>
            Terminados
          </button>
          <button value="f" onClick={changeType}>
            Cancelados
          </button>
        </div>

        {!isLoading && !loading2 ? (
          <div className={style.cardContainer}>
            <div className={style.columnContainer}>
              {columns[0].length > 0 ? (
                columns[0].map((e) => (
                  <CardContract
                    id={e.id}
                    key={keys()}
                    date={e.date}
                    location={e.location}
                    state={
                      e.finished
                        ? "Terminado"
                        : e.confirmed
                        ? "Confirmado"
                        : "Pendiente de confirmacion"
                    }
                    description={e.description}
                    worker={e.type}
                    cu={e.comment_U}
                    cw={e.comment_W}
                    type={type}
                    force={forceUpdate}
                    loading={forceLoading}
                    userID={e.UserID}
                  />
                ))
              ) : (
                <h3>No hay contratos para mostrar...</h3>
              )}
            </div>
            <div className={style.columnContainer}>
              {columns[1].map((e) => (
                <CardContract
                  id={e.id}
                  key={keys()}
                  date={e.date}
                  location={e.location}
                  state={
                    e.finished
                      ? "Terminado"
                      : e.confirmed
                      ? "Confirmado"
                      : "Pendiente de confirmacion"
                  }
                  description={e.description}
                  worker={e.type}
                  type={type}
                  cu={e.comment_U}
                  cw={e.comment_W}
                  force={forceUpdate}
                  userID={e.UserID}
                />
              ))}
            </div>
            <div className={style.columnContainer}>
              {columns[2].map((e) => (
                <CardContract
                  id={e.id}
                  key={keys()}
                  date={e.date}
                  location={e.location}
                  state={
                    e.finished
                      ? "Terminado"
                      : e.confirmed
                      ? "Confirmado"
                      : "Pendiente de confirmacion"
                  }
                  description={e.description}
                  worker={e.type}
                  cu={e.comment_U}
                  cw={e.comment_W}
                  type={type}
                  force={forceUpdate}
                  userID={e.UserID}
                />
              ))}
            </div>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}

        <Pagination
          count={maxPage}
          onChange={changePag}
          style={{
            // height: "10vh",
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  user: state.userDetail,
  authState: state.authState,
});

function mapDispatchToProps(dispatch) {
  return {
    getUserDetail: (id) => dispatch(getUserDetail(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContracts);
