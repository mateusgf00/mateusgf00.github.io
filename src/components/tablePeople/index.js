import { useEffect, useState } from "react";
import StarWarsService from "../../service/StarWars"
import { ModalPerson } from "../modalPerson";
import "./style.css";


export default function TablePeople() {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState();
  const [nextPage, setNextPage] = useState();
  const [previousPage, setPreviousPage] = useState();
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    async function loadPeople() {
      const { results, next } = await StarWarsService.getCharacters();
      setResponse(results, next, null);
    }
    loadPeople();

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

  async function reloadIfNull(){
    if(!searchInput){
      const { results, next } = await StarWarsService.getCharacters();
      setResponse(results, next, null);
    }
  }

  return (
    <>
      <div class="div-container">
        <div class="div-table-people" >
          <div class="container-input-search">
            <div class="d-flex" role="search">
              <input class="form-control me-2" onBlur={()=>{reloadIfNull()}} onChange={(event)=>{setSearchInput(event.target.value)}} type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-warning" onClick={()=> {searchPeople()}}>Search</button>
            </div>
          </div>
          <table class="table-people table table-striped">
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
                    <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modalPersoDetail" onClick={() => { visualizarDetalhe(obj) }}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalPerson person={person} />
      </div>
      <div class="div-pagination">
            <button class="btn btn-warning btn-previous" disabled={!previousPage} onClick={() => { Pagination(previousPage) }}>Previous</button>
            <button class="btn btn-warning" disabled={!nextPage} onClick={() => { Pagination(nextPage) }}>Next</button>
      </div>
    </>
  );
}