import { useEffect, useState } from "react";
import StarWarsService from "../../service/StarWars";
import Loading from "../Loading";
import TableFilms from "../tableFilms";
import "./style.css";

export default function ModalPerson(props) {
  const [films, setFilms] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (props.person?.films) {
      StarWarsService.getFilms(props.person?.films)
      .then(data => {
        setFilms(data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setLoading(false));
    }
  }, [props])

  function clearFilms(){
    setFilms([]);
  }

  return (
    <div className="modal fade" id="modalPersoDetail" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-3">Details</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearFilms}></button>
          </div>
          <div className="modal-body">
            <p><span>Name: </span> {props.person?.name}</p>
            <p><span>Birth year: </span> {props.person?.birth_year}</p>
            <p><span>Gender: </span> {props.person?.gender}</p>
            <p><span>Eye Color: </span>{props.person?.eye_color}</p>
            <hr />
            <h4 className="modal-title fs-3">Movies</h4>

            {
              loading ? (
                <Loading />
              ) : (
                <TableFilms props={films} />
              )
            }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clearFilms}>Close</button>
          </div>
        </div> 
      </div>
    </div>
  )
}