import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function OrgPage() {

  const params = useParams();

  return (
    <div> 
      <h1>Org Page {params.orgId}</h1>
    </div>
  )
}