import { format } from 'date-fns'

export default function TableFilms({props}){
  return(
    <>
    <table class="table table-striped">
      <thead>
        <tr>
          <th style={{width: '70%'}}>Title</th>
          <th style={{width: '30%'}}>Release date</th>
        </tr>
      </thead>
      <tbody>
        {props?.map((obj, index) => (
          <tr key={index}>
            <td>{obj.title}</td>
            <td>{format(new Date(obj.release_date), 'MM/dd/yyyy')}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
  </>
  )
}