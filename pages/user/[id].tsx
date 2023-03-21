import React from 'react';
import { useRouter } from 'next/router';
import ActionAreaCard from '../../Components/Home';

type Props = {};

function User({}: Props) {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}</div>;
}

export default User;
