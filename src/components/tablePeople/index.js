import { useEffect, useState } from "react";
import StarWarsService from "../../service/StarWars"
import ModalPerson from "../modalPerson";
import Loading from '../Loading';
import "./style.css";


export default function TablePeople() {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState();
  const [nextPage, setNextPage] = useState();
  const [previousPage, setPreviousPage] = useState();
  const [searchInput, setSearchInput] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPeople()
  }, [])

  function setResponse( results, next, previous){
    setPeople(results);
    setNextPage(next);
    setPreviousPage(previous);
  }

  function visualizarDetalhe(person) {
    setPerson(person)
  }

  async function Pagination(urlPage) {
    const { results, next, previous } = await StarWarsService.getCharacters(urlPage);
    setResponse(results, next, previous);
  }

  async function searchPeople() {
    const { results, next, previous } = await StarWarsService.getCharactersByName(searchInput);
    setResponse(results, next, previous);
  }

  async function reloadIfNull() {
    setLoading(true);

    if(!searchInput){
      const { results, next } = await StarWarsService.getCharacters();
      setResponse(results, next, null);
      
      setLoading(false);
    }
  }

  async function loadPeople(urlPage) {
    setLoading(true);

    if (urlPage) {
      Pagination(urlPage)
        .finally(() => setLoading(false))
      return;
    }

    if (searchInput) {
      searchPeople()
        .finally(() => setLoading(false));
      return;
    }

    const { results, next } = await StarWarsService.getCharacters();
    setResponse(results, next, null);

    setLoading(false);
  }

  return (
    <>
      <div className="div-container">
        <div className="div-table-people" >
          <div className="container-input-search">
            <div className="d-flex" role="search">
              <input className="form-control me-2" onBlur={()=> { reloadIfNull() }} onChange={(event)=>{setSearchInput(event.target.value)}} type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-warning" onClick={()=> { loadPeople(null) }}>Search</button>
            </div>
          </div>

          {
            loading ? (
              <Loading />
            ) : (
              <table className="table-people table table-striped">
                <thead>
                  <tr>
                    <th style={{ width: '60%' }}>Name</th>
                    <th style={{ width: '20%' }}>Gender</th>
                    <th style={{ width: '20%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {people?.map((obj, index) => (
                    <tr key={index}>
                      <td>{obj.name}</td>
                      <td>{obj.gender}</td>
                      <td>
                        <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modalPersoDetail" onClick={() => { visualizarDetalhe(obj) }}>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
        <ModalPerson person={person} />
      </div>
      {
        !loading && (
          <div className="div-pagination">
            <button className="btn btn-warning btn-previous" disabled={!previousPage} onClick={() => { loadPeople(previousPage) }}>Previous</button>
            <button className="btn btn-warning" disabled={!nextPage} onClick={() => { loadPeople(nextPage) }}>Next</button>
          </div>
        )
      }
    </>
  );
}