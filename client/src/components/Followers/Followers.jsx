import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkers, getUsers } from "../../redux/actions/actions";

export function Followers({ id }) {
  const worker = useSelector((state) => state.workers);
  //   const usId = useSelector((state) => state.users.Worker);
  //   //merompe el puot ID lcsm
  //   let idW;
  //   if (usId) {
  //     idW = usId.ID;
  //   }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkers());
  }, []);

  let fow = 0;
  const follow = worker.forEach((e) => {
    e.Favorites.forEach((e1) => {
      if (e1.Fav.WorkerID === id) {
        fow = fow + 1;
      }
    });
  });
  return <h1>{fow}</h1>;
}
//a4bf5c44-585a-422a-8757-57589849345f
