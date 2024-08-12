import React, { useEffect, useState } from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';


const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() =>{
    fetch('http://localhost:3000/services')
    .then(res => res.json())
    .then(data => setServices(data))
  },[])
  return (
    <div className='text-center'>
      <h3 className='text-3xl text-orange-500 font-bold'>Service</h3>
      <h1 className="text-5xl font-bold">Our Service Area</h1>
      <p className="py-4">
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,<br /> or randomised words which don't look even slightly believable. 
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          services.map(service =><ServiceCard
          key= {service._id}
          service={service}
          ></ServiceCard>)
        }
      </div>
    </div>
  );
};

export default Services;