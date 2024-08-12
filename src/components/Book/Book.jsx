import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


const Book = () => {
  const service = useLoaderData()
  const {title, price, _id, img} = service;
  const {user} = useContext(AuthContext)
  const handleBookService = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = user?.email;
    const date = form.date.value;

    const booking = {
      customerName: name,
      email, 
      date,
      img,
      service:title,
      service_id:_id,
      price:price
    }
    console.log(booking);
    fetch('http://localhost:3000/bookings', {
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(booking),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.insertedId){
        alert('service book successfully')
      }
    } )

  }
  return (
    <div>
     
     
      <form onSubmit={handleBookService} className="card-body">
      <h2 className="items-center text-center text-5xl text-bold">book Service:{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="name" defaultValue={user?.displayName} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" defaultValue={user?.email}  className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="date" name="date" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Due Amount</span>
          </label>
          <input type="text" defaultValue={'$' + price} className="input input-bordered" required />
        </div>
      </div>
        <div className="form-control mt-6">
          
          <input className="btn btn-primary btn-block " type="submit" value='Order Confirm' />
        </div>
      </form>
    </div>
 
  );
};

export default Book;