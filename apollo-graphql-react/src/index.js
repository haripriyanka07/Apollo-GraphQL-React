import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

// apollo client

import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'

const endPointUrl = 'http://localhost:9000/graphql'
const client = new ApolloClient({
   link: new HttpLink({uri:endPointUrl}),
   cache:new InMemoryCache()
});

async function loadCarsAsync() {
   const query = gql`
   {
      cars{
         id
         name
         manufacturer{
            name
         }
      }
   }
   `
   const {data} = await client.query({query}) ;
   return data.cars;
}
function App() {
   const [data, setData] = useState([]);
   
   useEffect(() => {
      async function loadCars() {
         // const carsData = await loadCarsAsync();
         // setData({
         //    cars: carsData
         // })
         loadCarsAsync()
         .then(data => setData(data))
      }
      loadCars()
   })
   return(
      <div>
         <input type = "button"  value = "loadCars" />
         <div>
            <br/>
            <hr/>
            <table border = "3">
               <thead>
                  <tr>
                     <td>Name</td>
                     <td>Manufacturer</td>
                  </tr>
               </thead>
               
               <tbody>
                  {
                     // console.log(data)
                     // console.log(data.map(s => {
                     //    return (s.id);
                     // }))
                     data.map(s => {
                        console.log(s);
                        return (
                           <tr key = {s.id}>
                              <td>
                                 {s.name}
                              </td>
                              <td>
                                 {s.manufacturer.name}
                              </td>
                           </tr>
                        )
                     })
                  }
               </tbody>
            </table>
         </div>
      </div>
   )
}

ReactDOM.render(<App/>, document.getElementById('root'));