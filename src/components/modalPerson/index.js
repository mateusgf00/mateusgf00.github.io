import { useEffect, useState } from "react";
import StarWarsService from "../../service/StarWars";
import TableFilms from "../tableFilms";
import "./style.css";

export function ModalPerson(props) {
  const [films, setFilms] = useState();

  useEffect(() => {
    if (props.person?.films) {
      StarWarsService.getFilms(props.person?.films)
      .then(data => {
        setFilms(data);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [props])

  function clearFilms(){
    setFilms([]);
  }

  return (
    <div class="modal fade" id="modalPersoDetail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-3">Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearFilms}></button>
          </div>
          <div class="modal-body">
            <p><span>Name: </span> {props.person?.name}</p>
            <p><span>Birth year: </span> {props.person?.birth_year}</p>
            <p><span>Gender: </span> {props.person?.gender}</p>
            <p><span>Eye Color: </span>{props.person?.eye_color}</p>
            <hr />
            <h4 class="modal-title fs-3">Movies</h4>
            { films && <TableFilms props={films} />}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={clearFilms}>Close</button>
          </div>
        </div> 
      </div>
    </div>
  )
}